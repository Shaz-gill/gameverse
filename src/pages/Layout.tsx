import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box
        maxW="1600px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={5}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
