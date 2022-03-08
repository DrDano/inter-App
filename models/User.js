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
                const emailRegex = RegExp(
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                  );
                return e === emailRegex;
            },
            message: value => `${value} is not a valid email address.`
        }
      },
      thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: "Thought"
          }
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
            ref: "User"
          }
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
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
