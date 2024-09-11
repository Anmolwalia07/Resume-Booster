import React, { useState } from 'react'
import style from "./Textfield.module.css"
import InputControl from './Inputcontrol';
function Textfield(props) {
    const sections=props.section;
    const [active,changeactive]=useState(Object.keys(sections)[0]);
    const workExpBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Title"
              placeholder="Enter title eg. Frontend developer"
            />
            <InputControl
              label="Company Name"
              placeholder="Enter company name eg. amazon"
            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Certificate Link"
              placeholder="Enter certificate link"
            />
            <InputControl
              label="Location"
              placeholder="Enter location eg. Remote"

            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of work"
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of work"
            />
          </div>
    
          <div className={style.column}>
            <label>Enter work description</label>
            <InputControl
              placeholder="Line 1"
           
            />
            <InputControl
              placeholder="Line 2"
      
            />
            <InputControl
              placeholder="Line 3"
      
            />
          </div>
        </div>
      );
      const projectBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Title"
    
              placeholder="Enter title eg. Chat app"
            />
          </div>
          <InputControl
            label="Overview"
            placeholder="Enter basic overview of project"
           
          />
          <div className={style.row}>
            <InputControl
              label="Deployed Link"
              placeholder="Enter deployed link of project"
             
            />
            <InputControl
              label="Github Link"
              
              placeholder="Enter github link of project"
              
            />
          </div>
          <div className={style.column}>
            <label>Enter project description</label>
            <InputControl
              placeholder="Line 1"
            />
            <InputControl
              placeholder="Line 2"
            />
            <InputControl
              placeholder="Line 3"
            
            />
            <InputControl
              placeholder="Line 4"
              
            />
          </div>
        </div>
      );
      const educationBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Title"
              placeholder="Enter title eg. B-tech"
            />
          </div>
          <InputControl
            label="College/School Name"
            placeholder="Enter name of your college/school"
          />
          <div className={style.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of this education"
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of this education"
            />
          </div>
        </div>
      );
      const basicInfoBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Name"
              placeholder="Enter your full name eg. Anmol"
            />
            <InputControl
              label="Title"
              placeholder="Enter your title eg. Frontend developer"
            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Linkedin Link"
              placeholder="Enter your linkedin profile link"
            />
            <InputControl
              label="Github Link"
              placeholder="Enter your github profile link"
            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Email"
              placeholder="Enter your email"
            />
            <InputControl
              label="Enter phone"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      );
      const achievementsBody = (
        <div className={style.detail}>
          <div className={style.column}>
            <label>List your achievements</label>
            <InputControl
              placeholder="Line 1"
            />
            <InputControl
              placeholder="Line 2"
            />
            <InputControl
              placeholder="Line 3"
            />
            <InputControl
              placeholder="Line 4"
            />
          </div>
        </div>
      );
      const skills = (
        <div className={style.detail}>
          <InputControl
            label="Skills"
            placeholder="Enter your skills"
           
          />
        </div>
      );
      const hobbies = (
        <div className={style.detail}>
          <InputControl
            label="Hobbies"
            placeholder="Enter your hobbies"
          />
        </div>
      );
      const image=(
        <div className={style.image}>
            <InputControl 
            label="Image"
            type="file"
            accept="image/png,image/jpeg"
            />
        </div>
      );
    
      const generateBody = () => {
        switch (sections[active]) {
          case sections.basicInfo:
            return basicInfoBody;
          case sections.workExp:
            return workExpBody;
          case sections.project:
            return projectBody;
          case sections.education:
            return educationBody;
          case sections.achievement:
            return achievementsBody;
          case sections.skills:
            return skills;
          case sections.hobbies:
            return hobbies;
          case sections.image:
            return image;
          default:
            return null;
        }
      };
    return (
        <div className={style.container}>
            <div className={style.heading}>
                {Object.keys(sections).map((key)=>(
                    <div className={`${style.sections} ${active===key ? style.active:""}`
                    }
                     key={key} onClick={()=>changeactive(key)}>
                        {sections[key]}
                    </div>
                ))}
            </div>
            <div className={style.body}>
                {generateBody()}
            </div>
        </div>
    )
}

export default Textfield
