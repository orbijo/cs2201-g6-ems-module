import React from "react";
import { useOutlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/DCISM_LOGO.png";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { colors } from "../constants/colors";
import { SignedInLinks } from "../constants/links";
import { getLinkClass } from "../helpers/functions";

function SignedInLayout() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div style={styles.topNav}>
        <img src={logo} style={styles.logo} />
        <div style={{ marginLeft: "auto" }}>
          <FiBell style={styles.navIcon} />
          <FiUser style={styles.navIcon} />
          <FiLogOut style={styles.navIcon} />
        </div>
      </div>
      <div style={styles.sideNav}>
        {SignedInLinks.map((link) => (
          <p
            key={link.name}
            className={getLinkClass(link.link, location.pathname)}
            onClick={() => navigate(link.link)}
            style={styles.link}
          >
            {link.name}
          </p>
        ))}
      </div>
      <div style={styles.contentContainer}>{outlet}</div>
    </div>
  );
}

export default SignedInLayout;

const styles: any = {
  topNav: {
    position: "absolute",
    background: colors.secondary,
    top: 0,
    width: "100%",
    height: "6vh",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "10%",
    height: "80%",
    marginLeft: "10px",
  },
  sideNav: {
    position: "absolute",
    top: "6vh",
    width: "12%",
    height: "94vh",
    backgroundColor: colors.brand,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navIcon: {
    marginRight: 20,
    color: colors.brand,
    fontSize: 15,
  },
  contentContainer: {
    height: "94vh",
    marginLeft: "12vw",
    paddingTop: "2.5rem",
  },
  link: {
    marginTop: 30,
    color: "white",
    height: 10,
    textAlign: "right",
  },
};
