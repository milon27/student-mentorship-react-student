import React from 'react'
import { Card } from 'react-bootstrap';

export default function DashCard({ title, children }) {
    return (
        <Card className="shadow1">
            <Card.Header className="shadow__header">{title}</Card.Header>
            <Card.Body className="shadow1 shadow__task m-2">
                {children}
            </Card.Body>
        </Card>
    )
}
