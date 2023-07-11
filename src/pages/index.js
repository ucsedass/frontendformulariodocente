import React, { useState, useEffect } from "react";
import clienteAxios from "@/config/axios";
import {
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";

const Index = () => {
  const [sede, setSede] = useState("1");
  const [correo, setCorreo] = useState("0");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const enviarFormulario = () => {
    var data = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      sede: sede,
      correo: correo,
    };
    console.log("parametros_________", sede, correo, nombre, apellido, dni);
    clienteAxios("/nuevoformulariodocente", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box bg="blue.200" mb={0} p={2}>
        <Box w="45%" mx="auto" bgColor="white">
          <Flex bg="blue.600" px={10}>
            <Box w="20%" p={1}>
              <Image src="https://campus.ucse.edu.ar/Imagenes/UCSE.jpg"></Image>
            </Box>
            <Box w="80%" color="white">
              <Text fontSize="4xl">
                Cuentas para Docentes UCSE en Microsoft Office 365 Formulario de
                Alta - Actualización
              </Text>
            </Box>
          </Flex>
          <Box bg="blue.600" color="white" px={10} py={1}>
            <Text fontSize="1xl">
              Estimado Docente, en base a los siguientes datos procederemos a
              generar su correo institucional, con el cual podrá acceder a
              licencias para toda la Suite de Microsoft Office y un espacio en
              la nube de 1TB con OneDrive. En caso que Ud. ya tenga un correo
              institucional en UCSE, solicitamos registre su cuenta a efectos de
              actualizar nuestra base de datos de contactos. Le recordamos que
              con su cuenta puede acceder a todas las aplicaciones de Microsoft
              Office 365 desde http://portal.office.com. NOTAS: - TODOS LOS
              CAMPOS SON OBLIGATORIOS (*). - Sea preciso con el ingreso de los
              datos a los efectos de evitar errores y posteriores
              rectificaciones. - La presente solicitud será desestimada si el
              Nro de Documento ingresado no coincide con datos registrados en
              UCSE. Nota: la creación de su cuenta será procesada dentro de las
              próximas 48hs hábiles.
            </Text>
          </Box>
          <Box px={10} py={2}>
            <FormControl mt={3}>
              <FormLabel>Sede</FormLabel>
              <RadioGroup onChange={setSede} value={sede}>
                <Stack direction="column">
                  <Radio value="1">SANTIAGO DEL ESTERO</Radio>
                  <Radio value="2">SAN SALVADOR DE JUJUY</Radio>
                  <Radio value="3">BUENOS AIRES</Radio>
                  <Radio value="4">RAFAELA</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel>DNI</FormLabel>
              <Input
                onChange={(e) => {
                  setDni(e.target.value);
                }}
              ></Input>
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
              ></Input>
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              ></Input>
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>
                ¿Ud. ya cuenta con una dirección de correo institucional UCSE?
              </FormLabel>
              <RadioGroup onChange={setCorreo} value={correo}>
                <Stack direction="column">
                  <Radio value="0">NO</Radio>
                  <Radio value="1">SI</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Button w="100%" colorScheme="blue" onClick={enviarFormulario}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;
