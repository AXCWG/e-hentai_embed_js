import './App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("gid"))
var requestResult;
var gmetadataObject_react = await actions().then((res) => gmetadataObject_react = res);

async function actions() {

  await fetch("https://api.e-hentai.org/api.php",
    {
      method: "POST",
      body: '{"method": "gdata","gidlist": [['+searchParams.get("gid")+',"'+searchParams.get("token") + '"]],"namespace": 1}',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),

    }).then(async function (res) { requestResult = await res.json() })
    .catch((error) => console.error("Error: ", error))

  return requestResult.gmetadata[0]

}

function App() {
  console.log(typeof (gmetadataObject_react))
  console.log(gmetadataObject_react)
  if(searchParams.get("gid")==null | searchParams.get("token")== null | gmetadataObject_react.title == null){
    return (
      <>
        invalid request. 
      </>
    )
  }
  return (

    <div className='rounded' style={{ backgroundColor: "#F0F0F0", }}>
      <div className="row">
        <div className="col-md-4 d-md-none d-block" style={{ zoom: 1, textAlign: "center" }}>
          
          <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg")} className="img-fluid p-3" alt='thumbnail'  width={"400"}/>
        </div>
        <div className="col-md-4 d-md-block d-none" style={{ zoom: 1, textAlign: "center" }}>
          <img id="thumb" src={gmetadataObject_react.thumb} className="img-fluid p-3" alt='thumbnail' />
        </div>


        <div className="col-md-6 p-1" >
          <div className='container'>
            <div className="container" style={{ textAlign: "center", width: "100%" }}>

              <h3 className="display-6 py-3" style={{ fontSize: "1.5rem", textAlign: "start", }} id="title">{gmetadataObject_react.title}</h3>

            </div>
            <div style={{ marginBottom: "2vm" }}>
              {gmetadataObject_react.tags.map((tag) => (

                <div className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{textDecoration: "none",color: "#F0F0F0",}} href={"https://e-hentai.org/tag/" + tag}>{tag}</a></div>

              ))}
              <br></br>
            </div>
          </div>

        </div>
        <div className='col-md-2 p-1'>
            <div>

            </div>
        </div>
      </div>

    </div>

  );
}

export default App;
