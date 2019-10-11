const tiempo = require("../tiempo")

const EXP_PREG = /(\[[0-9A-F]+\]){8}/gm;
const EXP_PREG_SIMP = /(\[[0-9A-F]+\]){8}/
const TAM_PREG = 32

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
  let ind_no_rep = 0  // evita tomar la misma falla como ocurrencias diferentes
  let cont_falla = 0

  ind_preg.forEach((element, indice) => {

    if(element > ind_no_rep){
      var vecinos = 0

      while ( EXP_PREG_SIMP.test(entrada.substr(element + vecinos * TAM_PREG, TAM_PREG)) ){
        vecinos++
      }
      if(vecinos > 1){
        salida += `tiempo ${tiempo.estimarTiempo(element)} - `
        salida += `falla ${cont_falla++}: inicia en ${element}, repite ${vecinos - 1} veces \n`
        const pregunta = entrada.slice(element, element + vecinos * TAM_PREG) + "\n\n"
        salida += pregunta
        ind_no_rep = element + vecinos * TAM_PREG
      }
    }
  })
  cb(salida)
}

console.log("PARSER ERR: modulo cargado");
