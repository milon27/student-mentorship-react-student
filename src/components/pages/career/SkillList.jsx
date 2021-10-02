import React, { useState, useEffect, useContext } from 'react'
import ProtectedPage from './../../layouts/ProtectedPage';
import Main from '../../layouts/dashborad/Main';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import ListAction from './../../../utils/context/actions/ListAction';
import Define from './../../../utils/helpers/Define';
import { Col, Row, Button } from 'react-bootstrap';
import SkillTable from './SkillTable';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';
import CUser from './../../../utils/helpers/CUser';
import Helper from './../../../utils/helpers/Helper';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getPDFobj from './../../../utils/helpers/getPDFobj';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function SkillList() {
    const [page, setPage] = useState(1)

    const { skill_list } = useContext(StateContext)
    const { skill_listDispatch } = useContext(DispatchContext)

    //pagination handle
    const prev = () => {
        if (page > 1) {
            setPage(page => page - 1)
        } else {
            alert("no prev")
        }
    }
    const next = () => {
        if (skill_list.length < Define.DEFAULT_PAGE_SIZE) {
            //next page not availble
            alert("no next")
        } else {
            setPage(page => page + 1)
        }
    }

    const generateReport = async () => {
        //list of skills you have gain.
        let uid = CUser.getCurrentuser()?.student_id
        let res = await AxiosHelper.getData(`career/student/${uid}`, AxiosHelper.getSource())
        if (res.success) {
            console.log(res)
            makePdf(res.object)
        } else {
            alert(res.desc + " please give some test to generate report!")
            console.log(res)
        }
    }
    const makePdf = (arr) => {
        /**
         * [{
            "student_id": "17303024",
            "name": "Milon27",
            "email": "jokermr143@gmail.com",
            "skill_id": 2,
            "title": "Web dev",
            "sub_skill_ids": "[2]",
            "total_sub_skill": 3
        }]
         */

        arr = arr.map(item => {
            let ids = JSON.parse(item?.sub_skill_ids)
            return `${item.title} - Completed ${Helper.getPercentage(ids.length, item.total_sub_skill)}%`
        })
        console.log(arr)

        let name = CUser.getCurrentuser()?.name
        let id = CUser.getCurrentuser()?.student_id
        let email = CUser.getCurrentuser()?.email

        pdfMake.createPdf(getPDFobj(name, id, email, arr)).download();
    }


    //load data
    useEffect(() => {

        const listAction = new ListAction(skill_listDispatch)
        const token = listAction.getSource()
        try {
            const load = async () => {
                try {
                    //career/get-paginate/:table/:page
                    await listAction.getAll(`career/get-paginate/skill/${page}`)
                } catch (e) {
                    console.log(e);
                }
            }
            load()
        } catch (e) {
            console.log(e)
        }

        //clean up
        return () => {
            token.cancel()
        }

    }, [skill_list.length])

    return (
        <ProtectedPage>
            <Main title="Skills">
                <Row >
                    <Col className="d-flex justify-content-start mb-3">
                        <Button className="mr-2" onClick={prev}>Prev</Button>
                        <Button className="mr-2" disabled>{page}</Button>
                        <Button className="mr-2" onClick={next}>Next</Button>
                    </Col>
                    <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={generateReport}>Generate Report</Button>
                    </Col>
                </Row>
                <Row>
                    {skill_list.length < 1 ? <>
                        <Col><h3>No Skill Found!</h3></Col>
                    </> : <>
                        <SkillTable skill_list={skill_list} />
                    </>}
                </Row>
            </Main>
        </ProtectedPage>
    )
}
