const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/helpers");

const UserSchema = new Schema(
    {
      userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: e => {
              const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              return emailRegex.test(e);
            },
            message: value => `${value} is not a valid email address.`
        }
      },
      thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: "thoughts"
          }
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal)
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false,
    }
  );

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model("User", UserSchema);

module.exports = User;
