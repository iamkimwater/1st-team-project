import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { programmingLanguageService } from "../services/programmingLanguageService"

const programmingLanguageRouter = Router();
// 언어 추가하기(Create)
programmingLanguageRouter.post("/pl/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const position= req.body.position;
    const Proficiency = req.body.Proficiency;

    // 위 데이터를 db에 추가하기
    const newProgrammingLanguage = await programmingLanguageService.addProgrammingLanguage({
      user_id,
      position,
      Proficiency,
    });

    if (newProgrammingLanguage.errorMessage) {
      throw new Error(newProgrammingLanguage.errorMessage);
      
    }

    res.status(201).json(newProgrammingLanguage);
  } catch (error) {
    next(error);
  }
});

  // 사용자의 언어 한개 조회
programmingLanguageRouter.get("/pl/:id", login_required, async function (req, res, next) {
  try {
    const plId = req.params.id;
    const currentprogrammingLanguage = await programmingLanguageService.getProgrammingLanguage({ plId, });

    if (currentprogrammingLanguage.errorMessage) {
      throw new Error(currentprogrammingLanguage.errorMessage);
    }

    res.status(200).json(currentprogrammingLanguage);
  } catch (error) {
    next(error);
  }
}
);

 // 사용자가 등록한 언어list 조회
 programmingLanguageRouter
.get("/pllist/:user_id", login_required, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const programmingLanguageList = await programmingLanguageService.getProgrammingLanguageList({ user_id });

    if (programmingLanguageList.errorMessage) {
      throw new Error(programmingLanguageList.errorMessage);
    }

    res.status(200).json(programmingLanguageList);
  } catch (error) {
    next(error);
  }
}
);


  //언어 수정하기(Update)
programmingLanguageRouter.put("/pls/:id", login_required, async function (req, res, next) {
    try {
      // URI로부터 언어 사용자 id를 추출함.
      const plId = req.params.id;
      // body data 로부터 업데이트할 언어 정보를 추출함.
      const position = req.body.position ?? null;
      const Proficiency = req.body.Proficiency ?? null;

      const toUpdate = {position, Proficiency};

      // 해당 사용자 아이디로 언어 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProgrammingLanguage = await programmingLanguageService.setProgrammingLanguage({ plId, toUpdate });

      if (updatedProgrammingLanguage.errorMessage) {
        throw new Error(updatedProgrammingLanguage.errorMessage);
      }

      res.status(200).json(updatedProgrammingLanguage);
    } catch (error) {
      next(error);
    }
  }
);

// 언어 삭제하기
programmingLanguageRouter.delete("/pls/:id", login_required, async function (req, res, next) {
  try {
    const plId= req.params.id;
    const deleted = await programmingLanguageService.deleteProgrammingLanguage({ plId });


    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
}
);

export { programmingLanguageRouter };
