import React, { useEffect, useState  } from 'react'
import style from './Template.module.css'
import Template1 from '../../public/img1.png'
import Template2 from '../../public/im2.jpg'
import Resume1 from '../Resume1'
import Resume2 from '../Resume2'
import axios from 'axios'
import Suggestion from '../Suggestion/Suggestion'
function Template({preview , uploadedImageUrl , resumeInformation , ref}) {
    const [activeIndex, setActiveIndex] = useState(1);
    const [technologies, settechnologies] = useState([]);
    const [projects, setprojects] = useState([])
    function handle(index) {
        setActiveIndex(index);
    }
   
    useEffect(() => {
        const getProjectsByTechnologies = async () => {
            try {
              const response = await axios.post('http://localhost:5000/api/projects', {
                technologies: technologies
              });
              setprojects(response.data)
            } catch (error) {
              console.error('Error fetching projects:', error.response ? error.response.data : error.message);
            }
          };
      
          getProjectsByTechnologies();
      }, [technologies]);
    return (
        <>
        <div className={style.container}>
            <p className={style.heading}>Templates</p>
            <div className={style.img}>
                <img 
                    src={Template1} 
                    className={`${style.image} ${activeIndex === 0 ? style.active : ''}`} 
                    onClick={() => handle(0)} 
                    alt='resume'
                />
                <img 
                    src={Template2} 
                    className={`${style.image} ${activeIndex === 1 ? style.active : ''}`} 
                    onClick={() => handle(1)} 
                    alt="temp2"
                />
            </div>
        </div>
        {(activeIndex===0)&&
        <Resume1 resumeInformation={resumeInformation} arr={technologies} setarr={settechnologies} preview={preview} uploadedImageUrl={uploadedImageUrl}  />
        }
         {(activeIndex===1)&&
        <Resume2 resumeInformation={resumeInformation} preview={preview} arr={technologies} setarr={settechnologies}  uploadedImageUrl={uploadedImageUrl}/>
        }
        
        <Suggestion projects={projects}/>
        </>

    )
}

export default Template
