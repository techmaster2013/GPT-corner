const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const root=document.documentElement;
const accents=['#7d73ff','#ff6fae','#45cfff','#57d982','#f2b84b','#b56dff','#ff7557'];

function openProject(id){
  $$('.project').forEach(x=>x.classList.toggle('active',x.dataset.project===id));
  $$('.workspace').forEach(x=>x.classList.toggle('active',x.id===id));
  history.replaceState(null,'',`#${id}`);
}
$$('.project').forEach(x=>x.addEventListener('click',()=>openProject(x.dataset.project)));
if(location.hash&&$(location.hash)) openProject(location.hash.slice(1));

$('#surprise').onclick=()=>{const ids=[...$$('.project')].map(x=>x.dataset.project);openProject(ids[Math.floor(Math.random()*ids.length)])};
$('#theme').onclick=()=>{document.body.classList.toggle('light');$('#theme').textContent=document.body.classList.contains('light')?'darkness':'lights'};
$('#shuffle').onclick=()=>root.style.setProperty('--accent',accents[Math.floor(Math.random()*accents.length)]);

$('#flipCoin').onclick=()=>$('#coinResult').textContent=Math.random()<.5?'heads':'tails';
$('#pickChoice').onclick=()=>{const v=$('#choices').value.split(',').map(x=>x.trim()).filter(Boolean);$('#choiceResult').textContent=v.length?v[Math.floor(Math.random()*v.length)]:'give me options 😭'};
$('#randomNumber').onclick=()=>{let a=Number($('#min').value),b=Number($('#max').value);if(a>b)[a,b]=[b,a];$('#numberResult').textContent=Math.floor(Math.random()*(b-a+1))+a};
$$('[data-mode]').forEach(btn=>btn.onclick=()=>{const box=$('#textInput'),m=btn.dataset.mode;if(m==='upper')box.value=box.value.toUpperCase();if(m==='lower')box.value=box.value.toLowerCase();if(m==='reverse')box.value=[...box.value].reverse().join('');if(m==='scramble')box.value=[...box.value].sort(()=>Math.random()-.5).join('')});
$('#password').onclick=()=>{const chars='abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*?';let out='';crypto.getRandomValues(new Uint32Array(18)).forEach(n=>out+=chars[n%chars.length]);$('#passwordResult').textContent=out};

const terminal=$('#terminal'),terminalInput=$('#terminalInput');
const commands={help:'commands: help, about, projects, date, echo <text>, clear, chaos, sudo',about:'GPT Corner: where ideas go when they refuse to become normal projects.',projects:'001 pocketlab\n002 pixelthing\n003 bleepbox\n004 the void',chaos:'already enabled.',sudo:'nice try.'};
terminalInput.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const cmd=terminalInput.value.trim();terminalInput.value='';if(!cmd)return;if(cmd==='clear'){terminal.textContent='';return}let out=commands[cmd];if(cmd==='date')out=new Date().toString();if(cmd.startsWith('echo '))out=cmd.slice(5);terminal.textContent+=`\ngptcorner@web:~$ ${cmd}\n${out??`command not found: ${cmd}`}`;terminal.scrollTop=terminal.scrollHeight});

const pixelGrid=$('#pixelGrid');let drawing=false;
for(let i=0;i<256;i++){const p=document.createElement('div');p.className='pixel';p.addEventListener('pointerdown',e=>{drawing=true;e.target.setPointerCapture?.(e.pointerId);p.style.background=$('#pixelColor').value});p.addEventListener('pointerenter',()=>{if(drawing)p.style.background=$('#pixelColor').value});pixelGrid.append(p)}
addEventListener('pointerup',()=>drawing=false);$('#clearPixels').onclick=()=>$$('.pixel').forEach(p=>p.style.background='#fff');

let audio;
function bleep(freq,button){audio??=new (window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.type='triangle';o.frequency.value=freq;g.gain.setValueAtTime(.18,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.35);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.36);button?.classList.add('playing');setTimeout(()=>button?.classList.remove('playing'),130)}
const pads=[...$$('[data-note]')];pads.forEach(p=>p.onclick=()=>bleep(+p.dataset.note,p));
const keys='asdfghjk';addEventListener('keydown',e=>{const i=keys.indexOf(e.key.toLowerCase());if(i>=0&&!e.repeat)bleep(+pads[i].dataset.note,pads[i])});

$('#yeet').onclick=()=>{if(!$('#voidInput').value.trim())return;$('#voidHole').textContent='consuming thought...';$('#voidHole').classList.add('ate');setTimeout(()=>{$('#voidInput').value='';$('#voidHole').classList.remove('ate');$('#voidHole').textContent='gone. absolutely obliterated.'},350)};

function clock(){const d=new Date();$('#clock').textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}clock();setInterval(clock,1000);
