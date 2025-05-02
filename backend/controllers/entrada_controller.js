import bcrypt from 'bcryptjs';
import Usuario from '../models/entradas_model';

export const getEntradas = async (req, res) => {
  const idUsu = req.idUsu;

  try {
    // Verifica se o usuário com o id existe
    const usuario = await Usuario.findByPk(idUsu);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Lista as entradas do usuário
    const entradas = await Entrada.findAll({
      where: { usuario: idUsu }
    });

    res.status(200).json(veiculos);
  } catch (err) {
    console.error('Erro ao buscar entradas do usuário:', err);
    res.status(500).json({ message: 'Erro ao buscar entradas do usuário' });
  }
};

export const createEntrada = async (req, res) => {
  try {
    const { entrada, tipo, data, valor } = req.body;

    // Supondo que o middleware de autenticação já adicionou o usuário logado ao req.user
    const usuario = req.user?.id;

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    await Entrada.create({
      usuario,
      entrada,
      tipo,
      data,
      valor
    });

    res.json({ message: "Um novo registro foi inserido na tabela entradas" });
  } catch (e) {
    console.error("Erro ao inserir uma nova entrada", e);
    res.status(500).json({ message: 'Erro ao criar entrada.' });
  }
};

export const deleteEntrada = async (req, res) => {
    try {

        await Entrada.destroy ({
          where: {
            id: req.params.id
          }
        })
        res.json({
            "message": "Entrada excluída"
        })
    } catch (e) {
        console.log("Erro ao excluir registro", e)
    }

}
