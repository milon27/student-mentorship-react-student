import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import MyTable from '../../../layouts/MyTable'
import URL from '../../../../utils/helpers/URL';
import { Link } from 'react-router-dom';
import SubSkillView from './SubSkillView';

/**
 * 
 * @param {select: [beginnner,intermidiate,adavanced]} param0 
 * @returns 
 */
export default function SubSkillList({ sub_skill_list, select, completed = [] }) {

    const harr = [
        {
            key: "id",//db field name,key of arry
            value: "#ID"
        },
        {
            key: "title",
            value: "Title"
        },
        {
            key: "type",
            value: "Type"
        },
        {
            key: "pass_mark",
            value: "Pass Mark"
        },
        {
            key: "task",
            value: "Task"
        },
        {
            key: "option",
            value: "Option"
        }
    ]

    const [show, setShow] = useState(false)
    const [viewItem, setViewItem] = useState({})


    return (
        <>

            <SubSkillView show={show} setShow={setShow} viewItem={viewItem} />

            {sub_skill_list.filter(item => item.type === select).length < 1 ? <>
                <Col><p>No {select} Sub Skill Found! </p></Col>
            </> : <Col>
                <MyTable
                    className="w-100"
                    headArr={harr}
                    listArr={sub_skill_list.filter(item => item.type === select).map(n => {
                        n.option = () => {
                            const url = `${URL.SUB_SKILL}/${n.id}`
                            return (
                                <>
                                    <button className="btn btn-outline-dark mr-1"
                                        onClick={() => {
                                            setViewItem(n)
                                            setShow(true)
                                        }}
                                    >view</button>
                                    {completed.includes(n.id) ? <Link to={url} >Re-Test</Link> : <Link to={url} > Test</Link>}
                                </>

                            )
                        }
                        return n;
                    }
                    )}
                />
            </Col>}

        </>

    )
}
