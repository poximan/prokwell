const fs_origen = require('fs')
const fs_origen_online = require('fs')
const fs_destino = require('fs')
const fs_tam = require('fs')

const tiempo = require("./tiempo")

const arch_parser = require("./arch-parser")
const arch_errores = require("./arch-errores")

const PATH_ORIG = "D://documentos//hugo//git//prokwell//test//PCB-Log 191002.txt"
const PATH_ONLINE = "C://Users//hdonato//AppData//Roaming//Prosoft Technology//PCB//PCB-Log.txt"

// .......................
// acceso a archivo
// .......................

guardar = (cadena, sufijo, cb) => {
  let path = PATH_ORIG

  path =
      path.slice(0, PATH_ORIG.length - 4) +
      sufijo +
      path.slice(PATH_ORIG.length - 4)

  fs_destino.writeFile(path, cadena, (err) => {
    if (err) console.log(err)
  });
}

leer = (cb) => {
  fs_origen.readFile(PATH_ORIG, "utf-8", (err, datos) => {
    if (err) console.log(err)

    const entrada = datos.toString().replace(/\r+\n+/g, '')
    console.log("fin lectura archivo");
    cb(entrada)
  })
}

leer( (entrada) => {
  fechasLog(entrada, (fecha) => {
    arch_parser.procesar(entrada, fecha, (salida) => { guardar(salida, "-proc") })
    arch_errores.procesar(entrada, fecha, (salida) => { guardar(salida, "-fall") })
  })
})

// .......................
// tamaño en bytes
// .......................

tamArchivo = (cb) => {
  cb(fs_tam.statSync(PATH_ORIG).size)
}

// .......................
// fechas inicio-fin log
// .......................
fechasLog = (entrada, cb) => {

  const ind_inicio = entrada.indexOf("Log Start : ");
  const ind_fin = entrada.lastIndexOf("Log Stop : ");
  console.log(ind_inicio),console.log(ind_fin),

  tiempo.estampaTiempo( (fecha) => { cb(fecha) } )
}
