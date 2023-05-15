import React from 'react'
import { Form, Link } from 'react-router-dom';

function ParticipantList() {
  return (
    <main>
      <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/blog/"></link>
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>

    <div className="overflow-auto" style={{height: "94vh"}}>
    <div className="container py-5">
    <div className="p-4 p-md-5 mb-4 rounded text-bg-dark" style={{position: "relative"}}>
    <div className="col-md-6 px-0">
      <h1 className="display-4 fst-italic">An Event</h1>
      <p className="blog-post-meta" style={{ color: 'white', width: '90%' }}>Sat, March 11, 4:30 PM(PST)</p>
      <span className="badge text-bg-primary">CES</span>
      <p className="blog-post-meta" style={{ color: 'white' }}>Truly one of the most events ever.</p>
    </div>   
     </div>
    </div>

      <div className="container p-5">
      <h1 className='text-center mb-4'>Participants</h1>
        <div className="mb-4 p-2 d-flex justify-content-center">
        <div className="input-group" style={{width:"20rem"}} >
          <input type="search" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button className="input-group-text border-0 bg-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </button>
        </div>
        </div>
          <div className="row row-cols-md-3">
            <div className="col">
            <div className="p-1 bg-body-tertiary d-flex rounded shadow-sm mb-5">
              <div className="" style={{width:"25%", margin:0}}></div>
              <div className="px-2" style={{width:"50%"}}>
                <h3 className="mt-2" style={{margin:0}}>John Doe</h3>
                <p>111023456</p>
              </div>
              <div className="" style={{width:"25%", margin:0}}></div>
            </div>
            </div>
            <div className="col">
            <div className="p-1 bg-body-tertiary d-flex rounded shadow-sm mb-5">
              <div className="" style={{width:"25%", margin:0}}></div>
              <div className="px-2" style={{width:"50%"}}>
                <h3 className="mt-2" style={{margin:0}}>John Doe</h3>
                <p>111023456</p>
              </div>
              <div className="" style={{width:"25%", margin:0}}></div>
            </div>
            </div>
            <div className="col">
            <div className="p-1 bg-body-tertiary d-flex rounded shadow-sm mb-5">
              <div className="" style={{width:"25%", margin:0}}></div>
              <div className="px-2" style={{width:"50%"}}>
                <h3 className="mt-2" style={{margin:0}}>John Doe</h3>
                <p>111023456</p>
              </div>
              <div className="" style={{width:"25%", margin:0}}></div>
            </div>
            </div>
            <div className="col">
            <div className="p-1 bg-body-tertiary d-flex rounded shadow-sm mb-5">
              <div className="" style={{width:"25%", margin:0}}></div>
              <div className="px-2" style={{width:"50%"}}>
                <h3 className="mt-2" style={{margin:0}}>John Doe</h3>
                <p>111023456</p>
              </div>
              <div className="" style={{width:"25%", margin:0}}></div>
            </div>
            </div>
        </div>
      </div>
    </div>

    </main>
  )
}

export default ParticipantList