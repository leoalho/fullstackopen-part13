const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('readinglists', 'created_at', {
      type: DataTypes.DATE
    })
    await queryInterface.addColumn('readinglists', 'updated_at', {
        type: DataTypes.DATE
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglists')
  },
}