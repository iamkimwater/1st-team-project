import { Edu } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class eduService {
  static async addEdu({ user_id, title, description, position}) {
    const _id = uuidv4();
    const edu = await Edu.findById({_id});
      if (edu) {
        const errorMessage = "이미 존재하는 수상정보입니다."
        return { errorMessage }
      }
    const newEdu = ({ id:_id, user_id, title, description, position })
    const createdNewEdu = await Edu.create({ newEdu });
    createdNewEdu.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEdu;
  }

   // 학력 불러오기
   static async getEdu({_id}) {
     const edu= await Edu.findById({_id});
     if (edu.length == 0) {
      const errorMessage =
          "해당 수상내용이 존재하지 않습니다.";
      return { errorMessage };
  }
     return edu;
   }

   // 사용자 학력list 불러오기
   static async getEduList({ user_id }) {
    const edulist = await Edu.findByAll({ user_id });

    return edulist;
  }

   // 학력 수정하기
   static async setEdu({_id, toUpdate,}) {
     let edu = await Edu.findById(_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       edu = await Edu.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      edu = await Edu.update({_id, fieldToUpdate, newValue})
    }
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      edu = await Edu.update({_id, fieldToUpdate, newValue})
    }
    return edu; 
   } 

   // 학력 삭제하기
   static async deleteEdu({ _id}) {
    const deleted = await Edu.deleteById({ _id});
    return deleted;
  }




}

export { eduService };