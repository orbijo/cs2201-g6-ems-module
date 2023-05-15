import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-router-dom';


function Events() {

  const [isModalOpen, setModalState]  = React.useState(false);

  const toggleModal = () => {
    setModalState(!isModalOpen)
  }
  
  return (
    <main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>

    <div className="row g-0 overflow-auto" style={{height: "90vh"}}>
        <div className="col-9 p-2 d-flex flex-column">
            <h1 className='text-center'>Upcoming Events</h1>
            <div className="album py-3 bg-body-tertiary rounded shadow-sm mt-3">
        <div className="container">
    
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary">View</button>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary">View</button>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary">View</button>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        
        <div className="col-3 p-2 ">
            <h2 className='text-center mt-4'>Happening Now</h2>
            <div className="p-5 bg-body-tertiary rounded shadow-sm"></div>
        </div>
        <button onClick = {toggleModal} className='m-5' style={{position: "fixed", bottom: "0px", right:"0px", width:"4rem", height: "4rem", borderRadius:"50px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
        </svg>
        </button>

        {isModalOpen && (
        <div style={{width: "100vw", height: "100vw", top:0, left:0,right:0,bottom:0,position:'fixed'}}>
          <div onClick={toggleModal} style={{width: "100vw", height: "100vw", top:0, left:0,right:0,bottom:0,position:'fixed', background: "rgba(49,49,49,0.8)", zIndex:"-1"}}>
          </div>
          <div className="bg-white py-2" style={{width:"25rem", position:"absolute", top:"25%", left:"53%", transform:"translate(-50%, -50%)"}}>
              <h3 className='text-center'>Schedule Event</h3>
              <div>
              </div>
                <div className="bg-dark" style={{height:"1px"}}></div>
                <form action="">
                  <div className="form-group p-2">
                    <label>Event Name</label>
                    <input type="Ename" className="form-control" id="Ename"/>
                    <div className="row row-cols-sm-2 g-3">
                      <div className="col">
                       <label>Date</label>
                       <input type="text" className='form-control' id="date"/>
                      </div>
                      <div className="col">
                       <label>Time</label>
                       <input type="text" className='form-control' id="date"/>
                      </div>
                      <div className="col">
                      <label className='mb-2'>Category</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>...</option>
                        <option value="1">Seminar</option>
                        <option value="2">CES</option>
                        <option value="3">Program</option>
                      </select>
                      </div>
                      <div className="col">
                      <label className="form-label" for="customFile">Image</label>
                      <input type="file" className="form-control" id="customFile" />
                      </div>
                    </div>
                    <label className='my-2'>Description</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <label className='my-2'>About</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                  <div className="row">
                    <div className="col text-center">
                       <button type="submit" className="btn btn-primary" style={{width:"98%"}}>Submit</button>
                    </div>
                  </div>

                </form>
            </div>
        </div>
        )}
    </div>
     </main>
  )
}

export default Events