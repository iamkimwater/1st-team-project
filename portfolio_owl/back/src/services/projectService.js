import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class projectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const _id = uuidv4();
    // 프로젝트 추가하기(CREATE)
    // 프로젝트 중복 확인
    const project = await Project.findById({ _id });
    if (project) {
      const errorMessage = "이미 존재하는 프로젝트입니다.";
      return { errorMessage };
    }
    const newProject = { id: _id, user_id, title, description, from_date, to_date };
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  // 프로젝트 불러오기
  static async getProject({ _id }) {
    const project = await Project.findById({ _id });
    if (project.length == 0) {
      const errorMessage = "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }
    return project;
  }

  // 사용자 프로젝트list 불러오기
  static async getProjectList({ user_id }) {
    const projectList = await Project.findByAll({ user_id });
    return projectList;
  }

  // 프로젝트 수정하기
  static async setProject({ _id, toUpdate }) {
    let project = await Project.findById(_id);

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }
    return project;
  }

  // 프로젝트 삭제하기
  static async deleteProject({ _id }) {
    const deleted = await Project.deleteById({ _id });
    return deleted
  }
}

export { projectService };
