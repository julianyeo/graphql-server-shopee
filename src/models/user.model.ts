import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 8;
export interface I_UserDocument {
  name: string;
  email: String;
  password: string;
}

const UserSchema = new mongoose.Schema<I_UserDocument>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v: any) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

export const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);
