// Saved story template. No model is called when a visitor plays this story.
(() => {
  const $ = id => document.getElementById(id);
  const scenes = [
    {title:'01 / At the harbour', image:'assets/katha-harbour.png', alt:'AI-generated anime illustration of an imagined Indian trading harbour',
      captions:['Before I reached an archive, I belonged to a world of trade.', 'Merchants brought their resources together. Their agreements needed a record.'],
      narration:'Before the archive, there was a harbour. Boats arrived. Merchants counted their goods and made plans together. Every agreement needed a record. And that is where a little piece of paper, like me, entered the story.'},
    {title:'02 / A promise in ink', image:'assets/katha-desk.png', alt:'AI-generated anime illustration of a clerk writing at a desk',
      captions:['A printed line. A handwritten entry. A promise recorded on paper.', 'The archive describes transferable notes and loan securities.'],
      narration:'Look closely at the ink. A printed line. A handwritten entry. The article describes notes and loan securities that could change hands. Imagine the journey of a paper promise, carried from one person to the next.'},
    {title:'03 / In the reading room', image:'assets/katha-archive.png', alt:'AI-generated anime illustration of an Indian curator examining papers in an archive',
      captions:['Today, the surviving record asks us to look again.', 'My voice is imagined. The document and its history are yours to explore.'],
      narration:'Now, here I am in the archive, waiting for someone to look a little closer. My voice is imagined. The questions are yours. Open the original article, and discover what the surviving records can tell you.'}
  ];
  const recording = window.KathaNarration;
  const audio = recording ? new Audio() : null;
  const sceneDuration = recording ? recording.sceneDuration : 20, duration = sceneDuration * 3;
  $('playback').max=duration-1;
  let seconds = 0, playing = false, timer = null, scene = -1, tick = 0;
  const hasSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voices = [], chosenVoice = null;
  function cancelVoice(){if(audio)audio.pause();if(hasSpeech)speechSynthesis.cancel();}
  function populateVoices(){
    if(recording){
      $('katha-voice').replaceChildren(new Option(recording.voice,'saved'));
      $('katha-voice').disabled=true;
      $('voice-help').textContent='Recorded for this story. The same voice on every device.';
      return;
    }
    if(!hasSpeech)return;
    voices=speechSynthesis.getVoices().filter(v=>/^en\b/i.test(v.lang));
    $('katha-voice').replaceChildren(new Option('Browser default',''));
    voices.forEach(v=>$('katha-voice').add(new Option(v.name+' ('+v.lang+')',v.voiceURI)));
    if(chosenVoice !== null && (!chosenVoice || voices.some(v=>v.voiceURI===chosenVoice)))$('katha-voice').value=chosenVoice;
    else {
      const preferred = voices.find(v=>/Heera/i.test(v.name))
        || voices.find(v=>/Google UK English Female/i.test(v.name))
        || voices.find(v=>/Zira|Samantha/i.test(v.name))
        || voices.find(v=>/^en[-_]IN$/i.test(v.lang));
      if(preferred)$('katha-voice').value=preferred.voiceURI;
    }
  }
  function speak(){
    cancelVoice();
    if(audio){
      if(!$('narration').checked||!playing)return;
      if(audio.dataset.scene!==String(scene)){audio.src=recording.files[scene];audio.dataset.scene=String(scene);}
      audio.currentTime=seconds%sceneDuration;
      audio.play().catch(error=>{if(error.name!=='AbortError'){$('speech-note').textContent='Recording unavailable. Captions and transcript remain available.';$('narration').checked=false;}});
      return;
    }
    if(!hasSpeech||!$('narration').checked||!playing)return;
    const speech=new SpeechSynthesisUtterance(scenes[scene].narration);
    speech.voice=voices.find(v=>v.voiceURI===$('katha-voice').value)||null;
    speech.lang=speech.voice?.lang||'en-IN';speech.rate=.94;speech.pitch=1.04;
    speech.onerror=event=>{if(!['interrupted','canceled'].includes(event.error))$('speech-note').textContent='Voice unavailable. Captions and transcript remain available.';};
    speechSynthesis.speak(speech);
  }
  function update(force=false){
    const next=Math.min(2,Math.floor(seconds/sceneDuration));
    if(next!==scene||force){scene=next;$('katha-scene-image').src=scenes[scene].image;$('katha-scene-image').alt=scenes[scene].alt;$('scene-heading').textContent=scenes[scene].title;$('katha-transcript').textContent=scenes[scene].narration;speak();}
    $('scene-text').textContent=scenes[scene].captions[seconds>=duration?1:Math.min(1,Math.floor((seconds%sceneDuration)/(sceneDuration/2)))];
    $('scene-counter').textContent='Scene '+(scene+1)+' / 3';
    $('playback').value=Math.min(duration-1,Math.floor(seconds));$('playback').setAttribute('aria-valuetext',Math.floor(seconds)+' seconds, scene '+(scene+1)+' of 3');
    $('playback-time').textContent=Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0')+' / '+Math.floor(duration/60)+':'+String(duration%60).padStart(2,'0');
    $('previous-scene').disabled=scene===0;$('next-scene').disabled=scene===2;
    $('toggle-play').textContent=playing?'Pause':seconds>=duration?'Replay':'Play';
  }
  function pause(){playing=false;clearInterval(timer);timer=null;cancelVoice();update();}
  function play(){
    if(seconds>=duration)seconds=0;
    playing=true;tick=performance.now();clearInterval(timer);update(true);
    timer=setInterval(()=>{
      const now=performance.now();
      // Follow the recording while it plays or buffers, then allow the quiet scene ending.
      seconds=audio&&$('narration').checked&&!audio.ended
        ? scene*sceneDuration+audio.currentTime
        : Math.min(duration,seconds+(now-tick)/1000);
      tick=now;if(seconds>=duration)pause();else update();
    },200);
  }
  function seek(value){seconds=value;tick=performance.now();update(true);}
  function selection(){pause();$('story-selection').hidden=false;$('story-player').hidden=true;}
  $('open-katha').onclick=()=>{selection();$('katha-dialog').showModal();};
  $('select-story').onclick=()=>$('play-story').focus();
  $('play-story').onclick=()=>{$('story-selection').hidden=true;$('story-player').hidden=false;seconds=0;scene=-1;populateVoices();play();$('toggle-play').focus();};
  $('toggle-play').onclick=()=>playing?pause():play();
  $('previous-scene').onclick=()=>seek(Math.max(0,(scene-1)*sceneDuration));
  $('next-scene').onclick=()=>seek(Math.min(2*sceneDuration,(scene+1)*sceneDuration));
  $('playback').oninput=e=>seek(Number(e.target.value));
  $('narration').onchange=speak;$('katha-voice').onchange=()=>{chosenVoice=$('katha-voice').value;speak();};
  $('back-selection').onclick=()=>{selection();$('play-story').focus();};
  $('close-katha').onclick=()=>{pause();$('katha-dialog').close();};
  $('katha-dialog').addEventListener('close',pause);$('katha-dialog').addEventListener('cancel',pause);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  if(recording){populateVoices();$('speech-note').textContent=recording.voice+' narration. Captions always available.';}
  else if(hasSpeech){populateVoices();speechSynthesis.addEventListener('voiceschanged',populateVoices);}
  else{$('narration').checked=false;$('narration').disabled=true;$('katha-voice').disabled=true;$('speech-note').textContent='Narration is unavailable on this browser. Read the captions or transcript.';}
  update();
})();
