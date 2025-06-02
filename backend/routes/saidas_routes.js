import express from 'express';
import { 
    criarSaida,
    listarSaidas,
    atualizarSaida,
    deletarSaida,
    listarTotaisPorTipo,
    calcTotal,
    calcTotalMes
} from '../controllers/saida_controller.js';

const router = express.Router();

router.post('/', criarSaida);
router.get('/:usuario', listarSaidas);
router.get('/totaisPorTipo/:usuario', listarTotaisPorTipo);
router.get('/total/:usuario', calcTotal);
router.get('/total/:usuario/:mes', calcTotalMes);
router.put('/:id', atualizarSaida);
router.delete('/:id', deletarSaida);

export default router;
