const targetElement = document.getElementById("alcoholPreferences");

function sendResponse() {
  const name = document.getElementById("name").value.trim();
  const canCome = document.getElementById("canCome").checked;
  const wantAlcohol = document.getElementById("wantAlcohol").checked;
  const allergies = document.getElementById("allergies").value.trim();
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
${allergies == "" ? "" : `Här är mina allergier/saker du bör känna till: ${allergies}`}

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
