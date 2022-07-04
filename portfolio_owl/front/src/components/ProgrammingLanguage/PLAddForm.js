import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function PLAddForm({ portfolioOwnerId, setPLs, setIsAdding }) {

    const [Proficiency, setProficiency] = useState("");

  const [position, setPosition] = useState("초급");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const user_id = portfolioOwnerId;

  
    await Api.post("pl/create", {
      user_id,
      Proficiency,
      position,
    });

   
    const res = await Api.get("pllist", user_id);

    setPLs(res.data);
 
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="plAddProficiency" className="mt-3">
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
          id="radio-add-1"
          type="radio"
          name="position"
          value="초급"
          checked={position === "초급"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="중급"
          id="radio-add-2"
          type="radio"
          name="position"
          value="중급"
          checked={position === "중급"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="고급"
          id="radio-add-3"
          type="radio"
          name="position"
          value="고급"
          checked={position === "고급"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default PLAddForm;
