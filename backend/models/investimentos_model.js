import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Usuario from "./usuario_model.js";

const Investimento = db.define('investimentos', {
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
    investimento: {
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
    risco: {
      type:Sequelize.STRING(10)
    }
},
{
    timestamps: false,
    freezeTableName: true
})

Investimento.belongsTo(Usuario, {foreignKey:'usuarios', as: 'usuarioAssociation', allowNull:false})

export default Investimento
