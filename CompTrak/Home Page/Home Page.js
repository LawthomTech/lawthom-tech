// Set dummy user for development
let userId = btoa("auth0|61868c96d6e3f3006b56119d");
sessionStorage.setItem("userId", userId);

active_dir = location.href.split("Home")[0];
console.log(active_dir);
if (!userId) {
  window.location = active_dir + LOGIN_HTML;
}

let tournaments = [];
makeRequest("GET", GET_TOURNAMENT + API_CALLER + "tournaments/" + userId).then((value) => {
  tournaments = value;
  createPage()
});

// Nav Paths
for (let i of document.getElementsByClassName("href-home")) {
  i.setAttribute("href", active_dir + HOME_HTML);
}
for (let i of document.getElementsByClassName("href-account")) {
  i.setAttribute("href", active_dir + ACCOUNT_HTML);
}

function createPage() {
  if (!tournaments) {
    tournaments = [];
  }
  for (let i of tournaments) {
    let cardDiv = createEl("div", null, "tournament-board", JSON.stringify(i), "card bg-light border-dark mx-5 mb-5", null, "width: fit-content; display: inline-block");
    let cardHeader = createEl("div", cardDiv, null, null, "card-header my-card-header");
    let cardText = createEl("div", cardHeader, null, null, null, i.tournamentName, "cursor: pointer; font-size: large");
    cardText.addEventListener('click', () => loadTournament(cardDiv));
    deleteBtn(cardHeader);
  }
}

function deleteBtn(nameDiv) {
  let nameBtn = createEl("button", nameDiv, null, null, "close");
  nameBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
  nameBtn.setAttribute("onclick", "deleteTournament(this.parentNode.parentNode, this)");
}

function deleteTournament(delEl) {
  const tournamentId = JSON.parse(delEl.id).tournamentId;
  makeRequest("DELETE", DEL_TOURNAMENT + API_CALLER, JSON.stringify({tournamentId})).then(() => {
    window.location.href = active_dir + HOME_HTML;
  })
}

function newTournament() {
  sessionStorage.setItem("noOfTournaments", tournaments.length);
  window.location.href = active_dir + NEW_TOURNAMENT_TREE_HTML;
}

function loadTournament(data) {
  console.log(data)
  sessionStorage.setItem('newTournament', false);
  sessionStorage.setItem("tournamentId", JSON.stringify(JSON.parse(data.id).tournamentId));
  window.location.href = active_dir + TOURNAMENT_TREE_HTML;
}
