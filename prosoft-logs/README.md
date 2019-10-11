# Procesador log Prosoft Builder
Este es un analizador exclusivamente diseñado para interpretar la salida de log del monitor de puerto modbus serie, contenido en la aplicacion de escritorio "ProSoft Configuration Builder", provisto por https://www.prosoft-technology.com/ en su linea de productos para Rockwell Automation.
En este caso, se trata de un modulo Modbus Maestro/Esclavo como este https://www.prosoft-technology.com/Products/Rockwell-Automation-In-chassis/Platform/ControlLogix/Modbus-Master-Slave-Enhanced-Network-Interface-Module-for-ControlLogix

## Configuración inicial
Dentro de archivo.js deben agregarse al arreglo PATHS_ORIG, los archivos que desean procesarse. Estos deberan alojarse en ./datos para ser encontrados.

## Parámetros
No posee

## Modo de uso
Configurar archivo.js y luego ejecutar
```
node archivo.js"
```
