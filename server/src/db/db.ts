import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

let db: Db;

export async function connectToDb() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log(`Connected to MongoDB`);
    db = client.db();
  } catch (error) {
    console.log("Error Connecting to MongoDB : ", error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Db not Connected...");
  }
  return db;
}
