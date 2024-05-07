import { getDb } from "../db/db";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import cloudinary from "../utils/cloudinary";
interface Profile {
  _id: ObjectId;
  name: string;
  image: string;
  cover: string;
}
export const editProfile = async (req: Request, res: Response) => {
  const profile: Profile = req.body;

  try {
    const db = getDb();
    const imgUrl = await cloudinary.uploader.upload(profile.image, {
      folder: "user-profile",
      upload_preset: "TasteScape",
    });
    const coverUrl = await cloudinary.uploader.upload(profile.image, {
      folder: "user-profile",
      upload_preset: "TasteScape",
    });
    profile.image = imgUrl.secure_url;
    profile.cover = coverUrl.secure_url;
    const response = await db.collection("profile").updateOne(
      { _id: new ObjectId(profile._id) },
      {
        $set: {
          name: profile.name,
          image: profile.image,
          cover: profile.cover,
        },
      },
      { upsert: true }
    );
    response
      ? res.status(200).json(response)
      : res.status(500).json({ error: "error editing profile" });
  } catch (error) {
    console.log(error);
  }
};
