import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function PLEditForm({ currentPL, setPLs, setIsEditing }) {

  const [Proficiency, setProficiency] = useState(currentPL.Proficiency);

  const [position, setPosition] = useState(currentPL.position);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const user_id = currentPL.user_id;


    await Api.put(`pls/${currentPL.id}`, {
      user_id,
      Proficiency,
      position,
    });


    const res = await Api.get("pllist", user_id);

    setPLs(res.data);

    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="plEditProficiency" className="mt-3">
        <Form.Control
          type="text"
          placeholder="ex)python, c, c++, Java..."
          value={Proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="초급"
          id="radio-edit-1"
          type="radio"
          name="position"
          value="초급"
          checked={position === "초급"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="중급"
          id="radio-edit-2"
          type="radio"
          name="position"
          value="중급"
          checked={position === "중급"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="고급"
          id="radio-edit-3"
          type="radio"
          name="position"
          value="고급"
          checked={position === "고급"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default PLEditForm;
