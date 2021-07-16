import React from 'react'
import { Form } from 'react-bootstrap';

export default function Input({ title, value, id, name, onChange, disable = false, type = "text", ...args }) {
    if (type === "textarea") {
        return (
            <Form.Group {...args}>
                <Form.Label htmlFor={id}>{title}</Form.Label>
                <Form.Control id={id} name={name} as="textarea" placeholder={title} value={value} disabled={disable} rows={3} onChange={onChange} required={true} />
            </Form.Group>
        )
    }
    else if (type === "radio") {
        return (
            <Form.Group {...args}>
                <Form.Control style={{ width: "15px", marginRight: "8px" }} id={id} name={name} type={type} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} />
                <Form.Label className="mb-0" htmlFor={id}>{title}</Form.Label>
            </Form.Group>
        )
    }
    return (
        <>
            <Form.Group {...args}>
                <Form.Label htmlFor={id}>{title}</Form.Label>
                <Form.Control id={id} name={name} type={type} placeholder={title} value={value} disabled={disable} onChange={onChange} required={true} />
            </Form.Group>
        </>
    )
}
