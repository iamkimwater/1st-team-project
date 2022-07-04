import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

import { v4 as uuidv4 } from "uuid";


class certificateService {
  static async addCertificate({ user_id, title, description, when_date}) {
    const certificateId = uuidv4();
    
    // 자격증 추가하기(CREATE) 
      // 자격증 중복 확인
    const certificate = await Certificate.findById({certificateId});
      if (certificate) {
        const errorMessage = "이미 존재하는 자격증정보입니다."
        return { errorMessage }
      }
    const newCertificate = ({ id : certificateId,user_id,title, description, when_date })
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

   // 자격증 불러오기
   static async getCertificate({certificateId}) {
     const certificate = await Certificate.findById({certificateId});
     return certificate;
   }

   // 사용자 자격증 List 불러오기
   static async getCertificates({ user_id }) {
       const certificates = await Certificate.findByAll({ user_id });
            if (!certificates) {
                const errorMessage = "자격증내역이 존재하지 않습니다.";
                return { errorMessage }; 
            }
        return certificates;
   }

   // 자격증 수정하기
   static async setCertificate({certificateId, toUpdate}) {
     let certificate = await Certificate.findById(certificateId);

    if(!certificate) {
      "id 잘못됨ㅠ";
      return { errorMessage};
    }

     if (toUpdate.title) {
       const fieldToUpdate = "title";
       const newValue = toUpdate.title;
       certificate = await Certificate.update({certificateId, fieldToUpdate, newValue});
     }

     if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({certificateId, fieldToUpdate, newValue})
    }

    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({certificateId, fieldToUpdate, newValue})
    }
    return certificate; 
   } 

   // 자격증 삭제하기
   static async deleteCertificate({ certificateId }) {
    const deleted = await Certificate.deleteById({ certificateId });

      // if (!deleted) {
      //   const errorMessage = "수상내역이 존재하지 않습니다.";
      //   return { errorMessage };
      // }

    return deleted;
  }
 
}
 
export { certificateService };
