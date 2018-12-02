import React from 'react'

export default function (props) {
    const { biography, works, family, education, honors } = props.politician;
  return (

    <div style={{marginTop: "100px"}}>
          {/* another info card */}
          {biography && <div
           className="bg-white w-full shadow rounded mt-5 sm:-mt-20 p-5 whitespace-pre-wrap">
              <h3 className="mb-5"> Biography</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}} dangerouslySetInnerHTML={{ __html: biography }} />
          </div>}

          <div className={biography ? "bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap" : "mt-5 sm:-mt-20 bg-white w-full shadow rounded p-5 whitespace-pre-wrap"}>
              <h3 className="mb-5">Work Experience</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}} dangerouslySetInnerHTML={{ __html: works }} />
          </div>
          {/* another info card */}
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
              <h3 className="mb-5">honors</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: honors }} />
          </div>

          {/* another info card */}
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
              <h3 className="mb-5">Family</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: family }} />
          </div>
          {/* another info card */}
          <div className="bg-white w-full shadow rounded mt-5 p-5 whitespace-pre-wrap">
              <h3 className="mb-5">Education</h3>
              <p style={{textAlign: "justify", lineHeight: "2.4", fontSize: "20px", background: "rgb(52, 144, 220)", color: "#fff", padding: "15px", borderRadius: "5px"}}  dangerouslySetInnerHTML={{ __html: education }} />
          </div>
    </div>
  )
}
