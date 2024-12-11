import express from 'express';
import apuestaController from '../controllers/apuesta.controller.js';

const router = express.Router();

router.post("/apuesta", apuestaController.createApuesta);

export default router;