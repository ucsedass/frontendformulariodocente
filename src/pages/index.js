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
  HStack,
  SimpleGrid,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  FaRegSave,
  FaRegCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Index = () => {
  const [sede, setSede] = useState("San Salvador de Jujuy");
  const [correo, setCorreo] = useState("NO");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoInstitucional, setCorreoInstitucional] = useState("");
  const [correoAlternativo, setCorreoAlternativo] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [referenciaAcademica, setReferenciaAcademica] = useState("");
  const [celCodArea, setCelCodArea] = useState(0);
  const [celular, setCelular] = useState(0);

  const [error, setError] = useState(false);
  const [modalExito, setModalExito] = useState(false);

  const enviarFormulario = () => {
    var data = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      sede: sede,
      correo: correo,
      correoPersonal: correoPersonal,
      correoInstitucional: correoInstitucional,
      correoAlternativo: correoAlternativo,
      referenciaAcademica: referenciaAcademica,
      celCodArea: celCodArea,
      celular: celular,
    };
    console.log("parametros_________", data);

    if (
      [
        nombre,
        apellido,
        dni,
        referenciaAcademica,
        celCodArea,
        celular,
      ].includes("")
    ) {
      setError(true);
    } else {
      if (dni === 0 || celCodArea === 0 || celular === 0) {
        setError(true);
      } else {
        clienteAxios("/nuevoformulariodocente", {
          method: "POST",
          data: data,
        })
          .then((respuesta) => {
            console.log(respuesta);
            setModalExito(true);
            setError(false);
            limpiarCampos();
          })
          .catch((error) => {
            console.log(error);
            setError(true);
          });
      }
    }
  };

  const limpiarCampos = () => {
    setDni("");
    setApellido("");
    setNombre("");
    setCorreoInstitucional("");
    setCorreoAlternativo("");
    setReferenciaAcademica("");
    setCorreoPersonal("");
    setCelCodArea("");
    setCelular("");
  };
  useEffect(() => {
    if (correo === "NO") {
      setCorreoInstitucional(" ");
      setCorreoAlternativo(" ");
    }

    if (correo === "SI") {
      setCorreoPersonal(" ");
    }
  }, [correo]);

  return (
    <>
      <Box mt={6}>
        <Center fontSize={"2xl"}>FORMULARIO DOCENTE</Center>
        <Box w="85%" mx="auto" bgColor="white">
          <Box color="black" border="1px" px={10} py={1}>
            <Text fontSize="sm">
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
          {error && (
            <Box bgColor="red.400" color="white" py={4} mt={2}>
              <Center>POR FAVOR COMPLETE TODOS LOS CAMPOS</Center>
            </Box>
          )}
          <SimpleGrid columns={2} spacing={0}>
            <Box px={10}>
              <FormControl mt={3}>
                <FormLabel fontSize={14}>Sede</FormLabel>
                <RadioGroup onChange={setSede} value={sede}>
                  <Stack direction="row">
                    <Radio value="Santiago del Estero">
                      SANTIAGO DEL ESTERO
                    </Radio>
                    <Radio value="San Salvador de Jujuy">
                      SAN SALVADOR DE JUJUY
                    </Radio>
                    <Radio value="Buenos Aires">BUENOS AIRES</Radio>
                    <Radio value="Rafaela">RAFAELA</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize={14}>Dni</FormLabel>
                <Input
                  value={dni}
                  size="sm"
                  type="number"
                  pattern="[0-9]"
                  onChange={(e) => {
                    setDni(e.target.value);
                  }}
                ></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize={14}>Apellido</FormLabel>
                <Input
                  value={apellido}
                  size="sm"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                ></Input>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel fontSize={14}>Nombre</FormLabel>
                <Input
                  value={nombre}
                  size="sm"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                ></Input>
              </FormControl>
            </Box>
            <Box px={10}>
              <FormControl mt={3}>
                <FormLabel fontSize={14}>
                  ¿Ud. ya cuenta con una dirección de correo institucional UCSE?
                </FormLabel>
                <RadioGroup onChange={setCorreo} value={correo}>
                  <Stack direction="row">
                    <Radio value="NO">NO</Radio>
                    <Radio value="SI">SI</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              {correo === "SI" ? (
                <Box>
                  <FormControl mt={3}>
                    <FormLabel fontSize={14}>Cuenta de correo UCSE</FormLabel>
                    <Input
                      value={correoInstitucional}
                      size="sm"
                      onChange={(e) => {
                        setCorreoInstitucional(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                  <FormControl mt={3}>
                    <FormLabel fontSize={14}>
                      Cuenta de correo alternativa(opcional)
                    </FormLabel>
                    <Input
                      value={correoAlternativo}
                      size="sm"
                      onChange={(e) => {
                        setCorreoAlternativo(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </Box>
              ) : (
                <Box>
                  <FormControl mt={3}>
                    <FormLabel fontSize={14}>
                      Email (dirección a donde se enviarán las credenciales de
                      su cuenta Microsoft)
                    </FormLabel>
                    <Input
                      value={correoPersonal}
                      size="sm"
                      onChange={(e) => {
                        setCorreoPersonal(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </Box>
              )}

              <Box>
                <FormControl mt={3}>
                  <FormLabel fontSize={14}>Cátedra y carrera</FormLabel>
                  <Input
                    value={referenciaAcademica}
                    size="sm"
                    onChange={(e) => {
                      setReferenciaAcademica(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={14}>
                    Codigo de area (sin el prefijo 0). Ej: 385
                  </FormLabel>
                  <Input
                    value={celCodArea}
                    type="number"
                    maxLength="3"
                    pattern="[0-9]"
                    size="sm"
                    onChange={(e) => {
                      setCelCodArea(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={14}>
                    Celular (Sin el prefijo 15) Ej: 5888888
                  </FormLabel>
                  <Input
                    value={celular}
                    type="number"
                    pattern="[0-9]"
                    size="sm"
                    onChange={(e) => {
                      setCelular(e.target.value);
                    }}
                  ></Input>
                </FormControl>
              </Box>
            </Box>
          </SimpleGrid>
          <Box>
            <Button
              size="sm"
              mt={2}
              w="100%"
              colorScheme="green"
              onClick={enviarFormulario}
            >
              Enviar formulario
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        isOpen={modalExito}
        onClose={() => {
          setModalExito(false);
        }}
      >
        <ModalOverlay />
        <ModalContent bgColor={"white"}>
          <ModalBody>
            <Center>
              <VStack>
                <Icon w={20} h={20} color="green.500" as={FaRegCheckCircle} />
                <Text>Datos guardados.</Text>
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              size="xs"
              colorScheme="green"
              onClick={() => {
                setModalExito(false);
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
