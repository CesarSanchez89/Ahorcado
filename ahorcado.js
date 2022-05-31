
document.getElementById("guardar").style.display = "none";
document.getElementById("cancelar").style.display = "none";
document.getElementById("palabra").style.display = "none";
document.getElementById("nota").style.display = "none";
document.getElementById("reiniciar").style.display = "none";
document.getElementById("terminar").style.display = "none";
document.getElementById("reloj").style.display = "none";
document.getElementById("crono").style.display = "none";


var a= 0;
var x = 0;
var g = 0; 
var palabraCorrecta = [];
var letrasIncorrectas=[];
var letras = [];

var capitales = ["LIMA", "BOGOTA", "QUITO", "ASUNCION", "CARACAS", "SANTIAGO","TOKYO","ROMA","MADRID","SEUL","PARIS"];
var meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO","AGOSTO","OCTUBRE"];
var simpson=["HOMERO","MARGE","BART","LISA","MAGGIE","ABRAHAM","MILHOUSE","LENNY","SELMA","BARNEY"];
var superhereos=["SUPERMAN","IRONMAN","BATMAN","THOR","HULK","GAMORA","BATWOMAN"];
var anime=["EREN","LUFFY","TANJIRO","GOKU","SAITAMA","SHINJI","NARUTO","ICHIGO","ZORO","VEGETA","NEZUKO","NAMI","MIKASA","BULMA"];
var escritores=["GABO","TOLKIEN","NERUDA","VALLEJO","PIZARNIK","BORGES","ORWELL","COELHO","COETZEE","MURAKAMI"];


function dibujarGuiones(arreglo,lapiz){

    for (var i=0; i<arreglo.length; i++){

        lapiz.beginPath();
        lapiz.moveTo(65+(i*30),420);
        lapiz.lineTo(85+(i*30),420);
        lapiz.stroke();
        lapiz.strokeStyle ="#0A3871";
    }; 
};

function dibujarLinea(pen){

    pen.beginPath();
    pen.moveTo(60,370);
    pen.lineTo(290,370);
    pen.strokeStyle ="#0A3871";
    pen.stroke();
};

function cronometro(){
    var h1 = document.getElementsByTagName('h1')[0];
    var sec = 0;
    var min = 0;

    function tick(){
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
        };
    };
    function add() {
        tick();
        h1.textContent = (min > 9 ? min : "0" + min)
                + ":" + (sec > 9 ? sec : "0" + sec);
        timer();
    };
    function timer() {
        var t = setTimeout(add, 1000);
        if((a==9)||(sec==50)||(palabraCorrecta.join("")==letras.join(""))){
            clearTimeout(t);
        };
        /*botonNuevojuego.onclick=function(){
            clearTimeout(t);
            h1.textContent = "00:00";
            sec = 0; min = 0;
        }*/
    };
    timer();
    
};

function contador() {

    var intervalo = setInterval(function() {
        g += 1;

    if (g == 51) {
        clearInterval(intervalo);

        var pantalla = document.querySelector("canvas");
        var pincel = pantalla.getContext("2d");
        pincel.beginPath();

        pincel.moveTo(100,370);
        pincel.lineTo(100,60);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(100,60);
        pincel.lineTo(210,60);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(210,60);
        pincel.lineTo(210,90);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.beginPath();
        pincel.arc(210,110,20,0,2*3.14,false);
        pincel.fillStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(210,130);
        pincel.lineTo(210,230);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(210,130);
        pincel.lineTo(190,170);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();
        
        pincel.moveTo(210,130);
        pincel.lineTo(230,170);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(210,230);
        pincel.lineTo(190,280);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.moveTo(210,230);
        pincel.lineTo(230,280);
        pincel.strokeStyle ="#0A3871";
        pincel.stroke();

        pincel.font="30pt Arial";
        pincel.fillStyle="red";
        pincel.fillText("FIN DEL JUEGO",250,100,100);

        pincel.font="30pt Arial";
        pincel.fillStyle="red";
        pincel.fillText("TU PALABRA ERA:",250,150,100);

        pincel.font="30pt Arial";
        pincel.fillStyle="blue";
        pincel.fillText(letras.join(""),250,200,100);
    };

    if(palabraCorrecta.join("")==letras.join("")||(a==9)){
        clearInterval(intervalo);
    }

    botonNuevojuego.onclick=function(){
        clearInterval(intervalo);
    }

    }, 1000);

};

