var isLogin = (document.querySelectorAll('input[type=password]')) != null;

if(isLogin)
{
    var tabCheckbox = document.querySelectorAll('input[type=checkbox]');

    for(let i=0; i<tabCheckbox.length; i++)
    {
        if(tabCheckbox[i].type == 'checkbox')
        {
            tabCheckbox[i].checked = false;
        }
    }
}