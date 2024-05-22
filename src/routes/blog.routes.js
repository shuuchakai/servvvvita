import { Router } from 'express';

import { createAuthor, createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blog.controller.js';

const router = Router();

router.post('/create-author', createAuthor);
router.post('/create-blog', createBlog);
router.get('/get-blogs', getBlogs);
router.get('/get-blog/:id', getBlog);

router.put('/update-blog/:id', updateBlog);

router.delete('/delete-blog/:id', deleteBlog);

export default router;