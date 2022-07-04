import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function AwardAddForm({
	portfolioOwnerId,
	setAwards,
	setIsAdding,
}) {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();


    const user_id = portfolioOwnerId;
    const when_date = whenDate.toISOString().split("T")[0];


    await Api.post("award/create", {
      user_id,
      title,
      description,
      when_date,
    });

		
    const res = await Api.get("awardlist", user_id);

    setAwards(res.data);

    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardAddTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)} >
            취소
          </Button>
        </Col>
      </Form.Group>
      </Form>
  );
}

export default AwardAddForm;