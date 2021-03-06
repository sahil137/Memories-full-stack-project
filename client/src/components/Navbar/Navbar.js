import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';
import useStyles from './styles';
import { LOGOUT } from '../../actions/actionTypes';
export const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const location = useLocation();
  // console.log(user);
  useEffect(() => {
    const token = user?.token;
    // JWT..
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleLogOut = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
    setUser(null);
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            {' '}
            Sign In{' '}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
