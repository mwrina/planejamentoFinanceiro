import Entrada from '../../models/entradas_model.js';
import Saida from '../../models/saidas_model.js';
import Cofrinho from '../../models/cofrinho_model.js';

export async function recalcularCofrinho(usuario, data) {
  const dataObj = new Date(data);
  const anoMes = dataObj.toISOString().slice(0, 7); // "2025-06"
  const dataMes = `${anoMes}-01`; // "2025-06-01"

  try {
    const entradas = await new Promise((resolve, reject) => {
      Entrada.calcTotalMes(usuario, anoMes, (err, res) => {
        if (err) reject(err);
        else resolve(res[0]?.total || 0);
      });
    });

    const saidas = await new Promise((resolve, reject) => {
      Saida.calcTotalMes(usuario, anoMes, (err, res) => {
        if (err) reject(err);
        else resolve(res[0]?.total || 0);
      });
    });

    const investimentos = await new Promise((resolve, reject) => {
      Investimento.calcTotalMes(usuario, anoMes, (err, res) => {
        if (err) reject(err);
        else resolve(res[0]?.total || 0);
      });
    });

    const economia = entradas - saidas - investimentos;

    Cofrinho.atualizarOuInserir(usuario, dataMes, economia, (err) => {
      if (err) console.error('Erro ao atualizar cofrinho:', err);
      else console.log(`Cofrinho atualizado: R$ ${economia.toFixed(2)}`);
    });

  } catch (error) {
    console.error('Erro ao recalcular cofrinho:', error);
  }
}