const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is mandatory'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory']
    },
    avatar: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
      //cloudinary path
    },
    description: {
      type: String,
      default: 'There is no description for the moment'
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    coffee:
      [{                                  // El corchete es necesario porque es un array de ObjectIDs
        type: Schema.Types.ObjectId,
        ref: 'Coffee'                             // Nombre del modelo referenciado
      }],

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
