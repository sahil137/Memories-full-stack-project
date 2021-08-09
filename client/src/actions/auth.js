// import { AUTH } from './actionTypes';
// import * as api from '../api/index';

export const signUp = (formData, history) => (async) => (dispatch) => {
  try {
    // sign up the user
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => (async) => (dispatch) => {
  try {
    // login the user
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
