const layout = () => {
  const body = document.body,
    header = document.createElement("header"),
    wrapper = document.createElement("div"),
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
    keybordWrapper = document.createElement("div");

  // Set classes
  header.className = "header";
  wrapper.className = "container";
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
  section.className = "keybord__section";
  keybordWrapper.className = "container";
  logoImg.className = "header__logo-img";
  logoImg.src = "assets/img/logo.png";

  // Append elements
  body.appendChild(header);
  body.appendChild(main);
  header.appendChild(wrapper);
  wrapper.appendChild(logo);
  wrapper.appendChild(btnMenuContainer);
  btnMenuContainer.appendChild(buttonStart);
  btnMenuContainer.appendChild(dropMenuContainer);
  dropMenuContainer.appendChild(dropMenuBtn);
  dropMenuContainer.appendChild(dropMenu);
  logo.appendChild(logoImg);
  main.appendChild(section);
  section.appendChild(keybordWrapper);

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
};

export { layout };
