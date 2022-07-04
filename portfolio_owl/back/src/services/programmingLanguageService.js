import { ProgrammingLanguage } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class programmingLanguageService {
  static async addProgrammingLanguage({ user_id, position, Proficiency}) {
    const plId = uuidv4();
    // 상장 추가하기(CREATE)

    const newProgrammingLanguage = ({ id: plId, user_id, position, Proficiency })
    const creatednewProgrammingLanguage = await ProgrammingLanguage.create({ newProgrammingLanguage });
    creatednewProgrammingLanguage.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return creatednewProgrammingLanguage;
  }

   // 상장 불러오기
   static async getProgrammingLanguage({plId}) {
     const programmingLanguage = await ProgrammingLanguage.findById({plId});
     return programmingLanguage;
   }

   // 사용자 상장list 불러오기
   static async getProgrammingLanguageList({ user_id }) {
    const programmingLanguageList = await ProgrammingLanguage.findByAll({ user_id });

    return programmingLanguageList;
  }

   // 상장 수정하기
   static async setProgrammingLanguage({plId, toUpdate}) {
     let programmingLanguage = await ProgrammingLanguage.findById(plId);

     if (toUpdate.position) {
       const fieldToUpdate = "position";
       const newValue = toUpdate.position;
       programmingLanguage = await ProgrammingLanguage.update({plId, fieldToUpdate, newValue})
     }
     if (toUpdate.Proficiency) {
      const fieldToUpdate = "Proficiency";
      const newValue = toUpdate.Proficiency;
      programmingLanguage = await ProgrammingLanguage.update({plId, fieldToUpdate, newValue})
    }
    return programmingLanguage; 
   } 

   // 상장 삭제하기
   static async deleteProgrammingLanguage({ plId }) {
    const deleted = await ProgrammingLanguage.deleteById({ plId });

    return deleted;
  }




}

export { programmingLanguageService };
