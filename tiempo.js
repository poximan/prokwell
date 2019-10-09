const msg_ini = "Log Start : "
const msg_fin = "Log Stop : "

let fecha

// .......................
// tamaño en bytes
// .......................

exports.estimarTiempo = (x) => {
  // y = mx + b con b=fecha.ini.fecha
  let tiempo = new Date(fecha.m * x + fecha.ini.fecha.getTime())
  return tiempo.toLocaleString()
}

// .......................
// fechas inicio-fin log
// .......................

/**
 * @param {string} entrada
 * cadena de caracteres que representa el contedio del archivo
 * @return {object} inicio: { posicion, fecha }, fin: { posicion, fecha }, rel_segpos
 */
exports.fechasLog = (entrada) => {

  fecha = {}
  
  const ind_ini = entrada.lastIndexOf(msg_ini)
  const ind_fin = entrada.lastIndexOf(msg_fin)

  const fecha_ini_tmp = entrada
    .substr(ind_ini + msg_ini.length, 17)
    .trim()
    .replace(/\s\s/, ".")
    .split(".")

  const fecha_fin_tmp = entrada
    .substr(ind_fin + msg_fin.length, 17)
    .trim()
    .replace(/\s\s/, ".")
    .split(".")

  let fecha_ini = new Date(
    fecha_ini_tmp[0],     // anio
    fecha_ini_tmp[1]-1,   // mes
    fecha_ini_tmp[2],     // dia
    fecha_ini_tmp[3],     // hora
    fecha_ini_tmp[4],0,0) // minuto, segundo, miliseg

  let fecha_fin = new Date(
    fecha_fin_tmp[0],     // anio
    fecha_fin_tmp[1]-1,   // mes
    fecha_fin_tmp[2],     // dia
    fecha_fin_tmp[3],     // hora
    fecha_fin_tmp[4],0,0) // minuto, segundo, miliseg

  fecha = {
    ini: { pos:ind_ini, fecha:fecha_ini },
    fin: { pos:ind_fin, fecha:fecha_fin },
    m: (fecha_fin - fecha_ini) / (ind_fin - ind_ini)
  }
}

// .......................
//
// .......................

exports.estampaTiempo = (cb) => {
  let tiempo = new Date(Date.now())
  //cb(new Date(tiempo - (180 * 60 * 1000)))
  cb(tiempo)
}
