import { getDb } from "../db/db";
import { Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please add all FIelds" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address" });
    }
    if(password.length < 7){
      return res.status(400).json({error: "Password must be at least 7 characters long"})
    }
    const db = getDb();
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });
    return user
      ? res.status(200).json({
          _id: user.insertedId,
          email,
          token: generateToken(user.insertedId),
        })
      : res.status(400).json({ error: "error creating new user" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(500).json({ error: "Please add all fields" });
    }
    if (email && password) {
      const db = getDb();
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(500).json({ error: "User does not exist" });
      }
      if (user && (await compare(password, user.password))) {
        return res.status(200).json({
          id: user._id,
          email,
          token: generateToken(user._id),
          status: "logged in successfully",
        });
      } else {
        return res.status(500).json({ error: "Invalid login credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {});
};
