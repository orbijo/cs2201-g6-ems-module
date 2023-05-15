import React from 'react'
import { Form, Link } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Events() {

    const [allEvents, setAllEvents] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:8080/events").then((response) => {
            setAllEvents(response.data);
        })
    }, [])

    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => {
        setModalState(!isModalOpen)
    }
    // {allEvents.map((value, key) => {
    //     return 'item'
    // })}
    return (
        <main>  
            <div className="row g-0 overflow-auto" style={{ height: "94vh" }}>
                <div className="col-9 p-2 d-flex flex-column">
                    <h1 className='text-center'>Upcoming Events</h1>
                    <div className="album py-3 bg-body-tertiary rounded shadow-sm mt-3">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {allEvents.map((value, key) => {
                                    return (
                                        <div className="card">
                                            <img src="http://www.w3.org/2000/svg" className="card-img-top" alt="..." height="225"></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{value.eventName}</h5>
                                                <p className="card-text">{value.description}</p>
                                                <a className="btn btn-primary" onClick={()=>{navigate(`/event-manager/event/${value.id}`)}} >Go to page</a>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 p-2 ">
                    <h2 className='text-center mt-4'>Happening Now</h2>
                    <div className="p-5 bg-body-tertiary rounded shadow-sm"></div>
                </div>
                
            </div>
        </main>
    )
}

export default Events