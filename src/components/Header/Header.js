import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <Box flexDirection="row" display="flex" justifyContent="center" alignItems="center">
          <div><img className={classes.logo} src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" alt="Nasa"/></div>
          <div className={classes.heading}><h1>Explore NASA`s expeditions to Mars</h1></div>
        </Box>
      </Container>
    </header>
  )
}
export default Header;
