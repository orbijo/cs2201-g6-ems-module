import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import { DateTime } from 'luxon'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios';

function Event() {
  let { id } = useParams();
  const [eventObject, setEventObject] = useState({});
  const [formattedSchedule, setFormattedSchedule] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)

  const [rows, setRows] = useState([]);
  const [gridKey, setGridKey] = useState(0);

  const fetchRows = async () => {
    try {
      const response = await Axios.get(`http://localhost:8080/events/${id}/users`);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching rows:', error);
    }
  };

  useEffect(() => {
    fetchRows();
    Axios.get(`http://localhost:8080/events/${id}`).then((response) => {
      setEventObject(response.data);
      const scheduleDateTime = DateTime.fromISO(response.data.schedule);
      const formattedDateTime = scheduleDateTime.toLocaleString(DateTime.DATETIME_FULL);
      setFormattedSchedule(formattedDateTime);
    });

    Axios.get(`http://localhost:8080/events/check-registration/${id}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    }).then((response) => {
      setIsRegistered(response.data.isRegistered);
    });

  }, [])

  const register = () => {
    Axios.post(`http://localhost:8080/events/join/${id}`, null, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        setIsRegistered(true)
      }
    })
  }

  const leave = () => {
    Axios.post(`http://localhost:8080/events/leave/${id}`, null, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error)
      } else {
        setIsRegistered(false)
      }
    })
  }

  const markAttendance = (e: React.MouseEvent<HTMLButtonElement>, row: any): void => {
    e.stopPropagation();
    const data = {
      attendedAt: new Date()
    }
    //do whatever you want with the row
    if (confirm(`Mark the attendance of ID Number:${row.id_num}?`)) {
      try {
        axios.post(
          `http://localhost:8080/events/verify/${id}/${row.id}`,
          data,
          {
            headers: {
              accessToken: localStorage.getItem('accessToken'),
            },
          },
        );

        // update or refresh the rows
        fetchRows();
      } catch (error) {
        console.error('Error: ', error)
      }
    } else {

    }
  };

  const renderDetailsButton = (params: any) => {
    const isAttended = params.row.EventParticipant.attendedAt !== null;
    return (
      <strong>
        {isAttended ? (
          <IconButton
            color="secondary">
            <HowToRegIcon />
          </IconButton>
        ) : (
          <IconButton
            color="warning"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => markAttendance(e, params.row)}
          >
            <PersonRemoveIcon />
          </IconButton>
        )}
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'id_num', headerName: 'ID Number', width: 140 },
    { field: 'first_name', headerName: 'First Name', width: 140 },
    { field: 'last_name', headerName: 'Last Name', width: 140 },
    {
      field: 'is Attended',
      headerName: 'Attended',
      width: 140,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <main>

      <div className="overflow-auto" style={{ height: "94vh" }}>

        <div className="container py-5">
          <div className="p-4 p-md-5 mb-4 rounded text-bg-dark" style={{ position: "relative" }}>
            <div className="col-md-6 px-0">
              <h1 className="display-4 fst-italic">{eventObject.eventName}</h1>
              <p className="blog-post-meta" style={{ color: 'white', width: '90%' }}>{formattedSchedule}</p>
              <span className="badge text-bg-primary">{eventObject?.category?.toUpperCase()}</span>
              <p className="blog-post-meta" style={{ color: 'white' }}>{eventObject.description}</p>
              {isRegistered && (
                <button onClick={leave} className='btn btn-secondary position-absolute bottom-0 end-0 mx-5 mb-5'>Cancel Registration</button>
              )}
              {!isRegistered && (
                <button onClick={register} className='btn btn-primary position-absolute bottom-0 end-0 mx-5 mb-5'>Register</button>
              )}
            </div>
          </div>
        </div>

        <div className="container px-4">
          <h2 className="text-center">About</h2>
          <blockquote className="blockquote">
            <p className="text-center mb-0">{eventObject.about}</p>
          </blockquote>
        </div>

        <div className="container px-4">
          <Box sx={{ paddingX: '2rem', paddingY: '1rem' }}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                key={gridKey}
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </div>
          </Box>
        </div>

      </div>

    </main>
  )
}

export default Event