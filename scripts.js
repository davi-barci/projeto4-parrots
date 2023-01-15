const nomeImagens = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif',
'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let imagens = [], indice = 0;

let qtdCartas = prompt("Com quantas cartas você quer jogar? (Digite um valor par entre 4-14)");

while (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0){
    qtdCartas = prompt("Valor Inválido! Digite apenas valores pares entre 4-14!");
}

let cont = 0;
const timerInterval = setInterval(incrementoTimer, 1000);

function incrementoTimer(){
    cont++;
    const textoTimer = document.querySelector(".timer");
    textoTimer.innerHTML = cont;
}

for (let i = 0; i < qtdCartas; i++){
    const elementoAtual = document.createElement("div");
    elementoAtual.classList.add("carta");
    elementoAtual.setAttribute("id", `carta-${i+1}`);
    elementoAtual.addEventListener("click", virarCarta);
    elementoAtual.myParam = `carta-${i+1}`;
    if(i !== 0 && i % 2 == 0){
        indice++;
    }
    elementoAtual.innerHTML += '<div class="front-face"><img src="imagens/cartas/back.png" alt="Card Parrot"/></div>';
    elementoAtual.innerHTML += '<div class="back-face"><img src="imagens/cartas/'+nomeImagens[indice]+'" alt="Card Parrot"/></div>';
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

let primeiraCartaSelecionada = "";
let cartasAcertadas = [];
let podeSelecionarCarta = true;
let qtdJogadas = 0;

function virarCarta(idCartaAtual){
    if (primeiraCartaSelecionada === ""){
        const imagens = document.querySelectorAll(`#${idCartaAtual.currentTarget.myParam} div`);
        imagens[0].classList.add("flip-front-face");
        imagens[1].classList.add("flip-back-face");
        primeiraCartaSelecionada = idCartaAtual.currentTarget.myParam;
        qtdJogadas++;
    }else if (idCartaAtual.currentTarget.myParam != primeiraCartaSelecionada && podeSelecionarCarta === true){
        qtdJogadas++;
        podeSelecionarCarta = false;
        const imagens = document.querySelectorAll(`#${idCartaAtual.currentTarget.myParam} div`);
        imagens[0].classList.add("flip-front-face");
        imagens[1].classList.add("flip-back-face");
        if (comparadorCartas(primeiraCartaSelecionada, idCartaAtual.currentTarget.myParam)){
            cartasAcertadas.push(primeiraCartaSelecionada);
            cartasAcertadas.push(idCartaAtual.currentTarget.myParam);
            document.getElementById(primeiraCartaSelecionada).removeEventListener("click", virarCarta);
            document.getElementById(idCartaAtual.currentTarget.myParam).removeEventListener("click", virarCarta);
            setTimeout(podeSelecionar, 1500);
            setTimeout(function(){
                if(cartasAcertadas.length === Number(qtdCartas)){
                    clearInterval(timerInterval);
                    alert(`Você ganhou em ${qtdJogadas} jogadas! A duração do jogo foi de ${cont} segundos!`);
                }
            }, 500);
        }else{
            setTimeout(desvirarCartas, 1000, primeiraCartaSelecionada, imagens);
            setTimeout(podeSelecionar, 1500);
        }
    }

}

function podeSelecionar(){
    podeSelecionarCarta = true;
    primeiraCartaSelecionada = "";
}

function desvirarCartas(primeiraCarta, segundaCarta){
    segundaCarta[0].classList.remove("flip-front-face");
    segundaCarta[1].classList.remove("flip-back-face");
    const imagensPrimeiraCarta = document.querySelectorAll(`#${primeiraCarta} div`);
    imagensPrimeiraCarta[0].classList.remove("flip-front-face");
    imagensPrimeiraCarta[1].classList.remove("flip-back-face");
}

function comparadorCartas(primeiraCarta, segundaCarta){
    const imagemPrimeiraCarta = document.querySelector(`#${primeiraCarta} .back-face img`);
    const imagemSegundaCarta =  document.querySelector(`#${segundaCarta} .back-face img`);
    if (imagemPrimeiraCarta.getAttribute('src') === imagemSegundaCarta.getAttribute('src')){
        return true;
    }else{
        return false;
    }
}




