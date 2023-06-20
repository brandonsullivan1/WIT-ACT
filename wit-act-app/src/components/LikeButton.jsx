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
    return (
        <Navbar>
            <Container style={{ alignItems:"center", justifyContent:"left"}}>
            <Button onClick={toggleLike}>
                    {
                        liked === true ?  <AiIcons.AiFillLike onFormSwitch={toggleLike} /> : <AiIcons.AiOutlineLike onFormSwitch={toggleLike} />
                    }
            </Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"center"}}>
                <Button style={{backgroundColor: "#000", border: "1px solid #000"}}>Expand</Button>
            </Container>
            <Container style={{ alignItems:"center", justifyContent:"right"}}>
                <Button onClick={toggleDisliike}>
                    {
                        disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDisliike} /> : <AiIcons.AiOutlineDislike onFormSwitch={toggleDisliike} />
                    }
                </Button>
            </Container>
        </Navbar>
    )   
}

export default LikeButton;