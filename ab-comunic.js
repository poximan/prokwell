const { Controller, Tag } = require("ethernet-ip");

// Intantiate Controller
const PLC = new Controller();

// Subscribe to Tags
let lectura_nivel = new Tag("lectura_nivel")
let LecD_V1ERTU = new Tag("LecD.V1ERTU")

PLC.subscribe(lectura_nivel);
PLC.subscribe(LecD_V1ERTU);

// Connect to PLC at IP, SLOT
PLC.connect("192.1.2.100", 0).then(() => {

  const { name } = PLC.properties;

  // Log Connected to Console
  console.log(`\n\nConnected to PLC ${name}...\n`);

  PLC.readTag(lectura_nivel);
  PLC.readTag(LecD_V1ERTU);

  // Begin Scanning Subscription Group
  PLC.scan().catch((err) => {
    console.error(err);
  })
})

let previos = []
// Initialize Event Handlers
PLC.forEach(tag => {

  tag.on("Changed", (tag, lastValue) => {

    var anterior = previos.find(function(element) {
      return element.name === tag.state.tag.name;
    });

    if(anterior != undefined &&
      Math.abs(anterior.value - tag.state.tag.value) > 5){

        console.log(anterior.value);
        console.log(tag.state.tag.value);
        anterior.value = tag.state.tag.value
      }
    else{
      previos.push({name:tag.state.tag.name, value:tag.state.tag.value})
    }
  });

  tag.on("Initialized", tag => {
    console.log("Initialized", tag.value);
  });
})
