//https://youtu.be/kQIXDZO3ElA Eduen Sarceño Challenge 2: Resolución juego del ahorcado | Oracle Next Education
//función que se ejecute automáticamente
;(function(){  
    'use strict'

    var palabras = [
        'ONE',
        'ALURA',
        'ORACLE',
        'DESAFIO',
        'ENFOQUE',
        'PROGRAMAR',
        'ORACLE',
        'AHORCADO'
    ]

   
   //variable para almacenar la configuración actual
    var juego = null
    //para ver si se ha enviado algun alerta
    var finalizado = false

    var $html={ 
        hombre: document.getElementById('hombre'),
        adivinado: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado')

    }
    // Graficadora de la configuración arbitraria
    function dibujar(juego){
     //Actualizar la imagen del hombre
     var $elem
        $elem = $html.hombre
        var estado = juego.estado
        if (estado == 8){
            estado = juego.previo
        }
        $elem.src = './imagenes/estados/0' +estado + '.png'
        //cambia la imagen

        //Creamos las letras adivinada
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
          //borramos los elementos anteriores
        $elem.innerHTML = ''

        for (let letra of palabra) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode('')
            if (adivinado.indexOf(letra) >= 0){
                $txt.nodeValue = letra
            }
            $span.setAttribute('class', 'letra adivinada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
        // Creamos las leras erradas
        var errado = juego.errado
        $elem = $html.errado
          //borramos los elementos anteriores
        $elem.innerHTML = ''
        for (let letra of errado) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode(letra)
            $span.setAttribute('class', 'letra errada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    function adivinar(juego, letra){

        var estado = juego.estado
        // Si ya se ha perdido, o ganado no hay nada que hacer
        if (estado == 1 || estado == 8) {
            return
        }

        var adivinado = juego.adivinado
        var errado = juego.errado
        // Si ya hemos adivinado o eRrado la letra, no hay nada que hacer
        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
            return
        } 

        var palabra = juego.palabra
        // Si es letra de la palabra, 
        if (palabra.indexOf(letra) >= 0){
            let ganado = true

            //Debemos ver si llegamos al estado ganado
            for (let le of palabra){
                if (adivinado.indexOf(le) < 0 && le != letra){
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            // si ya se ha ganado, debemos indicarlo
            if (ganado){
                juego.estado = 8
            }
            // Agregamos la letra, a la lista de letras adivinadas
            adivinado.push(letra)
        } else {
            //Si no es letra de la palabra, acercamos al hombre un paso más de su horca 
            juego.estado--
            //Agregamos la letra a la lista de letras erradas
            errado.push(letra)
        }
    }
 
    window.onkeypress = function adivinarLetra(e) {
        var letra = e.key
        letra = letra.toUpperCase()
        if (/[^A-ZÑ]/.test(letra)){
            return
        }
      
        adivinar(juego, letra)
        var estado = juego.estado
        if (estado == 8 && !finalizado) {
          setTimeout(alertaGanado,500)
          finalizado = true
        }else if (estado == 1 && !finalizado) {
            let palabra = juego.palabra
            let fn = alertaPerdido.bind(undefined, palabra)
            setTimeout(fn, 500)
            finalizado = true
        }
        dibujar(juego)
    }
    
    window.nuevoJuego = function nuevoJuego() {
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivinado = []
        juego.errado = []
        finalizado = false
        dibujar(juego) 
        console.log(juego)
    }

   function palabraAleatoria() {
      var index = Math.round(Math.random() * palabras.length)
      return palabras[index]
   }

    function alertaGanado(){
        alert('Felicidades, ganastes!')
    }

    function alertaPerdido(palabra){
        alert('Lo siento, perdiste... la palabra era' + palabra)
    }

    
   nuevoJuego()

  

}())




