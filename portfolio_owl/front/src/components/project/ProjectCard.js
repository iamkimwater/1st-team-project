import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api';



function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
    const handleDelete = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        const user_id = project.user_id;
        try {
            if (window.confirm("삭제 하시겠습니까?")) {
                await Api.delete(`projects/${project.id}`);
                const res = await Api.get("projectlist", user_id);
                setProjects(res.data);
            }
        } catch (err) {
            alert("삭제 오류", err);
        }

    };
    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    {project.title}
                    <br />
                    <span className="text-muted">{project.description}</span>
                    <br />
                    <span className="text-muted">{project.from_date} ~ {project.to_date}</span>

                </Col>
                {isEditable && (
                    <Col xs lg="1">
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className="mr-3"
                        >
                            편집
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="mr-3"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    );
}

export default ProjectCard;
