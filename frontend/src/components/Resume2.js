import React, { useEffect, useState ,useRef } from 'react'
import style from './Resume2.module.css'
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
function Resume2({preview , uploadedImageUrl , resumeInformation , arr, setarr }) {

  useEffect(() => {
    setarr(resumeInformation.Skills.detail.split(','))
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
        const imgHeight = 297;

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
       <div className={style.upper}>
        {resumeInformation.Image.detail ?<img src={preview} className={style.img}/>:<div className={style.divImg}></div>}
        <div className={style.name}>
          <h1>{resumeInformation.Basic_Info.detail.name !="" ? (resumeInformation.Basic_Info.detail.name):<span>Anmol Walia</span> }</h1>
          <h2>{resumeInformation.Basic_Info.detail.title}</h2>
        </div>
        <div className={style.profile}>
          <h4>{(resumeInformation.Profile.detail !="") && resumeInformation.Profile.sectionTitle}</h4>
          <p>{resumeInformation.Profile.detail && resumeInformation.Profile.detail}</p></div>
       </div>
       <div className={style.down}>
        <div className={style.leftSide}>
          {(resumeInformation.Basic_Info.detail.phone || resumeInformation.Basic_Info.detail.email || resumeInformation.Basic_Info.detail.github || resumeInformation.Basic_Info.detail.linkedin ) &&<div className={style.contact}>
            <h1>Contact</h1>
            {resumeInformation.Basic_Info.detail.phone && <div className={style.inner}>
            <FaPhoneAlt  />
            {resumeInformation.Basic_Info.detail.phone ? <p>{resumeInformation.Basic_Info.detail.phone}</p> :<p>98XXXXXXXX</p>}

          </div>}
          {resumeInformation.Basic_Info.detail.email&&<div className={style.inner}>
            <MdEmail/>
            {resumeInformation.Basic_Info.detail.email ? <p>{resumeInformation.Basic_Info.detail.email}</p> :<p>xxx@gamil.com</p>}
          </div>}
          {resumeInformation.Basic_Info.detail.github&&<div className={style.inner}>
          <FaGithub />
          {resumeInformation.Basic_Info.detail.github ? <p>{resumeInformation.Basic_Info.detail.github}</p> :<p>XXXXXXXXX</p>}
        </div>}
        {resumeInformation.Basic_Info.detail.linkedin&&<div className={style.inner}>
          <CiLinkedin/>
          {resumeInformation.Basic_Info.detail.linkedin ? <p>{resumeInformation.Basic_Info.detail.linkedin}</p> :<p>XXXXXXXXX</p>}
        </div>}
            </div>}
          {resumeInformation.Skills.sectionTitle && resumeInformation.Skills.detail && <div className={style.skill}>
          <h1>{resumeInformation.Skills.sectionTitle}</h1>
          <div className={style.contain}>
          <div className={style.arr}>{arr.length >0 && arr.map((s,index)=>{
            return ((index)<6 && <li className={style.li} key={index}>{s}</li>)
          })}</div>
          <div className={style.arr}>{arr.length >0 && arr.map((s,index)=>{
            return (((index)>=6 && (index)<12) && <li className={style.li} key={index}>{s}</li>)
          })}</div>
          
          </div>
            </div>}
          {resumeInformation.Education.sectionTitle  &&
          (resumeInformation.Education.details).length >0 &&<div className={style.education}>
            <h1>{resumeInformation.Education.sectionTitle}</h1>
            {resumeInformation.Education.details.map((e,index)=>{
              return(
            <div className={style.education1}>
            <div className={style.nameofschool}>
            <h5>{e.title ? e.title :<span>Name of the course</span>}</h5>
              <h4>{e.college ? e.college :<span>Name of the college</span>}</h4>
            </div>  
            <h4>{e.endDate ? e.endDate : <span>Date</span>}</h4>
            </div>)
            })}
            </div>}

        </div>
        <div className={style.rightSide}>
        {resumeInformation.Work_Experience.sectionTitle && 
           (resumeInformation.Work_Experience.details).length >0 &&<div className={style.experience}>
            <h1>{resumeInformation.Work_Experience.sectionTitle && <>Experience</>}</h1>
            <div className={style.workcontent}>
            {(resumeInformation.Work_Experience.details).length > 0  && (resumeInformation.Work_Experience.details).map((w,index)=>{
              return(
                <div className={style.work1}>
                  <h3>{w.title}</h3>
                  <h4>{w.companyName}</h4>
                  {w.certificationLink&&<h4 ><span><AiFillSafetyCertificate/></span>{w.certificationLink}</h4>}
                  <h4>{w.location}</h4>
                  {(w.startDate && w.endDate ) &&<h4>{w.startDate} To {w.endDate}</h4>}
                  </div>
              )
            })}
          </div>
          </div>}
          {resumeInformation.Projects.sectionTitle && 
           (resumeInformation.Projects.details).length >0 &&<div className={style.project}>
            <h1>{resumeInformation.Projects.sectionTitle && <>Project</>}</h1>
            <div className={style.projectcontent}>
            {(resumeInformation.Projects.details).length > 0  && (resumeInformation.Projects.details).map((p,index)=>{
              return(
                <div className={style.project1}>
                  <h3>{p.title}</h3>
                  <p>{p.overview}</p>
                  {p.github&&<h4 ><span><FaGithub/></span>{p.github}</h4>}
                  {p.link&&<h4 ><span><GrDeploy/></span>{p.link}</h4>}
                  {(p.startDate && p.endDate ) &&<h4>{p.startDate} To {p.endDate}</h4>}
                  </div>
              )
            })}
          </div>
          </div>}
        
        <div className={style.line}></div>
        </div>
       </div>
       </div>
       </>
  )
}

export default Resume2