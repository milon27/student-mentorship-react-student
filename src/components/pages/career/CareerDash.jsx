import React from 'react'
import URL from './../../../utils/helpers/URL';
import { Link } from 'react-router-dom';
import careerImg from "../../../assets/img/career.png";

export default function CareerDash() {
    return (
        <div className="media d-flex justify-content-between">
            <div className=" ">
                <img src={careerImg} alt="" className="icon_width" />
            </div>
            <div className="media-body ml-4">
                Identify Your Career Options. Develop a refined career by examining your interests, skills, and values through self-assessment.
                <br />
                <Link to={URL.SKILL_LIST}>Start Now</Link>
            </div>
        </div>
    )
}
