import express from 'express';
import { createPool, deletePool, updatePool, getPool, getPools } from '../controllers/pool.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPool);
router.delete('/delete/:id', verifyToken, deletePool);
router.post('/update/:id', verifyToken, updatePool);
router.get('/get/:id', getPool);
router.get('/get', getPools);

export default router;