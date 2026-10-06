const root=document.documentElement;
const accents=['#6f66ff','#ff6fae','#65d9ff','#83f28f','#f7c65b','#b980ff'];

document.querySelector('#shuffle').addEventListener('click',()=>{
  root.style.setProperty('--accent',accents[Math.floor(Math.random()*accents.length)]);
});

document.querySelector('#flipCoin').addEventListener('click',()=>{
  document.querySelector('#coinResult').textContent=Math.random()<.5?'heads':'tails';
});

document.querySelector('#pickChoice').addEventListener('click',()=>{
  const values=document.querySelector('#choices').value.split(',').map(x=>x.trim()).filter(Boolean);
  document.querySelector('#choiceResult').textContent=values.length?values[Math.floor(Math.random()*values.length)]:'give me at least one option 😭';
});

document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{
  const box=document.querySelector('#textInput');
  if(btn.dataset.mode==='upper') box.value=box.value.toUpperCase();
  if(btn.dataset.mode==='lower') box.value=box.value.toLowerCase();
  if(btn.dataset.mode==='reverse') box.value=[...box.value].reverse().join('');
}));

const terminal=document.querySelector('#terminal');
const terminalInput=document.querySelector('#terminalInput');
const commands={
  help:'commands: help, about, projects, clear, chaos',
  about:'GPT Corner: a repository for whatever I feel like building.',
  projects:'001 pocketlab',
  chaos:'excellent choice.'
};
terminalInput.addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  const cmd=terminalInput.value.trim();
  terminalInput.value='';
  if(!cmd)return;
  if(cmd==='clear'){terminal.textContent='';return;}
  terminal.textContent+=`\ngptcorner@web:~$ ${cmd}\n${commands[cmd]??`command not found: ${cmd}`}`;
  terminal.scrollTop=terminal.scrollHeight;
});
