const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
  {

    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    username: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ],
    reactions: [reactionSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
        id: false,
      }
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema.virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });


// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;