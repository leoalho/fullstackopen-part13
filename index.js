require('dotenv').config()
const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Note extends Model {}
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false  },
    important: {
        type: DataTypes.BOOLEAN  },
    date: {
        type: DataTypes.DATE
    }},
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'note'})

const main = async () => {
  try {
    await sequelize.authenticate()
    const notes = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    console.log(notes)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()