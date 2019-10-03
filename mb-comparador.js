const persistencia = require("./persistencia")

// ------------------------------------
//
// ------------------------------------

let anterior

exports.comparar = (estado) => {

  console.log((estado)? "conectado" : "desconectado")

  if (anterior != estado)
    persistencia.pedirTurno(estado)
  anterior = estado
}

exports.controlar = (propietario, valores) => {
  console.log(propietario)
  console.log(valores)
}
