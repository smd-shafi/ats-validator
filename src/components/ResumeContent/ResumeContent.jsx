import React from 'react'
import './ResumeContent.css'
import ScoreCircularBar from '../ScoreCircularBar/ScoreCircularBar'
const ResumeContent = ({props}) => {
  return (
    <div id="data" className="dataContainer">
        <div className="progress">
            <ScoreCircularBar value={props.score/100} label={props.rating}/>
            <div className="rating">{props.rating}</div>
        </div>
        <p style={{marginBottom: '20px'}} className="notes">{props.notes}</p>
        <div className="skills">
            <div className='skillsContainer'>
                {props.presentSkills.length > 0 ? <h2 className="skillHeader">Matched Skills {`(${props.presentSkills.length})`}</h2> : <div style={{display:'none'}}></div>}
                <div className="skillContent">
                    {Array.isArray(props.presentSkills) && props.presentSkills.length > 0 ? (
                    props.presentSkills.map((missing, index) => (
                        <div className='match-skill skill' key={index}>{missing}</div>
                    ))
                    ) : (
                    <div style={{display:'none'}}></div>
                    )}
                    </div>
            </div>
            {
                props.missingSkills.length > 0 ?
                <div className='skillsContainer'>
                {props.missingSkills.length > 0 ? <h2 className="skillHeader">Missing Skills {`(${props.missingSkills.length})`}</h2> : <div style={{display:'none'}}></div>}
                <div className="skillContent">
                    {Array.isArray(props.missingSkills) && props.missingSkills.length > 0 ? (
                    props.missingSkills.map((missing, index) => (
                        <div className='miss-skill skill' key={index}>{missing}</div>
                    ))
                    ) : (
                    <div style={{display:'none'}}></div>
                    )}
                    </div>
            </div> : <div style={{display: 'none'}}></div>
            }
        </div>
        <div className="improv">
        {props.improvementSuggestions?.length > 0 && (
            <>
            <h2 className="improvHeader">Improvement Suggestions</h2>

            <table>
                <tbody>
                {props.improvementSuggestions.map((suggestion, index) => (
                    <tr key={index}>
                    <td><p>{index+1}.</p></td>
                    <td>{suggestion}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </>
        )}
        </div>

    </div>
  )
}

export default ResumeContent
