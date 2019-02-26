import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar, Toolbar, Typography, Fab, withStyles,
} from '@material-ui/core';

import logo from '../../assets/ThunkableBeaver.png';
import PlusSign from '../../assets/Plus Sign.svg';
import style from './Appbar.css';

const styles = {
  fabButton: {
    top: 50,
    left: 570,
    height: 60,
    width: 60,
    backgroundColor: '#5b444a',
    '&:hover': {
      backgroundColor: '#432f36',
    },
  },
};

const MainHeader = ({ classes, handleNewProject }) => (
  <AppBar position="static">
    <Toolbar className="Main-navbar" style={style}>
      <img src={logo} className="Main-logo" alt="logo" />
      <div className="grow">
        <Typography variant="h6" className="Main-title">
          MY PROJECTS
        </Typography>
        <Fab aria-label="Add" className={classes.fabButton} onClick={handleNewProject}>
          <img className="plus-icon" src={PlusSign} alt="Plus Sign" />
        </Fab>
      </div>
    </Toolbar>
  </AppBar>
);

MainHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNewProject: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainHeader);
