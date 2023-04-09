const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  image: {
    type : DataTypes.STRING,
    allowNull : false
  },
  life: {
    type : DataTypes.STRING,
    allowNull : false
  },
  attack: {
    type: DataTypes.STRING,
    allowNull: false
},
  defense: {
    type: DataTypes.STRING,
    allowNull: false
  },
  speed: {
      type: DataTypes.STRING,
      allowNull: false
},
height: {
  type: DataTypes.STRING,
},
weight: {
  type: DataTypes.STRING,
},
createdInDb:{
  type: DataTypes.BOOLEAN,
  defaultValue: true,
  allowNull:false
}
  }, {
    timestamps: false
  })
};

