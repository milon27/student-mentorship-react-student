import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
export default function MTest() {

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3">
                <Tab eventKey="home" title="Home">
                    Milon
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    rahim
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    krim
                </Tab>
            </Tabs>
        </div>
    )
}
