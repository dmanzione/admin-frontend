import { Alert, Container } from "react-bootstrap";
import InfiniteQueue from "../../types/Queue";
import { useState } from "react";


export default function Message(){
    let styles:InfiniteQueue = new InfiniteQueue(["primary", "secondary","success","danger","warning","info","light","dark"]);
    const [message, setMessage] = useState("");
    const [side, setSide] = useState("left" || "right");

    const changeDirection = () => {
        if(side === "left"){
            setSide("right");
        }else{
            setSide("left");
        }
    }
   

    return (
        <Container fluid>
          {/*  */}
            
            
            
        </Container>
    )
}