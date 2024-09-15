const content = [
  [ // Why Learn the Force?
    "Force be with you!",
    "Harness the Dark Side.",
    "Master Jedi ways.",
    "Conquer any challenge."
  ],
  [ // Core Jedi Skills
    "Force Push for production.",
    "Force Pull for opportunities.",
    "Mind Trick for breaks.",
    "Force Lightning for debugging."
  ],
  [ // Resources for Jedi Training
    "Official Jedi Order.",
    "Mandalorian series.",
    "Clone Wars series.",
    "Last Jedi."
  ],
  [ // Jedi vs Sith
    "Light vs Dark.",
    "Clean, efficient code.",
    "Beware of Dark Side.",
    "Choose your path."
  ]
];

const btnWhyJedi = document.getElementById("btn-why-force");
const btnCoreJedi = document.getElementById("btn-core-jedi");
const btnResources = document.getElementById("btn-resources");
const btnJediVsSith = document.getElementById("btn-jedivssith");
const tabContent = document.getElementById("tab-content");

function displayContent(items) {
  let listContent = "";
  for (const item of items) {
    listContent += `<li>${item}</li>`;
  }
  const list = document.createElement("ul");
  tabContent.innerHTML = ""; // clear existing content
  list.innerHTML = listContent; // insert new content
  tabContent.append(list);
}

function highlightButton(btn) {
  // Clear all existing styling / highlights
  btnWhyJedi.className = "";
  btnCoreJedi.className = "";
  btnResources.className = "";
  btnJediVsSith.className = "";
  btn.className = "active"; // set new style / highlight
}

function handleClick(event) {
  const btnId = event.target.id;
  highlightButton(event.target);
  if (btnId === "btn-why-force") {
    displayContent(content[0]);
  } else if (btnId === "btn-core-jedi") {
    displayContent(content[1]);
  } else if (btnId === "btn-resources") {
    displayContent(content[2]);
  }
  else  {
    displayContent(content[3]);
  }
}

displayContent(content[0]); // initially show this content

btnWhyJedi.addEventListener("click", handleClick);
btnCoreJedi.addEventListener("click", handleClick);
btnResources.addEventListener("click", handleClick);
btnJediVsSith.addEventListener("click", handleClick);