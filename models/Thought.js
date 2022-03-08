const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
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
  return this.reactions.reduce((total, reactions) => total + reactions.length, 0);
});

const Thought = model("Pizza", ThoughtSchema);

module.exports = Thought;
