exports.estampaTiempo = (cb) => {
  let tiempo = new Date(Date.now())
  //cb(new Date(tiempo - (180 * 60 * 1000)))
  cb(tiempo)
}
