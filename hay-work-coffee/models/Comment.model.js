const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        description: {
            type: String,
            maxlength: [300, 'Cannot exceed 300 characters'],

        },
        experience: {
            type: Schema.Types.ObjectId,
            ref: 'Experience'
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

const Comment = model("Comment", commentSchema);

module.exports = Comment;