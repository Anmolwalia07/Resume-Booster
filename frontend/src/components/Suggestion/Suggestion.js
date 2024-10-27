import React from 'react'
import style from './Suggestion.module.css'
function Suggestion({projects}) {
    console.log(projects)
  return (
    (projects.length >0 &&<div className={style.container}>
        {projects.length >1 ?<h1>Suggestions for Projects</h1>: <h1>Suggestion for Project</h1>}
        <div className={style.suggestions}>
            {projects.map((project,index)=>{
                return (
                    <div className={style.project}>
                    <h1 key={index}>{project.technologies[0].name}</h1>
                    <h2>{project.name}</h2>
                    <h3>({project.description})</h3>
                    </div>
                )
            })}
        </div>
    </div>)
  )
}

export default Suggestion