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
  SimpleGrid,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  VStack,
  Icon,
  Grid,
  GridItem,
  Link,
  FormHelperText,
} from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

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
  const [celCodArea, setCelCodArea] = useState("");
  const [celular, setCelular] = useState("");
  const [error, setError] = useState(false);
  const [modalExito, setModalExito] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const enviarFormulario = (data) => {
    console.log("ddd", data);
    //e.preventDefault();
    const letras = /^[a-zA-Z\s]+$/;
    const numeros = /^[0-9]+$/;
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
      if (
        dni === 0 ||
        celCodArea === 0 ||
        celular === 0 ||
        !dni.match(numeros) ||
        !celCodArea.match(numeros) ||
        !celular.match(numeros)
      ) {
        setError(true);
      } else {
        if (!apellido.match(letras) || !nombre.match(letras)) {
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
      <Box mt={5}>
        <form onSubmit={handleSubmit(enviarFormulario)}>
          <Center fontSize={"2xl"}>FORMULARIO DOCENTE</Center>
          <Box mt={3} w="80%" mx="auto" bgColor="white">
            <Box color="black" border="1px" px={10} py={1}>
              <Text fontSize="sm">
                Estimado Docente, en base a los siguientes datos procederemos a
                generar su correo institucional, con el cual podrá acceder a
                licencias para toda la Suite de Microsoft Office y un espacio en
                la nube de 1TB con OneDrive. En caso que Ud. ya tenga un correo
                institucional en UCSE, solicitamos registre su cuenta a efectos
                de actualizar nuestra base de datos de contactos. Le recordamos
                que con su cuenta puede acceder a todas las aplicaciones de
                Microsoft Office 365 desde{" "}
                <Link color={"blue"} href="http://portal.office.com" isExternal>
                  http://portal.office.com
                </Link>
                . NOTAS: - TODOS LOS CAMPOS SON OBLIGATORIOS (*). - Sea preciso
                con el ingreso de los datos a los efectos de evitar errores y
                posteriores rectificaciones. - La presente solicitud será
                desestimada si el Nro de Documento ingresado no coincide con
                datos registrados en UCSE. Nota: la creación de su cuenta será
                procesada dentro de las próximas 48hs hábiles.
              </Text>
            </Box>
            {error && (
              <Box bgColor="red.400" color="white" py={4} mt={2}>
                <Center>POR FAVOR COMPLETE TODOS LOS CAMPOS</Center>
              </Box>
            )}
            <SimpleGrid columns={{ base: "1", sm: "1", lg: "2" }} spacing={0}>
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
                <FormControl mt={3} isInvalid={errors.dni}>
                  <FormLabel fontSize={14}>Dni</FormLabel>
                  <Input
                    invalid={errors.dni}
                    {...register("dni", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                    aria-invalid={errors.dni ? "true" : "false"}
                    value={dni}
                    size="sm"
                    type="number"
                    pattern="[0-9]"
                    onChange={(e) => {
                      setDni(e.target.value);
                    }}
                  ></Input>
                  {errors.dni ? (
                    <FormHelperText color={"red"}>
                      * DNI inválido.
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl mt={3} isInvalid={errors.apellido}>
                  <FormLabel fontSize={14}>Apellido</FormLabel>
                  <Input
                    {...register("apellido", {
                      required: true,
                      pattern: /^[a-zA-Z\s]+$/,
                    })}
                    aria-invalid={errors.apellido ? "true" : "false"}
                    value={apellido}
                    size="sm"
                    onChange={(e) => {
                      setApellido(e.target.value);
                    }}
                  ></Input>
                  {errors.apellido ? (
                    <FormHelperText color={"red"}>
                      * Apellido inválido.
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl mt={3} isInvalid={errors.nombre}>
                  <FormLabel fontSize={14}>Nombre</FormLabel>
                  <Input
                    {...register("nombre", {
                      required: true,
                      pattern: /^[a-zA-Z\s]+$/,
                    })}
                    aria-invalid={errors.nombre ? "true" : "false"}
                    value={nombre}
                    size="sm"
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  ></Input>
                  {errors.nombre ? (
                    <FormHelperText color={"red"}>
                      * Nombre inválido.
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>
              <Box px={10}>
                <FormControl mt={3}>
                  <FormLabel fontSize={14}>
                    ¿Ud. ya cuenta con una dirección de correo institucional
                    UCSE?
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
                  <FormControl mt={3} isInvalid={errors.referenciaAcademica}>
                    <FormLabel fontSize={14}>Cátedra y carrera</FormLabel>
                    <Input
                      {...register("referenciaAcademica", {
                        required: true,
                      })}
                      aria-invalid={
                        errors.referenciaAcademica ? "true" : "false"
                      }
                      value={referenciaAcademica}
                      size="sm"
                      onChange={(e) => {
                        setReferenciaAcademica(e.target.value);
                      }}
                    ></Input>
                    {errors.referenciaAcademica ? (
                      <FormHelperText color={"red"}>
                        * Referencia académica inválida.
                      </FormHelperText>
                    ) : null}
                  </FormControl>

                  <Grid templateColumns="repeat(3, 1fr)" gap={2} mt={3}>
                    <GridItem w="100%">
                      <FormControl isInvalid={errors.celCodArea}>
                        <FormLabel fontSize={14}>
                          Cod (sin el prefijo 0)
                        </FormLabel>
                        <Input
                          {...register("celCodArea", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                          aria-invalid={errors.celCodArea ? "true" : "false"}
                          value={celCodArea}
                          type="number"
                          maxLength="3"
                          pattern="[0-9]"
                          size="sm"
                          onChange={(e) => {
                            setCelCodArea(e.target.value);
                          }}
                        ></Input>
                        {errors.celCodArea ? (
                          <FormHelperText color={"red"}>
                            * Código de area inválido.
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} w="100%">
                      {" "}
                      <FormControl isInvalid={errors.celular}>
                        <FormLabel fontSize={14}>
                          Celular (Sin el prefijo 15) Ej: 5888888
                        </FormLabel>
                        <Input
                          {...register("celular", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                          aria-invalid={errors.celular ? "true" : "false"}
                          value={celular}
                          type="number"
                          pattern="[0-9]"
                          size="sm"
                          onChange={(e) => {
                            setCelular(e.target.value);
                          }}
                        ></Input>
                        {errors.celular ? (
                          <FormHelperText color={"red"}>
                            * Celular inválido.
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>
              </Box>
            </SimpleGrid>
            <Box mt={3}>
              <Button
                size="sm"
                mt={2}
                w="100%"
                colorScheme="green"
                // onClick={enviarFormulario}
                type="submit"
              >
                Enviar formulario
              </Button>
            </Box>
          </Box>
        </form>
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
