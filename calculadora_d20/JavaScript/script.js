let forBase = document.getElementById("forBase")
let conBase = document.getElementById("conBase")
let intBase = document.getElementById("intBase")
let sabBase = document.getElementById("sabBase")
let carBase = document.getElementById("carBase")
let desBase = document.getElementById("desBase")


let forD20 = document.getElementById("forD20")
let conD20 = document.getElementById("conD20")
let intD20 = document.getElementById("intD20")
let sabD20 = document.getElementById("sabD20")
let carD20 = document.getElementById("carD20")
let desD20 = document.getElementById("desD20")


let forMod = document.getElementById("forMod")
let conMod = document.getElementById("conMod")
let intMod = document.getElementById("intMod")
let sabMod = document.getElementById("sabMod")
let carMod = document.getElementById("carMod")
let desMod = document.getElementById("desMod")

let forTotal = document.getElementById("forTotal")
let conTotal = document.getElementById("conTotal")
let intTotal = document.getElementById("intTotal")
let sabTotal = document.getElementById("sabTotal")
let carTotal = document.getElementById("carTotal")
let desTotal = document.getElementById("desTotal")

function somar(n1, n2){
    return n1 + n2
}

const gerarNumeroAleatorio = () => {
    let array_numeros_aleatorios = []

    for(let i = 0; i < 6; i++){
        array_numeros_aleatorios[i] = Math.floor(20 * Math.random() + 1)
    }
    return array_numeros_aleatorios
}

const recarregarPagina = () => {
    window.location.reload(true)
}


const camposD20 = () => {
    numeros_d20 = gerarNumeroAleatorio()

    forD20.value = numeros_d20[0]
    desD20.value = numeros_d20[1]
    conD20.value = numeros_d20[2]
    intD20.value = numeros_d20[3]
    sabD20.value = numeros_d20[4]
    carD20.value = numeros_d20[5]
    modificador(numeros_d20)
}

const modificador = (numeros_aleatorios) => {
    numeros_d20 = numeros_aleatorios
    let mod = []

    for(let i =0; i < 6; i++){
        valor = numeros_d20[i]
        if (valor > 15) {
            mod[i] = Math.round(1 + (valor/1.2))
        } else if(valor > 7) {
            mod[i] = (0 + (valor / 1.2)).toFixed(0)
        } else {
            mod[i] = Math.round(-1 + (valor / 1.2))
        }
    }
    forMod.value = mod[0]
    desMod.value = mod[1]
    conMod.value = mod[2]
    intMod.value = mod[3]
    sabMod.value = mod[4]
    carMod.value = mod[5]
}

const calcular = () => {
    forTotal.value = Number(forBase.value) + Number(forMod.value)
    desTotal.value = Number(desBase.value) + Number(desMod.value)
    conTotal.value = Number(conBase.value) + Number(conMod.value)
    intTotal.value = Number(intBase.value) + Number(intMod.value)
    sabTotal.value = Number(sabBase.value) + Number(sabMod.value)
    carTotal.value = Number(carBase.value) + Number(carMod.value)
}

const btnCalcular = document.getElementById("calcular")
const bntDado = document.getElementById("dado")
const btnResetar = document.getElementById("resetar")

btnCalcular.addEventListener("click", calcular)
bntDado.addEventListener("click", camposD20)
btnResetar.addEventListener("click", recarregarPagina)