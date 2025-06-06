import express from 'express';
import { 
  criarEntrada,
  listarEntradas,
  atualizarEntrada,
  deletarEntrada,
  calcTotal,
  calcTotalMes
} from '../controllers/entrada_controller.js';

const router = express.Router();

router.post('/', criarEntrada);
router.get('/:usuario', listarEntradas);
router.get('/total/:usuario', calcTotal);
router.get('/total/:usuario/:data', calcTotalMes);
router.put('/:id', atualizarEntrada);
router.delete('/:id', deletarEntrada);

export default router;
