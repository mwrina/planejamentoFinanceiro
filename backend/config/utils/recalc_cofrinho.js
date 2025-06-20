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

    console.log('Entradas:', entradas, typeof entradas);
    console.log('Saídas:', saidas, typeof saidas);
    console.log('Investimentos:', investimentos, typeof investimentos);

    const entradasNum = Number(entradas) || 0;
    const saidasNum = Number(saidas) || 0;
    const investimentosNum = Number(investimentos) || 0;

    const economia = entradasNum - saidasNum - investimentosNum;

    await new Promise((resolve, reject) => {
      Cofrinho.atualizarOuInserir(usuario, dataMes, economia, (err) => {
        if (err) reject(err);
        else {
          console.log(`Cofrinho atualizado: R$ ${economia.toFixed(2)}`);
          resolve();
        }
      });
    });

  } catch (error) {
    console.error('Erro ao recalcular cofrinho:', error);
  }
}