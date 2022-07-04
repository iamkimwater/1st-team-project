import { EduModel } from "../schemas/edu";
import mongoose from "mongoose"

// 학력 추가
class Edu {
  static async create({ newEdu }) {
    const createdNewEdu = await EduModel.create(newEdu);
    return createdNewEdu;
  }

// 선택한 학력 불러오기
static async findById({ _id }) {
  const edu = await EduModel.findOne({ id: _id });
  return edu;
}

// 사용자 학력list 불러오기
static async findByAll({ user_id }) {
  const edulist = await EduModel.find({ user_id });
  return edulist;
}

// 사용자 학력 수정하기
static async update({ _id, fieldToUpdate, newValue }) {
  const filter = { id: _id }; 
  const update = { [fieldToUpdate]: newValue };
  const option = { returnOriginal: false };
    
    // 수정된게 있으면 update
  const updatedEdu = await EduModel.findOneAndUpdate(
    filter,
    update,
    option
  );
  return updatedEdu;
}

// 삭제하기
static async deleteById({ _id }) {
  const deleted = await EduModel.findOneAndDelete({ id:_id });
  return deleted;
}

}

export { Edu };