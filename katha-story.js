// Saved story template. No model is called when a visitor plays this story.
(() => {
  const $ = id => document.getElementById(id);
  const scenes = [
    {title:'01 / At the harbour', image:'assets/katha-harbour.png', alt:'AI-generated anime illustration of an imagined Indian trading harbour',
      captions:['Before I reached an archive, I belonged to a world of trade.', 'Merchants brought their resources together. Their agreements needed a record.'],
      narration:'Before I reached an archive, I belonged to a world of trade. Imagine the harbour: boats arriving, bundles being counted, merchants making plans. They brought their resources together. Their agreements needed a record. That is where a piece of paper like me enters the story.'},
    {title:'02 / A promise in ink', image:'assets/katha-desk.png', alt:'AI-generated anime illustration of a clerk writing at a desk',
      captions:['A printed line. A handwritten entry. A promise recorded on paper.', 'The archive describes transferable notes and loan securities.'],
      narration:'Look at the ink. A printed line, a handwritten entry, a mark left by a person. The article describes transferable notes and loan securities. Imagine such a record passing from one pair of hands to another, carrying an agreement beyond the moment it was made.'},
    {title:'03 / In the reading room', image:'assets/katha-archive.png', alt:'AI-generated anime illustration of an Indian curator examining papers in an archive',
      captions:['Today, the surviving record asks us to look again.', 'My voice is imagined. The document and its history are yours to explore.'],
      narration:'Today, I am a reason to stop and look. Some writing has faded. Some details are hard to read. My voice in this story is imagined, but the surviving record invites real questions. Open the original article, and begin with what the evidence can tell you.'}
  ];
  const duration = 60, sceneDuration = 20;
  let seconds = 0, playing = false, timer = null, scene = -1, tick = 0;
  const hasSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voices = [];
  function cancelVoice(){if(hasSpeech)speechSynthesis.cancel();}
  function populateVoices(){
    if(!hasSpeech)return;
    const selected=$('katha-voice').value;
    voices=speechSynthesis.getVoices().filter(v=>/^en\b/i.test(v.lang));
    $('katha-voice').replaceChildren(new Option('Browser default',''));
    voices.forEach(v=>$('katha-voice').add(new Option(v.name+' ('+v.lang+')',v.voiceURI)));
    if(voices.some(v=>v.voiceURI===selected))$('katha-voice').value=selected;
    else {const indian=voices.find(v=>/^en[-_]IN$/i.test(v.lang));if(indian)$('katha-voice').value=indian.voiceURI;}
  }
  function speak(){
    cancelVoice();
    if(!hasSpeech||!$('narration').checked||!playing)return;
    const speech=new SpeechSynthesisUtterance(scenes[scene].narration);
    speech.voice=voices.find(v=>v.voiceURI===$('katha-voice').value)||null;
    speech.lang=speech.voice?.lang||'en-IN';speech.rate=1.02;speech.pitch=.98;
    speech.onerror=event=>{if(!['interrupted','canceled'].includes(event.error))$('speech-note').textContent='Voice unavailable. Captions and transcript remain available.';};
    speechSynthesis.speak(speech);
  }
  function update(force=false){
    const next=Math.min(2,Math.floor(seconds/sceneDuration));
    if(next!==scene||force){scene=next;$('katha-scene-image').src=scenes[scene].image;$('katha-scene-image').alt=scenes[scene].alt;$('scene-heading').textContent=scenes[scene].title;$('katha-transcript').textContent=scenes[scene].narration;speak();}
    $('scene-text').textContent=scenes[scene].captions[seconds>=duration?1:Math.min(1,Math.floor((seconds%sceneDuration)/10))];
    $('scene-counter').textContent='Scene '+(scene+1)+' / 3';
    $('playback').value=Math.min(59,Math.floor(seconds));$('playback').setAttribute('aria-valuetext',Math.floor(seconds)+' seconds, scene '+(scene+1)+' of 3');
    $('playback-time').textContent=Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0')+' / 1:00';
    $('previous-scene').disabled=scene===0;$('next-scene').disabled=scene===2;
    $('toggle-play').textContent=playing?'Pause':seconds>=duration?'Replay':'Play';
  }
  function pause(){playing=false;clearInterval(timer);timer=null;cancelVoice();update();}
  function play(){
    if(seconds>=duration)seconds=0;
    playing=true;tick=performance.now();clearInterval(timer);update(true);
    timer=setInterval(()=>{const now=performance.now();seconds=Math.min(duration,seconds+(now-tick)/1000);tick=now;if(seconds>=duration)pause();else update();},200);
  }
  function seek(value){seconds=value;tick=performance.now();update(true);}
  function selection(){pause();$('story-selection').hidden=false;$('story-player').hidden=true;}
  $('open-katha').onclick=()=>{selection();$('katha-dialog').showModal();};
  $('select-story').onclick=()=>$('play-story').focus();
  $('play-story').onclick=()=>{$('story-selection').hidden=true;$('story-player').hidden=false;seconds=0;scene=-1;populateVoices();play();$('toggle-play').focus();};
  $('toggle-play').onclick=()=>playing?pause():play();
  $('previous-scene').onclick=()=>seek(Math.max(0,(scene-1)*sceneDuration));
  $('next-scene').onclick=()=>seek(Math.min(40,(scene+1)*sceneDuration));
  $('playback').oninput=e=>seek(Number(e.target.value));
  $('narration').onchange=speak;$('katha-voice').onchange=speak;
  $('back-selection').onclick=()=>{selection();$('play-story').focus();};
  $('close-katha').onclick=()=>{pause();$('katha-dialog').close();};
  $('katha-dialog').addEventListener('close',pause);$('katha-dialog').addEventListener('cancel',pause);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  if(hasSpeech){populateVoices();speechSynthesis.addEventListener('voiceschanged',populateVoices);}
  else{$('narration').checked=false;$('narration').disabled=true;$('katha-voice').disabled=true;$('speech-note').textContent='Narration is unavailable on this browser. Read the captions or transcript.';}
  update();
})();
