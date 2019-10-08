const EXP_PREG = /(\[[0-9A-F]+\]){8}/gm;
const EXP_PREG_SIMP = /(\[[0-9A-F]+\]){8}/
const TAM_PREG = 32

exports.procesar = (entrada, fecha, cb) => {
  const preguntas = entrada.match(EXP_PREG)

  let ind_preg = []

  preguntas.forEach((element, indice) => {

    let ind_inicio = 0
    if(ind_preg.length > 1) ind_inicio = ind_preg[indice-1]

    ind_preg.push(entrada.indexOf(element, ind_inicio))
  })

  console.log(`se encontraron ${preguntas.length} preguntas en ${ind_preg.length - 1} indices`);

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

        salida += `falla ${cont_falla++}: inicia en ${element}, repite ${vecinos} veces \n`
        const pregunta = entrada.slice(element, element + vecinos * TAM_PREG) + "\n\n"
        salida += pregunta
        ind_no_rep = element + vecinos * TAM_PREG
      }
    }
  })
  cb(salida)
}

console.log("PARSER ERR: modulo cargado");
