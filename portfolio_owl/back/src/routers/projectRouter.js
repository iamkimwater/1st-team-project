import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();
// 프로젝트 추가하기(Create)
projectRouter.post("/project/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    // 위 데이터를 Project db에 추가하기
    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 사용자의 프로젝트 한개 조회
projectRouter.get(
  "/project/:id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params.id;
      const project = await projectService.getProject({ _id });

      if (project.errorMessage) {
        throw new Error(project.errorMessage);
      }

      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
);

// 사용자가 등록한 프로젝트list 조회
projectRouter.get("/projectlist/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const projectList = await projectService.getProjectList({ user_id });

    if (projectList.errorMessage) {
      throw new Error(projectlist.errorMessage);
    }

    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
});

//프로젝트 수정하기(Update)
projectRouter.put(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.body.user_id;
      // URI로부터 프로젝트 사용자 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 상장 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const from_date = req.body.from_date ?? null;
      const to_date = req.body.to_date ?? null;

      const toUpdate = { user_id, _id, title, description, from_date, to_date};

      // 해당 사용자 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.setProject({ _id, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// 프로젝트 삭제하기
projectRouter.delete(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params.id;
      const deleted = await projectService.deleteProject({ _id });
      res.status(200).json(deleted);
        } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
