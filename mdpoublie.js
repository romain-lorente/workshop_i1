var txtNomSite = document.getElementById('nomSite');
var btnValider = document.getElementById('boutonValider');
var txtResultat = document.getElementById('resultat');

var params = new URLSearchParams(window.location.search);
var nomSite = params.get('site');

txtNomSite.innerText = nomSite;

function recupererMdp()
{
    var cleSecurite = document.getElementById('cle').value;
    var entreeLocalStorage = localStorage.getItem(nomSite);

    if(entreeLocalStorage != null && entreeLocalStorage != undefined)
    {
        
    }
    else
    {
        txtResultat.value = "Vous n'avez pas de mot de passe enregistré pour ce site.";
    }
}