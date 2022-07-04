import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class awardService {
  static async addAward({ user_id, title, description, when_date}) {
    const _id = uuidv4();
    // 상장 추가하기(CREATE)
    const award = await Award.findById({_id});

    const newAward = ({ id:_id, user_id, title, description, when_date })
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewAward;
  }

   // 상장 불러오기
   static async getAward({_id}) {
     const award = await Award.findById({_id});
     return award;
   }

   // 사용자 상장list 불러오기
   static async getAwardList({ user_id }) {
    const awardlist = await Award.findByAll({ user_id });

    return awardlist;
  }

   // 상장 수정하기
   static async setAward({_id, toUpdate, user_id}) {
     let award = await Award.findById(_id);

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       award = await Award.update({_id, fieldToUpdate, newValue})
     }
     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({_id, fieldToUpdate, newValue})
    }
    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      award = await Award.update({_id, fieldToUpdate, newValue})
    }
    return award; 
   } 

   // 상장 삭제하기
   static async deleteAward({ _id}) {
    const deleted = await Award.deleteById({ _id});

    return deleted;
  }




}

export { awardService };
