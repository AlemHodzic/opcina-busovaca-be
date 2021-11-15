import express from 'express'
import { getServisi, createServis } from '../controllers/servisi.js';
const router = express.Router();

router.get('/getServisi', getServisi)
router.post('/', createServis)
export default router