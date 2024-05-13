import { getDb } from "../db/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Define a type alias for the decoded token
interface DecodedToken {
  userId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
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
      token = req.headers.authorization.split(" ")[1];

      // Verify token and assert its type
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
      };

      // Get user from token
      const db = getDb();
      const user = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(decodedToken.userId) },
          { projection: { password: 0 } }
        );
      next();
      if (user) {
        req.user = user as DecodedToken;
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ error: "Not Authorized, No Token" });
  }
};
