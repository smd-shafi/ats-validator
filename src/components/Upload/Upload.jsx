import React, { use, useState, useEffect} from "react";
import axios from "axios";
import { Link, Navigate } from 'react-router-dom'
import './Upload.css'
import { useNavigate } from "react-router-dom";
import { ResumeData } from "../../entities/ResumeData.js";
import Loading from "../Loading/Loading.jsx";
import ResumeContent from "../ResumeContent/ResumeContent.jsx";

const Upload = () => {

  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDragComplete, setIsDragComplete] = useState(false);
  const [file, setFile] = useState(undefined);
  const [description, setDescription] = useState(undefined)
  const [experience, setExperience] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotValidResume, setIsNotValidResume] = useState(false);

   useEffect(() => {
    if (data) {
      if(data){
        if(!data.valid){
          setIsNotValidResume(true);
          return;
        }
        else{
          setIsNotValidResume(false);
          const element = document.querySelector("#scoreBar");
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
          }

        }
      }
    }
  }, [data]);

  const handleDragOver = (e) => {
    e.preventDefault(); 
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name)
      setIsDragComplete(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setIsDragComplete(true);
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const handleExp = (e) => {
    setExperience(e.target.value);
    console.log(experience);
  };

  const handleOnClick = async (e) => {
  if (!file) {
      alert("Please select a file first!");
      return;
  }

  

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("job_role",description);
    formData.append("candidate_type",experience);

    setIsLoading(true);
    const response = await fetch("https://atsbackend-aews.onrender.com/chatwithgemini", {
      method: 'POST',
      body: formData 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    
    const json = await response.json();
    setIsLoading(false)
    const resumeData = ResumeData.fromJSON(json);
    setData(resumeData)

    
  };


  return (
    <section className="upload">
        {
        isNotValidResume ?
          <div className="notValid">{data.notes}</div> 
          : <div style={{display:'none'}}></div>
        }

        <div className='drag-drop' style={!isNotValidResume ? {marginTop: '40px'} : {marginTop: '0px'}}>
          <label htmlFor="resumeInput" id='drop-area' 
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave} 
          onDrop={handleDrop}>
            <div className='drag' style={!isDragging ? { backgroundColor: '#f7f8ff'} : {backgroundColor: '#b9c1fcff'}}>
              <div className="cloud">
                <img src="../src/assets/cloud.png" alt="" />
              </div>
            {
              isDragComplete ? (
                <p>{fileName}</p>
              ) : (
                <p>
                  {isDragging ? "Drop your file here" : "Drag & drop file or click to upload"}
                </p>
              )
            }
              <input type="file" onChange={handleFileChange} id="resumeInput" accept=".pdf, .doc, .docx" hidden></input>
          </div>
          </label>
          <div className="tailoring">
            <textarea name="job-description" id="description" placeholder="Job Description e.g. Front-End Developer" onChange={handleDescription}></textarea>
            <br />
            <label htmlFor="cars">Experience level:</label>
            <select name="cars" id="cars" onChange={handleExp}>
              <option value="Fresher">Fresher</option>
              <option value="0 to 2 years">{"<"} 2 years</option>
              <option value="0 to 5 years">{"<"} 5 years</option>
              <option value="0 to 10 years">{"<"} 10 years</option>
            </select>
          </div>
      </div>

      
      <button
        className="submit"
        style={file !== undefined ? {backgroundColor: "#2564e7"} :  {backgroundColor: "rgb(235,235,228)"}}
        onClick={file !== undefined ? handleOnClick : undefined}
      >
        Check Score
      </button>

      {
        isLoading ? <div className="loading"><Loading isLoading={true}/></div> : <div style={{display:'none'}}></div>
      }

      {
        data && data.valid ?
          <ResumeContent props={data}/>
        :  
        <div style={{display:'none'}}></div>
      }



    </section>
  )
}

export default Upload
