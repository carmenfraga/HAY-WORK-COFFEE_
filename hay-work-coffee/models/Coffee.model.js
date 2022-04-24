const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Name is required']

        },
        coffeeImg: {
            type: String,
            default: 'https://i.stack.imgur.com/l60Hf.png'
            //cloudinary path
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number],
            address: String
        },
        userExperience: {
            type: String,
            maxlength: [300, 'Cannot exceed 300 characters']
        },
        feedback: {
            type: String,
            maxlength: [300, 'Cannot exceed 300 characters']
        }
    },
    { timestamps: true }
)

const Coffee = mongoose.model('Coffee', coffeeSchema)
Coffee.syncIndexes()
module.exports = Coffee