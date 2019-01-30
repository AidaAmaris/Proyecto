// Ubicacion imagenes vector img
/* 0  7 14 21 28 35 42
   1  8 15 22 29 36 43
   2  9 16 23 30 37 44
   3 10 17 24 31 38 45
   4 11 18 25 32 39 46
   5 12 19 26 33 40 47
   6 13 20 27 34 41 48*/


//COMPARACION ENTRE IMAGENES DE LA MISMA FILA
//La comparacion se realiza de grupos de a 3 imagenes por fila de arriba a abajo y se
// corre de a una comulna de derecha a izquierda.
// primera columna de la 0 a la 6 se compara: 0 7 14,1 8 15,.....6 13 20
//luego se pasa a la segunda de la 7 a la 13 se compara: 7 14 21, 8 15 22,....13 20 27
// y asi sucesivamente hasta llegar a la 5 columna

//Declaracion de variables
var num;
var objetos = new Array();
objetos[0] = "image/1.png";
objetos[1] = "image/2.png";
objetos[2] = "image/3.png";
objetos[3] = "image/4.png";
var numero = [];
var l;
var lc=[];
var match = [];
var inicialLimg;
var m = [];
var elemento;
var idimg;
var idimgn;
var contador=0;
var cont=0;
var conta=0;
var a=1;
var nl=0;
var fin=0;

var contimganimar=0;
var ini=0;
var res=0;
var lon=0;
var juegotermino;
var juegotermino1;

$( document ).ready(function() {
    imgAleatorias ();
});

//Llammada a iniciar los metodos
$(".btn-reinicio").click(function(){
    comparar();
    temporizador();
    iniciaraReiniciar();
    animaciontitulo();
});

//Metodo usado para aplicar animacion al titulo
function animaciontitulo(){
  $('.main-titulo').animate({color: 'yellow'},100,
    function()
    {
      $('.main-titulo').animate({color: 'white'},100,
    	function()
      {
        animaciontitulo();
      });
    });
}

//Metodo cambio iniciar reiniciar
function iniciaraReiniciar(){
  if ($(".btn-reinicio").text()=="Iniciar") {
      $(".btn-reinicio").text("Reiniciar");
      $(".btn-reinicio").click(function(){
        iniciardenuevo();
        temporizador();
      });
  }else if (($(".btn-reinicio").text()=="Reiniciar")) {
      $(".btn-reinicio").text("Iniciar");
      $(".btn-reinicio").click(function(){
        iniciardenuevo();
      });
  }
}

//Metodo para comenzar de nuevo
function iniciardenuevo(){
  ini=1;
  $("#timer").timer('remove');
  cont=0;
  $("#movimientos-text").text(cont);
  conta=0;
  $("#score-text").text(conta);
  //temporizador();
  resetear();
  res=1;
}

//Metodo para borrar todo al presionar Reiniciar
function resetear(){
  if (res==1) {
    lon=$("img").length;
    for (var i = 0; i<=lon-1; i++) {
        $("img")[0].remove()
    }
    conta=0;
    $("#score-text").text(conta);
    imgAleatorias();
    contador=1;
    comparar();
  }
  res=0;
}

//Metodo para contabilizar el Tiempo
function temporizador(){
  $('#timer').timer({
      countdown: true,
      duration: "2m", //'1m',
      callback: function() {
          $('.panel-tablero').hide(2000)
          $('.time').hide(2000);
          $('.panel-score').css("width", "100%");
          $("#score-text").text(conta);
          $(".score").before("<h1>Juego terminado</h1>")
          juegotermino = $($(".panel-score").children()[0]).addClass("data-info")
          juegotermino1= juegotermino.css({"text-align":"center","font-size":"60px"})
          fin=1;
          $(".btn-reinicio").click(function(){
            fin=0;
            juegotermino.remove();
            $('.panel-tablero').show();
            $('.time').show();
            $('.panel-score').css("width", "25%");
          });
      },
      repeat: true //repeatedly calls the callback you specify
  });
}

