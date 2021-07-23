const person = document.getElementsByClassName("person")[0];
const dino = document.getElementsByClassName("dino")[0];
const gameOverMessage = document.getElementsByClassName("gameOverMessage")[0];
const gameOver = document.getElementsByClassName("gameOver")[0];
const score = document.getElementsByClassName("score")[0];
const message = document.getElementsByClassName("message")[0];
const instructions = document.getElementsByClassName("instructions")[0];

var fired = true;
var playPause = true;
var gamePlaying = false;
var start = true;
var scoreValue = 0;
var cross = true;

audioGameOver = new Audio("audio/gameOver.mp3");
audioKeyPress = new Audio("audio/keyPress.mp3");

// Listening the Keydown events and executing commands based on that

const keyEvent = document.addEventListener("keydown", (e) => {
  if (start) {
    if (e.key === " ") {
      instructions.style.display = "none";
      person.classList.add("personAnimation");
      if (fired) {
        dino.classList.add("dinoAnimation");
        fired = false;
      }
      setTimeout(() => {
        person.classList.remove("personAnimation");
      }, 700);
      start = false;
      gamePlaying = true;
    }
  } else if (gamePlaying) {
    if (e.key === " ") {
      person.classList.add("personAnimation");
      if (fired) {
        dino.classList.add("dinoAnimation");
        fired = false;
      }
      setTimeout(() => {
        person.classList.remove("personAnimation");
      }, 700);
    } else if (e.key === "Enter") {
      if (dino.classList.contains("dinoPaused")) {
        dino.classList.remove("dinoPaused");
      } else {
        dino.classList.add("dinoPaused");
      }
    } else if (e.key === "ArrowLeft") {
      audioKeyPress.play();
      leftValue = parseInt(
        window.getComputedStyle(person, null).getPropertyValue("left")
      );
      if (leftValue > 0) {
        person.style.left = leftValue - 200 + "px";
        person.style.transform = "scaleX(1)";
      }
    } else if (e.key === "ArrowRight") {
      audioKeyPress.play();
      leftValue = parseInt(
        window.getComputedStyle(person, null).getPropertyValue("left")
      );
      if (leftValue < 1100) {
        person.style.left = leftValue + 200 + "px";
        person.style.transform = "scaleX(-1)";
      }
    }
  }
});

// When the man crosses the Dragon

const crossFunction = setInterval(() => {
  dinoX = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  personX = parseInt(
    window.getComputedStyle(person, null).getPropertyValue("left")
  );
  personY = parseInt(
    window.getComputedStyle(person, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dinoX - personX);
  offsetY = Math.abs(dinoY - personY);

  if (offsetX < 75 && offsetY < 75) {
    gameOver.style.display = "flex";
    gameOverMessage.innerHTML = "Game Over";
    message.innerHTML = "Click to Play Again";
    clearInterval(crossFunction);
    dino.classList.remove("dinoAnimation");
    dino.style.left = dinoX + "px";
    person.classList.remove("personAnimation");
    person.style.left = personX + "px";
    gamePlaying = false;
    person.classList.add("personGameOverAnimation");
    setTimeout(() => {
      person.style.display = "none";
    }, 3000);
    audioGameOver.play();
  } else if (offsetX < 150 && cross) {
    scoreValue += 1;
    score.innerHTML = "Your Score: " + scoreValue;
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    updateAnimationValue();
    animationValue = parseFloat(
      window.getComputedStyle(dino, null).getPropertyValue("animation-duration")
    );
  }
}, 10);

var updateAnimationValue = () => {
  var updateAnimationValueInterval = setInterval(() => {
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    animationValue = parseFloat(
      window.getComputedStyle(dino, null).getPropertyValue("animation-duration")
    );
    if (dinoX < 0 && animationValue > 3.5) {
      animationValue = animationValue - 0.1;
      dino.style.animationDuration = animationValue + "s";
      clearInterval(updateAnimationValueInterval);
    }
  }, 10);
};

document.addEventListener("click", () => {
  window.location.reload();
});