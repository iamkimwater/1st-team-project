import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { eduService } from "../services/eduService"

const eduRouter = Router();
// 학력  추가하기(Create)
eduRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title= req.body.title;
    const description = req.body.description;
    const position = req.body.position;

    
    const newEdu = await eduService.addEdu({
      user_id,
      title,
      description,
      position,
    });

    if (newEdu.errorMessage) {
      throw new Error(newEdu.errorMessage);
      
    }

    res.status(201).json(newEdu);
  } catch (error) {
    next(error);
  }
});

  // 사용자의 학력 한개 조회
eduRouter.get("/education/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const edu = await eduService.getEdu({ _id });

    if (edu.errorMessage) {
      throw new Error(edu.errorMessage);
    }

    res.status(200).json(edu);
  } catch (error) {
    next(error);
  }
}
);

 // 사용자가 등록한 학력list 조회
 eduRouter.get("/educationlist/:user_id", login_required, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const edulist = await eduService.getEduList({ user_id });

    if (edulist.errorMessage) {
      throw new Error(edulist.errorMessage);
    }

    res.status(200).json(edulist);
  } catch (error) {
    next(error);
  }
}
);


  //학력 수정하기(Update)
eduRouter.put("/educations/:id", login_required, async function (req, res, next) {
    try {
      const user_id = req.body.user_id;
      
      const _id = req.params.id;
     
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { user_id, _id, title, description, position };

      const updatedEdu = await eduService.setEdu({ _id, toUpdate });

      if (updatedEdu.errorMessage) {
        throw new Error(updatedEdu.errorMessage);
      }

      res.status(200).json(updatedEdu);
    } catch (error) {
      next(error);
    }
  }
);

// 학력 삭제하기
eduRouter.delete("/educations/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const deleted = await eduService.deleteEdu({ _id });

    // if (deleted.errorMessage) {
    //   throw new Error(deleted.errorMessage);
    // }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
}
);

export { eduRouter };