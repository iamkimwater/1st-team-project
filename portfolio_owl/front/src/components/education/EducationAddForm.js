import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({
    portfolioOwnerId,
    setEducations,
    setIsAdding,
}) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [position, setPosition] = useState("재학중");

    const handleSubmit = async (e) => {
        e.preventDefault();


        const user_id = portfolioOwnerId;


        await Api.post("education/create", {
            user_id,
            title,
            description,
            position,
        });


        const res = await Api.get("educationlist", user_id);

        setEducations(res.data);

        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="educationAddTitle">
                <Form.Control
                    type="text"
                    placeholder="학교 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="educationAddDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <div key={`inline-radio`} className="mb-3 mt-3">
                <Form.Check
                    inline
                    label="재학중"
                    id="radio-add-1"
                    type="radio"
                    name="position"
                    value="재학중"
                    checked={position === "재학중"}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <Form.Check
                    inline
                    label="학사졸업"
                    id="radio-add-2"
                    type="radio"
                    name="position"
                    value="학사졸업"
                    checked={position === "학사졸업"}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <Form.Check
                    inline
                    label="석사졸업"
                    id="radio-add-3"
                    type="radio"
                    name="position"
                    value="석사졸업"
                    checked={position === "석사졸업"}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <Form.Check
                    inline
                    label="박사졸업"
                    id="radio-add-4"
                    type="radio"
                    name="position"
                    value="박사졸업"
                    checked={position === "박사졸업"}
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

export default EducationAddForm;
