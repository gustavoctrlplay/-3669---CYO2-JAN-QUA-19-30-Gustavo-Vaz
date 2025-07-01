const classe = document.getElementById("classe");
const imagem = document.getElementById("imagem");

function trocarImagem() {
    switch (classe.value.toLowerCase()) { 
        case 'barbaro':
            imagem.src = './personagens/barbaro.png';
            break;
        case 'paladino':
            imagem.src = './personagens/paladino.png';
            break;
        case 'druida':
            imagem.src = './personagens/druida.png';
            break;
        case 'mago':
            imagem.src = './personagens/mago.png';
            break;
        case 'monge':
            imagem.src = './personagens/monge.png';
            break;
        case 'guerreiro':
            imagem.src = './personagens/guerreiro.png';
            break;
        default:
            imagem.src = './personagens/gato.png';
    }
}

classe.addEventListener("input", trocarImagem);
