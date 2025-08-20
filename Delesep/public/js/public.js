const bannedWords=["connard","idiot","stupide","pute","merde","salope","chiant","enculé","bite","couille","salaud","foutre","bordel","taré","crétin","déchet","merdique","débile"];

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// Chaque page aura son propre chat, sauvegardé sous un nom différent
const storageKey = "chat_public"; // pour public.js
// const storageKey = "chat_pro"; // pour pro.js

let messages = JSON.parse(localStorage.getItem(storageKey)) || [];

function filterText(text){
    let clean = text;
    bannedWords.forEach(word => {
        clean = clean.replace(new RegExp(word, "gi"), "***");
    });
    return clean;
}

function updateChat(){
    chatBox.innerHTML = messages.map(m => `<p><b>${m.auteur}:</b> ${m.texte}</p>`).join("");
}

chatSend.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if(!msg) return;
    const auteur = localStorage.getItem("userName") || "Élève";
    messages.push({auteur, texte: filterText(msg)});
    localStorage.setItem(storageKey, JSON.stringify(messages));
    updateChat();
    chatInput.value = "";
});

// Initialisation
updateChat();
