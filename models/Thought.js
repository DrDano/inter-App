const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    reactions: [ReactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  if (this.reactions.length) {
    return this.reactions.length;
  }
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
