import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

export const BookmarkButton = () => {

    const [bookmark, setBookmark] = useState(false);

    const toggleBookmark = () => {
        setBookmark(!bookmark);
    }

    return (
        <Button onClick={toggleBookmark}>
            {
                bookmark === true ? <BsIcons.BsBookmarkFill onFormSwitch={toggleBookmark} /> : <BsIcons.BsBookmark onFormSwitch={toggleBookmark} />
            }
        </Button>
    )
}

export default BookmarkButton;