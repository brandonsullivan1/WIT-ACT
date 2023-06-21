import React, { useState } from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";

export const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    }

    const [disliked, setDisliked] = useState(false);

    const toggleDisliike = () => {
        setDisliked(!disliked);
    }

    const animateCard = () => {
        // document.getElementById("card").style.transform = "skewY(20deg)";
        // document.getElementById("card").style.transform = "scaleY(1.5)";
    }

    return (
        <Navbar>
            <Container style={{ alignItems:"center", justifyContent:"left" }}>
            <Button onClick={toggleLike} style={{ fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        liked === true ?  <AiIcons.AiFillLike onFormSwitch={toggleLike} /> : <AiIcons.AiOutlineLike onFormSwitch={toggleLike} />
                    }
            </Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                <Button style={{backgroundColor: "#000", border: "1px solid #000"}} onClick={animateCard}>Expand</Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                <Button onClick={toggleDisliike} style={{ fontSize: "1.5rem", color: "black", background: "none", border: "none"}}>
                    {
                        disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDisliike} /> : <AiIcons.AiOutlineDislike onFormSwitch={toggleDisliike} />
                    }
                </Button>
            </Container>
        </Navbar>
    )   
}

export default LikeButton;