/**
 * Declaracion de las constantes
 */
const btn_number = document.querySelectorAll(".btn-number");
const btn_operator = document.querySelectorAll(".btn-operator");
const btn_point = document.querySelector("#btn-point");
const btn_igual = document.querySelector("#btn-igual");
const btn_delete = document.querySelector("#btn-delete");
const btn_clear = document.querySelector("#btn-clear");
const body = document.querySelector("#body");
let valor = document.querySelector("#valor");
let display = document.querySelector("#display");
let historial = document.querySelector("#historial");
let updateDisplay = false;
let isResult = false;

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
btn_igual.addEventListener("click", () => calculateResult());

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
  updateDisplay = false;
  isResult = false;
  validaDisplay();
});

/**
 * Funcion que nos permite añadir los datos al display
 * @param {Object} dato @example "1"
 * @param {Boolean} operador @example false or true
 * @returns {String} @example "1" or "1 + " or "1 + 1"
 */
function addDisplay(dato,operador = false) {
  if(!operador){
    if (valor.textContent == 0 || !updateDisplay) {
      if(validaDisplay(valor.textContent)){
        if(isResult) {
          historial.textContent = "";
          valor.textContent = dato;
          updateDisplay = true;
          isResult = false;
        }else{
          valor.textContent = dato;
          updateDisplay = true;
        }
      }else{
        display.classList.add("bg-red-500");
        setTimeout(() => {
          display.classList.remove("bg-red-500");
        },500);
      }
    }else{
      if(validaDisplay(valor.textContent)){
        valor.textContent += dato;
      }else{
        display.classList.add("bg-red-500");
        setTimeout(() => {
          display.classList.remove("bg-red-500");
        },500);
      }
    }
  }else if(operador){
    if(valor.textContent != 0){
      if(validaDisplay(valor.textContent)){
        historialDisplay(dato);
        updateDisplay = true;
        valor.textContent = 0;
      }else{
        display.classList.add("bg-red-500");
        setTimeout(() => {
          display.classList.remove("bg-red-500");
        },500);
      }
    }
  }
}

/**
 * Validamos el tamaño del display para que no se sobrepase
 * @returns {Boolean} @example true or false
 */
function validaDisplay(){
  if (valor.textContent.length <= 25) {
    if (valor.textContent.length <= 15) {
      valor.classList.remove("text-[1.5rem]");
      valor.classList.add("text-[2.5rem]");
      return true;
    }else{
      valor.classList.remove("text-[2.5rem]");
      valor.classList.add("text-[1.5rem]");
      return true;
    }
  }else{
    return false;
  }
}


/**
 * Funcion que nos permite guardar la operacion en el historial
 * @param {String} operator @example "1 +" or "1 + 1"
 */
function historialDisplay(operator) {
    if (isResult) {
      validaDisplay();
      historial.textContent = ' ' + valor.textContent + ' ' + operator + ' ';
      valor.textContent = 0;
      isResult = false;
    }else{
      validaDisplay();
      historial.textContent += ' ' + valor.textContent + ' ' + operator + ' ';
      valor.textContent = 0;
    }
}

/**
 * Funcion que nos permite calcular el resultado de la operacion
 * @returns {String} @example "1"
 */
function calculateResult() {
  if (historial.textContent && valor.textContent &&  valor.textContent >= 0) {
    const expression = historial.textContent + ' ' + valor.textContent;
    try {
      const result = operar(expression);
      historial.textContent = expression ;
      if(result == "Math Error"){
        valor.textContent = result;
        updateDisplay = false;
        isResult = false;
        display.classList.add("bg-red-500");
        setTimeout(() => {
          display.classList.remove("bg-red-500");
          historial.textContent = "";
          valor.textContent = 0;
        },1000);
      }else{
        valor.textContent = result;
        validaDisplay();
        updateDisplay = false;
        isResult = true;
      }
    }catch (e) {
      if (valor.textContent != 0){
        let error = document.createElement("p");
        error.textContent = "Debes Seleccionar un Operador";
        error.classList.add("text-red-500","text-center","font-bold","text-2xl","mb-6");
        body.insertBefore(error, body.children[1]);
        console.log(e);
        setTimeout(() => {
          error.remove();
        },"2000");
      }else{
        historial.textContent = "";
        valor.textContent = 0;
      }
    }
  }else{
    historial.textContent = "";
    valor.textContent = 0;
  }
}


/**
 * Funcion que nos permite operar los datos
 * @example "1 + 1 = 2"
 * @param {String} evaluacion @example "1 + 1"
 * @returns {String} @example "2" or "Math Error"
 */
function operar(evaluacion) {
  if(eval(evaluacion) == "Infinity"){
    return "Math Error";
  }else{
    return eval(evaluacion);
  }

}