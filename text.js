var boutongen = document.getElementById('boutongen');
var text = document.getElementById('resultat');
boutongen.addEventListener('click',generer,false);

function generer () {
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

        if(tabReponses[i] == "")
        {
            reponseEstValide = false;
        }
    }

    if(questionEstValide && reponseEstValide)
    {
        //Génère le mot de passe
        var mdpCle = generationMdp(tabReponses);
        text.innerText = mdpCle[0];

        //Stocke les questions et leurs réponses
        stockerDonnees(tabQuestions, tabReponses);

        //Clé de sécurité
        console.log(creerCleSecurite(mdpCle[1], tabIndex));
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

function stockerDonnees(tabQ, tabR)
{
    for (let j=0; j<tabQ.length; j++)
    {
        if(localStorage.getItem(tabQ[j]) == null)
        {
            localStorage.setItem(tabQ[j], tabR[j]);
        }
    }
}

