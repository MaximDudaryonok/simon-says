import { alphabet, numbers } from "./data.js";

const layout = () => {
  const body = document.body,
    header = document.createElement("header"),
    wrapper = document.createElement("div"),
    infoLogoContainer = document.createElement("div"),
    informationWrapper = document.createElement("div"),
    informationLevel = document.createElement("div"),
    informationRound = document.createElement("h3"),
    informationDiff = document.createElement("div"),
    logo = document.createElement("h1"),
    logoImg = document.createElement("img"),
    btnMenuContainer = document.createElement("div"),
    buttonStart = document.createElement("button"),
    dropMenuContainer = document.createElement("div"),
    dropMenuBtn = document.createElement("button"),
    dropMenu = document.createElement("ul"),
    repeatBtn = document.createElement("button"),
    nextBtn = document.createElement("button"),
    options = ["Easy", "Medium", "Hard"],
    main = document.createElement("main"),
    section = document.createElement("section"),
    keyboardWrapper = document.createElement("div"),
    keyboardInfo = document.createElement("h2"),
    keyboardContainer = document.createElement("div");

  // Set classes
  header.className = "header";
  wrapper.className = "container";
  infoLogoContainer.className = "header__info-logo-container";
  informationWrapper.className = "header__information";
  informationDiff.className = "header__information-round";
  btnMenuContainer.className = "header__menu";
  buttonStart.className = "btn btn-secondary start";
  dropMenuContainer.className = "dropdown";
  dropMenuBtn.className = "btn btn-secondary dropdown-toggle";
  dropMenuBtn.setAttribute("type", "button");
  dropMenuBtn.setAttribute("data-bs-toggle", "dropdown");
  dropMenuBtn.setAttribute("aria-expanded", "false");
  dropMenuBtn.textContent = "Choose difficulty";
  dropMenu.className = "dropdown-menu";
  main.className = "main";
  logo.className = "header__logo";
  section.className = "keyboard__section";
  keyboardWrapper.className = "container keyboard__container";
  keyboardContainer.className = "keyboard";
  keyboardInfo.className = "keyboard__info";
  logoImg.className = "header__logo-img";
  logoImg.src = "assets/img/logo.png";
  informationLevel.className = "header__information-level";

  // Append elements
  body.appendChild(header);
  body.appendChild(main);
  header.appendChild(wrapper);
  wrapper.appendChild(infoLogoContainer);
  infoLogoContainer.appendChild(logo);
  logo.appendChild(logoImg);
  infoLogoContainer.appendChild(informationWrapper);
  wrapper.appendChild(btnMenuContainer);
  informationWrapper.appendChild(informationLevel);
  informationWrapper.appendChild(informationDiff);
  btnMenuContainer.appendChild(buttonStart);
  btnMenuContainer.appendChild(dropMenuContainer);
  dropMenuContainer.appendChild(dropMenuBtn);
  dropMenuContainer.appendChild(dropMenu);
  main.appendChild(section);
  section.appendChild(keyboardWrapper);
  keyboardWrapper.appendChild(keyboardInfo);

  // Button configuration
  buttonStart.textContent = "Start";
  informationDiff.textContent = "";
  // drop-menu
  options.forEach((option) => {
    const optionElement = document.createElement("li");
    const optionElementBtn = document.createElement("button");
    optionElement.className = "dropdown-li";
    optionElementBtn.textContent = option;
    optionElementBtn.className = "dropdown-item";
    dropMenu.appendChild(optionElement);
    optionElement.appendChild(optionElementBtn);
  });

  //shuffler
  let arrShuffle = [];
  const shuffle = (...data) => {
    arrShuffle.length = 0;
    const rounds = [2, 4, 6, 8, 10];
    let flat = data.flat();
    const fisherYatesShuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    let startIndex = 0;
    rounds.forEach((numElements) => {
      let copy = fisherYatesShuffle([...flat]);
      let roundRes = copy.slice(startIndex, numElements);
      arrShuffle.push(roundRes);
    });
    return arrShuffle;
  };
  //make keyboard
  const difficultyBtns = document.querySelectorAll(".dropdown-item");
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      keyboardContainer.innerHTML = "";
      e.preventDefault();
      if (e.target.textContent === "Easy") {
        informationLevel.textContent = "Easy";
        createKeyboardNum(numbers);
      }
      if (e.target.textContent === "Medium") {
        informationLevel.textContent = "Medium";
        createKeyboardAlph(alphabet);
      }
      if (e.target.textContent === "Hard") {
        informationLevel.textContent = "Hard";
        createKeyboardNum(numbers);
        createKeyboardAlph(alphabet);
      }
    });
  });
  keyboardInfo.textContent = "   ";

  function easyClick() {
    difficultyBtns[0].click();
  }

  easyClick();

  function createKeyboardNum(numbers) {
    const keyboardNumberRow = document.createElement("div");
    keyboardNumberRow.className = "keyboard__number-row";
    keyboardContainer.appendChild(keyboardNumberRow);
    numbers.forEach((key, index) => {
      const keyElement = document.createElement("button");
      keyElement.className = "btn btn-secondary key";
      keyElement.disabled = true;
      keyElement.setAttribute("data-key", `${key}`);
      keyElement.textContent = key;
      keyboardNumberRow.appendChild(keyElement);
    });
    keyboardWrapper.appendChild(keyboardContainer);
  }

  function createKeyboardAlph(alphabet) {
    const keyboardAlphaRow = document.createElement("div"),
      keyboardAlphaRow2 = document.createElement("div"),
      keyboardAlphaRow3 = document.createElement("div");
    keyboardAlphaRow.className = "keyboard__alpha-row";
    keyboardAlphaRow2.className = "keyboard__alpha-row";
    keyboardAlphaRow3.className = "keyboard__alpha-row";
    keyboardContainer.appendChild(keyboardAlphaRow);
    keyboardContainer.appendChild(keyboardAlphaRow2);
    keyboardContainer.appendChild(keyboardAlphaRow3);
    alphabet.forEach((key, index) => {
      const keyElement = document.createElement("button");
      keyElement.className = "btn btn-secondary key";
      keyElement.setAttribute("data-key", `${key}`);
      keyElement.disabled = true;
      keyElement.textContent = key;
      if (index <= 9) {
        keyboardAlphaRow.appendChild(keyElement);
      } else if (index > 9 && index <= 18) {
        keyboardAlphaRow2.appendChild(keyElement);
      } else if (index > 18 && index <= 25) {
        keyboardAlphaRow3.appendChild(keyElement);
      }
    });
    keyboardWrapper.appendChild(keyboardContainer);
  }

  const startBtn = document.querySelector(".start"),
    gameInfo = document.querySelector(".keyboard__info"),
    dropdownContainer = document.querySelector(".dropdown"),
    infoLevel = document.querySelector(".header__information-level");

  gameInfo.textContent = "Choose difficulty and let`s start!";

  function startNewGameBtn() {
    if (startBtn.textContent === "Start") {
      startBtn.classList.add("new");
      dropdownContainer.classList.add("inactive");
      dropMenuBtn.classList.add("inactive");
      dropMenu.classList.add("inactive");
      startBtn.textContent = "New game";
      repeatBtn.className = "btn btn-secondary repeat";
      repeatBtn.textContent = "Repeat the sequence";
      btnMenuContainer.appendChild(repeatBtn);
      nextBtn.className = "btn btn-secondary repeat next inactive";
      nextBtn.textContent = "Start next round!";
      btnMenuContainer.appendChild(nextBtn);
    } else {
      repeatBtn.classList.add("inactive");
      dropdownContainer.classList.remove("inactive");
      dropMenuBtn.classList.remove("inactive");
      dropMenu.classList.remove("inactive");
      startBtn.textContent = "Start";
      startBtn.classList.remove("new");
      dropMenu.classList.remove("inactive");
      informationDiff.textContent = "";
      keyboardInfo.textContent = "";
    }
  }

  let round = 1,
    count = 0,
    roundRepeat = 1,
    repeatStatus = false;
  const resetGame = () => {
    round = 1;
    index = 0;
    userInput = [];
    count = 0;
    roundRepeat = 1;
    gameInfo.textContent = "Game is ready to start!";
    nextBtn.classList.add("inactive");
  };

  function repeatLogic() {
    if (count === 0 && repeatStatus === true) {
      console.log(`raundRep: ${roundRepeat}`);
      switch (roundRepeat) {
        case 1:
          highlightKeys(arrShuffle, (round = 1));
          break;
        case 2:
          highlightKeys(arrShuffle, (round = 2));
          break;
        case 3:
          highlightKeys(arrShuffle, (round = 3));
          break;
        case 4:
          highlightKeys(arrShuffle, (round = 4));
          break;
        case 5:
          highlightKeys(arrShuffle, (round = 5));
          break;
        default:
          console.log("Invalid roundRepeat value");
      }
      count++;
    }
  }

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    startNewGameBtn();
    resetGame();
    if (informationLevel.textContent === "Medium") {
      shuffle(alphabet);
    } else if (informationLevel.textContent === "Easy") {
      shuffle(numbers);
    } else if (informationLevel.textContent === "Hard") {
      shuffle(alphabet, numbers);
    }
    console.log(arrShuffle);
    if (startBtn.classList.contains("new")) {
      highlightKeys(arrShuffle, (round = 1));
      repeatBtn.addEventListener("click", repeatLogic);
    } else {
      const keys = document.querySelectorAll(".key");
      keys.forEach((el) => {
        el.disabled = true;
      });
      repeatBtn.removeEventListener("click", repeatLogic);
    }
  });

  let index = 0;
  let userInput = [];
  const keyboardClickHandler = (arrShuffle) => (e) => {
    const keys = document.querySelectorAll(".key");
    const keyValue = e.target.getAttribute("data-key");
    if (keyValue && !keys[0].disabled) {
      console.log(e.target);
      e.target.classList.add("highlight");
      setTimeout(() => e.target.classList.remove("highlight"), 300);
      if (keyValue === arrShuffle[round - 1][index]) {
        console.log(`click ${keyValue}`);
        userInput.push(keyValue);
        console.log(`round ${round}`);
        let userAnswer = userInput.join("");
        let sentence = (gameInfo.textContent = "Your answer: " + userAnswer);
        index += 1;
        console.log(`index ${index}`);
      } else {
        console.log(`click ${keyValue}`);
        console.log(`index ${index}`);
        console.log(round);
        keys.forEach((el) => {
          el.disabled = true;
        });
        if (count === 1) {
          document.removeEventListener("click", handlerClick);
          document.removeEventListener("keyup", handler);
          gameInfo.textContent = "You lose..";
          userInput.length = 0;
          return (round = 1);
        } else {
          gameInfo.textContent = "Try again.. Use repeat the sequence!";
          userInput.length = 0;
        }
        index = 0;
        document.removeEventListener("click", handlerClick);
        document.removeEventListener("keyup", handler);
      }
      if (index === arrShuffle[round - 1].length) {
        index = 0;
        document.removeEventListener("click", handlerClick);
        document.removeEventListener("keyup", handler);
        keys.forEach((el) => {
          el.disabled = true;
        });
        if (round === 5) {
          count = 1;
          gameInfo.textContent = "You Win!";
          userInput.length = 0;
          return (round = 1);
        }
        if (round < 5) {
          repeatBtn.classList.add("inactive");
          nextBtn.classList.remove("inactive");
          setTimeout(() => {
            gameInfo.textContent = "Start next round!";
          }, 1000);
          nextBtn.addEventListener(
            "click",
            () => {
              setTimeout(() => {
                gameInfo.textContent = "Be patient!";
              }, 1000);
              userInput.length = 0;
              setTimeout(() => {
                repeatBtn.classList.remove("inactive");
                nextBtn.classList.add("inactive");
                highlightKeys(arrShuffle, (round += 1));
                roundRepeat += 1;
              }, 2000);
            },
            { once: true }
          );
        }
      }
    }
  };
  const keyboardPushHandler = (arrShuffle) => (e) => {
    if (round === 1) {
      document.querySelector(".new").addEventListener(
        "click",
        function () {
          return (round = 1);
        },
        { once: true }
      );
    }
    const keys = document.querySelectorAll(".key");
    const keyValue = e.key.toUpperCase();
    keys.forEach((el) => {
      el.disabled = false;
    });
    const keyButton = Array.from(keys).find(
      (key) => key.getAttribute("data-key") === keyValue
    );
    if (keyButton && !keys[0].disabled) {
      //console.log(keyValue);
      keyButton.classList.add("highlight");
      setTimeout(() => keyButton.classList.remove("highlight"), 300);
      if (keyValue + "" === arrShuffle[round - 1][index]) {
        userInput.push(keyValue);
        console.log(`round ${round}`);
        let userAnswer = userInput.join("");
        let sentence = (gameInfo.textContent = "Your answer: " + userAnswer);
        index += 1;
        console.log(`index ${index}`);
      } else {
        console.log(`click ${keyValue}`);
        console.log("this");
        console.log(`index ${index}`);
        console.log(round);
        keys.forEach((el) => {
          el.disabled = true;
        });
        if (count === 1) {
          document.removeEventListener("keyup", handler);
          document.removeEventListener("click", handlerClick);
          gameInfo.textContent = "You lose..";
          userInput.length = 0;
          return (round = 1);
        } else {
          gameInfo.textContent = "Try again.. Use repeat the sequence!";
          userInput.length = 0;
        }
        index = 0;
        document.removeEventListener("keyup", handler);
        document.removeEventListener("click", handlerClick);
      }
      if (index === arrShuffle[round - 1].length) {
        index = 0;
        document.removeEventListener("keyup", handler);
        document.removeEventListener("click", handlerClick);
        keys.forEach((el) => {
          el.disabled = true;
        });
        if (round === 5) {
          count = 1;
          gameInfo.textContent = "You Win!";
          userInput.length = 0;
          return (round = 1);
        }
        if (round < 5) {
          repeatBtn.classList.add("inactive");
          nextBtn.classList.remove("inactive");
          setTimeout(() => {
            gameInfo.textContent = "Start next round!";
          }, 1000);
          nextBtn.addEventListener(
            "click",
            () => {
              setTimeout(() => {
                gameInfo.textContent = "Be patient!";
              }, 1000);
              userInput.length = 0;
              setTimeout(() => {
                repeatBtn.classList.remove("inactive");
                nextBtn.classList.add("inactive");
                highlightKeys(arrShuffle, (round += 1));
                roundRepeat += 1;
              }, 2000);
            },
            { once: true }
          );
        }
      }
    }
  };

  const handler = keyboardPushHandler(arrShuffle, (round = 1));
  const handlerClick = keyboardClickHandler(arrShuffle, (round = 1));

  const highlightKeys = (arrShuffle, round, delay = 500) => {
    const keys = document.querySelectorAll(".key");
    count = 0;
    repeatStatus = false;
    console.log(`high: ${round}`);
    informationDiff.textContent = `Round: ${round}!`;
    gameInfo.textContent = "Round: " + round;
    keys.forEach((el) => {
      el.disabled = true;
    });
    if (round <= arrShuffle.length) {
      document.removeEventListener("keyup", handler);
      document.removeEventListener("click", handlerClick);
      arrShuffle[round - 1].forEach((item, index) => {
        setTimeout(() => {
          let arr = Array.from(keys);
          arr.forEach((el) => {
            if (el.textContent === item + "") {
              el.classList.add("highlight");
              setTimeout(() => {
                el.classList.remove("highlight");
              }, delay);
            }
          });
        }, delay * index);
      });
      setTimeout(() => {
        keys.forEach((el) => {
          el.disabled = false;
        });
        repeatStatus = true;
        document.addEventListener("keyup", handler);
        document.addEventListener("click", handlerClick);
      }, delay * round * 2 + 100);
    } else if (round > arrShuffle.length) {
      keys.forEach((el) => {
        el.classList.remove("highlight");
        el.disabled = true;
        return (round = 1);
      });
    }
    setTimeout(() => {
      keys.forEach((el) => {
        el.classList.remove("highlight");
        el.disabled = true;
      });
    }, delay * arrShuffle[round - 1].length);
  };
};
export { layout };
