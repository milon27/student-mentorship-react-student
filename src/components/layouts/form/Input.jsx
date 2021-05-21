import React from 'react'
import { Form } from 'react-bootstrap';

export default function Input({ title, value, name, onChange, disable = false, type = "text" }) {
    if (type === "textarea") {
        return (
            <Form.Group>
                <Form.Label>{title}</Form.Label>
                <Form.Control name={name} as="textarea" placeholder={title} value={value} disabled={disable} rows={3} onChange={onChange} required={true} />
            </Form.Group>
        )
    }
    return (
        <>
            <Form.Group>
                <Form.Label>{title}</Form.Label>
                <Form.Control name={name} type={type} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} />
            </Form.Group>
        </>
    )
}
