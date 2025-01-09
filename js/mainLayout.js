import { keys, numbers } from "./data.js";

const layout = () => {
  const body = document.body,
    header = document.createElement("header"),
    wrapper = document.createElement("div"),
    menuWrapper = document.createElement("div"),
    informationWrapper = document.createElement("div"),
    informationLevel = document.createElement("div"),
    informationDiff = document.createElement("div"),
    logo = document.createElement("h1"),
    logoImg = document.createElement("img"),
    btnMenuContainer = document.createElement("div"),
    buttonStart = document.createElement("button"),
    dropMenuContainer = document.createElement("div"),
    dropMenuBtn = document.createElement("button"),
    dropMenu = document.createElement("ul"),
    options = ["Easy", "Medium", "Hard"],
    main = document.createElement("main"),
    section = document.createElement("section"),
    keyboardWrapper = document.createElement("div"),
    keyboardInfo = document.createElement("h2"),
    keyboardContainer = document.createElement("div");

  // Set classes
  header.className = "header";
  wrapper.className = "container";
  menuWrapper.className = "header__menu-wrapper";
  informationWrapper.className = "header__information";
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
  wrapper.appendChild(menuWrapper);
  wrapper.appendChild(informationWrapper);
  informationWrapper.appendChild(informationLevel);
  informationWrapper.appendChild(informationDiff);
  menuWrapper.appendChild(logo);
  menuWrapper.appendChild(btnMenuContainer);
  btnMenuContainer.appendChild(buttonStart);
  btnMenuContainer.appendChild(dropMenuContainer);
  dropMenuContainer.appendChild(dropMenuBtn);
  dropMenuContainer.appendChild(dropMenu);
  logo.appendChild(logoImg);
  main.appendChild(section);
  section.appendChild(keyboardWrapper);
  keyboardWrapper.appendChild(keyboardInfo);

  // Button configuration
  buttonStart.textContent = "Start";
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
    let startIndex = 0;
    rounds.forEach((numElements) => {
      let copy = flat.map((el, i, arr) => {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        return el;
      });
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
        shuffle(numbers);
        console.log(arrShuffle);
      }
      if (e.target.textContent === "Medium") {
        informationLevel.textContent = "Medium";
        createKeyboardAlph(keys);
        shuffle(keys);
        console.log(arrShuffle);
      }
      if (e.target.textContent === "Hard") {
        informationLevel.textContent = "Hard";
        createKeyboardNum(numbers);
        createKeyboardAlph(keys);
        shuffle(numbers, keys);
        console.log(arrShuffle);
      }
    });
  });

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

  function createKeyboardAlph(keys) {
    const keyboardAlphaRow = document.createElement("div"),
      keyboardAlphaRow2 = document.createElement("div"),
      keyboardAlphaRow3 = document.createElement("div");
    keyboardAlphaRow.className = "keyboard__alpha-row";
    keyboardAlphaRow2.className = "keyboard__alpha-row";
    keyboardAlphaRow3.className = "keyboard__alpha-row";
    keyboardContainer.appendChild(keyboardAlphaRow);
    keyboardContainer.appendChild(keyboardAlphaRow2);
    keyboardContainer.appendChild(keyboardAlphaRow3);
    keys.forEach((key, index) => {
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

  //startGame
  function timer(seconds, data, round, result) {
    const keys = document.querySelectorAll(".key");
    let timeLeft = seconds;
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        gameInfo.textContent = `Type your answer! ${timeLeft} seconds left!`;
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        keys.forEach((el) => {
          el.disabled = true;
        });
        result = compare(data[round - 1], gameStore);
        if (result === true && round < 5) {
          gameInfo.textContent = "All right! Next round!";
          setTimeout(() => {
            gameInfo.textContent = "Start!";
          }, 1000);
          setTimeout(() => {
            highlightKeys(data, (round += 1));
          }, 2000);
        } else if (result === true && round === 5) {
          gameInfo.textContent = "Victory!";
        } else {
          gameInfo.textContent = "Oops, try again!";
        }
      }
    }, 1000);
  }

  function compare(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  const startBtn = document.querySelector(".start"),
    gameInfo = document.querySelector(".keyboard__info"),
    infoLevel = document.querySelector(".header__information-level");

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(arrShuffle);
    highlightKeys(arrShuffle);
  });

  const highlightKeys = (data, round = 1, delay = 3000) => {
    let result = undefined;
    const keys = document.querySelectorAll(".key");
    gameInfo.textContent = "Round: " + round;
    keys.forEach((el) => {
      el.disabled = true;
    });
    if (round <= data.length) {
      gameStore.length = 0;
      data[round - 1].forEach((item, index) => {
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
    }
    setTimeout(() => {
      keys.forEach((el) => {
        el.classList.remove("highlight");
        el.disabled = false;
      });
      timer(5 * round, data, round, result);
    }, delay * data[round - 1].length);
  };

  //keyboard
  let gameStore = [];
  const keyboardClickHandler = (e) => {
    const keyValue = e.target.getAttribute("data-key");
    if (keyValue && !keys[0].disabled) {
      console.log(keyValue);
      gameStore.push(keyValue);
      e.target.classList.add("highlight");
      setTimeout(() => e.target.classList.remove("highlight"), 300);
    }
    return gameStore;
  };
  const keyboardPushHandler = (e) => {
    const keys = document.querySelectorAll(".key");
    const keyValue = e.key.toUpperCase();
    const keyButton = Array.from(keys).find(
      (key) => key.getAttribute("data-key") === keyValue
    );
    if (keyButton && !keys[0].disabled) {
      console.log(keyValue);
      gameStore.push(keyValue);
      keyButton.classList.add("highlight");
      setTimeout(() => keyButton.classList.remove("highlight"), 300);
    }
    return gameStore;
  };
  document.addEventListener("keyup", keyboardPushHandler);
  document.addEventListener("click", keyboardClickHandler);
};
export { layout };
