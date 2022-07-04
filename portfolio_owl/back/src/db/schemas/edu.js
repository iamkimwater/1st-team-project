import { Schema, model } from "mongoose";

const EduSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: { 
      type: String, 
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    position: {
      type: String ,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const EduModel = model("Edu", EduSchema);

export { EduModel };