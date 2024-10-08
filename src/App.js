import './App.css';
import db from './db.full.json'
import React from 'react';
const searchParams = new URLSearchParams(window.location.search);
var requestResult;
var gmetadataObject_react
const wait = t => new Promise((resolve, reject) => setTimeout(resolve, t))
async function get() { await actions().then((res) => gmetadataObject_react = res).catch(async (e) => {await wait(1000) ; await get() }) };
await get()
var zh = true;
if (searchParams.get("zh") !== null) {
  console.log(searchParams.get("zh"))
  var zh = searchParams.get("zh");
}

async function actions() {

  await fetch((searchParams.get("official") === "true") ? 'https://e-hentai.org/api.php' : 'https://axcwg.cn/api/ehentaiproxypost',
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

  if (searchParams.get("gid") === null || searchParams.get("token") === null || gmetadataObject_react.title === undefined) {
    return (
      <>
        invalid request.
      </>
    )
  }
  if (zh === true) {
    return (

      CN()

    );
  } else {
    return (EN())
  }

}
function CN() {
  return (
    <div className='rounded' style={{ backgroundColor: "#F0F0F0", }}>
      <div className="row" style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

        <div className="col-sm-6 d-sm-none d-block" style={{ zoom: 1, textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
          <div></div>
          <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg").replace("https://ehgt.org/", "https://axcwg.cn/ehimages/")} style={{ width: "100%" }} className="p-3" alt='thumbnail' />
        </div>
        <div className="col-sm-6 d-sm-block d-none" style={{ zoom: 1, textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
          <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg")} style={{ width: "100%", }} className="p-3" alt='thumbnail' />
        </div>




        <div className="col-sm-6 p-3" >
          <div className='container-fluid'>
            <div className="container-fluid" style={{ textAlign: "center", width: "100%", }}>
              <h3 onClick={() => { window.top.location = 'https://e-hentai.org/g/' + gmetadataObject_react.gid + '/' + gmetadataObject_react.token }} className="display-6 " style={{ fontSize: "1.5rem", textAlign: "start", }} id="title">{gmetadataObject_react.title}</h3>
              <div style={{ textAlign: "start" }} onClick={() => { window.top.location = 'https://e-hentai.org/uploader/' + gmetadataObject_react.uploader }}>{gmetadataObject_react.uploader}</div>
              <div onClick={() => { window.top.location = 'https://e-hentai.org/' + gmetadataObject_react.category.replaceAll(" ", "").toLowerCase() }} style={{ textAlign: "start", fontSize: "1.3rem" }}>{Object.entries(Object.entries(db.data[1])[3][1]).find((entry) => entry[0] === gmetadataObject_react.category.replaceAll(" ", "").toLowerCase())[1].name.text}</div>
              <div onClick={() => { window.top.location = 'https://e-hentai.org/g/' + gmetadataObject_react.gid + '/' + gmetadataObject_react.token }} style={{ textAlign: "start", fontSize: "1.3rem" }}>{gmetadataObject_react.gid}</div>

            </div>
            <div style={{ marginBottom: "2vm" }}>
              {gmetadataObject_react.tags.map((tag) => {
                // sub to translate
                var namespace = tag.split(":")[0];
                var tagname = tag.split(":")[1];
                var arr_namespaces = Object.entries(db.data[0].data)
                var arr_tag = Object.entries(db.data);




                var ns_failed = false;
                var tag_failed = false;
                try {
                  var namespace_translated = arr_namespaces.find((namae) => namae[0] === namespace)[1].name.raw

                } catch (e) {
                  ns_failed = true
                  // console.log(ns_failed)
                }
                try {
                  var tagname_translated = Object.entries(arr_tag.find((namae) => namae[1].namespace === namespace)[1].data).find((namae) => namae[0] == tagname)[1].name.text


                } catch (e) {
                  tag_failed = true
                  // console.log(tag_failed)

                }

                if (ns_failed === true && tag_failed === false) {
                  return (
                    <>

                      <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{namespace_translated}:{tagname}</a></div>

                    </>

                  )
                } else if (tag_failed === true && ns_failed === false) {
                  return (
                    <>

                      <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{namespace_translated}:{tagname}</a></div>

                    </>

                  )
                } else if (tag_failed === true && ns_failed === true) {
                  return (
                    <>

                      <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{tag}</a></div>

                    </>
                  )
                } else {
                  return (
                    <>

                      <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{namespace_translated}:{tagname_translated}</a></div>

                    </>
                  )

                }




              })}

              <br></br>
            </div>
          </div>

        </div>

      </div>

    </div>
  )

}
function EN() {
  return (
    <div className='rounded' style={{ backgroundColor: "#F0F0F0", }}>
      <div className="row" style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

        <div className="col-sm-6 d-sm-none d-block" style={{ zoom: 1, textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
          <div></div>
          <img id="thumb" src={gmetadataObject_react.thumb.replace("l.jpg", "300.jpg").replace("https://ehgt.org/", "https://axcwg.cn/ehimages/")} style={{ width: "100%" }} className="p-3" alt='thumbnail' />
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
              {gmetadataObject_react.tags.map((tag) => {

                return (
                  <>

                    <div onClick={() => { window.top.location = 'https://e-hentai.org/tag/' + tag }} className='rounded px-2 py-1 m-1' style={{ backgroundColor: "gray", textDecoration: "none", color: "#F0F0F0", float: "left" }}><a style={{ textDecoration: "none", color: "#F0F0F0", }} >{tag}</a></div>

                  </>
                )






              })}

              <br></br>
            </div>
          </div>

        </div>

      </div>

    </div>
  )

}

export default App;
