//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//variáveis para contabilizar pontos
let colidiu = false;
let chanceDeErrar = 0;

//variável para imprimir imagem
let imagemDoCampo;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// zagueiro oponente
let xZagueiroOponente = 137;
let yZagueiroOponente = 200;
let zagueiroOponenteComprimento = 45;
let zagueiroOponenteAltura = 8;

// meu zagueiro
let xMeuZagueiro = 356
let yMeuZagueiro = 250
let meuZagueiroComprimento =45
let meuZagueiroAltura = 8

//variáveis do atacante
let xAtacante = 67;
let yAtacante = 150;
let atacanteComprimento = 8;
let atacanteAltura = 45;

//variáveis do atacante Oponente
let xAtacanteOponente = 525;
let yAtacanteOponente = 150;
let velocidadeYOponente;
let velocidadeMeuZagueiro;

// variáveis da minha baliza
let xBaliza = 2;
let yBaliza = 150;
let balizaComprimento = 10;
let balizaAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;


//variáveis baliza do Oponente
let xBalizaOponente = 585;
let yBalizaOponente = 150;
let balizaOponenteComprimento = 10;
let balizaOponenteAltura = 90;

// Variáveis do Gol
let xGol = 2;
let yGol = 150;
let comprimentoGol = 2;
let larguraGol = 100;


function preload(){
    imagemDoCampo = loadImage("imagem/Campo.png");
  trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}


function setup() {
    createCanvas(600, 400);
  trilha.loop ();
}


  function draw() {
    background(imagemDoCampo);
    background(imagemDoCampo);
    
    mostraBolinha();
    mostraMinhaBaliza();
    mostraBalizaOponente();
    mostraAtacante();
    mostraAtacanteOponente();
    meuZagueiro();
    zagueiroOponente();
    
    movimentaBolinha();
    movimentaMeuAtacante();
    movimentaMeuZagueiro();
    movimentaAtacanteOponente();
    movimentaZagueiroOponente();
    
    verificaColisaoBorda();
    
   // verificaColisaoAtacante();
    colisaoBiblioteca(xAtacanteOponente, yAtacanteOponente, atacanteComprimento, atacanteAltura);
    colisaoBiblioteca(xAtacante, yAtacante, atacanteComprimento, atacanteAltura);
    //colisão meu zagueiro
    colisaoBiblioteca(xMeuZagueiro, yMeuZagueiro,meuZagueiroAltura, meuZagueiroComprimento);
    //colisão zagueiro oponente
  colisaoBiblioteca(xZagueiroOponente, yZagueiroOponente, zagueiroOponenteAltura, zagueiroOponenteComprimento);
    
    incluiPlacar();
    marcaPonto();
  }


function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}


function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}


function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
if (xBolinha + raio == 2 && yBolinha == 150){
  velocidadeXBolinha *= -1;
}
 if (xBolinha + raio == 2 && yBolinha == 240){
  velocidadeXBolinha *= -1; 
}
}


function mostraAtacante (){
  fill (0,0,255);
  rect(xAtacante, yAtacante,atacanteComprimento, atacanteAltura);
}


function movimentaMeuAtacante() {
    if (keyIsDown(UP_ARROW)) {
        yAtacante -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yAtacante += 10;
    }
}


function verificaColisaoAtacante() {
  if (xBolinha - raio < xAtacante + atacanteComprimento && yBolinha - raio < yAtacante + atacanteAltura && yBolinha + raio > yAtacante) {
 velocidadeXBolinha *= -1;
    //raquetada.play();
}
}

// parte 2

function mostraAtacanteOponente() {
  fill(255,0,0); 
  rect(xAtacanteOponente, yAtacanteOponente, atacanteComprimento, atacanteAltura);
}

function movimentaAtacanteOponente() {
    velocidadeYOponente = yBolinha - yAtacanteOponente - atacanteComprimento / 2 - 30;
  yAtacanteOponente += velocidadeYOponente;
  calculaChanceDeErrar();
}


function incluiPlacar() {
  fill(255);
  text(meusPontos, 278, 26);
  text(pontosDoOponente, 321, 26);
}


function marcaPonto() {
    if (collideRectCircle(xBalizaOponente, yBalizaOponente, balizaOponenteComprimento, balizaOponenteAltura, xBolinha, yBolinha, raio)) 
{      
          velocidadeXBolinha *= -1;
  meusPontos += 1;
 // ponto.play ();
    }
    if (collideRectCircle(xBaliza, yBaliza, balizaComprimento, balizaAltura, xBolinha, yBolinha, raio)) {

              velocidadeXBolinha *= -1;
      pontosDoOponente += 1;
      ponto.play();
    }
}

function mostraMinhaBaliza (){
  rect (xBaliza, yBaliza, balizaComprimento, balizaAltura)
}

function mostraBalizaOponente (){
  rect (xBalizaOponente, yBalizaOponente, balizaOponenteComprimento, balizaOponenteAltura)
}

function colisaoBiblioteca(x,y, comprimento, altura) {
    colidiu = collideRectCircle(x,y,comprimento, altura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1; 
      raquetada.play();
      colidiu= false;
    }
}


function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function zagueiroOponente () {
  fill(255,0,0);
  rect (xZagueiroOponente, yZagueiroOponente, zagueiroOponenteAltura, zagueiroOponenteComprimento)
}

// movimenta zagueiro oponente
function movimentaZagueiroOponente() {
    if(velocidadeYBolinha < 0){
      yZagueiroOponente -= 4;
    }
  else {
    yZagueiroOponente += 4;
  }
}


//meu zagueiro
function meuZagueiro (){
  fill (0,0,255);
  rect (xMeuZagueiro, yMeuZagueiro,meuZagueiroAltura, meuZagueiroComprimento);
} 

// movimenta meu zagueiro
function movimentaMeuZagueiro() {
  if(velocidadeYBolinha > 0){
      yMeuZagueiro += 4;
    }
  else {
    yMeuZagueiro -= 4;
  }
}


