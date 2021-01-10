// const holes = Array.from(document.querySelectorAll('.hole'))

// const moles = holes.map(hole=>{ <--- otra opcion para obtener moles
//   return ({
//     status: "hungry",
//     next: Date.now() + 1000,
//     king: false,
//     node: hole
//   })
// })


//////DEFINICION DE TIEMPOS DE STATUS:
function getSadInterval() { // 1 second
  return Date.now() + 800;
}
function getLeavingInterval() { // 0.5 seconds
  return Date.now() + 500;
}
function getGoneInterval() { // 2 to 18 seconds
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}
function getHungryInterval(){ // 1 to 4 seconds 
  return Date.now() + Math.floor(Math.random()*3000) + 1000;
}
function getHappyInterval(){
  return Date.now()+1500;
}
//////////////////////////////////////////////////////


////// MOLES :
const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9"),
  },
];
////////////////////////////////////////////////////


///////LLAMADO CADA VEZ QUE PASA EL TIEMPO DEFINIDO PARA CIERTO STATUS
function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
      mole.status = "leaving";
      mole.next = getLeavingInterval();
      mole.node.firstElementChild.src = "./images/mole-leaving.png";
      break;
    case "leaving":
      mole.status = "gone";
      mole.next = getGoneInterval();
      mole.node.firstElementChild.classList.toggle("gone");
      mole.node.firstElementChild.src = "./images/mole-hungry.png";
      break;
    case "gone":
      mole.status = "hungry";
      mole.next = getHungryInterval();
      mole.node.firstElementChild.classList.toggle("gone");
      mole.node.firstElementChild.classList.toggle("hungry");
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();
      mole.node.firstElementChild.classList.toggle("hungry");
      mole.node.firstElementChild.src = "./images/mole-sad.png";
      break;
    case "fed":
      mole.status = "leaving";
      mole.next = getLeavingInterval();
      mole.node.firstElementChild.src = "./images/mole-leaving.png"
  }
}
/////////////////////////////////////////////


/////////CADA SEGUNDO (SI ES QUE EL NAVEGADOR NO ESTA HACIENDO OTRA COSA) CORRE ESTE CODIGO:
let runAgainAt = Date.now() + 100;
function nextFrame() {
  const now = Date.now();
  if (runAgainAt <= now) {
    
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i])
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}
nextFrame();
///////////////////////////////////////////////////////


function feed(ev){
  if (ev.target.classList.contains('hungry')){
    const index = ev.target.dataset.index;
    const mole = moles[index]
    mole.status = "fed";
    mole.next = getHappyInterval();
    mole.node.firstElementChild.src = "./images/mole-fed.png";
    mole.node.firstElementChild.classList.toggle("hungry")
  }
}


document.querySelector('.bg')
        .addEventListener('click',feed)