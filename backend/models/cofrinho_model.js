import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Usuario from "./usuario_model.js";

const Cofrinho = db.define('confrinho', {
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
    data: {
      type:Sequelize.DATE
    },
    valor: {
      type:Sequelize.FLOAT
    }
},
{
    timestamps: false,
    freezeTableName: true
})

Cofrinho.belongsTo(Usuario, {foreignKey:'usuarios', as: 'usuarioAssociation', allowNull:false})

export default Cofrinho
