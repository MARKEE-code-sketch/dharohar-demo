// Shared browser-only chat, used by Home, Timeline and Collections.
(() => {
  window.ChatSources = [
    {name:'Indian Stock Market: Formative Years',url:'https://mism.org/pointer/indian-stock-market-formative-years'},
    {name:'Cotton Boom and Bust',url:'https://mism.org/collections/articles'},
    {name:'Premchand Roychand',url:'https://mism.org/collections/articles'},
    {name:'Journey of the BSE',url:'https://mism.org/collections/articles'}
  ];
  const launcher = document.createElement('button');
  launcher.id='chat-launcher';launcher.type='button';
  launcher.setAttribute('aria-label','Open Ask Dharohar');
  launcher.setAttribute('aria-controls','chat');launcher.setAttribute('aria-expanded','false');
  launcher.innerHTML='<span class="launcher-label">Ask Dharohar</span><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M25 22a11 11 0 1 0-8 4l8 2-2-6Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="15" r="1.4" fill="currentColor"/><circle cx="16" cy="15" r="1.4" fill="currentColor"/><circle cx="22" cy="15" r="1.4" fill="currentColor"/></svg>';
  const chat=document.createElement('dialog');chat.id='chat';chat.setAttribute('aria-labelledby','chat-title');
  chat.innerHTML='<div class="chat-header"><div><strong id="chat-title">Ask Dharohar</strong><p>Your guide to the archive</p></div><button class="chat-close" type="button" aria-label="Close chatbot">Close <span aria-hidden="true">&times;</span></button></div><div class="chat-label">Interactive preview &middot; Prepared answers</div><div id="messages" role="log" aria-live="polite"></div><div class="chat-suggestions"><button data-question=""></button><button data-question=""></button><button data-question=""></button></div><form id="chat-form"><label class="chat-sr-only" for="question">Your question</label><input id="question" placeholder="Ask about the archive..." autocomplete="off" required maxlength="400"><button aria-label="Send question">&uarr;</button></form><small class="chat-footer">A preview of the experience, not financial advice.</small>';
  document.body.append(chat,launcher);
  const $=selector=>chat.querySelector(selector);
  window.openChat=(question='')=>{
    if(!window.requestChatAccess(question))return false;
    if(!chat.open)chat.show();
    launcher.setAttribute('aria-expanded','true');$('#question').focus();return true;
  };
  function closeChat(){chat.close();launcher.setAttribute('aria-expanded','false');launcher.focus();}
  window.addMessage=(text,kind,source)=>{
    const bubble=document.createElement('div');bubble.className='message '+kind;bubble.textContent=text;
    if(source){const link=document.createElement('a');link.href=source.url;link.textContent='Source: '+source.name+' ↗';link.target='_blank';link.rel='noopener';bubble.append(link);}
    $('#messages').append(bubble);$('#messages').scrollTop=$('#messages').scrollHeight;
  };
  window.answer=question=>{
    const value=question.trim();if(!value||!window.openChat(value))return;
    window.addMessage(value,'user');const reply=window.personaReply(value);
    window.addMessage(reply.text,'assistant',window.ChatSources[reply.source]);$('#question').value='';
  };
  launcher.onclick=()=>chat.open?closeChat():window.openChat();
  $('.chat-close').onclick=closeChat;
  chat.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();closeChat();}});
  $('#chat-form').onsubmit=event=>{event.preventDefault();window.answer($('#question').value);};
  document.querySelectorAll('[data-chat]').forEach(button=>button.onclick=()=>window.openChat());
  document.querySelectorAll('[data-question]').forEach(button=>button.onclick=()=>window.answer(button.dataset.question));
})();
