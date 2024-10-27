import React,{ useState , useEffect } from 'react'
import styles from "./Body.module.css"
import Textfield from '../Textfield.js';
import Template from '../template/Template.js';
function Body() {
    const sections = {
        basicInfo: "Basic_Info",
        workExp: "Work_Experience",
        project: "Projects",
        education: "Education",
        achievement: "Achievements",
        skills: "Skills",
        profile: "Profile",
        image:"Image",
      }
    const [preview, setPreview] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [resumeInformation, setResumeInformation] = useState({
        [sections.basicInfo]: {
          id: sections.basicInfo,
          sectionTitle: sections.basicInfo,
          detail: {},
        },
        [sections.workExp]: {
          id: sections.workExp,
          sectionTitle: sections.workExp,
          details: [],
        },
        [sections.project]: {
          id: sections.project,
          sectionTitle: sections.project,
          details: [],
        },
        [sections.education]: {
          id: sections.education,
          sectionTitle: sections.education,
          details: [],
        },
        [sections.achievement]: {
          id: sections.achievement,
          sectionTitle: sections.achievement,
          points: [],
        },
        [sections.skills]: {
          id: sections.skills,
          sectionTitle: sections.skills,
          detail:""
        },
        [sections.profile]: {
            id: sections.profile,
            sectionTitle: sections.profile,
            detail: "",
          },
        [sections.image]:{
          id: sections.image,
            sectionTitle: sections.image,
            detail: "",
        }
      });
      useEffect(() => {
        console.log(resumeInformation)
      }, [resumeInformation])

      
    return (
        <div className={styles.container}>
            <div className={styles.tools}>
            <p className={styles.heading}>Resume Booster</p>
            </div>
            <div className={styles.main}>
                <Textfield section={sections} information={resumeInformation} setInformation={setResumeInformation} preview={setPreview} setUpload={setUploadedImageUrl}/>
            </div>
            <div className={styles.Template}>
                <Template  preview={preview} uploadedImageUrl={uploadedImageUrl} resumeInformation={resumeInformation} />
            </div>
        </div>
    )
}

export default Body;
