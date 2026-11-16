// Live voice is separate from the prepared text answers and Katha narration.
(() => {
  const $=id=>document.getElementById(id);
  const trigger=$('talk-dharohar'), panel=$('talk-status'), chat=$('chat');
  panel.innerHTML='<details class="voice-privacy"><summary>Voice privacy</summary><p>Vapi and its providers process your audio and guide style. Audio recording is off; transcripts and logs may be retained.</p></details><p id="voice-state" role="status">Voice chat ? 2 min</p><div class="voice-actions"><button id="voice-start" type="button">Start voice</button><button id="voice-mute" type="button" hidden aria-pressed="false">Mute microphone</button><button id="voice-end" type="button" hidden>End call</button></div>';
  const start=$('voice-start'), mute=$('voice-mute'), end=$('voice-end'), status=$('voice-state');
  let sdk=null, wanted=false, connected=false, loading=false, muted=false, limit=null, connectingLimit=null, attempt=0;
  trigger.title='Talk to Dharohar';trigger.setAttribute('aria-label','Open voice conversation');
  function controls(){
    start.hidden=wanted;start.disabled=loading;
    mute.hidden=!connected;end.hidden=!wanted;
    $('persona-style').disabled=wanted;
    trigger.classList.toggle('voice-active',connected);
    mute.textContent=muted?'Unmute microphone':'Mute microphone';
    mute.setAttribute('aria-pressed',String(muted));
  }
  function stop(message='Conversation ended. You can start another.'){
    const client=sdk;
    attempt++;sdk=null;wanted=false;connected=false;loading=false;muted=false;
    clearTimeout(limit);clearTimeout(connectingLimit);
    status.textContent=message;controls();
    if(client)client.stop();
  }
  function bind(client,id){
    const current=()=>attempt===id&&wanted;
    client.on('call-start',()=>{
      if(!current()){client.stop();return;}
      clearTimeout(connectingLimit);connected=true;loading=false;controls();
      status.textContent='Listening. Ask your first question.';
      limit=setTimeout(()=>stop('Our two minutes are up. Thank you for exploring with us.'),120000);
    });
    client.on('call-end',()=>{
      if(!current())return;
      attempt++;sdk=null;wanted=false;connected=false;loading=false;muted=false;
      status.textContent='Conversation ended. You can start another.';
      clearTimeout(limit);clearTimeout(connectingLimit);controls();
    });
    client.on('speech-start',()=>{if(current())status.textContent='Dharohar is speaking.';});
    client.on('speech-end',()=>{if(current())status.textContent=muted?'Your microphone is muted.':'Listening to you.';});
    client.on('message',message=>{
      if(current()&&message.type==='transcript'&&message.transcriptType==='final'&&message.transcript){
        window.addMessage(message.transcript,message.role==='user'?'user':'assistant');
      }
    });
    client.on('error',()=>{if(current())stop('We could not connect. Check microphone permission and your connection, then try again.');});
  }
  trigger.onclick=()=>{
    if(wanted){panel.hidden=false;trigger.setAttribute('aria-expanded','true');end.focus();return;}
    panel.hidden=!panel.hidden;trigger.setAttribute('aria-expanded',String(!panel.hidden));
    if(!panel.hidden)start.focus();
  };
  start.onclick=async()=>{
    if(wanted||loading)return;
    const config=window.DharoharVoiceConfig;
    if(!config?.publicKey||!config?.assistantId){status.textContent='Voice setup is still being completed. Prepared text answers are available below.';return;}
    const id=++attempt;
    let client=null;
    wanted=true;loading=true;status.textContent='Connecting. Allow microphone access when your browser asks.';controls();
    connectingLimit=setTimeout(()=>stop('Connection took too long. Please try again.'),45000);
    try {
      const {default:Vapi}=await import('https://esm.sh/@vapi-ai/web@3.1.1?bundle');
      if(attempt!==id)return;
      client=new Vapi(config.publicKey);sdk=client;bind(client,id);
      await client.start(config.assistantId,{variableValues:{guideStyle:$('persona-style').value},maxDurationSeconds:120});
      if(attempt!==id)client.stop();
    } catch(error){
      if(attempt===id)stop(error?.name==='NotAllowedError'?'Microphone access was declined. Allow it in your browser to try voice.':'We could not start voice. Check your connection and microphone permission, then try again.');
    } finally {if(attempt===id){loading=false;controls();}}
  };
  mute.onclick=()=>{if(!connected)return;muted=!muted;sdk.setMuted(muted);status.textContent=muted?'Your microphone is muted.':'Listening to you.';controls();};
  end.onclick=()=>stop();
  chat.addEventListener('close',()=>{if(wanted)stop();});
  window.addEventListener('pagehide',()=>{if(wanted)stop();});
  window.stopDharoharVoice=()=>{if(wanted)stop();};
})();
