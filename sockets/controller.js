

const socketController = (socket) => {
   console.log('cliente conectado', socket.id);

   //mensaje cuando se pierde la conexión con el cliente
   socket.on("disconnect", () => {
      console.log("cliente desconectado", socket.id);
   });
   //mensaje cuando el cliente lanza el evento enviar-mensaje
   //el argumento de la función flecha contiene la info que envió el cliente
   socket.on("enviar-mensaje", (payload, callback) => {
      //se simula un evento id de base de datos
      const id = 12345;
      payload.id = id;
      //en callback se recibe la función que va a ejecutar el cliente entonces le decimos que la ejecute
      callback(id);
     
      //se envía el mensaje a todos los usuarios y se bautiza el evento como enviar-mensaje
      //aunque el nombre puede ser diferente al del evento de arriba ya que son dos eventos separados
      // this.io.emit('enviar-mensaje', payload) //se refleja la info recibida y se envía en broadcasting
      socket.broadcast.emit("enviar-mensaje", payload); //broadcast a TODOS los demás clientes conectados
   });
};

module.exports = {
   socketController
}