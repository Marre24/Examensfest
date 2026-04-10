const targetElement = document.getElementById("alcoholPreferences");

function sendResponse() {
  const name = document.getElementById("name").value.trim();
  const canCome = document.getElementById("canCome").checked;
  const wantAlcohol = document.getElementById("wantAlcohol").checked;
  const preferences = targetElement.value.trim();

  var body = `Hejsan Maxi,

${
  canCome
    ? "Jag skulle gärna vilja komma på din asfeta examensfest."
    : "Tyvärr kan jag inte komma på din examensfest."
}
${
  wantAlcohol
    ? "Jag skulle gärna vilja att du köper alkohol till mig." + preferences ==
      ""
      ? ""
      : `Mina önskemål gällande alkohol är: ${preferences}`
    : "Du behöver inte köpa alkohol till mig."
}

Mvh, ${name}`;

  const link =
    "mailto:" +
    encodeURIComponent("maximilian.ellnestam@gmail.com") +
    "?subject=" +
    encodeURIComponent("Examensfest") +
    "&body=" +
    encodeURIComponent(body);

  const funometerValue = Number(document.getElementById("funometer").value);

  if (funometerValue < 100) {
    showModal(
      "Du verkar inte så taggad på det här, ändra på din inställning innan du anmäler dig!",
    );
    return;
  }

  window.location.href = link;
}

function showModal(message) {
  document.getElementById("xp-modal-message").textContent = message;
  const modal = document.getElementById("xp-modal");
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("xp-modal").style.display = "none";
}

const checkbox = document.getElementById("wantAlcohol");
targetElement.style.display = "none";

checkbox.addEventListener("click", function handleClick() {
  if (checkbox.checked) {
    targetElement.style.display = "block";
  } else {
    targetElement.style.display = "none";
  }
});

document.getElementById("name").addEventListener("input", function () {
  const name = this.value.trim();
  const list = document.querySelector(".xp-content ul");
  const preview = document.getElementById("guest-preview");

  if (name === "") {
    if (preview) preview.remove();
    return;
  }

  if (!preview) {
    const li = document.createElement("li");
    li.id = "guest-preview";
    li.textContent = name;
    list.appendChild(li);
  } else {
    preview.textContent = name;
  }
});

let guestCount = 247;

function buildDigitCol() {
  const col = document.createElement("div");
  col.className = "digit-col";
  // Stack all 10 digits vertically
  for (let i = 0; i <= 9; i++) {
    const span = document.createElement("div");
    span.className = "digit-inner";
    span.textContent = i;
    span.style.top = `${i * 1.4}em`;
    col.appendChild(span);
  }
  col.dataset.current = 0;
  showDigit(col, 0, false);
  return col;
}

function showDigit(col, digit, animate) {
  if (!animate) col.style.setProperty("--no-transition", "none");
  const digits = col.querySelectorAll(".digit-inner");
  digits.forEach((d) => {
    d.style.transition = animate
      ? "transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)"
      : "none";
    d.style.transform = `translateY(${-digit * 1.4}em)`;
  });
  col.dataset.current = digit;
}

function setDigits(num) {
  const container = document.getElementById("guest-count");
  const digits = String(num).split("").map(Number);

  while (container.children.length < digits.length) {
    container.appendChild(buildDigitCol());
  }
  while (container.children.length > digits.length) {
    container.removeChild(container.firstChild);
  }

  digits.forEach((d, i) => {
    showDigit(container.children[i], d, true);
  });
}

setDigits(guestCount);

setInterval(() => {
  const change = Math.floor(Math.random() * 12) - 3;
  guestCount = Math.max(1, guestCount + change);
  setDigits(guestCount);

  setTimeout(() => {
    const trend = document.getElementById("guest-trend");
    trend.textContent =
      change >= 0 ? "↑ och det ökar!" : "↓ folk ångrar sig...";
    trend.style.color = change >= 0 ? "#1a6fe8" : "#c0392b";
  }, 450);
}, 2500);
const funometerInput = document.getElementById("funometer");
let ballInterval = null;

funometerInput.addEventListener("input", function () {
  if (Number(this.value) === 100) {
    destroyFunometer();
  }
});

function getFunometerThumbPosition() {
  const rect = funometerInput.getBoundingClientRect();
  return {
    x: rect.right - 20,
    y: rect.top + rect.height / 2 - 20,
  };
}

function preventChange() {
  funometerInput.value = 100;
}

function destroyFunometer() {
  const pos = getFunometerThumbPosition();

  const wrap = document.querySelector(".range-wrap");
  let shakes = 0;
  const shakeInterval = setInterval(() => {
    wrap.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
    shakes++;
    if (shakes > 10) {
      clearInterval(shakeInterval);
      wrap.style.transform = "none";
    }
  }, 40);

  funometerInput.style.accentColor = "#c0392b";
  funometerInput.addEventListener("input", preventChange);
  funometerInput.classList.add("funometer-destroyed");

  const ball = document.getElementById("funometer-ball");
  ball.style.left = pos.x + "px";
  ball.style.top = pos.y + "px";
  ball.style.display = "block";

  let x = pos.x;
  let y = pos.y;
  let dx = 3;
  let dy = -3;
  const size = 18;
  let dvdMode = false;

  setTimeout(() => {
    ball.style.width = "80px";
    ball.style.height = "40px";
    ball.style.borderRadius = "0";
    ball.style.background = "none";
    ball.style.border = "none";
    ball.style.boxShadow = "none";
    ball.innerHTML = `<img src="assets/img/Dvd-Logo.png" style="width:100%; height:100%; object-fit:contain;" />`;
    dvdMode = true;
  }, 3000);

  ballInterval = setInterval(() => {
    const w = dvdMode ? 80 : size;
    const h = dvdMode ? 40 : size;

    x += dx;
    y += dy;

    if (x <= 0) {
      x = 0;
      dx *= -1;
    }
    if (x >= window.innerWidth - w) {
      x = window.innerWidth - w;
      dx *= -1;
    }
    if (y <= 0) {
      y = 0;
      dy *= -1;
    }
    if (y >= window.innerHeight - h) {
      y = window.innerHeight - h;
      dy *= -1;
    }

    ball.style.left = x + "px";
    ball.style.top = y + "px";
  }, 16);
}
