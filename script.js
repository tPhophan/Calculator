// operand1(0-9) operator(+-*/=) operand2(0-9)

const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); //array
const clearBtn = document.querySelector('.clear-btn')

const calculate = {
    "+":(operandValue1, operandValue2) => operandValue1+operandValue2,
    "-":(operandValue1, operandValue2) => operandValue1-operandValue2,
    "*":(operandValue1, operandValue2) => operandValue1*operandValue2,
    "/":(operandValue1, operandValue2) => operandValue2!=0?operandValue1/operandValue2 :"ERROR",
    "=":(operandValue1, operandValue2) => operandValue2
}

let operandValue1 = 0;
let operatorValue = '';
let waitForNext = false;

function ft_setNumberValue(value){
    if (waitForNext){
        calculatorDisplay.textContent = value;
        waitForNext = false;
    }
    else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ?value :displayValue + value;
    }
}

function ft_setOperator(value){
    const currentValue = Number(calculatorDisplay.textContent);
    if (operatorValue && waitForNext){
        operatorValue = value;
        return;
    }
    if (!operandValue1){
        operandValue1 = currentValue;
    }
    else{
        const result = calculate[operatorValue](operandValue1,currentValue);
        calculatorDisplay.textContent = result.toFixed(2);
        operandValue1 = result;
        if (operandValue1 === 'ERROR') ft_resetAll();
    }
    operatorValue = value;
    waitForNext = true;
}

function ft_setDecimal(){
    if (waitForNext) return;
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

inputBtn.forEach((input)=>{
    if (input.classList.length === 0){
        //console.log('0-9');
        input.addEventListener('click', ()=>{ft_setNumberValue(input.value)})
    }
    else if (input.classList.contains('operator')){
        //console.log('Operator');
        input.addEventListener('click', ()=>{ft_setOperator(input.value)})
    }
    else{
       //console.log('Equal');
       input.addEventListener('click', ()=>{ft_setDecimal()})
    }
});

function ft_resetAll(){
    calculatorDisplay.textContent = '0';
    operandValue1 = 0;
    operatorValue = '';
    waitForNext = false;
}

clearBtn.addEventListener('click', ()=>ft_resetAll());