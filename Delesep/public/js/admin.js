const bannedWords=["connard","idiot","stupide","pute","merde","salope","chiant","enculé","bite","couille","salaud","foutre","bordel","taré","crétin","déchet","merdique","débile"];

// Données
let ideas=JSON.parse(localStorage.getItem("ideas"))||[];
let comptesRendus=JSON.parse(localStorage.getItem("cr"))||[];
let initiatives=JSON.parse(localStorage.getItem("init"))||[];
let agenda=JSON.parse(localStorage.getItem("agenda"))||[];

// Fonction filtrage
function filterText(text){
    let clean=text;
    bannedWords.forEach(word=>{clean=clean.replace(new RegExp(word,"gi"),"***");});
    return clean;
}

// --- Ajouter / supprimer individuel ---

function removeIdea(index){
    if(confirm("Supprimer cette idée ?")){
        ideas.splice(index,1);
        localStorage.setItem("ideas",JSON.stringify(ideas));
        updateIdeas();
    }
}
function removeCR(index){
    if(confirm("Supprimer ce compte rendu ?")){
        comptesRendus.splice(index,1);
        localStorage.setItem("cr",JSON.stringify(comptesRendus));
        updateCR();
    }
}
function removeInit(index){
    if(confirm("Supprimer cette initiative ?")){
        initiatives.splice(index,1);
        localStorage.setItem("init",JSON.stringify(initiatives));
        updateInit();
    }
}
function removeAgenda(index){
    if(confirm("Supprimer cet événement ?")){
        agenda.splice(index,1);
        localStorage.setItem("agenda",JSON.stringify(agenda));
        updateAgenda();
    }
}

// Ajouter éléments
function addAgenda(){
    const val=document.getElementById("agendaInput").value.trim();
    if(!val) return;
    agenda.push(filterText(val));
    localStorage.setItem("agenda",JSON.stringify(agenda));
    updateAgenda();
    document.getElementById("agendaInput").value="";
}
function addCR(){
    const val=document.getElementById("crInput").value.trim();
    if(!val) return;
    comptesRendus.push(filterText(val));
    localStorage.setItem("cr",JSON.stringify(comptesRendus));
    updateCR();
    document.getElementById("crInput").value="";
}
function addInit(){
    const val=document.getElementById("initInput").value.trim();
    if(!val) return;
    initiatives.push(filterText(val));
    localStorage.setItem("init",JSON.stringify(initiatives));
    updateInit();
    document.getElementById("initInput").value="";
}

// Changer mots de passe
function changePasswords(){
    const newDelegue=prompt("Nouveau mot de passe délégués:", localStorage.getItem("deleguePassword")||"delegue2025");
    if(newDelegue) localStorage.setItem("deleguePassword",newDelegue);
    const newAdmin=prompt("Nouveau mot de passe admin:", localStorage.getItem("adminPassword")||"admin2025");
    if(newAdmin) localStorage.setItem("adminPassword",newAdmin);
    alert("Mots de passe mis à jour !");
}

// --- Mise à jour affichage ---
function updateIdeas(){
    const container=document.getElementById("ideaList");
    container.innerHTML=ideas.map((i,index)=>`<li>${i.texte} - Votes: ${i.votes?.length||0} 
    <button onclick="removeIdea(${index})">Supprimer</button></li>`).join("");
}
function updateCR(){
    const container=document.getElementById("crList");
    container.innerHTML=comptesRendus.map((c,index)=>`<li>${c} <button onclick="removeCR(${index})">Supprimer</button></li>`).join("");
}
function updateInit(){
    const container=document.getElementById("initList");
    container.innerHTML=initiatives.map((i,index)=>`<li>${i} <button onclick="removeInit(${index})">Supprimer</button></li>`).join("");
}
function updateAgenda(){
    const container=document.getElementById("agendaList");
    container.innerHTML=agenda.map((a,index)=>`<li>${a} <button onclick="removeAgenda(${index})">Supprimer</button></li>`).join("");
}

// Initialisation affichage
updateIdeas(); updateCR(); updateInit(); updateAgenda();
