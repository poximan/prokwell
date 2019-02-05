let host = require("./propiedades.json").servidor.host
let puerto = require("./propiedades.json").servidor.puerto
puerto = parseInt(puerto)

if (isNaN(puerto)) {
  console.log("Error: especificar puerto. revisar \"propiedades.json\"");
  process.exit(1);
}

const ab_comunic = require("./ab-comunic");
const mb_esclavo = require("./mb-esclavo");

ab_comunic.conectar(host)
mb_esclavo.puerto(puerto)
