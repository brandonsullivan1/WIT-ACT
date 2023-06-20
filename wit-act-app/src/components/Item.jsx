import React from "react";
import { Card, Button } from "react-bootstrap";

export const Item = () => {
    return (
        <Card style={{ minWidth: '18rem', margin: '20px'}}>
            <Card.Body>
                <Card.Title>Example Card</Card.Title>
                <Card.Text>This is an Example Card</Card.Text>
                <Button variant="primary">Example Button</Button>
            </Card.Body>
        </Card>
    )
}

export default Item;