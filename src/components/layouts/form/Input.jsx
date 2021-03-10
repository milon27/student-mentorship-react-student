import React from 'react'
import { Form } from 'react-bootstrap';

export default function Input({ title, value, name, onChange, disable = false, type = "text" }) {
    return (
        <>
            <Form.Group>
                <Form.Label>{title}</Form.Label>
                <Form.Control name={name} type={type} placeholder={title} value={value} disabled={disable} onChange={onChange} />
            </Form.Group>
        </>
    )
}
