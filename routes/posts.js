import express from 'express'
import { getPosts, createPost, updatePost, getPostId, deletePost, getHeadingPosts, getAllPosts, getPostByName } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts)
router.get('/sveNovosti', getAllPosts)
router.get('/novosti', getHeadingPosts)
router.get('/clanak/:title', getPostByName)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.get('/:id', getPostId)
router.delete('/:id', deletePost)

export default router