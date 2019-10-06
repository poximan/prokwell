var fs_origen = require('fs')
var fs_destino = require('fs')

const PATH_ORIG = "D://documentos//hugo//git//prokwell//test//PCB-Log.txt"
const PATH_DEST = "D://documentos//hugo//git//prokwell//test//PCB-Log-proc.txt"
const EXPRESION = /(\[[0-9A-F]+\]){8}/gm;

fs_origen.readFile(PATH_ORIG, "utf-8", (err, data_origen) => {

  const entrada = data_origen.toString().replace(/\r\n/gm,'')
  const preguntas = entrada.match(EXPRESION)

  let salida = ""
  let indices = [0] // arranca en indice 0 para no perder encabezado de PCB-Log

  preguntas.forEach((element, indice) => {

    let ind_inicio = 0
    if(indices.length > 1) ind_inicio = indices[indice-1]

    indices.push(entrada.indexOf(element, ind_inicio))
  })

  indices.forEach((element, indice) => {
    const pregunta = entrada.slice(element, element + 32) + "\n"
    salida += pregunta
    salida += entrada.slice(element + 32, indices[indice + 1]) + "\n\n"
  })

  console.log(salida);
  console.log(`se encontraron ${preguntas.length} preguntas en ${indices.length - 1} indices`);

  fs_destino.writeFile(PATH_DEST, salida, (err) => {
    if (err) console.log(err);
  });
});
