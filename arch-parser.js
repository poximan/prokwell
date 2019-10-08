const EXP_PREG = /(\[[0-9A-F]+\]){8}/gm;

exports.procesar = (entrada, fecha, cb) => {
  const preguntas = entrada.match(EXP_PREG)

  let ind_preg = [0] // arranca en indice 0 para no perder encabezado de PCB-Log

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

  ind_preg.forEach((element, indice) => {
    const pregunta = entrada.slice(element, element + 32) + "\n"
    salida += pregunta
    salida += entrada.slice(element + 32, ind_preg[indice + 1]) + "\n\n"
  })
  cb(salida)
}

console.log("PARSER: modulo cargado");
