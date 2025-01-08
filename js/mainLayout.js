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
    keyboardContainer = document.createElement("div");

  // Set classes
  header.className = "header";
  wrapper.className = "container";
  menuWrapper.className = "header__menu-wrapper";
  informationWrapper.className = "header__information";
  btnMenuContainer.className = "header__menu";
  buttonStart.className = "btn btn-secondary";
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
  keyboardWrapper.className = "container";
  keyboardContainer.className = "keyboard";
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
    rounds.forEach((numElements) => {
      let roundRes = [];
      for (let i = 0; i < numElements; i++) {
        roundRes.push(flat[Math.floor(flat.length * Math.random())]);
      }
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

  const handler = () =>
    document.querySelector(".keyboard").addEventListener("click", (e) => {
      console.log(e);
    });
};

export { layout };
