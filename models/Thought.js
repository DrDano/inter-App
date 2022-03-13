const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");
const { formatDate } = require("../utils/helpers");

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
    reactions: [ReactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
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

ThoughtSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
