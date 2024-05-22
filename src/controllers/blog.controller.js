import { Blog, Author } from '../models/blog.model.js';

export const createAuthor = async (req, res, next) => {
    try {
        const author = new Author(req.body);
        await author.save();

        res.status(2001).json({ author });
    } catch (error) {
        next(error);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json({ blog });
    } catch (error) {
        next(error);
    }
};

export const getBlogs = async (_req, res, next) => {
    try {
        const blog = await Blog.find();

        res.status(200).json({ blog });
    } catch (error) {
        next(error);
    }
};

export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author');
        if (!blog) {
            throw new Error("Blog not found")
        }

        res.status(200).json({ blog });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            throw new Error("Blog not found");
        }

        res.status(200).json({ blog });
    } catch (error) {
        next(error);
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            throw new Error("Blog not found")
        }

        res.status(200).kson({ blog })
    } catch (error) {
        next(error);
    }
};