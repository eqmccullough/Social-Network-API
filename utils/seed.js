const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  const users = [{
    username: "test1",
    email: "test@gmail.com"
  },
  {
    username: "test2",
    email: "test2@gmail.com"
  },
  ]

  const thoughts = [{
    thoughtText: "This is a thought",
    username: "test1"
  },
  {
    thoughtText: "This is a second thought",
    username: "test2"
  },
  ]
  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
