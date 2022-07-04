import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({
    currentProject,
    setProjects,
    setIsEditing,
}) {

    const [title, setTitle] = useState(currentProject.title);

    const [description, setDescription] = useState(
        currentProject.description
    );

    const [fromDate, setFromDate] = useState(
        new Date(currentProject.from_date)
    );
    const [toDate, setToDate] = useState(
        new Date(currentProject.to_date)
    );
    const handleSubmit = async (e) => {
        e.preventDefault();


        const user_id = currentProject.user_id;
        const from_date = fromDate.toISOString().split("T")[0];
        const to_date = toDate.toISOString().split("T")[0];


        await Api.put(`projects/${currentProject.id}`, {
            user_id,
            title,
            description,
            from_date,
            to_date,
        });


        const res = await Api.get("projectlist", user_id);

        setProjects(res.data);

        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectEditTitle">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="projectEditDescription" className="mt-3">
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
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                    />
                    <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                    />
                </Col>
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

export default ProjectEditForm;
