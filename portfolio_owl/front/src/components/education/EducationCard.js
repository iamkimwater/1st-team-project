import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api';


function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
    const handleDelete = async (e) => {

        e.preventDefault();
        e.stopPropagation();

        const user_id = education.user_id;
        try {
            if (window.confirm("삭제 하시겠습니까?")) {
                await Api.delete(`educations/${education.id}`);
                const res = await Api.get("educationlist", user_id);
                setEducations(res.data);
            }
        } catch (err) {
            alert("삭제 오류", err);
        }

    };

    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    {education.title}
                    <br />
                    <span className="text-muted">{education.description} ({education.position})</span>
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

export default EducationCard;