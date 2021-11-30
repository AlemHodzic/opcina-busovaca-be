import express from 'express'
import { getPhotos, createPhoto, deletePhoto } from '../controllers/photos.js';
const router = express.Router();

router.get('/getPhotos', getPhotos)
router.post('/', createPhoto)
router.delete('/:id', deletePhoto)

export default router