localStorage.setItem("localcount",0);
sessionStorage.setItem("sessioncount",0);

var c1 = document.getElementById("local");
var c2 = document.getElementById("session");

c1.innerHTML=localStorage.getItem("localcount");
c2.innerHTML=sessionStorage.getItem("sessioncount");

function incrementLocal()
{
    let count = localStorage.getItem("localcount");
    localStorage.setItem("localcount",Number(count)+1);
    c1.innerHTML = localStorage.getItem("localcount");
}

function incrementSession()
{
    let count = sessionStorage.getItem("sessioncount");
    sessionStorage.setItem("sessioncount",Number(count)+1);
    c2.innerHTML = sessionStorage.getItem("sessioncount") ;

}