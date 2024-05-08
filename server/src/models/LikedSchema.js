db.createCollection("likedrecipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "title", "image", "isLiked"],
      properties: {
        _id: { bsonType: "objectId" },
        id: { bsonType: "number" },
        title: { bsonType: "string" },
        image: { bsonType: "string" },
        isLiked: { bsonType: "bool" },
      },
    },
  },
});
