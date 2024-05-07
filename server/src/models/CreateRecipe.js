

db.createCollection("createdrecipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "title",
        "cuisineType",
        "description",
        "image",
        "healthScore",
        "cookingTime",
        "servings",
        "instructions",
        "nutrients",
        "ingredients"
      ],
      properties: {
        _id:{bsonType:"objectId"},
        title: { bsonType: "string"},
        cuisineType: { bsonType: "string" },
        description: { bsonType: "string" },
        image: { bsonType: "string" },
        cookingTime: { bsonType: "number" },
        servings: { bsonType: "number" },
        healthScore: { bsonType: "number" },
        ingredients: {
          bsonType: "array",
          items: { bsonType: "string" },
        },
        instructions: {
          bsonType: "array",
          items: { bsonType: "string" },
        },
        nutrients: {
          bsonType: "array",
          items: { bsonType: "string" },
        },
        createdAt: {bsonType:"date"}
      },
    },
  },
});


