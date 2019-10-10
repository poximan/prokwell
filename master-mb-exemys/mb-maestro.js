const ModbusRTU = require("modbus-serial");
const comparador = require("./mb-comparador")

// ------------------------------------
// parametrizacion
// ------------------------------------

const DIR_GRAL = 1
const DIR_TRAFO = 161
const DIR_V13_CDA01_TP1 = 241
const DIR_V13_CDA02_SAL1 = 321
const DIR_V33_CDA02_BARRA = 401
const DIR_V33_CDA04_TSA = 481
const DIR_V33_CDA05_TP1 = 561

// ------------------------------------
// conexion
// ------------------------------------

const etsr = new ModbusRTU();
const exemys_mw = new ModbusRTU();

etsr.connectTCP("10.10.3.5", { port: 502 });
exemys_mw.connectTCP("10.10.3.5", { port: 502 });

etsr.setID(1);
exemys_mw.setID(22);

// ------------------------------------
// consultas estado conexion
// ------------------------------------

const estadosConexMW = () => {

  const GRD_ID = 13
  const REG_ESTADO = 16
  const OFFSET = 1

  let reg = (GRD_ID - 1) * 16 + REG_ESTADO - OFFSET

  // FC=4
  exemys_mw.readInputRegisters(reg, 1, (err, data) => {
    if (!err) comparador.comparar(data.data[0], GRD_ID)
  });
}

// ------------------------------------
// consultas estados digitales
// ------------------------------------

const estadosGenerales = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_GRAL - 1, 17, (err, data) => {
    if (!err) comparador.controlar("\ngenerales", data.data)
  });
}

const estadosTrafo = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_TRAFO - 1, 11, (err, data) => {
    if (!err) comparador.controlar("\ntransformador", data.data)
  });
}

const estadosV13Cda01 = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_V13_CDA01_TP1 - 1, 8, (err, data) => {
    if (!err) comparador.controlar("\nv13 cda01 tp1", data.data)
  });
}

const estadosV13Cda02 = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_V13_CDA02_SAL1 - 1, 18, (err, data) => {
    if (!err) comparador.controlar("\nv13 cda02 sal1", data.data)
  });
}

const estadosV33Cda02 = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_V33_CDA02_BARRA - 1, 17, (err, data) => {
    if (!err) comparador.controlar("\nv33 cda02 barra", data.data)
  });
}

const estadosV33Cda04 = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_V33_CDA04_TSA - 1, 9, (err, data) => {
    if (!err) comparador.controlar("\nv33 cda04 tsa", data.data)
  });
}

const estadosV33Cda05 = () => {
  // FC=2 - transacciones byte
  etsr.readDiscreteInputs(DIR_V33_CDA05_TP1 - 1, 17, (err, data) => {
    if (!err) comparador.controlar("\nv33 cda05 tp1", data.data)
  });
}

// ------------------------------------
// frecuencia consulta
// ------------------------------------

// setInterval(estadosGenerales, 3000);
// setInterval(estadosTrafo, 3000);
// setInterval(estadosV13Cda01, 3000);
// setInterval(estadosV13Cda02, 3000);
// setInterval(estadosV33Cda02, 3000);
// setInterval(estadosV33Cda04, 3000);
// setInterval(estadosV33Cda05, 3000);
setInterval(estadosConexMW, 500);
