import React from 'react';
import { Container, Row, Col, Image, Card, Figure } from 'react-bootstrap';
import { getCreditCardDashboardItems } from '../../types/CreditCardType';





const CardsDashboard: React.FC = ()=>{
  const creditCardDashboardItems = getCreditCardDashboardItems();

  return (
    <Container>
        <Row>
        <div className="d-flex justify-content-between flex-wrap">
            {creditCardDashboardItems.map((item, index) => (
               <Card key={index} style={{ width: '18rem', border:'none' }}>
                <Card.Body>
                <Figure>
                <a href={item.linkUrl}><Figure.Image src={item.imageUrl} /></a>
                
                    
                    <Figure.Caption className="text-md-center text-muted">{item.description}</Figure.Caption>
                    </Figure>
                </Card.Body>
                  
                </Card>
            ))}
            </div>
        </Row>
    </Container>
  );
};

export default CardsDashboard;