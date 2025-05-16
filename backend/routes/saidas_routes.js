import express from 'express';
import { 
    criarSaida,
    listarSaidas,
    atualizarSaida,
    deletarSaida
} from '../controllers/saida_controller.js';

const router = express.Router();

router.post('/', criarSaida);
router.get('/:usuario', listarSaidas);
router.put('/:id', atualizarSaida);
router.delete('/:id', deletarSaida);

export default router;
