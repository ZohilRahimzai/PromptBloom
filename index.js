let prompts = JSON.parse(localStorage.getItem("prompts")) || [];

function showMainSection(sectionId){
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  let section = document.getElementById(sectionId);
  section.classList.remove('hidden');

  document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
  document.querySelector(`.sidebar nav a[onclick="showMainSection('${sectionId}')"]`).classList.add('active');

  if(sectionId === 'savedPage') displaySavedPrompts();
  if(sectionId === 'favoritesPage') displayFavorites();
  if(sectionId === 'searchPage') searchPromptsPage();

  requestAnimationFrame(() => {
    section.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}

function addPrompt(){
  let title = document.getElementById("title").value;
  let category = document.getElementById("category").value;
  let text = document.getElementById("prompt").value;

  if(!title || !text) {
    alert("Please enter title and prompt");
    return;
  }

  let prompt = {title, category, text, favorite:false};
  prompts.push(prompt);
  localStorage.setItem("prompts", JSON.stringify(prompts));

  document.getElementById("title").value = "";
  document.getElementById("prompt").value = "";

  showMainSection('savedPage');
}

function displaySavedPrompts(){
  let container = document.getElementById("promptListSaved");
  container.innerHTML = "";
  document.getElementById("countSaved").innerText = "Total Prompts: " + prompts.length;

  prompts.forEach((p,index)=>{
    let card = document.createElement("div");
    card.className = "card";
    let star = p.favorite ? "★" : "☆";
    card.innerHTML = `
      <h4>${p.title} <span class="favorite-star" onclick="toggleFavorite(${index}, true)">${star}</span></h4>
      <b>${p.category}</b>
      <p>${p.text}</p>
      <button class="copy" onclick="copyPrompt(${index})">⭐ Copy</button>
      <button class="edit" onclick="editPrompt(${index})">✏️ Edit</button>
      <button class="delete" onclick="deletePrompt(${index}, 'saved')">🗑 Delete</button>
    `;
    container.appendChild(card);
  });
}

function displayFavorites(){
  let container = document.getElementById("promptListFavorites");
  container.innerHTML = "";

  prompts.forEach((p,index)=>{
    if(!p.favorite) return;

    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${p.title} <span class="favorite-star" onclick="toggleFavorite(${index}, true)">★</span></h4>
      <b>${p.category}</b>
      <p>${p.text}</p>
      <button class="copy" onclick="copyPrompt(${index})">⭐ Copy</button>
    `;
    container.appendChild(card);
  });

  requestAnimationFrame(() => {
    document.getElementById("favoritesPage").scrollIntoView({behavior: 'smooth', block: 'start'});
  });
}


function copyPrompt(index){
  navigator.clipboard.writeText(prompts[index].text);
  alert("Prompt copied!");
}

function deletePrompt(index, type='all'){
  prompts.splice(index,1);
  localStorage.setItem("prompts", JSON.stringify(prompts));

  if(type === 'saved') displaySavedPrompts();
  else displayFavorites();

  searchPromptsPage();
}

function editPrompt(index){
  let p = prompts[index];
  document.getElementById("title").value = p.title;
  document.getElementById("category").value = p.category;
  document.getElementById("prompt").value = p.text;

  deletePrompt(index, 'saved');
  showMainSection('addPage');
}