import React from 'react'
import SkillItem from './SkillItem'

export default function SkillTable({ skill_list }) {
    return (
        <>
            {skill_list.map(skill => {
                return <SkillItem key={skill.id} skill={skill} />
            })}
        </>
    )
}
