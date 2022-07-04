import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required"
import { awardService } from "../services/awardService"

const awardRouter = Router();
// 상장 추가하기(Create)
awardRouter.post("/award/create", async function (req, res, next) {
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
    const when_date = req.body.when_date

    // 위 데이터를 Award db에 추가하기
    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
      when_date,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
      
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

  // 사용자의 상장 한개 조회
awardRouter.get("/award/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const award = await awardService.getAward({ _id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
}
);

 // 사용자가 등록한 상장list 조회
 awardRouter.get("/awardlist/:user_id", login_required, async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const awardlist = await awardService.getAwardList({ user_id });

    if (awardlist.errorMessage) {
      throw new Error(awardlist.errorMessage);
    }

    res.status(200).json(awardlist);
  } catch (error) {
    next(error);
  }
}
);


  //상장 수정하기(Update)
awardRouter.put("/awards/:id", login_required, async function (req, res, next) {
    try {
      const user_id = req.body.user_id;
      // URI로부터 상장 사용자 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 상장 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { user_id, _id, title, description, when_date };

      // 해당 사용자 아이디로 상장 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedAward = await awardService.setAward({ _id, toUpdate });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

// 상장 삭제하기
awardRouter.delete("/awards/:id", login_required, async function (req, res, next) {
  try {
    const _id = req.params.id;
    const deleted = await awardService.deleteAward({ _id });

    // if (deleted.errorMessage) {
    //   throw new Error(deleted.errorMessage);
    // }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
}
);

export { awardRouter };
