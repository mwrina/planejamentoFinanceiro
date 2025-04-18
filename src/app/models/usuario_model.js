import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Usuario = db.define('usuarios', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey:true
   },
   nome: {
    type:DataTypes.STRING(70)
   },
   email: {
    type:DataTypes.STRING(150)
   },
   senha: {
    type: DataTypes.STRING(100)
   }
},{
    timestamps:false,
    freezeTableName:true
})

export default Usuario
