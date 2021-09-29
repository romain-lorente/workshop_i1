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

    //Vérifier que l'utilisateur a sélectionné toutes ses questions
    var tabQuestions = [valeurQ1, valeurQ2, valeurQ3, valeurQ4, valeurQ5];
    var tabReponses = [rep1, rep2, rep3,rep4, rep5];
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
        var mdp = "";
    
        while(tabReponses.length > 0)
        {
            var i = Math.floor(Math.random() * tabReponses.length);
            
            mdp += tabReponses[i];
            tabReponses.splice(i, 1);
        }
    
        text.innerText = mdp;
    }
    else
    {
        text.innerText = "Veuillez compléter le formulaire.";
    }
}