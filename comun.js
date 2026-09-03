/* Navegación, progreso y utilidades compartidas por todos los módulos. */
(function(){
"use strict";
var prog=document.getElementById("progreso");
var secs=[].slice.call(document.querySelectorAll("section[id]"));
var links=[].slice.call(document.querySelectorAll(".indice a[href^='#']"));
function alScroll(){
  var h=document.documentElement;
  if(prog)prog.style.width=Math.min(100,h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
  var act=null;
  secs.forEach(function(s){if(s.getBoundingClientRect().top<=120)act=s.id;});
  links.forEach(function(a){a.classList.toggle("activo",a.getAttribute("href")==="#"+act);});
}
window.addEventListener("scroll",alScroll,{passive:true});alScroll();
document.querySelectorAll(".verrespuesta").forEach(function(b){
  b.addEventListener("click",function(){
    var r=b.parentNode.querySelector(".respuesta");
    b.textContent=r.classList.toggle("visible")?"Ocultar respuesta":"Ver respuesta modelo";
  });
});
})();
