import React, { useEffect, useState } from 'react'
import style from "./Textfield.module.css"
import InputControl from './Inputcontrol';
import { X } from "react-feather";
import axios from 'axios';
function Textfield(props) {
    const [img, setImage] = useState(null);
    const setUploadedImageUrl=props.setUpload;
    const setPreview=props.preview;
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file)); // For preview
      setValues((prev) => ({ ...prev, image: e.target.value }))
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('img', img);
  
      try {
        const res = await axios.post('http://localhost:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploadedImageUrl(res.data.imgUrl); // Use the returned img URL
      } catch (error) {
        console.error('Error uploading img:', error);
      }
    }
    const sections=props.section;
    const information=props.information;
    const [active,changeactive]=useState(
      Object.keys(sections)[0]
    );
    const [activeInformation, setactiveInformation] = useState(
      information[sections[Object.keys(sections)[0]]]
    )
    const [sectionTitle, setSectionTitle] = useState(sections[Object.keys(sections)[0]])

    const [activeDetailIndex, setActiveDetailIndex] = useState(0);

    const [values, setValues] = useState({
      name: activeInformation?.detail?.name || "",
      title: activeInformation?.detail?.title || "",
      linkedin: activeInformation?.detail?.linkedin || "",
      github: activeInformation?.detail?.github || "",
      phone: activeInformation?.detail?.phone || "",
      email: activeInformation?.detail?.email || "",
    });

    const handlePointUpdate = (value, index) => {
      const tempValues = { ...values };
      if (!Array.isArray(tempValues.points)) tempValues.points = [];
      tempValues.points[index] = value;
      setValues(tempValues);
    };

    const workExpBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Title"
              placeholder="Enter title eg. Frontend developer"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }            />
            <InputControl
              label="Company Name"
              placeholder="Enter company name eg. amazon"
              value={values.companyName}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, companyName: event.target.value }))
              }            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Certificate Link"
              placeholder="Enter certificate link"
              value={values.certificationLink}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: event.target.value,
            }))
          }
            />
            <InputControl
              label="Location"
              placeholder="Enter location eg. Remote"
              value={values.location}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, location: event.target.value }))
          }

            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of work"
              value={values.startDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, startDate: event.target.value }))
              }
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of work"
              value={values.endDate}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, endDate: event.target.value }))
                }
            />
          </div>
    
          <div className={style.column}>
            <label>Enter work description</label>
            <InputControl
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}
           
            />
            <InputControl
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}

            />
            <InputControl
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}

            />
          </div>
        </div>
      );
      const projectBody = (
        <div className={style.detail}>
          <div className={style.row}>
            <InputControl
              label="Title"
              value={values.title}

              placeholder="Enter title eg. Chat app"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <InputControl
            label="Overview"
            placeholder="Enter basic overview of project"
            value={values.overview}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, overview: event.target.value }))
            }
           
          />
          <div className={style.row}>
            <InputControl
              label="Deployed Link"
              placeholder="Enter deployed link of project"
              value={values.link}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, link: event.target.value }))
              }
             
            />
            <InputControl
              label="Github Link"
              
              placeholder="Enter github link of project"
              value={values.github}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, github: event.target.value }))
              }
              
            />
          </div>
          <div className={style.column}>
            <label>Enter project description</label>
            <InputControl
              placeholder="Line 1"
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}

            />
            <InputControl
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}
            />
            <InputControl
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}
            />
            <InputControl
              placeholder="Line 4"
              value={values.points ? values.points[3] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}
              
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
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <InputControl
            label="College/School Name"
            placeholder="Enter name of your college/school"
            value={values.college}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, college: event.target.value }))
            }
          />
          <div className={style.row}>
            <InputControl
              label="Start Date"
              type="date"
              placeholder="Enter start date of this education"
              value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
            />
            <InputControl
              label="End Date"
              type="date"
              placeholder="Enter end date of this education"
              value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
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
              value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
            />
            <InputControl
              label="Title"
              placeholder="Enter your title eg. Frontend developer"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Linkedin Link"
              placeholder="Enter your linkedin profile link"
              value={values.linkedin}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, linkedin: event.target.value }))
              }
            />
            <InputControl
              label="Github Link"
              placeholder="Enter your github profile link"
              value={values.github}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, github: event.target.value }))
              }
            />
          </div>
          <div className={style.row}>
            <InputControl
              label="Email"
              value={values.email}
              placeholder="Enter your email"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }              
            />
            <InputControl
              label="Enter phone"
              placeholder="Enter your phone number"
              value={values.phone}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, phone: event.target.value }))
              }
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
              value={values.points ? values.points[0] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 0)}

            />
            <InputControl
              placeholder="Line 2"
              value={values.points ? values.points[1] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 1)}

            />
            <InputControl
              placeholder="Line 3"
              value={values.points ? values.points[2] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 2)}

            />
            <InputControl
              placeholder="Line 4"
              value={values.points ? values.points[3] : ""}
              onChange={(event) => handlePointUpdate(event.target.value, 3)}

            />
          </div>
        </div>
      );
      const skills = (
        <div className={style.detail}>
          <InputControl
            label="Skills"
            value={values.skills}
            placeholder="Enter your skills"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, skills: event.target.value }))
            }
          />
        </div>
      );
      const profile = (
        <div className={style.detail}>
          <InputControl
            label="Profile"
            value={values.profile}
            placeholder="Enter your objective/profile"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, profile: event.target.value }))
            }
          />
        </div>
      );
      const image=(
        <div className={style.image}>
            <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className={style.upload}>Upload</button>
      </form>
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
          case sections.profile:
            return profile;
          case sections.image:
            return image;
          default:
            return null;
        }
      };

      

      const handleSubmission=()=>{
        switch (sections[active]) {
      case sections.basicInfo: {
        const tempDetail = {
          name: values.name,
          title: values.title,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };


        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          companyName: values.companyName,
          location: values.location,
          points: values.points,
        };
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.project: {
        const tempDetail = {
          link: values.link,
          title: values.title,
          overview: values.overview,
          github: values.github,
          points: values.points,
        };
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.education: {
        const tempDetail = {
          title: values.title,
          college: values.college,
          startDate: values.startDate,
          endDate: values.endDate,
        };
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = tempDetail;

        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.achievement: {
        const tempPoints = values.points;

        props.setInformation((prev) => ({
          ...prev,
          [sections.achievement]: {
            ...prev[sections.achievement],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.skills: {
        const tempPoints = values.skills;

        props.setInformation((prev) => ({
          ...prev,
          [sections.skills]: {
            ...prev[sections.skills],
            detail: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.profile: {
        const tempPoints = values.profile;

        props.setInformation((prev) => ({
          ...prev,
          [sections.profile]: {
            ...prev[sections.profile],
            
            detail: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.image: {
        const tempDetail = values.image;

        props.setInformation((prev) => ({
          ...prev,
          [sections.image]: {
            ...prev[sections.image],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      

    }
  };

  const handleAddNew = () => {
    const details = activeInformation?.details;
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (!Object.keys(lastDetail).length) return;
    details?.push({});

    props.setInformation((prev) => ({
      ...prev,
      [sections[active]]: {
        ...information[sections[active]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };


  
  const handleDeleteDetail = (index) => {
    const details = activeInformation?.details
      ? [...activeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);
    props.setInformation((prev) => ({
      ...prev,
      [sections[active]]: {
        ...information[sections[active]],
        details: details,
      },
    }));

    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  };


  useEffect(()=>{
    const activeInfo = information[sections[active]];
    setactiveInformation(activeInfo)
    setSectionTitle(sections[active]);
    setActiveDetailIndex(0)
    setValues({
      name: activeInfo?.detail?.name || "",
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ""
        : "",
      link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
      certificationLink: activeInfo?.details
        ? activeInfo.details[0]?.certificationLink || ""
        : "",
      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ""
        : "",
      college: activeInfo?.details
        ? activeInfo.details[0]?.college || ""
        : "",
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ""
        : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      points: activeInfo?.details
      ? activeInfo.details[0]?.points
        ? [...activeInfo.details[0]?.points]
        : ""
      : activeInfo?.points
      ? [...activeInfo.points]
      : "",
      title: activeInfo?.details
      ? activeInfo.details[0]?.title || ""
      : activeInfo?.detail?.title || "",

    linkedin: activeInfo?.detail?.linkedin || "",
    github: activeInfo?.details
    ? activeInfo.details[0]?.github || ""
    : activeInfo?.detail?.github || "",
    phone: activeInfo?.detail?.phone || "",
    email: activeInfo?.detail?.email || "",
    profile:activeInfo?.detail?.profile ||  "",
    skills:activeInfo?.detail || "",
    image:activeInfo?.detail || "",
    })
    
  },[active])

  useEffect(() => {
    setactiveInformation(information[sections[active]]);
  }, [information]);

  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) return;

    const activeInfo = information[sections[active]];
    setValues({
      overview: activeInfo.details[activeDetailIndex]?.overview || "",
      link: activeInfo.details[activeDetailIndex]?.link || "",
      certificationLink:
        activeInfo.details[activeDetailIndex]?.certificationLink || "",
      companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
      location: activeInfo.details[activeDetailIndex]?.location || "",
      startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
      endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
      points: activeInfo.details[activeDetailIndex]?.points || "",
      title: activeInfo.details[activeDetailIndex]?.title || "",
      linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
      github: activeInfo.details[activeDetailIndex]?.github || "",
      college: activeInfo.details[activeDetailIndex]?.college || "",
      profile: activeInfo.details[activeDetailIndex]?.profile || "",
      
    });
  }, [activeDetailIndex])

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
              <InputControl label="Title" placeholder="Enter section title"
               value={sectionTitle}
              onChange={(event) => setSectionTitle(event.target.value)}
              />
              <div className={style.chips}>
              {activeInformation?.details
               ? activeInformation?.details?.map((item, index) => (
                <div  className={`${style.chip} ${
                  activeDetailIndex === index ? style.active : ""
                }`}
                key={item.title + index}
                onClick={() => setActiveDetailIndex(index)}>
                  <p>{sections[active]}{index+
                    1}</p>
                  <X 
                   onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteDetail(index);
                  }}
                  />
                </div>
               )) : ""
              }
                {activeInformation?.details &&
                activeInformation?.details?.length > 0 ? (
                  <div className={style.new} onClick={handleAddNew}>
                    +New
                  </div>
                ) : (
                  ""
                )}
              </div>
                {generateBody()}

                    <button onClick={handleSubmission} >Save</button>
            </div>
        </div>
    )
}

export default Textfield
