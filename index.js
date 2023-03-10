const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const attack_1 = document.querySelector(".attack-1");
const namePlayer_1 = document.querySelector(".name-box-1");
const powerPlayer_1 = document.querySelector(".power-box-1");
const hpPlayer_1 = document.querySelector(".hp-box-1");
const attack_2 = document.querySelector(".attack-2");
const namePlayer_2 = document.querySelector(".name-box-2");
const powerPlayer_2 = document.querySelector(".power-box-2");
const hpPlayer_2 = document.querySelector(".hp-box-2");
const player1Img = document.querySelector(".player-img1");
const player2Img = document.querySelector(".player-img2");
const result_1 = document.querySelector(".result-1");
const result_2 = document.querySelector(".result-2");

const rules_box = document.querySelector(".rules-box");
const rules = document.querySelector(".rules");
const reset = document.querySelector(".reset");
const overlay = document.querySelector(".overlay");
const close_window = document.querySelector(".close_window");

//==================Game Logic ================

class Character {
  number = Math.trunc(Math.random() * 20) + 1;
  constructor(name, hp, power) {
    this.name = name;
    this.hp = hp;
    this.power = power;
  }

  attack(obj) {
    obj.takeDamage();
  }

  takeDamage() {
    this.hp -= this.number;
  }

  getStatus() {
    console.log(`${this.name} is dead`);
  }

  logStatus() {
    if (this.hp > 0) {
      console.log(`${this.name} -- hp - ${this.hp} `);
    } else {
      this.getStatus();
    }
  }
  getHp() {
    this.hp;
    return this;
  }
}

// ============Child clases =================//
class Hero extends Character {
  attackTracker = 0;
  constructor(name, hp, power) {
    super(name, hp, power);
  }

  getHp() {
    this.attackTracker += 1;
    if (this.attackTracker % 3 === 0) {
      this.hp += 20;
    }
  }

  attack(obj) {
    this.getHp();
    obj.takeDamage();
  }

  reset() {
    this.hp = 100;
    this.attackTracker = 0;
  }
}

class Villain extends Character {
  attackTracker = 0;
  constructor(name, hp, power) {
    super(name, hp, power);
  }

  getPower() {
    this.attackTracker += 1;
    if (this.attackTracker % 3 === 0) {
      this.power += 10;
    }
  }

  attack(obj) {
    this.getPower();
    obj.takeDamage();
  }
  reset() {
    this.hp = 100;
    this.attackTracker = 0;
  }
}

//============ create 2 character ===========//

const Levan = new Hero("Levan", 100, 100);

const motamashe2 = new Villain("Player 2", 100, 100);

// =========== working with Dom ==============//

const resetNumber = 100;
let playing = true;

const addBorder = function (value, classs) {
  value.classList.add(classs);
};
const removeBorder = function (value, classs) {
  value.classList.remove(classs);
};

const infoBoxses = function (player1_hp, player2_hp, player1_pwr, player2_pwr) {
  hpPlayer_1.innerHTML = player1_hp;
  powerPlayer_1.innerHTML = player1_pwr;
  powerPlayer_2.innerHTML = player2_pwr;
  hpPlayer_2.innerHTML = player2_hp;
};

const attacker_1 = function () {
  if (playing) {
    if (motamashe2.hp >= 0) {
      Levan.attack(motamashe2);
      infoBoxses(Levan.hp, motamashe2.hp, Levan.power, motamashe2.power);
      removeBorder(player1Img, "red-border");
      removeBorder(player2Img, "green-border");
      addBorder(player2Img, "red-border");
      addBorder(player1Img, "green-border");
    } else {
      console.log(`game is overr`);
      let playing = false;
      player1.classList.add("transparent");
      result_1.innerHTML = ` winner is ${Levan.name}`;
    }
  }
};

const attacker_2 = function () {
  if (playing) {
    if (Levan.hp >= 0) {
      motamashe2.attack(Levan);
      infoBoxses(Levan.hp, motamashe2.hp, Levan.power, motamashe2.power);
      removeBorder(player2Img, "red-border");
      removeBorder(player1Img, "green-border");
      addBorder(player1Img, "red-border");
      addBorder(player2Img, "green-border");
    } else {
      console.log(`game is overr`);
      let playing = false;
      player2.classList.add("transparent");
      result_2.innerHTML = ` winner is ${motamashe2.name}`;
    }
  }
};

const attackerWithKey_1 = function (e) {
  if (playing) {
    if (e.key === "d" && motamashe2.hp >= 0) {
      Levan.attack(motamashe2);
      infoBoxses(Levan.hp, motamashe2.hp, Levan.power, motamashe2.power);
      removeBorder(player1Img, "red-border");
      removeBorder(player2Img, "green-border");
      addBorder(player2Img, "red-border");
      addBorder(player1Img, "green-border");
    } else if (e.key === "d" && motamashe2.hp <= 0) {
      console.log(`game is over`);
      let playing = false;
      player1.classList.add("transparent");
      result_1.innerHTML = ` winner is ${Levan.name}`;
    }
  }
};

const attackerWithKey_2 = function (e) {
  if (playing) {
    if (e.key === "5" && Levan.hp >= 0) {
      motamashe2.attack(Levan);
      infoBoxses(Levan.hp, motamashe2.hp, Levan.power, motamashe2.power);
      removeBorder(player2Img, "red-border");
      removeBorder(player1Img, "green-border");
      addBorder(player1Img, "red-border");
      addBorder(player2Img, "green-border");
    } else if (e.key === "5" && Levan.hp <= 0) {
      console.log(`game is over`);
      let playing = false;
      player2.classList.add("transparent");
      result_2.innerHTML = ` winner is ${motamashe2.name}`;
    }
  }
};

namePlayer_1.innerHTML = Levan.name;
powerPlayer_1.innerHTML = Levan.power;
hpPlayer_1.innerHTML = Levan.hp;

namePlayer_2.innerHTML = motamashe2.name;
powerPlayer_2.innerHTML = motamashe2.power;
hpPlayer_2.innerHTML = motamashe2.hp;

attack_1.addEventListener("click", attacker_1);

attack_2.addEventListener("click", attacker_2);

document.addEventListener("keydown", attackerWithKey_1);

document.addEventListener("keydown", attackerWithKey_2);

rules.addEventListener("click", function () {
  rules_box.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

close_window.addEventListener("click", function () {
  rules_box.classList.add("hidden");
  overlay.classList.add("hidden");
});

reset.addEventListener("click", function () {
  console.log(`button clicked`);

  hpPlayer_1.innerHTML = resetNumber;
  powerPlayer_2.innerHTML = resetNumber;
  powerPlayer_1.innerHTML = resetNumber;
  hpPlayer_2.innerHTML = resetNumber;
  removeBorder(player2Img, "red-border");
  removeBorder(player1Img, "green-border");
  result_2.innerHTML = "";
  result_1.innerHTML = "";
  player2.classList.remove("transparent");
  player1.classList.remove("transparent");

  Levan.reset();
  motamashe2.reset();
});

// console.log(Levan);

// console.log(motamashe2);

// Levan.attack(motamashe2);
// Levan.attack(motamashe2);
// Levan.attack(motamashe2);
// motamashe2.attack(Levan);
// motamashe2.attack(Levan);
// motamashe2.attack(Levan);

// console.log(Levan);

// console.log(motamashe2);

// Levan.logStatus();
