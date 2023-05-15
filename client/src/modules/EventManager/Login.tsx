import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {AuthContext} from '../../helpers/AuthContext'
import jwt_decode from 'jwt-decode';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)

    const navigate = useNavigate();
    const login = () => {
        const data = { email: email, password: password }
        Axios.post("http://localhost:8080/auth/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error)
            }
            else{
                const decodedToken = jwt_decode(response.data)
                localStorage.setItem("accessToken", response.data)
                setAuthState({
                    email: decodedToken.email,
                    id: decodedToken.id,
                    roles: decodedToken.roles,
                    status: true
                  })
                navigate("/event-manager/events")
            }
        })
    }
    return (
        <main>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossOrigin="anonymous"></script>
            <div className="p-0 d-flex justify-content-center align-items-center" style={{ height: "100vh", padding: "200px" }}>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 150 }}>
                    <path fill="#003B73" fillOpacity="1" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,261.3C840,288,960,288,1080,277.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 150, zIndex: -1 }}>
                    <path fill="#0074B7" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,160C840,149,960,171,1080,176C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 150, zIndex: -2 }}>
                    <path fill="#60A3D9" fillOpacity="1" d="M0,96L120,122.7C240,149,480,203,720,202.7C960,203,1200,149,1320,122.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                </svg>
                <div className="p-1" style={{ position: "absolute", bottom: 0, background: "#003B73", width: "100%", height: "10rem" }}></div>


                <div className="bg-body-tertiary p-4 rounded shadow d-flex flex-column align-items-center" style={{ position: "absolute", width: "35rem", zIndex: 1 }}>
                    <h1 style={{ marginBottom: "2rem" }}>Login</h1>
                    <div>
                        <div className="form-group">
                            <input type="email" onChange={(e) => { setEmail(e.target.value); }} name="schoolEmail" id="schoolEmail" className="form-control" placeholder="School Email" autoComplete="off" style={{ width: "25rem", padding: "8px", display: "inline-block", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box", backgroundColor: "#EDF5F3 !important", fontSize: "1.1em" }} required />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="password" onChange={(e) => { setPassword(e.target.value); }} name="password" id="password" className="form-control" placeholder="Password" autoComplete="off" required style={{ width: "25rem", padding: "8px", display: "inline-block", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box", backgroundColor: "#EDF5F3 !important", fontSize: "1.1em" }} />
                        </div>
                        <div className="form-group my-2">
                            <p>Forgot your password? Click <a style={{ textDecoration: "none", color: "#87a2f7", fontWeight: "bold" }}>here</a></p>
                        </div>
                        <div className="form-group-btn">
                            <button onClick={login} name="btnsignin" className="login-btn" value="Login" style={{ textDecoration: "none", display: "inline-block", color: "white", border: "1px solid #002366", padding: "11px 24px", fontSize: "1em", position: "relative", background: "#002366", cursor: "pointer", fontWeight: "bold", fontFamily: "var(--bs-body-font-family)", borderRadius: "10px", width: "25rem" }} >Login</button>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login