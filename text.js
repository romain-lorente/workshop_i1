var boutongen = document.getElementById('boutongen');
var boutonsuppr = document.getElementById('boutonsuppr');
var text = document.getElementById('resultat');
var txtCle = document.getElementById('txtCle');
boutongen.addEventListener('click',generer,false);
boutonsuppr.addEventListener('click',supprimerBDD,false);

var lienMdpOublie = document.getElementById('versMdpOublie');
lienMdpOublie.addEventListener('click',versMdpOublie,false);

const iv = CryptoJS.enc.Base64.parse('generalock');

function versMdpOublie()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
        var activeTab = tabs[0];
        var currentSite = new URL(activeTab.url);
        var currentHostname = currentSite.hostname;
        
        chrome.tabs.create({active: true, url: "recuperationmdp.html?site=" + currentHostname});
    });
}

function supprimerBDD()
{
    let nb1 = Math.floor(Math.random() * 10) + 1;
    let nb2 = Math.floor(Math.random() * 10) + 1;
    let nbAttendu = nb1 + nb2;

    let nbEntre = prompt("Pour supprimer tous vos mots de passe, veuillez calculer la somme des nombres suivants : \n\n" + nb1 + " + " + nb2 + " = ?");

    if(nbEntre == nbAttendu)
    {
        localStorage.clear();
        alert("Suppression des mots de passe réussie.");
    }
    else
    {
        alert("Le résultat est incorrect. Suppression annulée.");
    }
}

function generer() 
{
    //Récupération des réponses
    var rep1 = document.getElementById('reponse1').value; 
    var rep2 = document.getElementById('reponse2').value; 
    var rep3 = document.getElementById('reponse3').value; 
    var rep4 = document.getElementById('reponse4').value; 
    var rep5 = document.getElementById('reponse5').value;

    //Récupération des types de questions
    var valeurQ1 = document.getElementById('q1').value;
    var valeurQ2 = document.getElementById('q2').value;
    var valeurQ3 = document.getElementById('q3').value;
    var valeurQ4 = document.getElementById('q4').value;
    var valeurQ5 = document.getElementById('q5').value;

    //Index des questions sélectionnées
    var indexQ1 = document.getElementById('q1').selectedIndex;
    var indexQ2 = document.getElementById('q2').selectedIndex;
    var indexQ3 = document.getElementById('q3').selectedIndex;
    var indexQ4 = document.getElementById('q4').selectedIndex;
    var indexQ5 = document.getElementById('q5').selectedIndex;

    //Vérifier que l'utilisateur a sélectionné toutes ses questions
    var tabQuestions = [valeurQ1, valeurQ2, valeurQ3, valeurQ4, valeurQ5];
    var tabReponses = [rep1, rep2, rep3, rep4, rep5];
    var tabIndex = [indexQ1, indexQ2, indexQ3, indexQ4, indexQ5];

    var questionEstValide = true;
    var reponseEstValide = true;

    for (let i=0; i<tabQuestions.length; i++)
    {
        if(tabQuestions[i] == "")
        {
            questionEstValide = false;
        }

        if(tabReponses[i].replace(" ", "") == "")
        {
            reponseEstValide = false;
        }
    }

    if(questionEstValide && reponseEstValide)
    {
        //Génère le mot de passe
        var mdpEtOrdre = generationMdp(tabReponses);
        text.innerText = mdpEtOrdre[0];

        //Stocke les questions et leurs réponses
        //stockerDonnees(tabQuestions, tabReponses);

        //Clé de sécurité
        var cleSecurite = creerCleSecurite(mdpEtOrdre[1], tabIndex);
        txtCle.innerText = "Clé de sécurité (à conserver) : " + cleSecurite;

        //Chiffrement et enregistrement du mot de passe
        stockerMotDePasse(chiffrerMotDePasse(mdpEtOrdre[0], cleSecurite), cleSecurite);
    }
    else
    {
        text.innerText = "Veuillez compléter le formulaire.";
    }
}

function generationMdp(tab)
{
    //Contient le mot de passe et l'ordre des questions
    var res = ["", []];
    var i = Math.floor(Math.random() * tab.length);

    while(res[1].length < tab.length)
    {
        while(res[1].includes(i))
        {
            i = Math.floor(Math.random() * tab.length);
        }

        res[0] += tab[i];
        res[1].push(i);
    }

    return res;
}

function creerCleSecurite(ordre, index)
{
    //Crée la clé de sécurité à partir de l'ordre des questions et leur index
    var cle = "";
    var cleTemp = "";

    for(let i=0; i<index.length; i++)
    {
        cleTemp = (ordre[i] + 1).toString() + index[ordre[i]].toString();
        cle += cleTemp;
    }

    return cle;
}

//La fonctionnalité utilisant ces données n'est pas implémentée
/*function stockerDonnees(tabQ, tabR)
{
    for (let j=0; j<tabQ.length; j++)
    {
        if(localStorage.getItem(tabQ[j]) == null)
        {
            localStorage.setItem(tabQ[j], tabR[j]);
        }
    }
}*/

function chiffrerMotDePasse(mdp, cle)
{
    return CryptoJS.AES.encrypt(mdp, cle).toString();
}

function dechiffrerMotDePasse(mdp, cle)
{
    return CryptoJS.AES.decrypt(mdp, cle).toString(CryptoJS.enc.Utf8);
}

function stockerMotDePasse(mdp, cle)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
        //Récupération du domaine actif
        var activeTab = tabs[0];
        var currentSite = new URL(activeTab.url);
        var currentHostname = currentSite.hostname;

        enregistrementMotDePasse(currentHostname, mdp);

        //Chiffrement de la clé de sécurité avec le domaine pour clé
        var cleChiffree = CryptoJS.AES.encrypt(cle, CryptoJS.enc.Utf8.parse(currentHostname), {iv: iv}).toString();

        suppressionAncienneCle(currentHostname);
        enregistrementCleSite(cleChiffree, currentHostname);
    });
}

function enregistrementMotDePasse(site, mdp)
{
    //Ajoute un mot de passe déjà chiffré dans le localstorage
    localStorage.setItem(site, mdp);
}

function suppressionAncienneCle(site)
{
    for(let i=0; i<localStorage.length; i++)
    {
        let cle = localStorage.key(i);
        let valeur = localStorage.getItem(cle);

        if(valeur == site)
        {
            localStorage.removeItem(cle);
        }
    }
}

function enregistrementCleSite(cle, site)
{
    //Ajoute la clé chiffrée liée à un site
    localStorage.setItem(cle, site);
}