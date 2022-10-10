import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { resetOperation, voteCandidateAOperation, voteCandidateBOperation } from "./utils/operation"
import { fetchStorage } from "./utils/tzkt";
import Spinner from 'react-bootstrap/Spinner';
import { PulseLoader } from "react-spinners";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { getAccount } from "./utils/wallet";
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Nav } from "./components/navbar/navbar";
import useDarkMode from 'use-dark-mode';

import Mainsection from "./components/main/main";
const lightTheme = createTheme({
  type: 'light'

})

const darkTheme = createTheme({
  type: 'dark'

})


const App = () => {

  const darkMode = useDarkMode(false);


  return (

    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme} >
      <Nav />
      <Mainsection />
    </NextUIProvider>
  );
};

export default App;
