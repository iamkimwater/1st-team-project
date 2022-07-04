import React, { useState } from "react";
import PLCard from "./PLCard";
import PLEditForm from "./PLEditForm";

function PL({ pl, setPLs, isEditable }) {

  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <PLEditForm
          currentPL={pl}
          setPLs={setPLs}
          setIsEditing={setIsEditing}
        />
      ) : (
        <PLCard
          pl={pl}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setPLs = {setPLs}
        />
      )}
    </>
  );
}

export default PL;