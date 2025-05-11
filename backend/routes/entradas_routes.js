import express from 'express';
import { 
  criarEntrada,
  listarEntradas,
  atualizarEntrada,
  deletarEntrada
} from '../controllers/entrada_controller.js';

const router = express.Router();

router.post('/', criarEntrada);
router.get('/:usuario', listarEntradas);
router.put('/:id', atualizarEntrada);
router.delete('/:id', deletarEntrada);

export default router;
