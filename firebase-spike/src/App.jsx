import { useState, Fragment, useEffect } from 'react';
import { initializeApp } from "firebase/app";


import './App.css'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBJbMG7roqfhbHukRWDK0vMw9R1uku7oUs",
  authDomain: "fir-spike-a0623.firebaseapp.com",
  projectId: "fir-spike-a0623",
  storageBucket: "fir-spike-a0623.appspot.com",
  messagingSenderId: "1010579561344",
  appId: "1:1010579561344:web:2268121b0b37a9a9b17f65",
  measurementId: "G-L848RXL8HM"
};

function App() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const [loggedIn, setLoggedIn] = useState(false);
  const [invalid, setInvalid] = useState(false)
  const [newAccErr, setNewAccErr] = useState(false);

//Creating new accounts
  const createAccount = (e) => {
    e.preventDefault();
    setNewAccErr(false);
    setInvalid(false);
    const email = inputEmail.value;
    const password = inputPassword.value;
     
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setNewAccErr(true);
      });
}

//Signing into existing accounts
  const loginEmailPassword = (e) => {
    e.preventDefault();
    setInvalid(false);
    setNewAccErr(false)
    const email = inputLoginEmail.value;
    const password = inputLoginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      })
      .catch((error) => {
        setInvalid(true)
      });
}

//Handling logout
const logOut = async() => {
  await signOut(auth).then(() => {
    setLoggedIn(false);
    setNewAccErr(false);
    setInvalid(false);
  })
}; 
  
//Checking if user is signed in
  useEffect(() => {
  setLoggedIn(false)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } 
    });
}, [auth])

//Rendering HTML
  if (loggedIn === true) {
    return (
      <>
        <h3 id="success"> logged in</h3>
        <button id="logOutNow" onClick={logOut}>
          Logout
        </button>
      </>
    );
  } else {
    return (
      <Fragment key="appWrapperWhole">
        <div className="appWrapper">
          <h1 className="heading">Firebase UI authentication spike</h1>
          <h2>New account</h2>
          <form className="loginForm">
            <div className="inputBlock">
              <label htmlFor="username">
                Email:
                <input id="inputEmail" />
              </label>
              <label htmlFor="password">
                Password:
                <input id="inputPassword" />
              </label>
            </div>
            <button
              htmlFor="loginForm"
              className="submitButton"
              onClick={createAccount}
            >
              Submit
            </button>
            {newAccErr ? <h3 id="err">account creation failed</h3> : <></>}
          </form>
          <h2>Login</h2>
          <form className="loginForm">
            <div className="inputBlock">
              <label htmlFor="username">
                Email:
                <input id="inputLoginEmail" />
              </label>
              <label htmlFor="password">
                Password:
                <input id="inputLoginPassword" />
              </label>
            </div>
            <button
              htmlFor="loginForm"
              className="submitButton"
              onClick={loginEmailPassword}
              >
              Submit
            </button>
              {invalid ? <h4 id="err">invalid login details</h4> : <></>}
          </form>
        </div>
      </Fragment>
    );
  } 
}

export default App
