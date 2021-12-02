import express from 'express'
import { getOglasi, createOglas, deleteOglas, getOglas, getOglasByName, getNabavke } from '../controllers/oglasi.js';
const router = express.Router();

router.get('/getOglasi', getOglasi)
router.get('/getNabavke', getNabavke)
router.post('/', createOglas)
router.delete('/:id', deleteOglas)
router.get('/getOglasi/:id', getOglas)
router.get('/getOglas/:title', getOglasByName)

export default router