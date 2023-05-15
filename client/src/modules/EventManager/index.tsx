import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { colors } from "../../constants/colors";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DateTime } from "luxon";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../helpers/AuthContext'

import "react-datepicker/dist/react-datepicker.css";

function EventManager() {
  const { setAuthState } = useContext(AuthContext)
  const { authState } = useContext(AuthContext)

  const location = useLocation();
  const [isModalOpen, setModalState] = React.useState(false);
  const navigate = useNavigate();

  const [startDate, setStartDate] = React.useState(new Date());

  const toggleModal = () => {
    setModalState(!isModalOpen)
  }
  const isActive = (path: string) => {
    const currpath = "/event-manager/" + path;
    console.log(currpath, location.pathname);
    return location.pathname === "/event-manager/" + path
  }

  const initialValues = {
    eventName: "",
    description: "",
    about: "",
    category: "ces",
    schedule: DateTime.now().toFormat("yyyy-MM-dd") + "T" + DateTime.now().toFormat("hh:mm"),
  }

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required(),
    description: Yup.string().required(),
    about: Yup.string().required(),
    category: Yup.string().required()
  })

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      ...authState,
      status: false
    });
  };

  const onSubmit = (data: any) => {
    console.log(data)
    Axios.post('http://localhost:8080/events', data, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        navigate(0)
        toggleModal
      }
    })
  }

  return (
    <>
      <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/blog/"></link>
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>
      <div className="bg-body-tertiary d-flex align-items-center nav shadow-sm" style={{ paddingLeft: "20px", height: "3rem" }}>

        <Link to='/event-manager/events' className='mx-3 text-decoration-none text-dark'>Events</Link>
        {
          authState?.roles?.includes('APPROVER') && (<Link to='/event-manager/approve' className='mx-3 text-decoration-none text-secondary'>For Approval</Link>)
        }

        {!authState.status ? (
          <Link to='/login' className='mx-3 text-decoration-none text-secondary'>Login</Link>
        ) : (
          <a href="" onClick={logout} className="mx-3 text-decoration-none text-secondary">Logout</a>
        )}


      </div>
      
      {!authState?.status ? (
          <div></div>
        ) : (
          <Outlet />
        )}
      

      {(authState?.roles?.includes('ORGANIZER'))&&(
        <button onClick={toggleModal} className='m-5' style={{ position: "fixed", bottom: "0px", right: "0px", width: "4rem", height: "4rem", borderRadius: "50px", padding: "10px 10px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
        </svg>
      </button>
      )}
      


      {isModalOpen && (
        <div style={{ width: "100vw", height: "100vw", top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}>
          <div onClick={toggleModal} style={{ width: "100vw", height: "100vw", top: 0, left: 0, right: 0, bottom: 0, position: 'fixed', background: "rgba(49,49,49,0.8)", zIndex: "-1" }}>
          </div>
          <div className="bg-white py-2" style={{ width: "30rem", position: "absolute", top: "25%", left: "53%", transform: "translate(-50%, -50%)" }}>
            <h3 className='text-center'>Schedule Event</h3>
            <div>
            </div>
            <div className="bg-dark" style={{ height: "1px" }}></div>
            <Formik
              initialValues={initialValues} onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className="form-group p-2">
                  <label>Event Name</label>
                  <div className="form-text">
                    <ErrorMessage className='form-text text-danger' name="eventName" component="small" />
                  </div>
                  <Field className="form-control" name="eventName" placeholder="Event Name" />
                  <label>Date & Time</label>
                  <Field type="datetime-local" className="form-control" name="schedule" placeholder="Event Name" />
                  <div className="row row-cols-sm-2 g-3">
                    <div className="col">
                      <label className='mb-2'>Category</label>
                      <Field component='select' className='form-select' name="category">
                        <option value="ces">CES</option>
                        <option value="seminar">Seminar</option>
                        <option value="program">Program</option>
                        <option value="workshop">Workshop</option>
                      </Field>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="customFile">Image</label>
                      <input type="file" className="form-control" id="customFile" />
                    </div>
                  </div>
                  <label>Description</label>
                  <div className="form-text">
                    <ErrorMessage className='form-text text-danger' name="description" component="small" />
                  </div>
                  <Field className="form-control" name="description" placeholder="Description" />
                  <label className='my-2'>About</label>
                  <ErrorMessage name="about" component="span" />
                  <Field className="form-control" name="about" placeholder="About Event" component="textarea" />
                </div>
                <div className="row">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-primary" style={{ width: "98%" }}>Submit</button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>

        </div>
      )}
    </>
  )
}

export default EventManager;

const styles: any = {
  eventNav: {
    position: "absolute",
    background: colors.secondary,
    top: 0,
    width: "100%",
    height: "6vh",
    display: "flex",
    alignItems: "center",
  },
};