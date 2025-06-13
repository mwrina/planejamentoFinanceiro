-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/06/2025 às 16:05
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `planejamentofinanceiro`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cofrinho`
--

CREATE TABLE `cofrinho` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cofrinho`
--

INSERT INTO `cofrinho` (`id`, `usuario`, `data`, `valor`) VALUES
(17, 2, '2025-06-01', 700);

-- --------------------------------------------------------

--
-- Estrutura para tabela `entradas`
--

CREATE TABLE `entradas` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `entrada` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `entradas`
--

INSERT INTO `entradas` (`id`, `usuario`, `entrada`, `tipo`, `data`, `valor`) VALUES
(17, 2, 'salario', 'Recorrente', '2025-06-02', 2300),
(21, 2, 'salario', 'Recorrente', '2025-05-21', 1000);

-- --------------------------------------------------------

--
-- Estrutura para tabela `investimentos`
--

CREATE TABLE `investimentos` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `investimento` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL,
  `risco` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `investimentos`
--

INSERT INTO `investimentos` (`id`, `usuario`, `investimento`, `tipo`, `data`, `valor`, `risco`) VALUES
(7, 2, 'ações', 'ações', '2025-06-04', 1000, 'Alto'),
(8, 2, 'gdsadgh', 'gada', '2025-06-06', 100, 'Alto');

-- --------------------------------------------------------

--
-- Estrutura para tabela `saidas`
--

CREATE TABLE `saidas` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `saida` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `saidas`
--

INSERT INTO `saidas` (`id`, `usuario`, `saida`, `tipo`, `data`, `valor`) VALUES
(10, 2, 'compras do mês', 'Alimentação', '2025-06-02', 500);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(70) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES
(2, 'mari', '1@1', '$2b$10$5fIp0RwURs2NoQ6MD0.AgenUG0InuCAOL0UBf/NsDw7/FGhV41qnS'),
(3, 'simoni', 'simoni.furtado@yahoo.com.br', '$2a$10$7IOLpuZlZsCPoU7JX9rSTOJaqPn.JigaCcx6i2Qa8zCQmr2Zq1Xd6'),
(4, 'Fabiana', 'fabi@gmail.com', '$2a$10$AmPPQFTYHFa674CtmSaxHuN2CKOidQlZQj/YjBKSbVgPRsaqx66Di'),
(5, 'simoni', 'simoni@gmail.com', '$2a$10$lLVR1D1hYn.vOrdc132NDO9/bsJo174kdc.ppsA/CWBoi8SVofONy');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cofrinho`
--
ALTER TABLE `cofrinho`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`,`data`),
  ADD UNIQUE KEY `usuario_mes` (`usuario`,`data`),
  ADD UNIQUE KEY `unique_usuario_data` (`usuario`,`data`);

--
-- Índices de tabela `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `investimentos`
--
ALTER TABLE `investimentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `saidas`
--
ALTER TABLE `saidas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cofrinho`
--
ALTER TABLE `cofrinho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `entradas`
--
ALTER TABLE `entradas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `investimentos`
--
ALTER TABLE `investimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `saidas`
--
ALTER TABLE `saidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
