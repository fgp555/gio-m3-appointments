"use strict";
const test = "prueba1";
console.log(test);
const usuario1 = {
    name: "maria",
    email: "maria@mail",
    age: 25,
    isClient: true,
};
const consultorio1 = {
    local: "local1",
    clientes: [usuario1],
};
// console.log(consultorio1)
function consultorio1Funcion(parametro1) {
    return parametro1;
}
// console.log(consultorio1Funcion(consultorio1))
const suma = (num1, num2) => {
    return num1 + num2 + "num";
};
console.log(suma(2, 4));
const resta = (num1, num2) => {
    console.log(num1 - num2);
};
resta(5, 3);
