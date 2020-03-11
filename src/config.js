import CST from "./cst.js";
import Cow from "./entities/Cow.js";
import Chicken from "./entities/Chicken.js";
import Wheat from "./entities/Wheat.js";


const config = {
  startMoney: 100,
  entities: [

    {
      id: 'chicken',
      name: 'Chicken',
      type: CST.ENTITIES.TYPES.ANIMAL,
      progressTime: 10,
      maxEnergy: 30,
      energyPerSec: 1,
      eat: 'corn',
      product: 'egg',
      price: {
        buy: 10,
        sell: 5,
      },
      class: Chicken
    },

    {
      id: 'cow',
      name: 'Cow',
      type: CST.ENTITIES.TYPES.ANIMAL,
      progressTime: 20,
      maxEnergy: 90,
      energyPerSec: 1.5,
      eat: 'corn',
      product: 'milk',
      price: {
        buy: 50,
        sell: 20,
      },
      class: Cow
    },

    {
      id: 'wheat',
      name: 'Wheat',
      type: CST.ENTITIES.TYPES.PLANT,
      progressTime: 10,
      product: 'corn',
      price: {
        buy: 5,
        sell: 1,
      },
      class: Wheat
    },

    {
      id: 'corn',
      name: 'Corn',
      type: CST.ENTITIES.TYPES.FOOD,
      energy: 30,
      price: {
        buy: 2,
        sell: 1,
      },
    },

    {
      id: 'milk',
      name: 'Milk',
      type: CST.ENTITIES.TYPES.PRODUCT,
      price: {
        buy: 5,
        sell: 5,
      },
    },

    {
      id: 'egg',
      name: 'Egg',
      type: CST.ENTITIES.TYPES.PRODUCT,
      price: {
        buy: 2,
        sell: 2,
      },
    },

  ],
  textLineHeight: 25,
  basicTextStyle: {
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#000000',
    backgroundColor: '#ffffff',
    padding: {
      x: 5,
      y: 2
    }
  },
};

export default config;
