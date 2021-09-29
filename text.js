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
    var q1 = document.getElementById('q1').value;
    var q2 = document.getElementById('q2').value;
    var q3 = document.getElementById('q3').value;
    var q4 = document.getElementById('q4').value;
    var q5 = document.getElementById('q5').value;

    var tab = [rep1, rep2, rep3,rep4, rep5 ];
    var res = "";

    while(tab.length > 0)
    {
        var i = Math.floor(Math.random() * tab.length);
        
        res += tab[i];
        tab.splice(i, 1);
    }

    text.innerText = res;
}