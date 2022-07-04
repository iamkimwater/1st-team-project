import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({
    currentEducation,
    setEducations,
    setIsEditing,
}) {

    const [title, setTitle] = useState(currentEducation.title);

    const [description, setDescription] = useState(
        currentEducation.description
    );


    const [position, setPosition] = useState(
        currentEducation.position
    );

    const handleSubmit = async (e) => {
        e.preventDefault();


        const user_id = currentEducation.user_id;


        await Api.put(`educations/${currentEducation.id}`, {
            user_id,
            title,
            description,
            position,
        });


        const res = await Api.get("educationlist", user_id);

        setEducations(res.data);

        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="educationEditTitle">
                <Form.Control
                    type="text"
                    placeholder="학력 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="educationEditDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="educationPosition" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="학위"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
            </Form.Group>


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

export default EducationEditForm;
