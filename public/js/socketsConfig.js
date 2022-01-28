//se configura el socket del cliente, que en este caso es la página web,
//pero podría ser una app o cualquier dispositivo alejado del server

const lobOnline = document.querySelector('#lblOnline');
const lobOffline = document.querySelector("#lblOffline");
const btnEnviar = document.querySelector("#btnEnviar");
const txtMensaje = document.querySelector("#txtMensaje");

const socket = io();

//imprimimos un mensaje para cuando se logra una conexión al servidor
socket.on('connect',()=>{
   // console.log('conectado');

   lobOffline.style.display = 'none';
   lobOnline.style.display = '';
});

//imprimimos un mensaje para cuando el usuario se desconecta del servidor
socket.on("disconnect", () => {
   // console.log("desconectado del servidor");
   lobOffline.style.display = "";
   lobOnline.style.display = "none";
});

//se envía un mensaje de una caja de texto cuando se cliquea un botón
btnEnviar.addEventListener('click', () => {
   const mensaje = txtMensaje.value;
   const payload = {
      mensaje,
      id : 'abc123',
      fecha : new Date().getTime()
   }
   //se llama el evento emit que envía info al server y ponemos un nombre al evento y pasamos la info
   //el 3er argumento es una función que llegará hasta el server y en sus argumentos tendrá la respuesta
   //el server llamará al callback y eso hará que se dispare en el cliente
   socket.emit('enviar-mensaje', payload, (res) => {
      console.log('Desde el server', res)
   });
})

//imprimimos un mensaje para cuando el usuario se desconecta del servidor
socket.on("enviar-mensaje", (payload) => {
   console.log(payload);
});