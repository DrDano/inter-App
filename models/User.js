const { Schema, model } = require("mongoose");

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
        // get: (createdAtVal) => dateFormat(createdAtVal)
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
    return this.friends.reduce((total, friends) => total + friends.length, 0)
});

const User = model("User", UserSchema);

module.exports = User;
