import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    }
});

const Author = model('Author', authorSchema);

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    tag: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Blog = model('Blog', blogSchema);

export { Blog, Author };