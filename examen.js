/* Motor de examen compartido. Cada página define window.BANCO antes de cargar este archivo. */
(function(){
"use strict";
var caja=document.getElementById("examen-caja");
if(!caja||!window.BANCO)return;
var BANCO=window.BANCO;
var orden=[],idx=0,resp=[],t0=0,cron=null;
function barajar(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;}
function reloj(){var s=Math.floor((Date.now()-t0)/1000);return ("0"+Math.floor(s/60)).slice(-2)+":"+("0"+(s%60)).slice(-2);}
function hechas(){var n=0;resp.forEach(function(r){if(r!==null)n++;});return n;}
function iniciar(){
  orden=barajar(BANCO.map(function(_,i){return i;}));
  resp=orden.map(function(){return null;});idx=0;t0=Date.now();
  if(cron)clearInterval(cron);
  cron=setInterval(function(){var c=document.getElementById("crono");if(c)c.textContent=reloj();},1000);
  pintar();
}
function pintar(){
  var p=BANCO[orden[idx]],L=["A","B","C","D"];
  var h='<div class="ex-cab"><span class="paso">Pregunta '+(idx+1)+' de '+orden.length+'</span><span class="crono" id="crono">'+reloj()+'</span>'+
    '<span class="ex-riel"><i style="width:'+((idx+1)/orden.length*100)+'%"></i></span></div>'+
    '<span class="ex-tema">'+p.t+'</span><p class="ex-preg">'+p.q+'</p>';
  p.o.forEach(function(t,j){h+='<button class="ex-op" data-o="'+j+'" aria-pressed="'+(resp[idx]===j)+'"><i>'+L[j]+'</i><span>'+t+'</span></button>';});
  h+='<div class="ex-pie"><button class="boton suave" id="ex-prev"'+(idx===0?" disabled":"")+'>← Anterior</button>'+
     '<button class="boton suave" id="ex-next"'+(idx===orden.length-1?" disabled":"")+'>Siguiente →</button>'+
     '<button class="boton" id="ex-entregar">Entregar examen</button>'+
     '<span class="cuenta">'+hechas()+' de '+orden.length+' contestadas</span></div><div class="ex-puntos" id="ex-puntos"></div>';
  caja.innerHTML=h;
  var pts=document.getElementById("ex-puntos");
  orden.forEach(function(_,i){
    var b=document.createElement("button");
    b.className="ex-punto"+(resp[i]!==null?" resuelta":"")+(i===idx?" aqui":"");
    b.textContent=i+1;b.setAttribute("aria-label","Ir a la pregunta "+(i+1));
    b.addEventListener("click",function(){idx=i;pintar();});pts.appendChild(b);
  });
  caja.querySelectorAll(".ex-op").forEach(function(b){
    b.addEventListener("click",function(){resp[idx]=+b.dataset.o;if(idx<orden.length-1)idx++;pintar();});
  });
  document.getElementById("ex-prev").addEventListener("click",function(){if(idx>0){idx--;pintar();}});
  document.getElementById("ex-next").addEventListener("click",function(){if(idx<orden.length-1){idx++;pintar();}});
  document.getElementById("ex-entregar").addEventListener("click",entregar);
}
function entregar(){
  var faltan=orden.length-hechas();
  if(faltan>0&&!confirm("Te faltan "+faltan+" pregunta"+(faltan>1?"s":"")+" por contestar. ¿Entregar de todos modos?"))return;
  clearInterval(cron);
  var ac=0,tema={};
  orden.forEach(function(qi,i){
    var p=BANCO[qi];
    if(!tema[p.t])tema[p.t]={b:0,t:0};
    tema[p.t].t++;
    if(resp[i]===p.ok){ac++;tema[p.t].b++;}
  });
  var pct=Math.round(ac/orden.length*100),tit,txt;
  if(pct>=90){tit="Dominas el módulo.";txt="Podrías explicar el contenido completo sin apoyo.";}
  else if(pct>=70){tit="Aprobado con solidez.";txt="La base está clara. Revisa abajo los temas donde perdiste puntos.";}
  else if(pct>=50){tit="Vas por buen camino.";txt="Los conceptos generales están; faltan los detalles. Repasa los apartados marcados en rojo.";}
  else{tit="Conviene volver al módulo.";txt="Vuelve a leerlo apartado por apartado antes de repetir el examen.";}
  var circ=2*Math.PI*54;
  var h='<div class="ex-nota"><svg class="aro" viewBox="0 0 128 128" role="img" aria-label="Calificación '+pct+' por ciento">'+
    '<circle class="base" cx="64" cy="64" r="54"/><circle class="marca" cx="64" cy="64" r="54" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" id="aro-marca"/>'+
    '<text x="64" y="66" text-anchor="middle" font-size="30">'+pct+'</text>'+
    '<text x="64" y="86" text-anchor="middle" font-size="10" font-family="IBM Plex Mono,monospace" fill="#5A675F" letter-spacing="1">DE 100</text></svg>'+
    '<div class="ex-veredicto"><h3>'+tit+'</h3><p>'+txt+'</p>'+
    '<p style="margin-top:10px;font-family:var(--mono);font-size:.72rem;letter-spacing:.08em">'+ac+' / '+orden.length+' correctas · tiempo '+reloj()+'</p></div></div>';
  h+='<h4 style="margin-top:0">Desglose por tema</h4><div class="ex-temas">';
  Object.keys(tema).forEach(function(t){
    var d=tema[t],p=Math.round(d.b/d.t*100);
    h+='<div class="ex-tema-fila"><span>'+t+'</span><span class="medidor"><i class="'+(p<60?"bajo":"")+'" style="width:'+p+'%"></i></span><b>'+d.b+'/'+d.t+'</b></div>';
  });
  h+='</div><h4>Revisión</h4>';
  orden.forEach(function(qi,i){
    var p=BANCO[qi],r=resp[i],bien=(r===p.ok);
    h+='<div class="revision'+(bien?" acertada":"")+'"><p class="pq">'+(i+1)+'. '+p.q+'</p>'+
      (bien?'<p class="lin buena">Tu respuesta: <b>'+p.o[r]+'</b> ✓</p>':
      '<p class="lin">Tu respuesta: <b>'+(r===null?"sin contestar":p.o[r])+'</b></p><p class="lin buena">Correcta: <b>'+p.o[p.ok]+'</b></p>')+
      '<p class="por">'+p.ex+'</p></div>';
  });
  h+='<div class="ex-pie"><button class="boton" id="ex-otra">Repetir examen</button><a class="boton suave" href="index.html" style="text-decoration:none;display:inline-block">Volver al índice</a></div>';
  caja.innerHTML=h;
  setTimeout(function(){var m=document.getElementById("aro-marca");if(m)m.style.strokeDashoffset=circ*(1-pct/100);},80);
  caja.scrollIntoView({behavior:"smooth",block:"start"});
  document.getElementById("ex-otra").addEventListener("click",function(){iniciar();caja.scrollIntoView({behavior:"smooth",block:"start"});});
}
iniciar();
})();
