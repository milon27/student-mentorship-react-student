import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import TicketSummary from './TicketSummary';
import DashCard from './DashCard';
import CareerDash from './../career/CareerDash';


export default function Home() {
    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <TicketSummary />
                <Row className="mt-2">
                    <Col>
                        <DashCard title="Career Plan" ><CareerDash /></DashCard>
                    </Col>
                    {/* <Col>
                         <DashCard title="Coming Soon" /> 
                    </Col>
                    <Col>
                        <DashCard title="Coming Soon" />
                    </Col> */}
                </Row>
            </Main>
        </ProtectedPage >
    )
}
