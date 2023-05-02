import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface ITodo {
  title: string;
  description: string;
  status: boolean;
}
const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    toObject: {
      transform: (_doc, ret) => {
        ret = { todosId: ret._id, ...ret };
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      transform: (_doc, ret) => {
        ret = { todosId: ret._id, ...ret };
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

const TodoModel = model("Todo", todoSchema);

export default TodoModel;
