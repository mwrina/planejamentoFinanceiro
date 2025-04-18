import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario_model';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.send(usuarios)
    } catch (e) {
        console.log("Erro ao acessar a tabela usuarios", e)

    }
}

export const createUsuario = async (req, res) => {
    try {
      const { id, nome, email, senha } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedSenha = await bcrypt.hash(senha, salt);

      await Proprietario.create({
        id,
        nome,
        email,
        senha: hashedSenha
      });

      res.json({ "message": "Um novo registro foi inserido na tabela usuarios" });
    } catch (e) {
      console.log("Erro ao inserir um novo usuário", e);
      res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
  };

export const updateUsuario = async (req, res) => {
try {
    const { senha, ...rest } = req.body;
    let updatedFields = rest;

    if (senha) {
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);
    updatedFields = { ...rest, senha: hashedSenha };
    }

    const [updatedRowsCount] = await Usuario.update(updatedFields, {
    where: { id: req.params.id }
    });

    if (updatedRowsCount === 0) {
    return res.status(404).json({ message: `Usuário não encontrado.` });
    }

    res.json({ message: `O usuário foi atualizado com sucesso.` });
} catch (e) {
    console.log("Erro ao atualizar registro de usuário", e);
    res.status(500).json({ message: 'Erro ao atualizar usuário. Verifique os dados fornecidos.' });
}
};

export const deleteUsuario = async (req, res) => {
    try {

        await Entrada.destroy ({
          where: {
            usuario: req.params.id
          }
        })

        await Saida.destroy ({
          where: {
            usuario: req.params.id
          }
        })

        await Investimento.destroy ({
          where: {
            usuario: req.params.id
          }
        })

        await Cofrinho.destroy ({
          where: {
            usuario: req.params.id
          }
        })

        await Usuario.destroy({
          where: {
              id: req.params.id
          }
        })
        res.json({
            "message": "Usuário e dados excluídos"
        })
    } catch (e) {
        console.log("Erro ao excluir registros de usuário", e)
    }

}
