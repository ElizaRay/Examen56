// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBQE3fLSFSLTTcsHyrwY6HIO77Llsm9rs",
  authDomain: "examen56-2c31e.firebaseapp.com",
  databaseURL: "https://examen56-2c31e-default-rtdb.firebaseio.com",
  projectId: "examen56-2c31e",
  storageBucket: "examen56-2c31e.appspot.com",
  messagingSenderId: "42245834195",
  appId: "1:42245834195:web:7324d207aaa411df4f5b26"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  //obtener datos del html

  var txtUsuario = document.getElementById("usuario");
  var txtMensaje = document.getElementById("mensaje");
  var btnEnviar = document.getElementById("btnenviar");
  var chatlista = document.getElementById("chatlista");
  var fechahora = new Date();
  var fecha = fechahora.toString();
    fecha = fecha.substring(0,24);
  
    //Ejecutar accion en el boton
    btnEnviar.addEventListener("click",function(){
      var usuario = txtUsuario.value;
      var mensaje = txtMensaje.value;
      var html = "<li>"+usuario+" dice: "+mensaje+" "+fecha+"</li>";
  
      chatlista.innerHTML += html;
  
      firebase.database().ref('chat').push({
          user: usuario,
          message: mensaje,
          datetime: fecha
      })
    });
  
    /*Mostrar datos*/
    firebase.database().ref('chat').on('value', (snapshot) => {
      var html1 = '';
      //console.log(snapshot.val());
      snapshot.forEach(function (e){
        var elemento = e.val();
        var usuario1 = elemento.user;
        var mensaje1 = elemento.message;
        var fecha1 = elemento.datetime; 
        html1 += "<li><div class='txt'><img id='profile-photo' src='man.png' class='rounded-circle' width='30px'/>"
        +usuario1+" dice: <div class='chat ml-6 p-3'>"+mensaje1+"</li></div></div><div class='peque'>"+fecha1+"</div>";
        //html1 += "<li><div class='txt'><img id='profile-photo' src='http://nicesnippets.com/demo/man01.png' class='rounded-circle' width='30px'/>"
        //+usuario1+" dice: </br><div class='chat ml-6 p-3'>"+mensaje1+"</li></div></div>";

      });
      chatlista.innerHTML = html1;
    })
