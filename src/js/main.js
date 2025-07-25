/**
 * Declaracion de las constantes
 */
const btn_number = document.querySelectorAll(".btn-number");
const btn_operator = document.querySelectorAll(".btn-operator");
const btn_point = document.querySelector("#btn-point");
const btn_igual = document.querySelector("#btn-igual");
const btn_delete = document.querySelector("#btn-delete");
const btn_clear = document.querySelector("#btn-clear");
let valor = document.querySelector("#valor");
let display = document.querySelector("#display");
let historial = document.querySelector("#historial");
let dispayReset = false;

/**
 * Eventos de los botones
*/
btn_number.forEach(button => {
  button.addEventListener("click",() => addDisplay(button.textContent));
});


btn_operator.forEach(button => {
  button.addEventListener("click",() => addDisplay(button.textContent,true));
})

btn_point.addEventListener("click",() => addDisplay(btn_point.textContent));
btn_igual.addEventListener("click",calculateResult());

/**
 * Funcion que nos permite
 * limpiar un dato
*/
btn_delete.addEventListener("click",() => {
  if(valor.textContent.length > 1){
    valor.textContent = valor.textContent.toString().slice(0,-1);
  }else{
    valor.textContent = 0;

  }
});

/**
 * Funcion que nos permite
 * limpiar todos los datos
*/
btn_clear.addEventListener("click",() => {
  valor.textContent = 0;
  historial.textContent = "";
  dispayReset = false;
});

/**
 * Funcion que nos permite añadir los datos al display
 * @param {Object} dato
 * @returns {String} @example "1"
 */
function addDisplay(dato,operador = false) {
  if (valor.textContent == 0 || dispayReset) {
    if(dato!="+" && dato!="-" && dato!="*" && dato!="/"){
    valor.textContent = dato;
    dispayReset = false;
    }
  }else{
    if(operador){
      getOperator(dato);
      valor.textContent += dato;
    }else{
      valor.textContent += dato;
    }
  }
}


/**
 * Funcion que nos permite guardar el operador
 * @param {String} operator @example "+"
 * @returns {String} @example "1 + "
 */
function getOperator(operator) {
    if (historial.textContent && !resetDisplay) {
        calculateResult();
    }
    historial.textContent = valor.textContent + ' ' + operator;
    resetDisplay = true;
}


function calculateResult() {
  if (historial.textContent && valor.textContent) {
      const expression = historial.textContent + ' ' + valor.textContent;
      try {
          const result = operar(expression);
          historial.textContent = expression + ' =';
          valor.textContent = result.toString();
          resetDisplay = true;
      } catch (error) {
          valor.textContent = 'Error';
          resetDisplay = true;
      }
  }
}

/**
 * Funcion para guardar el registro del operacion solicitada
 * @param {String} proceso @example "1 + 1"
 * @returns {String} @example "1 + 1"
 */
// function calculo_historial(proceso){
//   if(historial.textContent != "" && valor.textContent != 0){
//     return historial.textContent += proceso;
//   }else{
//     return historial.textContent = proceso;
//   }
// }

/**
 * Funcion que nos permite operar los datos
 * @example "1 + 1 = 2"
 * @returns {String} @example "2"
 */
function operar(evaluacion) {
  return eval(evaluacion);
}