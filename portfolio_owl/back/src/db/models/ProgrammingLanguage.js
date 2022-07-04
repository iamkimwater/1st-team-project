import { ProgrammingLanguage_Model } from "../schemas/programmingLanguage";
import mongoose from "mongoose"

// ProgrammingLanguage 추가
class ProgrammingLanguage {
  static async create({ newProgrammingLanguage }) {
    const creatednewProgrammingLanguage = await ProgrammingLanguage_Model.create(newProgrammingLanguage);
    return creatednewProgrammingLanguage;
  }

// 선택한 ProgrammingLanguage 불러오기
static async findById({ plId }) {
  const ProgrammingLanguage = await ProgrammingLanguage_Model.findOne({ id: plId });
  return ProgrammingLanguage;
}

// 사용자 ProgrammingLanguage list 불러오기
static async findByAll({ user_id }) {
  const ProgrammingLanguageList = await ProgrammingLanguage_Model.find({ user_id });
  return ProgrammingLanguageList;
}

// 사용자 ProgrammingLanguage 수정하기
static async update({ plId, fieldToUpdate, newValue }) {
  const filter = { id: plId }; 
  const update = { [fieldToUpdate]: newValue };
  const option = { returnOriginal: false };
    
    // 수정된게 있으면 update
  const updatedProgrammingLanguage = await ProgrammingLanguage_Model.findOneAndUpdate(
    filter,
    update,
    option
  );
  return updatedProgrammingLanguage;
}

// 삭제하기
static async deleteById({ plId }) {
  const deleted = await ProgrammingLanguage_Model.findOneAndDelete({ id:plId });
  return deleted;
}

}

export { ProgrammingLanguage };