function iniciarJuego(lista){ 

    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");

    pincel.fillStyle = "#F3F5FC";
    pincel.fillRect(0,0,390,500);

    dibujarLinea(pincel);

    var rand =Math.floor(Math.random()*lista.length);
    var aleatorio = lista[rand];
    var pep = aleatorio.split("");
    
    for (var b=0;b<pep.length;b++){
        letras.push(pep[b]);
    };
    
    console.log(letras);
       
    dibujarGuiones(letras, pincel);

    function comprobarLetra(b){
        for (s=0;s<letrasIncorrectas.length;s++){
            if(b==letrasIncorrectas[s]){
                return true;
            };
        };
    };

    document.addEventListener('keydown', function(event) {
        const keyName = event.key.toUpperCase();
        detenerEvento(keyName);

            for (var i=0; i<letras.length;i++){  
                if ((keyName == letras[i])&&(keyName!=palabraCorrecta[i])){
                    pincel.fillStyle="#0A3871";
                    pincel.font = "bold 20px arial";
                    pincel.fillText(keyName,65 + (i*30),400);
                    palabraCorrecta[i]=keyName;
                    console.log(palabraCorrecta);   
                };
            };

            if(palabraCorrecta.join("")==letras.join("")){
                pincel.font="20pt Arial";
                pincel.fillStyle="blue";
                pincel.fillText("¡GANASTE,FELICIDADES!",230,100,150);
            };
    });

    document.addEventListener('keydown', function(event) {
        const keyName = event.key.toUpperCase();
        detenerEvento(keyName);
        var expreg = /^[A-Z]$/;

            if (!(expreg.test(keyName))){
                return false;
            };

            if(comprobarLetra(keyName)){
                return false;
            };
            
        
            if (!(letras.includes(keyName))){
                pincel.fillStyle="black";
                pincel.font = "20px arial";
                pincel.fillText(keyName,30+x,450);
                x = x+30;
                letrasIncorrectas[a]=keyName;
                pincel.beginPath();
                
                console.log(letrasIncorrectas);            
               
                if (a==0){  
                  
                    pincel.moveTo(100,370);
                    pincel.lineTo(100,60);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;    
                }               

                else if (a==1){
                    
                    pincel.moveTo(100,60);
                    pincel.lineTo(210,60);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }

                else if (a==2){
                    
                    pincel.moveTo(210,60);
                    pincel.lineTo(210,90);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++
                }

                else if (a==3){
                    
                    pincel.arc(210,110,20,0,2*3.14,false);
                    pincel.fillStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }

                else if (a==4){
                    
                    pincel.moveTo(210,130);
                    pincel.lineTo(210,230);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }

                else if (a==5){
                    
                    pincel.moveTo(210,130);
                    pincel.lineTo(190,170);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }

                else if (a==6){
                    
                    pincel.moveTo(210,130);
                    pincel.lineTo(230,170);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }
                    
                else if (a==7){
                    
                    pincel.moveTo(210,230);
                    pincel.lineTo(190,280);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();
                    a++;
                }

                else if (a==8){
                    
                    pincel.moveTo(210,230);
                    pincel.lineTo(230,280);
                    pincel.strokeStyle ="#0A3871";
                    pincel.stroke();

                    pincel.font="30pt Arial";
                    pincel.fillStyle="red";
                    pincel.fillText("FIN DEL JUEGO",250,100,100);

                    pincel.font="30pt Arial";
                    pincel.fillStyle="red";
                    pincel.fillText("TU PALABRA ERA:",250,150,100);

                    pincel.font="30pt Arial";
                    pincel.fillStyle="blue";
                    pincel.fillText(letras.join(""),250,200,100);
                    a++;
                };
            
            };       
    });
    contador();
    cronometro();
    

    function detenerEvento(evt) {
        if ((a==9)||(palabraCorrecta.join("")==letras.join(""))||(g==51)){
            evt.preventDefault();
        };
    };

};

