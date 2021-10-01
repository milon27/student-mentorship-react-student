import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import URL from './../../../utils/helpers/URL';
import Helper from './../../../utils/helpers/Helper';

export default function SkillItem({ skill }) {
    return (
        <Col md={4} className="mb-3">
            {console.log(skill)}
            <Card border="primary">
                <Card.Header className=" p-1">
                    <iframe
                        className="rounded w-100 h-100 br-2"
                        src={skill?.intro_url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-primary"> {skill?.title} </Card.Title>
                    <Link to={`${URL.SKILL_LIST}/${Helper.getSlug(skill?.title)}/${skill?.id}`}>Read More</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}
