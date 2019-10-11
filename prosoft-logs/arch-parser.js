const tiempo = require("../tiempo")

const EXP_PREG = /(\[[0-9A-F]+\]){8}/gm;

exports.procesar = (entrada, cb) => {

  const preguntas = entrada.match(EXP_PREG)
  let ind_preg = []
  let ind_inicio = 0

  preguntas.forEach((element, indice) => {

    ind_inicio = entrada.indexOf(element, ind_inicio)
    ind_preg.push(ind_inicio)
    ind_inicio += 32
  })

  // .......................
  // guardar nuevo documento
  // .......................

  let salida = ""
  let sin_respuesta = 0

  ind_preg.forEach((element, indice) => {
    salida += `tiempo ${tiempo.estimarTiempo(element)}\n`
    const pregunta = entrada.slice(element, element + 32)
    salida += pregunta

    if(entrada[element + 32] != "["){
      salida += "\n"
      sin_respuesta++
    }
    salida += entrada.slice(element + 32, ind_preg[indice + 1]) + "\n\n"
  })

  console.log(`\nse encontraron ${preguntas.length} preguntas. ${sin_respuesta} con respuesta, ${preguntas.length - sin_respuesta} sin respuesta`);
  cb(salida)
}

console.log("PARSER: modulo cargado");