function myFunction() {
    let elem = document.querySelectorAll(".tema");
    

    elem.forEach(element=>{
        element.addEventListener("click", e =>{
            if(e.target.innerHTML=="Capitales"){
                chosen=[];
                for (var y=0; y<capitales.length;y++){
                    chosen.push(capitales[y]);
                }                
            }
            else if(e.target.innerHTML=="Meses"){
                chosen=[];
                for (var y=0; y<meses.length;y++){
                    chosen.push(meses[y]);
                }
            }
            else if(e.target.innerHTML=="Los Simpson"){
                chosen=[];
                for (var y=0; y<simpson.length;y++){
                    chosen.push(simpson[y]);
                }
            }
            else if(e.target.innerHTML=="Superhereos"){
                chosen=[];
                for (var y=0; y<superhereos.length;y++){
                    chosen.push(superhereos[y]);
                }
            }
            else if(e.target.innerHTML=="Personajes de Animes"){
                chosen=[];
                for (var y=0; y<anime.length;y++){
                    chosen.push(anime[y]);
                }
            }
            else if(e.target.innerHTML=="Escritores"){
                chosen=[];
                for (var y=0; y<escritores.length;y++){
                    chosen.push(escritores[y]);
                }
            };
            
        });
    });
};

myFunction();


var botonIniciar = document.querySelector("#inicio");

botonIniciar.addEventListener("click", function (){

    if(chosen != undefined){
        document.getElementById("inicio").style.display = "none";
        document.getElementById("agregar").style.display = "none";
        document.getElementById("reiniciar").style.display = "initial";
        document.getElementById("terminar").style.display = "initial";
        document.getElementById("milima").style.display = "none";
        document.getElementById("reloj").style.display = "initial";
        document.getElementById("crono").style.display = "initial";

        iniciarJuego(chosen);

    }else{
        alert("")
    };
    
});

function ponleFocus(){
    document.getElementById("palabra").focus();
};


var botonAgregar = document.querySelector("#agregar");

botonAgregar.addEventListener("click",function(){
    
    document.getElementById("inicio").style.display = "none";
    document.getElementById("agregar").style.display = "none";
    document.getElementById("palabra").style.display = "initial";
    document.getElementById("guardar").style.display = "initial";
    document.getElementById("cancelar").style.display = "initial";
    document.getElementById("milima").style.display = "none";

    ponleFocus();

});


var botonGuardar = document.querySelector("#guardar");

botonGuardar.addEventListener("click", function(){

    document.getElementById("guardar").style.display = "none";
    document.getElementById("cancelar").style.display = "none";
    document.getElementById("inicio").style.display = "initial";
    document.getElementById("agregar").style.display = "initial";
    document.getElementById("palabra").style.display = "none";

    var txt = document.querySelector("#palabra");
    var word = txt.value.toUpperCase();    
        
    chosen.push(word);
    console.log(chosen);
    
    document.getElementById("palabra").value = "";

});

var botonNuevojuego = document.querySelector("#reiniciar");

botonNuevojuego.addEventListener("click",function(){  
    
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.clearRect(0,0,390,500);

    a= 0;
    x = 0;
    g =0;
    palabraCorrecta = [];
    letrasIncorrectas=[];
    letras=[];
    console.log(letras);

    var rand =Math.floor(Math.random()*chosen.length);
    var aleatorio = chosen[rand];
    var pep = aleatorio.split("");
    
    for (var b=0;b<pep.length;b++){
        letras.push(pep[b]);
    };

    dibujarLinea(pincel);

    dibujarGuiones(letras, pincel);

    cronometro();

    contador();

});






