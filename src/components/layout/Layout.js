import React from "react";
import Nav from "./Nav";
import { Box, Text, Center, Image } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      {/* <Nav /> */}
      <Box py={5} bg="blue.500">
        <Center fontSize={{ base: "1xl", sm: "1xl", lg: "3xl" }} color="white">
          <Image></Image>
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
