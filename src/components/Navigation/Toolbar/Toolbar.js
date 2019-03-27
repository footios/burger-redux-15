import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

// child of Layout
const toolbar = props => {
  const email = localStorage.getItem('email')
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.DrawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.UserEmail} > User: {email} </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems  isAuthenticated={props.isAuth} />
      </nav>
      
    </header>
  );
};

export default toolbar;
