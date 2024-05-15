import { getDb } from "../db/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


declare global {
  namespace Express {
    interface Request {
      user?: String;
    }
  }
}

// Decoded Token Type Aliases
interface DecodedToken {
  id: string;
}

export const protectedRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      // Encoded Token
      token = req.headers.authorization.split(" ")[1];
      console.log("EncodedToken" ,token);

      // Verify token and assert its type
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as DecodedToken;
      console.log("Decoded Token",decodedToken);
      const tokenId = decodedToken.id
      console.log("TOKEN ID : ",tokenId)

      // Get user from token
      const db = getDb();
      const userDB = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(decodedToken.id) },
          { projection: { _id: 1 } }
        );
        console.log("USER FROM DB", userDB)
        req.user = userDB._id.toString();
        console.log('REQ.USER : ', req.user)
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ error: "Not Authorized, No Token" });
  }
};
