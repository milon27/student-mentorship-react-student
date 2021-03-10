import React from 'react'
import { Container } from 'react-bootstrap'

export default function Body({ children }) {
    return (
        <Container className="mb-5">
            {children}
        </Container>
    )
}
