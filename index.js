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