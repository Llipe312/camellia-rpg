let atributos = { jujutsu: 1, fisico: 1, agilidade: 1, intelecto: 1, carisma: 1 };
let pontosRestantes = 5;

const especies = {
  humano:     { pvBase:12, peaBase:16, peBase:5, pvMult:12, peaMult:12, peMult:2 },
  mestico:    { pvBase:12, peaBase:20, peBase:5, pvMult:10, peaMult:12, peMult:2 },
  shimuriano: { pvBase:10, peaBase:20, peBase:5, pvMult:10, peaMult:12, peMult:3 },
  corpo:      { pvBase:0,  peaBase:16, peBase:5, pvMult:0,  peaMult:12, peMult:2 }
};

function calcularTudo() {
  const esp = document.getElementById('especie').value;
  const base = especies[esp];

  const pv  = base.pvBase  + (atributos.fisico * base.pvMult);
  const pea = base.peaBase + (atributos.jujutsu * base.peaMult);
  const pe  = base.peBase + atributos.agilidade + (atributos.intelecto * 2) + (atributos.carisma * 2);

  document.getElementById('pv').textContent = pv;
  document.getElementById('pea').textContent = pea;
  document.getElementById('pe').textContent = pe;
  document.getElementById('pontos-restantes').textContent = pontosRestantes;

  desenharCirculo();
}

function desenharCirculo() {
  const circle = document.getElementById('circle');
  circle.innerHTML = `
    <div class="attr" style="top:12%;left:50%;transform:translate(-50%,-50%)" onclick="aumentarAtributo('jujutsu')">Jujutsu<br><span style="font-size:28px">${atributos.jujutsu}</span></div>
    <div class="attr" style="top:50%;left:8%;transform:translate(-50%,-50%)" onclick="aumentarAtributo('fisico')">Físico<br><span style="font-size:28px">${atributos.fisico}</span></div>
    <div class="attr" style="top:50%;right:8%;transform:translate(50%,-50%)" onclick="aumentarAtributo('agilidade')">Agilidade<br><span style="font-size:28px">${atributos.agilidade}</span></div>
    <div class="attr" style="bottom:12%;left:50%;transform:translate(-50%,50%)" onclick="aumentarAtributo('intelecto')">Intelecto<br><span style="font-size:28px">${atributos.intelecto}</span></div>
    <div class="attr" style="top:50%;left:50%;transform:translate(-50%,-50%)" onclick="aumentarAtributo('carisma')">Carisma<br><span style="font-size:28px">${atributos.carisma}</span></div>
  `;
}

function aumentarAtributo(attr) {
  if (pontosRestantes > 0 && atributos[attr] < 5) {
    atributos[attr]++;
    pontosRestantes--;
    calcularTudo();
  }
}

function toggleCustomCla() {
  const custom = document.getElementById('custom-cla');
  custom.style.display = document.getElementById('cla').value === 'custom' ? 'block' : 'none';
}

function mudarTab(n) {
  const content = document.getElementById('tab-content');
  if (n === 0) {
    content.innerHTML = `<h2>Atributos</h2><p>Clique nos atributos no círculo para distribuir seus 5 pontos.</p>`;
  } else if (n === 1) {
    content.innerHTML = `<h2>Repertório</h2>
      <p style="color:#aaa;">Crie até 10 informações narrativas sobre seu personagem.</p>
      <textarea placeholder="Ex: Ex-aluno da Escola de Tóquio..." style="height:220px; width:100%;"></textarea>`;
  } else if (n === 2) {
    content.innerHTML = `<h2>Técnica Inata</h2>
      <input type="text" placeholder="Conceito Base da Técnica">
      <textarea placeholder="Descreva sua Técnica Inata..." style="height:200px; width:100%;"></textarea>`;
  } else {
    content.innerHTML = `<h2>Maestria</h2><p>Distribua seus Pontos de Maestria...</p>`;
  }
}

window.onload = () => {
  desenharCirculo();
  calcularTudo();
  mudarTab(0);
};