//Metodo usado para generar las imagenes de manera aleatoria
function imgAleatorias (){
  for (var j = 0; j <=6; j++) {
      for ( i = 0; i <=6; i++) {
        num = Math.floor(Math.random() * 4);
        $($('.panel-tablero').children()[j]).prepend($('<img>',{class:'elemento', src:objetos[num]}));
    }
  }inicialLimg =$("img").length;
  for (var i = 0; i < inicialLimg; i++) {
    $($("img")[i]).attr("Id",[i])
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//Metodo Drag and Drop
function mover(){
  if ($(".btn-reinicio").text()=="Reiniciar") {
    contador=0;
    $("img").draggable()
    $("img").draggable( 'enable' )
    $(".elemento").mousedown(function() {
      idimg=$(this).attr('id');
      idimgn=parseFloat(idimg)
      $($("img")[idimgn]).draggable({connectWith:$($("img")[idimgn+7]),connectWith:$($("img")[idimgn-7]),helper:'clone'})
      $($("img")[idimgn+7]).droppable({drop: eventDropquince,tolerance: "pointer"})
      $($("img")[idimgn-7]).droppable({drop: eventDropsiete,tolerance: "pointer"})
      $($("img")[idimgn+1]).droppable({drop: eventDropnueve,tolerance: "pointer"})
      $($("img")[idimgn-1]).droppable({drop: eventDropuno,tolerance: "pointer"})
      //Evento drop
        function eventDropquince(evento,ui){
            m[idimgn]=$($("img")[idimgn]).attr('src')
            m[idimgn+8]=$($("img")[idimgn+8]).attr('src')
            $($("img")[idimgn+8]).attr('src',m[idimgn])
            $($("img")[idimgn]).attr('src',m[idimgn+8])
            contador=contador+1;
            if (contador<=3) {
              cont=cont+1
              $("#movimientos-text").text(cont);
            }else {
              cont=cont;
              $("#movimientos-text").text(cont);
            }}
        function eventDropsiete(evento,ui){
            m[idimgn]=$($("img")[idimgn]).attr('src')
            m[idimgn-7]=$($("img")[idimgn-7]).attr('src')
            $($("img")[idimgn-7]).attr('src',m[idimgn])
            $($("img")[idimgn]).attr('src',m[idimgn-7])
            contador=contador+1;
            if (contador<=3) {
              cont=cont+1
                $("#movimientos-text").text(cont);
            }else {
              cont=cont;
                $("#movimientos-text").text(cont);
            }}
        function eventDropnueve(evento,ui){
            m[idimgn]=$($("img")[idimgn]).attr('src')
            m[idimgn+1]=$($("img")[idimgn+1]).attr('src')
            $($("img")[idimgn+1]).attr('src',m[idimgn])
            $($("img")[idimgn]).attr('src',m[idimgn+1])
            contador=contador+1;
            if (contador<=3) {
              cont=cont+1
                $("#movimientos-text").text(cont);
            }else {
              cont=cont;
                $("#movimientos-text").text(cont);
            }}
        function eventDropuno(evento,ui){
            m[idimgn]=$($("img")[idimgn]).attr('src')
            m[idimgn-1]=$($("img")[idimgn-1]).attr('src')
            $($("img")[idimgn-1]).attr('src',m[idimgn])
            $($("img")[idimgn]).attr('src',m[idimgn-1])
            contador=contador+1;
            if (contador<=3) {
              cont=cont+1
              $("#movimientos-text").text(cont);
            }else {
              cont=cont;
              $("#movimientos-text").text(cont);
            }}
      $("img").removeClass().addClass("elemento")
      callagain();
    });
  }
}

//Metodo usado para verificar si el usuario realizo 3 movimientos
function callagain(){
  if (contador>=2) {
    $("img").draggable('disable')
    setTimeout("comparar()",1500);
  }
}

// Metoto usado para comparar las imagenes y verificar si son iguales entre ellas
function comparar(){
    for (var i = 0; i<=46; i++) {
      if (i==5 || i==6 || i==12 || i==13 || i==19 || i==20 || i==26 || i==27 || i==33 || i==34 || i==40 || i==41) {
    }else {
      if ($("img")[i].src==$("img")[i+1].src && $("img")[i+1].src==$("img")[i+2].src){
        numero[i]="si";
      }else {
        numero[i]="no";
      }
     }
    }

    for (var i = 0; i<=34; i++) {
      if ($("img")[i].src==$("img")[i+7].src && $("img")[i+7].src==$("img")[i+14].src){
        numero[i+49]="si";
      }else {
        numero[i+49]="no";
      }
   }
   if(numero.includes("si")==true && contador>=2){
        setTimeout("remover()",100);
   }else{
        setTimeout("mover()",50);
   }
}


//Metodo usado para guardar las imagenes parecidas en un array
function remover (){
  for (var i = 0; i <=46; i++) {
    if (i==5 || i==6 || i==12 || i==13 || i==19 || i==20 || i==26 || i==27 || i==33 || i==34 || i==40 || i==41) {
    }else {
      if(numero[i]=="si"){
        match.push($("img")[i]);
        match.push($("img")[i+1]);
        match.push($("img")[i+2]);
      }
    }
  }

  for (var i = 49; i <=83; i++) {
    if(numero[i]=="si"){
      match.push($("img")[i-49]);
      match.push($("img")[i-42]);
      match.push($("img")[i-35]);
    }
  }
  l = match.length;
  eliminar();
  return contador=0;
}

//Metodo usado para eliminar los indices de las imagenes almacenadas repetidos
function eliminar(){
  for (var i = 0; i <l; i++) {
    for (var j = a; j <l; j++) {
      if (match[i]==match[j]) {
        match.splice(j,1);
        l-1
      }
    }  a=a+1;
  }
  nl = match.length;
  contimganimar=1;
  setTimeout("imgAnimar()",2);
}

//Metodo usado para animar las imagenes antes de eliminarlas
function imgAnimar(){
  if (fin==1) {
    resetear();
  }else if (fin==0) {
    if (contimganimar==1 ) {
      if (numero.includes("si")==true) {
        for (var i = 0; i <=nl; i++) {
          $(match[i]).animate({opacity: 0}).delay(50)
          $(match[i]).animate({opacity: 1}).delay(50)
          $(match[i]).animate({opacity: 0}).delay(50)
          $(match[i]).animate({opacity: 1}).delay(50)
          $(match[i]).animate({opacity: 0}).delay(50)
          $(match[i]).animate({opacity: 1}).delay(50)
          $(match[i]).animate({opacity: 0}).delay(50)
          $(match[i]).animate({opacity: 1}).delay(50)
        }
      setTimeout("quitar()",4000)
      }else {
        mover();
      }
    }
    contimganimar=0;
  }
}

//Metodo usado para desaparecer de la pantalla las imagenes parecidas
function quitar(){
    if (fin==1) {
      resetear();
    }else if (fin==0) {
      $(match).remove();
      setTimeout("rellenar()",1000)
    }
  }

//Metodo usado para rellenar de nuevo la pantalla
function rellenar(){
  if (fin!=1) {
    for (var j = 0; j <=6; j++) {
      lc.push( $($($('.panel-tablero').children()[j]).children()).length);
      for (var i = 0; i < 7-lc[j]; i++) {
        num = Math.floor(Math.random() * 4);
        $($('.panel-tablero').children()[j]).prepend($('<img>',{class:'elemento', src:objetos[num]}));
        conta=conta+1;
      }
      for (var i = 0; i < inicialLimg; i++) {
        ($($("img")[i]).removeAttr("Id")).attr("Id",[i])
      }
    }lc.splice(0,lc.length);
    $("#score-text").text(conta);
    setTimeout("comparar()",1000)
  }
}
