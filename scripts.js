const nomeImagens = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif',
'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let imagens = [], indice = 0;

let qtdCartas = prompt("Com quantas cartas você quer jogar? (Digite um valor par entre 4-14)");

while (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0){
    qtdCartas = prompt("Valor Inválido! Digite apenas valores pares entre 4-14!");
}

for (let i = 0; i < qtdCartas; i++){
    const elementoAtual = document.createElement("div");
    elementoAtual.classList.add("carta");
    if(i !== 0 && i % 2 == 0){
        indice++;
    }
    elementoAtual.innerHTML += '<img class="activated" src="imagens/cartas/back.png" alt="Card Parrot"/>';
    elementoAtual.innerHTML += '<img class="disabled" src="imagens/cartas/'+nomeImagens[indice]+'" alt="Card Parrot"/>';
    imagens.push(elementoAtual);
}

imagens.sort(comparador);
const container = document.querySelector(".container-cartas");

for (let j = 0; j < imagens.length; j++){
    container.appendChild(imagens[j]);
}

function comparador() { 
	return Math.random() - 0.5; 
}






