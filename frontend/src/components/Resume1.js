import React, { useEffect, useState ,useRef } from 'react'
import style from './Resume1.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { IoMdSchool } from "react-icons/io";
import { GrDeploy } from "react-icons/gr";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GrUserExpert , GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowDown } from 'react-feather';
const Resume1 =({preview , uploadedImageUrl , resumeInformation ,arr,setarr}) =>{
  useEffect(() => {
    setarr(resumeInformation.Skills.detail.split(','))
    console.log(arr)
    console.log(resumeInformation)
    console.log(resumeInformation.Education)
  }, [resumeInformation])

  const divRef = useRef(); // Create a ref for the div

  const generatePDF = () => {
    const input = divRef.current; // Access the current value of the ref
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Calculate PDF dimensions based on canvas size
        const imgWidth = 210; // PDF width (mm)
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight =297;
        let heightLeft = imgHeight;

        let position = 0;

        // Add image to PDF and handle page breaks
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('resume.pdf');
      });
  };
  return (
    <>
     <button className={style.button} onClick={generatePDF}>Download<ArrowDown/></button>
    <div ref={divRef} className={style.container}>
        <div className={style.left}>
        {resumeInformation.Image.detail &&<img className={style.img} src={preview } />}
        { (resumeInformation.Basic_Info.detail.phone || resumeInformation.Basic_Info.detail.email)&&<div className={style.contact}>
          <h3>CONTACT</h3>
          {resumeInformation.Basic_Info.detail.phone && <div className={style.inner}>
            <FaPhoneAlt />
            {resumeInformation.Basic_Info.detail.phone ? <p>{resumeInformation.Basic_Info.detail.phone}</p> :<p>98XXXXXXXX</p>}

          </div>}
          {resumeInformation.Basic_Info.detail.email&&<div className={style.inner}>
            <MdEmail/>
            {resumeInformation.Basic_Info.detail.email ? <p>{resumeInformation.Basic_Info.detail.email}</p> :<p>xxx@gamil.com</p>}
          </div>}
        </div>}
        {(resumeInformation.Basic_Info.detail.github || resumeInformation.Basic_Info.detail.linkedin) &&
        <div className={style.bottom}>
        <h3>Explore More...</h3>
        {resumeInformation.Basic_Info.detail.github&&<div className={style.inner}>
          <FaGithub />
          {resumeInformation.Basic_Info.detail.github ? <p>{resumeInformation.Basic_Info.detail.github}</p> :<p>XXXXXXXXX</p>}
        </div>}
        {resumeInformation.Basic_Info.detail.linkedin&&<div className={style.inner}>
          <CiLinkedin/>
          {resumeInformation.Basic_Info.detail.linkedin ? <p>{resumeInformation.Basic_Info.detail.linkedin}</p> :<p>XXXXXXXXX</p>}
        </div>}
      </div>}
        </div>
        <div className={style.right}>
          {/* profile */}
          {resumeInformation.Basic_Info.sectionTitle && 
          (resumeInformation.Basic_Info.detail).name !="" &&
          <div className={style.profile}>
          {resumeInformation.Basic_Info.detail ? <><h1 className={style.name}>{resumeInformation.Basic_Info.detail.name!=="" ? resumeInformation.Basic_Info.detail.name :<span>Name</span>} </h1> <h2 className={style.title}>{resumeInformation.Basic_Info.detail.title!=="" ? resumeInformation.Basic_Info.detail.title : <span>Title</span>}</h2></>:<span></span>}
        </div>         
         } 
          
          {/* Education */}
         {resumeInformation.Education.sectionTitle  &&
          (resumeInformation.Education.details).length >0 &&
          <div className={style.education}>
          <div className={style.heading}>
          <div className={style.circle}><IoMdSchool fontSize={50}/></div>
          <h3>{resumeInformation.Education.sectionTitle}</h3>
          </div>
          <div className={style.content}>
            {resumeInformation.Education.details.map((e,index)=>{
              return(
              <div className={style.college}>
            <div className={style.dot}></div>
            <h4>{e.endDate ? e.endDate : <span>Date</span>}</h4>
            <div className={style.collegeName}><h4>{e.college ? e.college :<span>Name of the college</span>}</h4>
            <h5>{e.title ? e.title :<span>title</span>}</h5></div>  
            </div>)
            })}
            
          </div>
        </div>
         }
          
          {/* project */}
          {resumeInformation.Projects.sectionTitle && 
            (resumeInformation.Projects.details).length >0 &&
            <div className={style.project}>
             <div className={style.heading}>
          <div className={style.circle}><GrProjects fontSize={30}/></div>
          <h3>{resumeInformation.Projects.sectionTitle}</h3>
          </div>
          <div className={style.data}>
            {(resumeInformation.Projects.details).length >0 && resumeInformation.Projects.details.map((s,index)=>{
              return(
                <div className={style.project1}>
                  <h3>{s.title}</h3>
                  <p>
                    {s.overview}
                  </p>
                  <div className={style.github}>
                  {s.github && <div className={style.link}><FaGithub/>{s.github}</div>}
                  {s.link && <div className={style.link}><GrDeploy />{s.link}</div>}
                  </div>
                  <div>
                    {s.points && 
                    ((s.points).length >0 && (s.points).map((a,index)=>{
                      return(<li key={index}>{a}</li>)
                    }))
                    }
                  </div>
                </div>
              )
            })}
          </div>

          </div>
          }

          {/* workexp */}

          {resumeInformation.Work_Experience.sectionTitle && 
           ((resumeInformation.Work_Experience.details).length >0 &&
            <div className={style.work}>
              <div className={style.heading}>
          <div className={style.circle}><GrUserExpert fontSize={30}/></div>
          <h3>{resumeInformation.Work_Experience.sectionTitle}</h3>
          </div>
          <div className={style.workcontent}>
            {(resumeInformation.Work_Experience.details).length > 0  && (resumeInformation.Work_Experience.details).map((w,index)=>{
              return(
                <div className={style.work1}>
                  <h3>{w.title}</h3>
                  <h4>{w.companyName}</h4>
                  {resumeInformation.Work_Experience.details.certificationLink&&<h4 ><span><AiFillSafetyCertificate/></span>{w.certificationLink}</h4>}
                  <h4>{w.location}</h4>
                  <h4>From :- {w.startDate}  To:-{w.endDate}</h4>
                  </div>
              )
            })}
          </div>
            </div>)
            }

          {/* Achievements */}
          {resumeInformation.Achievements.sectionTitle && 
          (resumeInformation.Achievements.points).length >0 &&
          <div className={style.achievements}>
          <div className={style.heading}>
          <div className={style.circle}><IoMdSchool fontSize={50}/></div>
          <h3>{resumeInformation.Achievements.sectionTitle}</h3>
          </div>
          <div className={style.outer}>
          <div className={style.arr}>{(resumeInformation.Achievements.points).length >0 && (resumeInformation.Achievements.points).map((s,index)=>{
            return (<li className={style.li} key={index}>{s}</li>)
          })}</div>
          </div>
          </div>
          }

          
          {/* Skills */}
          {resumeInformation.Skills.sectionTitle &&
          (resumeInformation.Skills.detail)!="" &&
          <div className={style.skills}>
            <div className={style.heading}>
          <div className={style.circle}><GiSkills fontSize={30}/></div>
          <h3>{resumeInformation.Skills.sectionTitle}</h3>
          </div>
          <div className={style.contain}>
          <div className={style.arr}>{arr.length >0 && arr.map((s,index)=>{
            return ((index)<4 && <li className={style.li} key={index}>{s}</li>)
          })}</div>
          <div className={style.arr}>{arr.length >0 && arr.map((s,index)=>{
            return (((index)>=4 && (index)<8) && <li className={style.li} key={index}>{s}</li>)
          })}</div>
          <div className={style.arr}>{arr.length >0 && arr.map((s,index)=>{
            return ((index)>8 && <li className={style.li} key={index}>{s}</li>)
          })}</div>
          </div>


          </div>
          }




        </div>
    </div>
    </>
  )
}

export default Resume1;