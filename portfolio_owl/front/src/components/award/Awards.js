import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import AwardAddForm from './AwardAddForm';
import Award from './Award';
import * as Api from '../../api';

function Awards({ portfolioOwnerId, isEditable }) {

  const [awards, setAwards] = useState([]);
	
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {

    Api.get(`awardlist`, portfolioOwnerId).then((res) =>
      setAwards(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상내역</Card.Title>
        {awards.map((award) => (
    			<Award
						key={award.id}
						award={award}
						setAwards={setAwards}
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
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;