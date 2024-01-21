import IRecipes from "../interfaces/IRecipes";

export const MockData: IRecipes[] = [
  {
    recipe: {
      uri: "food1",
      label: "Filipino Chicken Adobo",
      cuisineType: "Filipino",
      calories: 70,
      yield: 7,
      totalTime: 50,
      image:
        "https://www.eatingwell.com/thmb/YrI10pp9V6quKr98nscc_XFQ02g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5147351-a7e0a28fde814b40bdcc67075e933b96.jpg",
      ingredientLines: ["Soy Sauce", "Vinegar", "Chicken", "Basil Leaves"],
    },
  },

  {
    recipe: {
      uri: "food2",
      label: "Cordon Bleu",
      cuisineType: "Switzerland",
      calories: 40,
      yield: 10,
      totalTime: 80,
      image:
        "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/Chicken-Cordon-Bleu-Roll-Ups-1200x675.jpeg",
      ingredientLines: ["Pagmamahal", "Aruga", "Kiss", "Cuddle"],
    },
  },

  {
    recipe: {
      uri: "food3",
      label: "Chicken Katsu Curry",
      cuisineType: "Japanese",
      calories: 50,
      yield: 7,
      totalTime: 50,
      image:
        "https://takestwoeggs.com/wp-content/uploads/2021/09/Air-Fryer-Chicken-Katsu-curry-takestwoeggs-FINAL-SQ.jpg",
      ingredientLines: ["Soy Sauce", "Vinegar", "Chicken", "Basil Leaves"],
    },
  },

  {
    recipe: {
      uri: "food4",
      label: "Aglio e Olio",
      cuisineType: "Italian",
      calories: 40,
      yield: 4,
      totalTime: 60,
      image:
        "https://walkingthroughlavenderfields.com/wp-content/uploads/2022/09/aglio-e-olio-e-peperoncino-01.jpeg",
      ingredientLines: ["Soy Sauce", "Vinegar", "Chicken", "Basil Leaves"],
    },
  },
];
