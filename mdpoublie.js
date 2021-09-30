var txtNomSite = document.getElementById('nomSite');
var btnValider = document.getElementById('boutonValider');
var txtResultat = document.getElementById('resultat');

btnValider.addEventListener('click',recupererMdp,false);

const iv = CryptoJS.enc.Base64.parse('generalock');

var params = new URLSearchParams(window.location.search);
var nomSite = params.get('site');

txtNomSite.innerText = nomSite;

function recupererMdp()
{
    var cleSecurite = document.getElementById('cle').value.toString();
    var cleChiffree = CryptoJS.AES.encrypt(cleSecurite, CryptoJS.enc.Utf8.parse(nomSite), {iv: iv}).toString();
    var entreeLocalStorage = localStorage.getItem(cleChiffree);

    if(entreeLocalStorage != null && entreeLocalStorage != undefined)
    {
        var mdpChiffre = localStorage.getItem(nomSite);
        var mdp = CryptoJS.AES.decrypt(mdpChiffre, cleSecurite).toString(CryptoJS.enc.Utf8);

        txtResultat.innerText = "Votre mot de passe est : " + mdp;
    }
    else
    {
        txtResultat.innerText = "Aucun mot de passe trouvé pour ce site.";
    }
}