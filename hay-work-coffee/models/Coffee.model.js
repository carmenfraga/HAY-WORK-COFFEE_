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
        image: {      //original photo
            type: String,
            default: 'https://i.stack.imgur.com/l60Hf.png'
            //cloudinary path
        },
        address: {
            city: String,
            country: String,
            address: String,
            location: {
                type: {
                    type: String
                },
                coordinates: [Number],
            }
        }
    },
    {
        timestamps: true
    }
)

const Coffee = mongoose.model('Coffee', coffeeSchema)
Coffee.syncIndexes()
module.exports = Coffee