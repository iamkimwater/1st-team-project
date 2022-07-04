import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable }) {

    const [isEditing, setIsEditing] = useState(false);
    return (
        <>
            {isEditing ? (
                <EducationEditForm
                    currentEducation={education}
                    setEducations={setEducations}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <EducationCard
                    education={education}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                    setEducations={setEducations}
                />
            )}
        </>
    );
}

export default Education;
