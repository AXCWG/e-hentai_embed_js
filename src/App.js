import './App.css';
import React from 'react';
const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get("gid"))
var requestResult;
var gmetadataObject_react = await actions().then((res) => gmetadataObject_react = res);

async function actions() {

  await fetch("https://axcwg.cn/api/ehentaiproxypost",
    {
      method: "POST",
      body: '{"method": "gdata","gidlist": [[' + searchParams.get("gid") + ',"' + searchParams.get("token") + '"]],"namespace": 1}',
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
  if (searchParams.get("gid") === null | searchParams.get("token") === null | gmetadataObject_react.title === undefined) {
    return (
      <>
        invalid request.
      </>
    )
  }
  if (searchParams.get("dark") == 1) {
    document.body.classList.toggle('dark')



  }
  return (

    <div className='rounded' style={{ backgroundColor: "#F0F0F0", }}>
      <div className="row" style={{height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        
          <div className="col-sm-6 d-sm-none d-block" style={{ zoom: 1, textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%"  }}>
            <div></div>
            <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg")} style={{ width: "100%" }} className="p-3" alt='thumbnail' />
          </div>
          <div className="col-sm-6 d-sm-block d-none" style={{ zoom: 1, textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
            <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg")} style={{ width: "100%", }} className="p-3" alt='thumbnail' />
          </div>
        



        <div className="col-sm-6 p-3" >
          <div className='container-fluid'>
            <div className="container-fluid" style={{ textAlign: "center", width: "100%", }}>
              <h3 onClick={() => { window.top.location = 'https://e-hentai.org/g/' + gmetadataObject_react.gid + '/' + gmetadataObject_react.token }} className="display-6 " style={{ fontSize: "1.5rem", textAlign: "start", }} id="title">{gmetadataObject_react.title}</h3>
              <div style={{ textAlign: "start" }} onClick={() => { window.top.location = 'https://e-hentai.org/uploader/' + gmetadataObject_react.uploader }}>{gmetadataObject_react.uploader}</div>
              <div onClick={() => { window.top.location = 'https://e-hentai.org/' + gmetadataObject_react.category.replaceAll(" ", "").toLowerCase() }} style={{ textAlign: "start", fontSize: "1.3rem" }}>{gmetadataObject_react.category}</div>
              <div onClick={() => { window.top.location = 'https://e-hentai.org/g/' + gmetadataObject_react.gid + '/' + gmetadataObject_react.token }} style={{ textAlign: "start", fontSize: "1.3rem" }}>{gmetadataObject_react.gid}</div>

            </div>
            <div style={{ marginBottom: "2vm" }}>
              {gmetadataObject_react.tags.map((tag) => (

                <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{tag}</a></div>

              ))}
              <br></br>
            </div>
          </div>

        </div>

      </div>

    </div>

  );
}

export default App;
