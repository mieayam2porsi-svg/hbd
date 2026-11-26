const cv=document.getElementById('fx'),cx=cv.getContext('2d');
let W,H,parts=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}
rs();addEventListener('resize',rs);
const COL=['#ffd54a','#ffb300','#ff6b6b','#4dd0e1','#9575ff','#7bed9f','#ffffff','#ff9ff3'];
const rnd=(a,b)=>a+Math.random()*(b-a);
function firework(x,y){
  const c=COL[Math.floor(Math.random()*COL.length)];
  for(let i=0;i<70;i++){const a=Math.PI*2*i/70,s=rnd(1.5,5.5);
    parts.push({t:'s',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,d:rnd(.008,.016),c,g:.04,r:2})}
}
function confetti(n){
  for(let i=0;i<n;i++)parts.push({t:'c',x:rnd(0,W),y:rnd(-H*.3,-10),vx:rnd(-1.5,1.5),vy:rnd(2,5),l:1,d:.003,c:COL[Math.floor(Math.random()*COL.length)],w:rnd(6,11),h:rnd(4,7),a:rnd(0,6),va:rnd(-.2,.2),g:.01})
}
function sparkle(n){
  for(let i=0;i<n;i++)parts.push({t:'p',x:rnd(0,W),y:rnd(0,H),vx:rnd(-.3,.3),vy:rnd(-.6,-.1),l:1,d:rnd(.005,.012),c:'#ffe27a',g:0,r:rnd(1,3)})
}
function loop(){
  cx.clearRect(0,0,W,H);
  parts=parts.filter(p=>p.l>0&&p.y<H+30);
  for(const p of parts){
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.l-=p.d;
    cx.globalAlpha=Math.max(p.l,0);cx.fillStyle=p.c;
    if(p.t==='c'){p.a+=p.va;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()}
    else{cx.shadowColor=p.c;cx.shadowBlur=10;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();cx.shadowBlur=0}
  }
  cx.globalAlpha=1;requestAnimationFrame(loop)
}
loop();
function celebrate(){
  sparkle(60);confetti(120);
  for(let i=0;i<6;i++)setTimeout(()=>firework(rnd(W*.15,W*.85),rnd(H*.12,H*.5)),600+i*500);
}
let ambient=setInterval(()=>{sparkle(2);if(Math.random()<.18)firework(rnd(W*.1,W*.9),rnd(H*.1,H*.45))},400);
const bal=document.getElementById('balloons');
function balloon(){
  const b=document.createElement('div');b.className='balloon';
  b.style.left=rnd(2,94)+'%';b.style.background=COL[Math.floor(Math.random()*6)];
  b.style.animationDuration=rnd(9,16)+'s';bal.appendChild(b);
  setTimeout(()=>b.remove(),17000)
}
setInterval(balloon,1300);
for(let i=0;i<6;i++)setTimeout(balloon,i*300);

const pages=[...document.querySelectorAll('.page')],nav=document.getElementById('nav');
pages.forEach((_,i)=>{const d=document.createElement('button');d.className='dot';d.setAttribute('aria-label','Halaman '+(i+1));d.onclick=()=>go(i);nav.appendChild(d)});
function go(n){
  pages.forEach((p,i)=>{p.classList.remove('active');if(i===n){void p.offsetWidth;p.classList.add('active')}});
  [...nav.children].forEach((d,i)=>d.classList.toggle('on',i===n));
  if([0,2,4].includes(n)||n===3){celebrate();for(let i=0;i<5;i++)setTimeout(balloon,i*200)}
}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
go(0);
/* Pesan spesial muncul bertahap */
function stagger(){
  const bx=document.querySelectorAll('.msg .box');
  bx.forEach((b,i)=>b.style.animationDelay=(0.8+i*1.2)+'s');
  document.getElementById('nextMsg').style.animationDelay=(0.8+bx.length*1.2)+'s';
}
stagger();
