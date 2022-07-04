// model은 mongodb와 상호작용하기 위한 기본 도구인 class
// 참고: https://runebook.dev/ko/docs/mongoose/api/model
import { ProjectModel } from "../schemas/project";
import mongoose from "mongoose";

// 프로젝트 추가
class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  // 선택한 프로젝트 불러오기
  static async findById({ _id }) {
    const project = await ProjectModel.findOne({ id: _id });
    return project;
  }

  // 사용자 프로젝트list 불러오기
  static async findByAll({ user_id }) {
    const projectList = await ProjectModel.find({ user_id });
    return projectList;
  }

  // 사용자 프로젝트 수정하기
  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { id: _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    // 수정된게 있으면 update
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  // 삭제하기
  static async deleteById({ _id }) {
    const deleted = await ProjectModel.findOneAndDelete({ id: _id });
    return deleted;
  }
}

export { Project };
