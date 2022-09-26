console.log("JS Launched");

const lifeBar = document.querySelector(".life");
const clickerButton = document.querySelector("#btn_clicker");
const scoreP = document.querySelector(".score");
const goldText = document.querySelector("#gold_text");
const bonusExplosiveDgt = document.querySelector(".one_bonus");
const bonusDuringDgt = document.querySelector(".two_bonus");
var totalLifeMonster = 2;
var result = 0;
var lifeMonster = 2;
var calculPercentage = 0;
var gold = 0;

goldText.innerHTML = "0";
scoreP.innerHTML = "0";

const actuCalculPercentageBar = () => {
  calculPercentage = Math.round((lifeMonster / totalLifeMonster) * 100) + "%";
  console.log(calculPercentage);
  lifeBar.style.width = calculPercentage;
};

function damageToEnemies(Damage = 1) {
  lifeMonster -= Damage;

  if (lifeMonster <= 0) {
    generatorMob(1);
    getGold();
  }
  actuCalculPercentageBar();
}

function clicker() {
  damageToEnemies(1);
  result++;
}

clickerButton.addEventListener("click", function () {
  clicker();
  scoreP.innerHTML = result;
});

function random(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatorMob(zone) {
  switch (zone) {
    case 1:
      totalLifeMonster = random(30, 10);
      lifeMonster = totalLifeMonster;
      break;
    default:
      lifeMonster = random(1, 1);
      break;
  }
}

/** function gold for buy in the shop **/
function getGold() {
  let stockRandom = random(10, 100);
  gold += stockRandom;
  goldText.innerHTML = gold;
}

/** Function for buy Bonus in the shop **/
bonusExplosiveDgt.addEventListener("click", function () {
  let priceBonus = 1000;

  if (gold >= priceBonus) {
    damageToEnemies(10);
    gold -= 1000;
    goldText.innerHTML = gold;
  } else {
    alert("No enought price is " + priceBonus + " and you have " + gold);
  }
});

bonusDuringDgt.addEventListener("click", function () {
  let priceBonus = 500;

  if (gold >= priceBonus) {
    setInterval(function () {
      damageToEnemies(1);
    }, 1000);
    gold -= 500;
    goldText.innerHTML = gold;
  } else {
    alert("No enought price is " + priceBonus + " and you have " + gold);
    return 0;
  }
});
