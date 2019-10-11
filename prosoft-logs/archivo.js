const fs_origen = require('fs')
const fs_origen_online = require('fs')
const fs_destino = require('fs')

const tiempo = require("../tiempo")

const arch_parser = require("./arch-parser")
const arch_errores = require("./arch-errores")

const PATHS_ORIG = [
  ".//datos//PCB-Log 191002 1.txt",
  ".//datos//PCB-Log 191002 2.txt",
  ".//datos//PCB-Log 191003.txt",
  ".//datos//PCB-Log 191007 1.txt",
  ".//datos//PCB-Log 191007 2.txt",
  ".//datos//PCB-Log 191008.txt",
  ".//datos//PCB-Log 191010 1.txt",
  ".//datos//PCB-Log 191010 2.txt"
]
const PATH_ONLINE = "C://Users//hdonato//AppData//Roaming//Prosoft Technology//PCB//PCB-Log.txt"

// .......................
// acceso a archivo
// .......................

guardar = (path, cadena, sufijo) => {

  let nuevo_path = path

  nuevo_path =
    nuevo_path.slice(0, path.length - 4) +
    sufijo +
    nuevo_path.slice(path.length - 4)

  fs_destino.writeFile(nuevo_path, cadena, (err) => {
    if (err) console.log(err)
  });
}

leer = (path, cb) => {
  fs_origen.readFile(path, "utf-8", (err, datos) => {
    if (err) console.log(err)

    const entrada = datos.toString().replace(/\r+\n+/g, '')
    console.log("\nleyendo " + path.substring(path.lastIndexOf("//") + 2));
    cb(entrada)
  })
}
for(let path of PATHS_ORIG) {
  leer(path, (entrada) => {
    tiempo.fechasLog(entrada)

    arch_parser.procesar(entrada, (salida) => {
      if(salida.length > 0)
        guardar(path, salida, "-proc")
    })
    arch_errores.procesar(entrada, (salida) => {
      if(salida.length > 0)
        guardar(path, salida, "-fall")
    })
  })
}
