
import mongoose from "mongoose";

export type Profile =  {
    name : string,
    bio: string
}

const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    bio: {
        type: String,
    }
})

const ProfileModel = mongoose.model<Profile & Document>('Profile', profileSchema)

export default ProfileModel