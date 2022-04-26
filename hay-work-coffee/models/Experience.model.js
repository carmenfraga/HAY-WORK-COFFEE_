const { Schema, model } = require("mongoose");


const experienceSchema = new Schema(
    {
        description: {
            type: String,
            maxlength: [300, 'Cannot exceed 300 characters'],

        },
        coffee: {
            type: Schema.Types.ObjectId,
            ref: 'Coffee'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }

)

const Experience = model("Experience", experienceSchema);

module.exports = Experience;
