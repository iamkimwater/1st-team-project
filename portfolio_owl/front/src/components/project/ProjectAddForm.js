import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectAddFrom({
    portfolioOwnerId,
    setProjects,
    setIsAdding,
}) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [fromDate, setFromDate] = useState(new Date());

    const [toDate, setToDate] = useState(new Date());


    const handleSubmit = async (e) => {
        e.preventDefault();


        const user_id = portfolioOwnerId;
        const from_date = fromDate.toISOString().split("T")[0];
        const to_date = toDate.toISOString().split("T")[0];


        await Api.post("project/create", {
            user_id,
            title,
            description,
            from_date,
            to_date,
        });


        const res = await Api.get("projectlist", user_id);

        setProjects(res.data);

        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="proejctAddTitle">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="projectAddDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group as={Row} className="mt-3">
                <Row xs="auto">
                    <Col>
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                        />
                    </Col>
                    <Col>
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                        />
                    </Col>
                </Row>
            </Form.Group>

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

export default ProjectAddFrom;
