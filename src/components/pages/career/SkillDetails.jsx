import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../layouts/dashborad/Main';
import ProtectedPage from './../../layouts/ProtectedPage';
import { Col, Row, Button, Tabs, Tab } from 'react-bootstrap';
import Define from './../../../utils/helpers/Define';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import SubSkillList from './subskill/SubSkillList';
import Helper from './../../../utils/helpers/Helper';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';

export default function SkillDetails() {
    const { id, title } = useParams()

    const [completed, setCompleted] = useState([])
    const [select, setSelect] = useState(Define.TYPE_SKILL_BEGINNER)

    const { sub_skill_list } = useContext(StateContext)
    const { sub_skill_listDispatch } = useContext(DispatchContext)
    // useEffect(() => {
    //     //load student completed sub skill for a skill
    //     //career/student_id/skill_id->get array of sub skill ids

    // }, completed)

    //load skill details+all subskills
    useEffect(() => {
        const listAction = new ListAction(sub_skill_listDispatch)
        const token = listAction.getSource()
        try {

            const load = async () => {
                try {
                    //load completed
                    const c_res = await AxiosHelper.getData(`career/get-one/student_skill_list/skill_id/${id}`, token)
                    if (c_res.success) {
                        let old = JSON.parse(c_res.object.sub_skill_ids)
                        setCompleted(old)
                    }
                    //http://localhost:2727/career/get-all/:table/:field/:value
                    await listAction.getAll(`career/get-all/sub_skill/skill_id/${id}`)
                } catch (e) {
                    console.log(e);
                }
            }
            // setSelect(Define.TYPE_SKILL_BEGINNER)
            load()
        } catch (e) {
            console.log(e)
        }

        //clean up
        return () => {
            token.cancel()
        }

    }, [id, sub_skill_list.length])


    return (
        <ProtectedPage>
            <Main title={`${Helper.getTitleFromSlug(title)} - Completed: ${Helper.getPercentage(completed.length, sub_skill_list.length)}%`}>
                {/* <Row >
                    <Col className="d-flex justify-content-center mb-3">
                        <AlertLoading loadColor={Define.BT_DANGER} />
                    </Col>
                </Row> */}

                <Row>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={select}
                        onSelect={(k) => setSelect(k)}
                        className="mb-3 w-100">
                        <Tab eventKey={Define.TYPE_SKILL_BEGINNER} title="Beginner">
                            <Row>
                                <SubSkillList sub_skill_list={sub_skill_list} select={select} completed={completed} />
                            </Row>
                        </Tab>
                        <Tab eventKey={Define.TYPE_SKILL_INTERMIDIATE} title="Intermidiate">
                            <Row>
                                <SubSkillList sub_skill_list={sub_skill_list} select={select} completed={completed} />
                            </Row>
                        </Tab>
                        <Tab eventKey={Define.TYPE_SKILL_ADVANCED} title="Advanced">
                            <Row>
                                <SubSkillList sub_skill_list={sub_skill_list} select={select} completed={completed} />
                            </Row>
                        </Tab>
                    </Tabs>
                </Row>


            </Main>
        </ProtectedPage>
    )
}
