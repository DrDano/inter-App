const { Schema, Types } = require("mongoose");
const { formatDate } = require("../utils/helpers.js");

const ReactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: "Username is a required field",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

module.exports = ReactionSchema;
