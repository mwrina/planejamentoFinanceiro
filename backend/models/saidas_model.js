import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Usuario from "./usuario_model.js";

const Saida = db.define('saidas', {
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
    saida: {
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

Saida.belongsTo(Usuario, {foreignKey:'usuarios', as: 'usuarioAssociation', allowNull:false})

export default Saida
