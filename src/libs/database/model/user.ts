import * as mongoose from "mongoose";
import { z as zod } from "zod";

const { Schema, model } = mongoose;
export const enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
export interface IUser {
  userId: string;

  firstName: string;
  lastName: string;

  email: string;
  password: string;

  isSuspended: boolean;
  suspendReason: string;
  isDeleted: boolean;

  role: Roles;

  createdAt: Date;
  updatedAt: Date;
}

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|((([a-zA-Z0-9]+)(\-[a-zA-Z0-9]+|)+\.)+[a-zA-Z]{2,}))$/;

export const userRegisterSchema = zod
  .object({
    firstName: zod.string().trim().min(5).max(500),
    lastName: zod.string().trim().min(5).max(500).nonempty("This is required"),
    email: zod.string().nonempty("This is required").trim().regex(emailRegex),
    password: zod.string().min(5).max(500).trim().nonempty("This is required"),
  })
  .strict();
export const userLoginSchema = zod
  .object({
    email: zod.string().nonempty("This is required").regex(emailRegex),
    password: zod.string().min(5).max(500).nonempty("This is required"),
  })
  .strict();

const todoSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuspended: { type: Boolean, required: false, default: true },
    suspendReason: { type: String, default: "Email Verification" },
    isDeleted: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: Roles.USER },
  },
  {
    toObject: {
      transform: (_doc, ret) => {
        ret = { userId: ret._id.toString(), ...ret };
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      transform: (_doc, ret) => {
        ret = { userId: ret._id.toString(), ...ret };
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const UserModel = model("User", todoSchema);

export default UserModel;
