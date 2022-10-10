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
