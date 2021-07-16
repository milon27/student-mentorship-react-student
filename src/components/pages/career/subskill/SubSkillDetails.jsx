import React from 'react'
import { useParams } from 'react-router-dom';
import ProtectedPage from './../../../layouts/ProtectedPage';
import Main from './../../../layouts/dashborad/Main';
import { useEffect } from 'react';
import { useState } from 'react';
import AxiosHelper from './../../../../utils/helpers/AxiosHelper';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Input from './../../../layouts/form/Input';
import CUser from './../../../../utils/helpers/CUser';
import Helper from './../../../../utils/helpers/Helper';

export default function SubSkillDetails() {
    const { id } = useParams()
    const [sub, setSub] = useState({})
    const [questions, setQuestions] = useState([])
    const [ans, setAns] = useState([])//{id:1,value:"",correct:boolean}
    const [showAns, setshowAns] = useState("d-none")
    const [scr, setScr] = useState(0)
    const [dis, setDis] = useState(false)
    //load some question
    useEffect(() => {
        let source = AxiosHelper.getSource()
        const load = async () => {
            try {

                //http://localhost:2727/career/get-one/sub_skill/id/1
                let subRes = await AxiosHelper.getData(`career/get-one/sub_skill/id/${id}`, source)
                if (subRes.success) {
                    setSub(subRes?.object)
                }
                //http://localhost:2727/career/random/:table/:field/:value/:limit
                let res = await AxiosHelper.getData(`career/random/question/sub_skill_id/${id}/10`, source)
                if (res.success) {
                    setQuestions(res?.object)
                }
            } catch (e) {
                console.log(e)
            }
        }
        load()

        return () => {
            source.cancel()
        }
    }, [])

    //
    const onChange = (e) => {
        let id = e.target.name
        let value = e.target.value
        //check correct or not
        let q = questions.find(item => item.id === parseInt(id))
        let ansT = document.getElementById(id)
        if (q.ans != value) {
            if (ansT.classList.contains("text-success")) {
                ansT.classList.remove("text-success")
            }
            ansT.classList.add("text-danger")
            setAns(addReplaceAns(ans, { id, value, correct: false }))
        } else {
            if (ansT.classList.contains("text-danger")) {
                ansT.classList.remove("text-danger")
            }
            ansT.classList.add("text-success")
            setAns(addReplaceAns(ans, { id, value, correct: true }))
        }

    }

    const addReplaceAns = (arr, obj) => {
        let c = [...arr]
        if (c.find(item => item.id == obj.id)) {
            c = c.map(ob => {
                if (ob.id == obj.id) {
                    return obj
                } else {
                    return ob
                }
            })
        } else {
            c = [...c, obj]
        }
        return c;
    }

    const submitAns = (e) => {
        if (ans.length === questions.length) {
            setDis(true)
            e.target.disabled = true
            setshowAns("")
            ckScore()
        } else {
            alert("Answer All The Questions.")
        }
    }

    const ckScore = async () => {
        let all = ans.filter(item => item.correct === true)
        let score = Helper.getPercentage(all.length, questions.length)
        setScr(score)
        try {

            if (score >= sub?.pass_mark) {
                //passed
                //load completed skills
                let c_res = await AxiosHelper.getData(`career/get-one/student_skill_list/skill_id/${sub.skill_id}`, AxiosHelper.getSource)
                let ids = []

                if (c_res.success) {
                    let old = JSON.parse(c_res.object.sub_skill_ids)
                    if (!old.includes(parseInt(id))) {
                        ids = [...old, parseInt(id)]
                    } else {
                        ids = [...old]
                    }
                    //do update
                } else {
                    ids.push(parseInt(id))
                    //do add
                }

                let newobj = {
                    skill_id: sub.skill_id,
                    stu_id: CUser.getCurrentuser()?.student_id,
                    sub_skill_ids: JSON.stringify(ids)
                }

                if (c_res.success) {
                    console.log("updating..")
                    //do update
                    // http://localhost:2727/career/update/student_skill_list/skill_id/1
                    await AxiosHelper.updateData(`career/update/student_skill_list/skill_id/${sub.skill_id}`, newobj)
                } else {
                    //do add
                    console.log("adding..")
                    //added into database
                    //http://localhost:2727/career/create/student_skill_list
                    await AxiosHelper.addData(`career/create/student_skill_list`, newobj)
                }
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ProtectedPage>

            <Main title={`${sub?.title} Test-Pass Mark:${sub?.pass_mark}%`}>
                {questions?.map((item, indx) => {
                    return (<Row key={item.id}>
                        <Col className="mb-2">
                            <b>{indx + 1}. {item.title}</b>

                            <Input disable={dis} onChange={onChange} className="mb-0 d-flex align-items-center" type="radio" id={item.id + "_1"} name={item.id} title={item.op_1} value={item.op_1} />
                            <Input disable={dis} onChange={onChange} className="mb-0 d-flex align-items-center" type="radio" id={item.id + "_2"} name={item.id} title={item.op_2} value={item.op_2} />
                            <Input disable={dis} onChange={onChange} className="mb-0 d-flex align-items-center" type="radio" id={item.id + "_3"} name={item.id} title={item.op_3} value={item.op_3} />
                            <Input disable={dis} onChange={onChange} className="mb-0 d-flex align-items-center" type="radio" id={item.id + "_4"} name={item.id} title={item.op_4} value={item.op_4} />
                            <div className={`${showAns}`}>
                                <b id={item.id} >Correct Ans: {item.ans}</b>
                            </div>
                        </Col>
                    </Row>)
                })}
                <Row>
                    <Col>
                        {questions.length > 0 ? <Button className="mb-2" onClick={submitAns}>Submit</Button> : 'No Question Found'}
                        <p className={`${showAns}`}>Your Scrore: {scr}% , you {(scr < sub?.pass_mark ? "Failed" : "Passed")}</p>
                    </Col>
                </Row>
            </Main>
        </ProtectedPage>
    )
}
