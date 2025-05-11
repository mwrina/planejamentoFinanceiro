import Usuario from '../models/usuario_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secretpassword';


export const criarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;

  //Verifica se todos os campos foram preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  //Criptografa senha
  const senhaHash = bcrypt.hashSync(senha, 10);

  //Insere no banco
  Usuario.criar(nome, email, senhaHash, (err, result) => {
    if (err) {
      console.error('Erro ao inserir no banco:', err);
      return res.status(500).json({ mensagem: 'Erro ao criar usuário.' });
    }
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  });
};

export const loginUsuario = (req, res) => {
  const { email, senha } = req.body;

  Usuario.buscarPorEmail(email, (err, usuario) => {
    if (err || !usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
    }

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // payload
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  });
};
