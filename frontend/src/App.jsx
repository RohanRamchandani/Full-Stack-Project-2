import {Box, useColorModeValue} from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom'; 
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}> 
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/create" element={<CreatePage></CreatePage>}></Route>
        </Routes>
      </Box>
    </>
  )
}

export default App