import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from '../../api';

function CertificateCard({ certificate, isEditable, setIsEditing, setCertificates }) {
 
  const handleDelete = async (e) => {

    e.preventDefault();
    e.stopPropagation();

    const user_id = certificate.user_id;
    try {
      if (window.confirm("삭제 하시겠습니까?")) {
        await Api.delete(`certificates/${certificate.id}`);
        const res = await Api.get("certificatelist", user_id);
        setCertificates(res.data);
      }
    } catch (err) {
      alert("삭제 오류", err);
    }

  };


  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.title}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date}</span>
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

export default CertificateCard;
