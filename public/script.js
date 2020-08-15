$("#btnSend").click(function () {
  let hint = $("#inputNome").val();

  $.ajax({
    type: "POST",
    url: "/",
    data: { hint: hint },
    success: function (data) {
      if (data.length == 0) {
        $("#circleHelper").css('background-color', "#d9de58"); //Erro fica: #ec2727 (A implementar)
      } else {
        $("#screen").css('background-color', "#74d1ea");
        $("#circleHelper").css('background-color', "#69e865");
      }
      gerarPokemonCards(data)
    }
  });
});
var searchResults = document.getElementById("searchContent");
var nameInput = document.getElementById("inputNome");

function gerarPokemonCards(d) {
  searchResults.innerHTML = "";
  for (var i = 0; i < d.length; i++) {
    try {
      searchResults.innerHTML += `
        <div class="pkmnCards ${checkCardColor(d[i].especie)} card" onclick="copyToClipboard(this)">
            ${checkSpecie(d[i].especie)}
            <img style="width: 65%; align-self: center;" class="card-img-top" src="${d[i].img}" alt="Card image cap">
            <hr style="margin-top: 5px; margin-bottom: 5px;">
            <div style="padding: 0.25rem;" class="card-body">
              <h6 class="card-title">Id: ${d[i].id}</h6>
              <div>
                <p class="card-text">Nome: ${d[i].nome}</p>
                <br/>
                <p id="${d[i].nome}" style="color: #ffffff00;-webkit-user-select: auto;-webkit-user-drag: auto;-webkit-app-region: drag;" class="card-text">.catch ${d[i].nome}</p>
              </div>
            </div>
        </div>
      `;
    } catch (err) { }
  }
}

function checkSpecie(specieData) {
  switch (specieData) {
    case "Inicial":
      return `<div class="especieBall cInicial"></div>`;
      break;
    case "Lendario":
      return `<div class="especieBall cLendario"></div>`;
      break;
    case "Mitico":
      return `<div class="especieBall cMitico"></div>`;
      break;
    case "UB":
      return `<div class="especieBall cUb"></div>`;
      break;
    default:
      return "";
      break;
  }
}

function checkCardColor(specieData) {
  switch (specieData) {
    case "Inicial":
      return `pkmnCardInicial`;
      break;
    case "Lendario":
      return `pkmnCardLendario`;
      break;
    case "Mitico":
      return `pkmnCardMitico`;
      break;
    case "UB":
      return `pkmnCardUb`;
      break;
    default:
      return "pkmnCardNone";
      break;
  }
}

function copyToClipboard(obj) {
  let nomeElem = obj.getElementsByClassName("card-text")[1];

  let range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(nomeElem);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  searchResults.innerHTML = "";
  nameInput.value = "";
  $("#circleHelper").css('background-color', "#151515");
  $("#screen").css('background-color', "#151515");
}