// Multiplication of Two Numbers
function multiply(num1, num2) {
    return num1 * num2;
}

// Division of Two Numbers
function divide(num1, num2) {
    return num1 / num2;
}

// Addition of Two Numbers
function add(num1, num2) {
    return num1 + num2;
}

// Subtraction of Two Numbers
function subtract(num1, num2) {
    return num1 - num2;
}

// Modulo between Two Numbers
function modulo(num1, num2) {
    return num1 % num2;
}

// Exponent of a Number
function power(num1, num2) {
    return num1 ** num2;
}

// To input a number into the input area for calculation
var inputs = document.getElementsByClassName("input");
var i = 0;
while (i < inputs.length) {
    inputs[i].addEventListener("click", function () {
        var inputArea = document.getElementById("input-area");
        inputArea.value += this.innerText;
    });
    i++;
}

// To Clear the input area
clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
    var inputAreaClear = document.getElementById("input-area");
    if (inputAreaClear) {
        console.log(inputAreaClear);
        inputAreaClear.value = "";
    }
});


// To move one space backward (delete)
deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function () {
    var inputAreaDelete = document.getElementById("input-area");
    if (inputAreaDelete) {
        // to remove one character in the input expression
        if (inputAreaDelete.value === "Infinity" || inputAreaDelete.value === "NaN"){
            inputAreaDelete.value = "";
        } else{
        inputAreaDelete.value = inputAreaDelete.value.slice(0, -1);
    }
    }
});

// To calculate the result
var resultButton = document.getElementById("equals");
resultButton.addEventListener("click", function () {
    var inputExpression = document.getElementById("input-area");
    if (check_for_validity(inputExpression.value)) {
        calculateResult(inputExpression);
    } else {
        inputExpression.value = "Enter a Valid Expression";
        // To revert back to original placeholder text to type the input expression again after 1.5 seconds
        setTimeout(function(){
            inputExpression.value = "";
        }, 1500);
    }
});


// For validating the input expression for calculation
function check_for_validity(exp) {
    var allowed_chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", ".", "/", "^", "+", "-", "%"];
    var last_char_is_operator = false;

    for (var i = 0; i < exp.length; i++) {
        if (!allowed_chars.includes(exp[i])) {
            return false;
        }
        if (operatorsArray.includes(exp[i])) {
            if (last_char_is_operator) {
                return false;
            }
            last_char_is_operator = true;
        } else {
            last_char_is_operator = false;
        }
    }
    // checking if last character is an operator
    if (operatorsArray.includes(exp[exp.length - 1])) {
        return false;
    }
    // checking if first character is an operator
    if (operatorsArray.includes(exp[0])){
        return false;
    }
    return true;
}


var operatorsArray = ["*", "-", "+", "/", "^", "%"];

// For doing the actual calculation and returning the result
function calculateResult(inputExpression) {
    var exp = inputExpression.value;
    var inputNumbers = findInputNumbers(exp);
    var inputOperators = findOperators(exp);
    
    if (inputNumbers.length <= inputOperators.length) {
        document.getElementById("input-area").value = "Enter a Valid Expression";
        // To revert back to original placeholder text to type the input expression again after 1.5 seconds
        setTimeout(function(){
            document.getElementById("input-area").value = "";
        }, 1500);
    } else {
        while(inputOperators.length !== 0) {
            // to calculate exponent of a number
            while(inputOperators.includes("^")) {
                let index = inputOperators.indexOf("^");
                let result = power(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                inputNumbers.splice(index, 2, result);
                inputOperators.splice(index, 1);
            }
            // to perform multiplication, division, and modulo
            while(inputOperators.includes("*") || inputOperators.includes("/") || inputOperators.includes("%")) {
                let index = inputOperators.findIndex(op => op === "*" || op === "/" || op === "%");
                let result;
                switch(inputOperators[index]) {
                    case "*":
                        result = multiply(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                        break;
                    case "/":
                        result = divide(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                        break;
                    case "%":
                        result = modulo(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                        break;
                }
                inputNumbers.splice(index, 2, result);
                inputOperators.splice(index, 1);
            }
            // to perform addition and subtraction
            while(inputOperators.includes("+") || inputOperators.includes("-")) {
                let index = inputOperators.findIndex(op => op === "+" || op === "-");
                let result;
                switch(inputOperators[index]) {
                    case "+":
                        result = add(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                        break;
                    case "-":
                        result = subtract(Number(inputNumbers[index]), Number(inputNumbers[index + 1]));
                        break;
                }
                inputNumbers.splice(index, 2, result);
                inputOperators.splice(index, 1);
            }
        }
        if (!isNaN(inputNumbers[0])) {
            document.getElementById("input-area").value = inputNumbers[0];
        } else {
            document.getElementById("input-area").value = "Enter a Valid Expression";
            // To revert back to original placeholder text to type the input expression again after 1.5 seconds
            setTimeout(function(){
                document.getElementById("input-area").value = "";
            }, 1500);
        }
    }
}

// To parse the required expression to get the numbers in the expression
function findInputNumbers(exp) {
    var inputNumberList = [];
    var prevOpPos = -1;
    // for iterating through the expression
    for (var i = 0; i < exp.length; i++) {
        // to check if the operator is present in the expression
        if (operatorsArray.includes(exp[i])) {
            inputNumberList.push(exp.slice(prevOpPos + 1, i));
            prevOpPos = i;
        }
    }
    inputNumberList.push(Number(exp.slice(prevOpPos + 1, exp.length)));
    return inputNumberList;
}

// To parse the input expression to find the operators
function findOperators(exp) {
    var operators = [];
    // for iterating through the expression
    for (var i = 0; i < exp.length; i++) {
        // to check if the operator is present in the expression
        if (operatorsArray.includes(exp[i])) {
            operators.push(exp[i]);
        }
    }
    return operators;
}
