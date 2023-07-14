import React from "react";
import Nav from "./Nav";
import { Box, Text, Center } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      {/* <Nav /> */}
      <Box h={20} bg="blue.400">
        <Center fontSize="4xl" color="white">
          <Text>
            Cuentas para Docentes UCSE en Microsoft Office 365 Formulario de
            Alta - Actualización
          </Text>
        </Center>
      </Box>
      {props.children}
    </>
  );
};

export default Layout;
