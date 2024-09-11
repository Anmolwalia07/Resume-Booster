import React from 'react'
import styles from "./Body.module.css"
import { ArrowDown } from 'react-feather';
import Textfield from './Textfield.js';
import Template from './template/Template.js';
function Body() {
    const sections = {
        basicInfo: "Basic Info",
        workExp: "Work Experience",
        project: "Projects",
        education: "Education",
        achievement: "Achievements",
        skills: "Skills",
        hobbies: "Hobbies",
        image:"Image",
      }
    return (
        <div className={styles.container}>
            <div className={styles.tools}>
            <p className={styles.heading}>Resume Booster</p>
            <button>Download<ArrowDown/></button>
            </div>
            <div className={styles.main}>
                <Textfield section={sections}/>
            </div>
            <div className={styles.Template}>
                <Template/>
            </div>
        </div>
    )
}

export default Body
