import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { DateTime } from 'luxon'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddTaskIcon from '@mui/icons-material/AddTask';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
  const [rows, setRows] = useState([]);
  const [gridKey, setGridKey] = useState(0);
  const navigate = useNavigate();
  const TodayDate = DateTime.now().toLocaleString(DateTime.DATE_MED);

  useEffect(() => {
      fetchRows();
  }, []);


  const fetchRows = async () => {
      try {
          const response = await axios.get('http://localhost:8080/events/history');
          setRows(response.data);
      } catch (error) {
          console.error('Error fetching rows:', error);
      }
  };

  const onButtonClickView = (e: React.MouseEvent<HTMLButtonElement>, row: any): void => {
      e.stopPropagation();
      //do whatever you want with the row
      navigate(`/event-manager/event/${row.id}`);
  };

  const onButtonClickApprove = (e: React.MouseEvent<HTMLButtonElement>, row: any): void => {
      e.stopPropagation();
      //do whatever you want with the row
      if (confirm(`Are you sure you want to approve event: ID:${row.id} | Event Name: ${row.eventName}?`)) {
          // do approve here
          try {
              axios.post(
                  `http://localhost:8080/events/approve/${row.id}`,
                  null,
                  {
                      headers: {
                          accessToken: localStorage.getItem('accessToken'),
                      },
                  },
              )
              setRows(prevRows => prevRows.filter(item => item.id !== row.id));
          } catch (error) {
              console.error('Error: ', error)
          }
      } else {

      }

  };

  const onButtonClickDeny = (e: React.MouseEvent<HTMLButtonElement>, row: any): void => {
      e.stopPropagation();
      //do whatever you want with the row
      if (confirm(`Are you sure you want to deny: ID:${row.id} | Event Name: ${row.eventName}?`)) {
          // destory
          try {
              axios.delete(`http://localhost:8080/events/${row.id}`, {
                  headers: {
                      accessToken: localStorage.getItem('accessToken'),
                    },
              }).then((response)=>{
                  setRows(prevRows => prevRows.filter(item => item.id !== row.id));
              })
              .catch((err)=>{
                  console.error(err)
              })
          } catch (error) {
              console.error('Error: ', error)
          }
      } else {

      }
  };
  const renderDetailsButton = (params: any) => {
      return (
          <strong>
            {/* {params?.row?.status?.includes("Approved")?(
              <IconButton
              color="error"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => onButtonClickDeny(e, params.row)}
          >
              <DeleteIcon />
            </IconButton>
            ):(
              <IconButton
                  color="success"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => onButtonClickApprove(e, params.row)}
              >
                  <AddTaskIcon />
              </IconButton>
            )} */}
              <IconButton
                  color="primary"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => onButtonClickView(e, params.row)}
              >
                  <VisibilityIcon />
              </IconButton>
          </strong>
      );
  };

  const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 40 },
      { field: 'eventName', headerName: 'eventName', width: 130 },
      { field: 'description', headerName: 'Description', width: 260 },
      {
          field: 'schedule',
          headerName: 'Schedule',
          width: 260,
          valueGetter: (params) => {
              const isoDate = params.value;
              const formattedDate = DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_MED);
              return formattedDate;
          },
      },
      { field: 'category', headerName: 'Category', width: 140 },
      {field: 'status', headerName: 'Status', width: 100},
      {
          field: 'Action',
          headerName: 'Actions',
          width: 140,
          renderCell: renderDetailsButton,
      },

  ];

  return (

      <Box sx={{ paddingX: '2rem', paddingY: '1rem' }}>
        <div className="" style={{marginBottom: "2rem", marginTop: "1rem"}}>
          <h1 className='text-center'>History</h1>
        </div>
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
  );
}

export default History