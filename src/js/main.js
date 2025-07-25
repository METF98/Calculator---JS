
//Obtenemos las constantes
const btn_once = document.querySelector("#btn_once");
const btn_two = document.querySelector("#btn_two");
const btn_three = document.querySelector("#btn_three");
const btn_four = document.querySelector("#btn_four");
const btn_five = document.querySelector("#btn_five");
const btn_six = document.querySelector("#btn_six");
const btn_seven = document.querySelector("#btn_seven");
const btn_eigth = document.querySelector("#btn_eigth");
const btn_nine = document.querySelector("#btn_nine");
const btn_cero = document.querySelector("#btn_cero");
const btn_suma = document.querySelector("#btn_suma");
const btn_resta = document.querySelector("#btn_resta");
const btn_multiplicar = document.querySelector("#btn_multiplicar");
const btn_dividir = document.querySelector("#btn_dividir");
const btn_point = document.querySelector("#btn_point");
const btn_igual = document.querySelector("#btn_igual");
const btn_delete = document.querySelector("#btn_delete");
const btn_clear = document.querySelector("#btn_clear");
let display = document.querySelector("#display");
let valor = document.querySelector("#valor");

// console.log(btn_once.textContent);
// console.log(btn_two.textContent);
// console.log(btn_three.textContent);
// console.log(btn_four.textContent);
// console.log(btn_five.textContent);
// console.log(btn_six.textContent);
// console.log(btn_seven.textContent);
// console.log(btn_eigth.textContent);
// console.log(btn_nine.textContent);
// console.log(btn_cero.textContent);
// console.log(btn_suma.textContent);
// console.log(btn_resta.textContent);
// console.log(btn_dividir.textContent);
// console.log(btn_multiplicar.textContent);
// console.log(btn_point.textContent);
// console.log(btn_igual.textContent);
// console.log(btn_delete.textContent);
// console.log(btn_clear.textContent);

btn_once.addEventListener("click",concatenar(btn_once,valor));
btn_two.addEventListener("click",concatenar(btn_two,valor));


function concatenar(dato,dato_display){
  if(dato_display.textContent == "0"){
    dato_display.textContent = dato.textContent;
  }else{
    dato_display.textContent += dato.textContent;
  }
}