function sendResponse() {
  const name = document.getElementById("name").value.trim();
  const canCome = document.getElementById("canCome").checked;
  const wantAlcohol = document.getElementById("wantAlcohol").checked;
  const allergies = document.getElementById("allergies").value.trim();

  var body = `Hejsan Maxi,

${
  canCome
    ? "Jag skulle gärna vilja komma på din asfeta examensfest."
    : "Tyvärr kan jag inte komma på din examensfest."
}
${
  wantAlcohol
    ? "Jag skulle gärna vilja att du köper alkohol till mig."
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

  window.location.href = link;
}
