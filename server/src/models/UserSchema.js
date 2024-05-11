db.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password"],
      properties: {
        _id: { bsonType: "objectId" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
      },
    },
  },
});
