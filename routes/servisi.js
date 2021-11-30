import express from 'express'
import { getServisi, createServis, getServis, getServisByName, deleteServis, updateServis } from '../controllers/servisi.js';
const router = express.Router();

router.get('/getServisi', getServisi)
router.post('/', createServis)
router.get('/getServisi/:id', getServis)
router.get('/getServis/:title', getServisByName)
router.delete('/:id', deleteServis)
router.patch('/:id', updateServis)
export default router