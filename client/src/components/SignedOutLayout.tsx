import React from "react";
import { FiBell, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { Link, Outlet, useLocation, useMatch } from 'react-router-dom'
import logo from "../assets/DCISM_LOGO.png";
import { useOutlet } from "react-router-dom";
import { colors } from "../constants/colors";

function SignedOutLayout() {
  const outlet = useOutlet();
  return (
    <div>
      <div style={styles.topNav}>
        <img src={logo} style={styles.logo} />
        <div style={{ marginLeft: "auto" }}>
          <Link to="/login"><FiLogIn style={styles.icon} /></Link>
        </div>
      </div>
      <div style={styles.secondTopNav}>
      </div>
      <div style={{width: "100%", height: "100vh"}}>
        {outlet}
      </div>
    </div>
  );
}

export default SignedOutLayout;

const styles: any = {
  logo: {
    width: "10%",
    height: "80%",
    marginLeft: "10px",
  },
  secondTopNav: {
    position: "absolute",
    top: "6vh",
    width: "100%",
    backgroundColor: colors.brand,
    height: "5vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end", 
  },
  topNav: {
    position: "absolute",
    background: colors.secondary,
    top: 0,
    width: "100%",
    height: "6vh",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
    color: colors.brand,
    fontSize: 15,
  },
  link: {
    color: "white",
    marginRight: 70,
  },
};
