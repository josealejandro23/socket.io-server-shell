const express = require("express");
var cors = require("cors");
const { socketController } = require("../sockets/controller");
require("dotenv").config();

class ServidorSencillo {
   constructor() {
      (this.port  = process.env.PORT),
      this.app    = express(),
      //se crea un objeto server que se encargara del manejo de sockets
      this.server = require('http').createServer(this.app);
      //se levanta el servicio que escucha sockets
      this.io = require("socket.io")(this.server);

      this.paths  = {};
      //middlewares
      this.middlewares();
      //rutas de la aplicación
      this.rutas();

      //configuración de sockets, aquí se configuran los eventos asociados a sockets
      this.sockets();
   }

   middlewares() {
      //se usa el paquete de cors para configurar esta característica del server
      this.app.use(cors());
      //se sirve el index.html de la carpeta public cuando se llama al server sin path en el url
      this.app.use(express.static("public"));
   }

   rutas() {
      //al usar el sgte middleware indico que cuando se llame a la ruta api/usuarios se dirijan las peticiones
      //al objeto de ruta del archivo y allí se manejará la respuesta
      // this.app.use(this.paths.pathLogin, require("../routes/login"));
   }

   sockets(){
      //socket es el nombre del argumento de esa función y puede ser cliente o cualquier nombre
      //connection es el nombre del evento y se dispara cuando un cliente se conecta al server
      this.io.on("connection", socketController);
   }

   inicio() {
      //--en lugar de levantar el objeto app se levanta el objeto server que es el de la configuración de sockets
      this.server.listen(this.port, async () => {
         console.log("Server corriendo en", this.port.toString());
      });
   }
}

module.exports = ServidorSencillo;
