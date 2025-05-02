import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Usuario from "./usuario_model.js";

const Entrada = db.define('entradas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    usuario: {
      type:Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    entrada: {
        type:Sequelize.STRING(50)
    },
    tipo: {
      type:Sequelize.STRING(30)
    },
    data: {
        type:Sequelize.DATE
    },
    valor: {
        type:Sequelize.FLOAT
    },
},
{
    timestamps: false,
    freezeTableName: true
})

Entrada.belongsTo(Usuario, {foreignKey:'usuarios', as: 'usuarioAssociation', allowNull:false})

export default Entrada
