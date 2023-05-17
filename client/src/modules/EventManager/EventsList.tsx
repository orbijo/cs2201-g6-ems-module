import { Form, Link } from 'react-router-dom';
import { DateTime } from 'luxon'
import Axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext'
import './index.css';

function EventsList() {

  const [allEvents, setAllEvents] = useState([]);
    const [formattedSchedule, setFormattedSchedule] = useState('');
    const [eventAvail, setEventAvail] = useState(false);
    const [id, getID] = useState({});
    
    const TodayDate = DateTime.now().toLocaleString(DateTime.DATE_MED);
    const TodayTime = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);

    const { authState } = useContext(AuthContext)


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

    let availE = null;

    if(eventAvail){
      availE = <div className="d-flex justify-content-center align-items-center" style={{height:"60.5vh"}}>
               <p className='text-center' style={{fontWeight:0, fontSize:"1.5rem"}}>No Upcoming Events</p>
               </div>
   }
   else{

   
     availE = <div className="container">
                 <div className="row row-cols-1 row-cols-sm-2 row-cols-sm-3 g-3">
                   
                   {allEvents.map((value, key) => {

                       if(value.OrganizerId == authState.id){
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
   }

  return (
    <main>
      <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/blog/"></link>
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>

            <div className="row g-0 px-5 overflow-auto" style={{ height: "86vh" }}>
                <div className="p-2 d-flex flex-column">
                    <h1 className='text-center mt-2'>My Events</h1>
                    <div className="album py-3 bg-body-tertiary rounded shadow-sm mt-3"> 
                    {availE}
                    </div>
                </div>
            </div>
    </main>
  )
}

export default EventsList