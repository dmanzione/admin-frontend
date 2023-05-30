import { CardGroup, Card, Container } from "react-bootstrap";

export default function HomePage (){

    return(
        <Container fluid>
        <div className=" text-center">
           <p className="d3">Home Page</p>
        </div>
        <div className="container">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Header>Summary of Accounts</Card.Header>
            <Card.Body>
              <p></p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Header>Summary of Transactions</Card.Header>
            <Card.Body>
                <p></p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://react-bootstrap.github.io/thumbnail.png" />
            <Card.Header>Profile Actions</Card.Header>
            <Card.Body>
                <p></p>
            </Card.Body>
          </Card>
        </CardGroup>
        
      </div>
      </Container>
    )
}