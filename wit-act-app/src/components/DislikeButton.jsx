import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";

export const DislikeButton = () => {

    const [disliked, setDisliked] = useState(false);

    const toggleDisliike = () => {
        setDisliked(!disliked);
    }

    return (
        <Button onClick={toggleDisliike}>
            {
                disliked === true ? <AiIcons.AiFillDislike onFormSwitch={toggleDisliike} /> : <AiIcons.AiOutlineDislike onFormSwitch={toggleDisliike} />
            }
        </Button>
    )
}

export default DislikeButton;