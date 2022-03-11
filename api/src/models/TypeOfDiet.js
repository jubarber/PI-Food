const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('typeOfDiet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
