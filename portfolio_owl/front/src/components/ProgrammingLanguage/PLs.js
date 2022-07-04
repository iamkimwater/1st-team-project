import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import PL from "./PL";
import PLAddForm from "./PLAddForm";

function PLs({ portfolioOwnerId, isEditable }) {
  
  const [pls, setPLs] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {

    Api.get("pllist", portfolioOwnerId).then((res) =>
      setPLs(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로그래밍 언어</Card.Title>
        {pls.map((pl) => (
          <PL
            key={pl.id}
            pl={pl}
            setPLs={setPLs}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <PLAddForm
            portfolioOwnerId={portfolioOwnerId}
            setPLs={setPLs}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default PLs;
