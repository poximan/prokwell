var fs_origen = require('fs')
var fs_destino = require('fs')

var data_destino;

const PATH_ORIG = "D://documentos//hugo//trabajo//proyectos//se//et soc rural//mb//PCB-Log.txt"
const PATH_DEST = "D://documentos//hugo//trabajo//proyectos//se//et soc rural//mb//PCB-Log-proc.txt"
const EXPRESION = /((\[[0-9A-F]+\])(\\r\\n)?){8}/gm;

fs_origen.readFile(PATH_ORIG, "utf-8", (err, data_origen) => {
  var preguntas = data_origen.toString().match(EXPRESION)

  var output
  var indices = [0]

  preguntas.forEach((element, indice) => {

    let ind_inicio = 0
    if(indices.length > 0) ind_inicio = indices[indice-1]

    indices.push(data_origen.indexOf(element, ind_inicio))
  })

  indices.forEach((element, indice) => {
    output = [data_origen.toString().slice(0, element), '\n', data_origen.slice(element)].join('');
  })

  console.log(preguntas);
  console.log(indices);
  console.log(output);

  fs_destino.writeFile(PATH_DEST, data_destino, (err) => {
    if (err) console.log(err);
    //console.log(data_destino.toString());
  });
});

// busca patron trama pregunta modbus
// /(\[[0-9A-F]+\]){8}/g
// ((\[[0-9A-F]+\])(\\r)?(\\n)?){8}
