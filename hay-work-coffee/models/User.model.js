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
    avatar: {         //or profileImg
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
      //cloudinary path
    },
    description: {
      type: String,
      default: 'No description available'
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    favCoffees: [{                                  // El corchete es necesario porque es un array de ObjectIDs
      type: Schema.Types.ObjectId,
      ref: 'Coffee'
    }],

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
