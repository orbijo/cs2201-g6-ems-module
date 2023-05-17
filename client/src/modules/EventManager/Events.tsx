import React from 'react'
import { Form, Link } from 'react-router-dom';
import { DateTime } from 'luxon'
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css';

function Events() {

    const [allEvents, setAllEvents] = useState([]);
    const [formattedSchedule, setFormattedSchedule] = useState('');
    const [eventAvail, setEventAvail] = useState(false);
    const [id, getID] = useState({});
    
    const TodayDate = DateTime.now().toLocaleString(DateTime.DATE_MED);
    const TodayTime = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);


    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:8080/events").then((response) => {
            setAllEvents(response.data)

            response.data.map((value)=>{
                // console.log(value.schedule);
                // console.log(DateTime.now())

                const scheduleDateTime = DateTime.fromISO(value.schedule);
                const formattedDateTime = scheduleDateTime.toLocaleString(DateTime.DATETIME_FULL);

                const EventDate = scheduleDateTime.toLocaleString(DateTime.DATE_MED);
                const EventTime = scheduleDateTime.toLocaleString(DateTime.TIME_24_SIMPLE);

                if(TodayDate == EventDate && TodayTime >= EventTime){
                    setFormattedSchedule(formattedDateTime);
                    getID(value);
                }
                
            })
            
            if(response.data.length == 0){
                setEventAvail(!eventAvail);
                return
            }
            setEventAvail(eventAvail);
        })
 
    }, [])


    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => {
        setModalState(!isModalOpen)
    }
    // {allEvents.map((value, key) => {
    //     return 'item'
    // })}

    let availE = null, 
    
    hapnow = <div className="d-flex justify-content-center align-items-center py-4" style={{height:"100%"}}>
                <p className="text-center" style={{fontSize:"1.5rem", fontWeight:"", margin: 0}}>No events happening</p>
             </div>;

    if(eventAvail){
       availE = <div className="d-flex justify-content-center align-items-center" style={{height:"60.5vh"}}>
                <p className='text-center' style={{fontWeight:0, fontSize:"1.5rem"}}>No Upcoming Events</p>
                </div>
    }
    else{

    
      availE = <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    
                    {allEvents.map((value, key) => {

                        if(TodayDate <= DateTime.fromISO(value.schedule).toLocaleString(DateTime.DATE_MED)){
                        return (
                            <div className="card mx-1">
                                <img src="http://www.w3.org/2000/svg" className="card-img-top" alt="..." height="225"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{value.eventName}</h5>
                                    <p className="card-text">{value.description}</p>
                                    <a className="btn btn-primary" onClick={()=>{navigate(`/event-manager/event/${value.id}`)}} >Go to page</a>
                                </div>
                            </div>
                        )}
                    })}
                </div>
            </div>

    if(formattedSchedule!=''){

      hapnow = <div className="">
                {allEvents.map((value,key)=>{

                    if(value.id == id.id){
                    return (
                        
                        <a className="" style={{textDecoration: "none"}} onClick={()=>{navigate(`/event-manager/event/${value.id}`)}}>
                            <div className="evt p-3 my-2 shadow-sm rounded" style={{cursor:"pointer"}}>
                                <p style={{margin:0, fontSize:"1.5rem"}}>{value.eventName}</p>
                                <div className="" style={{paddingLeft:""}}>
                                <p style={{margin:0}}>{value.description}</p>
                                <p style={{margin:0}}>{formattedSchedule}</p>
                                </div>
                            </div>
                        </a>
                        
                        
                    )}
                })}
                </div>
        }
    }

    return (
        <main>  
            <div className="row g-0 overflow-auto" style={{ height: "86vh" }}>
                <div className="col-9 p-2 d-flex flex-column">
                    <h1 className='text-center mt-2'>Upcoming Events</h1>
                    <div className="album py-3 bg-body-tertiary rounded shadow-sm mt-3"> 

                    {availE}

                    </div>
                </div>
                <div className="col-3 p-2 ">
                    <h2 className='text-center' style={{marginTop:"2.1rem"}}>Happening Now</h2>
                    <div className="px-2 py-1 bg-body-tertiary rounded shadow-sm">

                    {hapnow}
                    </div>
                </div>
                
            </div>
        </main>
    )
}

export default Events