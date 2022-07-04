import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";
// import * as Api from "../../api";

function Project({ project, setProjects, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <ProjectEditForm
                    currentProject={project}
                    setProjects={setProjects}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ProjectCard
                    project={project}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setProjects={setProjects}
                />
            )}
        </>
    );
}

export default Project;
