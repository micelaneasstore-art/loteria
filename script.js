let cartas = [];
let usadas = [];
let intervalo = null;
let voces = [];
let primeraCarta = true;

const nombres = {
  1:"El Gallo",2:"El Diablito",3:"La Dama",4:"El Catrín",
  5:"El Paraguas",6:"La Sirena",7:"La Escalera",8:"La Botella",
  9:"El Barril",10:"El Árbol",11:"El Melón",12:"El Valiente",
  13:"El Gorrito",14:"La Muerte",15:"La Pera",16:"La Bandera",
  17:"El Bandolón",18:"El Violoncello",19:"La Garza",20:"El Pájaro",
  21:"La Mano",22:"La Bota",23:"La Luna",24:"El Cotorro",
  25:"El Borracho",26:"El Negrito",27:"El Corazón",28:"La Sandía",
  29:"El Tambor",30:"El Camarón",31:"Las Jaras",32:"El Músico",
  33:"La Araña",34:"El Soldado",35:"La Estrella",36:"El Cazo",
  37:"El Mundo",38:"El Apache",39:"El Nopal",40:"El Alacrán",
  41:"La Rosa",42:"La Calavera",43:"La Campana",44:"El Cantarito",
  45:"El Venado",46:"El Sol",47:"La Corona",48:"La Chalupa",
  49:"El Pino",50:"El Pescado",51:"La Palma",52:"La Maceta",
  53:"El Arpa",54:"La Rana"
};

function iniciar() {
  cartas = [...Array(54).keys()].map(i => i + 1).sort(() => Math.random() - 0.5);
  usadas = [];
  document.getElementById("historial").innerHTML = "";
}

function sacarCarta() {
  if (cartas.length === 0) return alert("🎉 Ya salieron todas");

  // Decir "Corre y se va" SOLO al inicio
  if (primeraCarta) {
    const anuncio = new SpeechSynthesisUtterance("¡Corre y se va!");
    anuncio.lang = "es-MX";
    anuncio.voice = voces[document.getElementById("vozSelect").value];
    anuncio.rate = 0.9;

    speechSynthesis.speak(anuncio);
    primeraCarta = false;

    // Espera breve antes de sacar la primera carta
    setTimeout(() => mostrarCarta(), 1200);
  } else {
    mostrarCarta();
  }
}

function hablar(num) {
  const voz = new SpeechSynthesisUtterance(nombres[num]);
  voz.lang = "es-MX";
  voz.voice = voces[document.getElementById("vozSelect").value];
  voz.rate = 0.9;
  speechSynthesis.speak(voz);
}

function activarAuto() {
  clearInterval(intervalo);
  const t = document.getElementById("tiempo").value;
  if (t > 0) intervalo = setInterval(sacarCarta, t * 1000);
}

function pantallaCompleta() {
  document.documentElement.requestFullscreen();
}

function modoProyector() {
  document.body.classList.toggle("proyector");
}

function cargarVoces() {
  voces = speechSynthesis.getVoices();
  const select = document.getElementById("vozSelect");
  select.innerHTML = "";

  let vozDefaultIndex = 0;

  voces.forEach((voz, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = voz.name;
    select.appendChild(opt);

    if (voz.name.includes("Microsoft Jorge") && voz.lang.includes("es-MX")) {
      vozDefaultIndex = index;
    }
  });

  select.value = vozDefaultIndex;
}
function mostrarCarta() {
  if (cartas.length === 0) return;

  const n = cartas.pop();
  usadas.push(n);

  const img = document.getElementById("carta");
  img.src = `imagenes/${n}.avif`;

  img.style.animation = "none";
  img.offsetHeight;
  img.style.animation = null;

  document.getElementById("sonido").play();
  hablar(n);

  const mini = document.createElement("img");
  mini.src = `imagenes/${n}.avif`;
  document.getElementById("historial").appendChild(mini);
}

function reiniciar() {
  iniciar();
  primeraCarta = true;
  document.getElementById("carta").src = "imagenes/1.avif";
}


speechSynthesis.onvoiceschanged = cargarVoces;
iniciar();
