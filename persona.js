(() => {
// Prepared examples only. No age or conversation is sent to a server.
const personaExamples = {
  young: {
    name:'Young Explorer', style:'Small steps, everyday examples. No market knowledge needed.', startSource:0,
    questions:['What is a share, really?', 'How can paper be a promise?', 'What should I look for in an old document?'],
    start:'Let us start with a small question: how did people find money to run a business? The formative-years article follows early merchants and their ways of raising money. We can take it one idea at a time.',
    share:'Imagine a business split into lots of tiny pieces. A share is one piece of ownership. Owning one does not mean you can take a chair from its office! It means you own a small part of the business. The formative-years article is our next stop for the history behind that idea.',
    paper:'Imagine writing down, "I borrowed five coins and will pay them back." The paper records a promise. Historical loan papers could record promises too, sometimes with a claim that could pass to someone else. That is different from a share, which represents ownership. The formative-years article explores these early ways of raising money.',
    evidence:'Look closely at the document. Can you find a name, a date or an amount? Those clues help you ask who made the document and what it was for. Then read its archive description. An old-looking page alone cannot tell us the whole story.',
    trade:'A merchant buys and sells goods. To begin, they may need money for goods or a journey. People could put money together to help. Our formative-years article looks at early trade and financing.',
    cotton:'Cotton is used to make things such as clothes. Dharohar has a story about the cotton boom and share mania of 1861 to 1865. A boom means a rush of growth and excitement; a bust means a sharp fall. The article tells us what happened in this particular case.',
    pioneer:'Premchand Roychand was a stockbroker: someone who helped people buy and sell shares. His story has successes and setbacks. You can meet him in his archive profile.',
    exchange:'An exchange is an organised place for buying and selling securities, including shares. Think of it as a meeting place with rules, although trading today need not happen face to face. Journey of the BSE tells the story of one such institution.'
  },
  adult: {
    name:'Curious Adult', style:'Follow the events, meet the people, understand the terms.', startSource:1,
    questions:['What happened in the cotton boom?', 'How did merchants fund a business?', 'What does a stock exchange actually do?'],
    start:'Start with Cotton Boom and Bust. It brings trade and share-market enthusiasm into the same story, through the years 1861 to 1865. It is a useful way into the archive if you want to understand events before tackling the terminology.',
    share:'A share represents part ownership of a company. A loan instead creates a repayment claim. That distinction helps when reading the formative-years article, which covers early financing practices and joint-stock ventures.',
    paper:'A written debt instrument records a claim on repayment. If transferable, that claim can pass to another holder. It is different from owning a share in a business. The formative-years article provides historical context for these instruments.',
    evidence:'Begin with the date, issuer and purpose. Then compare the document with its archive description and the article that discusses it. This helps separate what a record actually says from the interpretation we bring to it.',
    trade:'A business needs money before it can earn money: to obtain goods, arrange transport or expand. The formative-years article describes merchants, pooled capital and early financing practices. Read it with one question in mind: who supplied the money, and what did they receive in return?',
    cotton:'The archive groups this episode under the cotton boom and share mania of 1861 to 1865. A boom describes rapid expansion and enthusiasm; a bust describes the downturn. Read Cotton Boom and Bust to trace the historical events, then compare it with the Premchand Roychand profile for a view of one person involved in that period.',
    pioneer:'Premchand Roychand was an Indian stockbroker. His archive profile follows his rise, fall and legacy. Pair it with Cotton Boom and Bust to explore how an individual career sits within a wider market story.',
    exchange:'A stock exchange provides an organised setting for trading securities. In practical terms, it brings buyers, sellers and trading rules together. Journey of the BSE is a route into how that institution developed; the formative-years article supplies background on earlier financing practices.'
  },
  seasoned: {
    name:'Seasoned Investor', style:'Institutions, instruments and a closer reading of the evidence.', startSource:3,
    questions:['How did trading become institutionalised?', 'What made early debt transferable?', 'Where are the gaps in the archive evidence?'],
    start:'Begin with Journey of the BSE, then work back to Indian Stock Market: Formative Years. Reading them together opens up a useful question: how did earlier financing and trading practices relate to the development of an organised exchange?',
    share:'Equity ownership and a creditor claim should be distinguished when reading these records. A share represents ownership; a debt instrument represents a repayment claim. The formative-years article offers context for early joint-stock ventures and financing instruments.',
    paper:'Transferability allows a debt claim to move from one holder to another. The instrument records a claim rather than an ownership interest in the borrower. The formative-years article discusses early transferable debt instruments. Precise rights need to be established from the individual record, rather than inferred from its appearance.',
    evidence:'The formative-years article acknowledges gaps in surviving records. Keep three things separate: the document itself, what its catalogue entry identifies, and what a later historical account concludes. A missing record does not establish that an activity never occurred. Follow the original article and its references before drawing a broader conclusion.',
    trade:'The formative-years article connects merchant capital, early financing instruments and joint-stock ventures. A useful reading approach is to distinguish the source of capital, the rights attached to it and whether those rights could be transferred. Individual terms require the underlying record.',
    cotton:'Cotton Boom and Bust covers the cotton boom and share mania of 1861 to 1865. Read it alongside the Roychand profile to compare an account of the episode with a biographical perspective. Any proposed mechanism or present-day analogy would need evidence beyond these brief demo summaries.',
    pioneer:'The Roychand profile traces a stockbroker through his rise, fall and legacy. Pairing biography with Cotton Boom and Bust gives two perspectives on the period. Keep a distinction between the profile of an individual and conclusions about the wider market.',
    exchange:'Journey of the BSE is the starting point for the institutional story. Read it alongside the formative-years account to examine the relationship between earlier financing practices and an organised exchange. Useful questions for the originals include who participated, how trading was organised and which records support the account.'
  }
};
let activePersona='adult';
let personaChosen=false;
let pendingQuestion='';
const welcome=document.createElement('dialog');
welcome.id='persona-welcome';
welcome.setAttribute('aria-labelledby','welcome-title');
welcome.innerHTML=`<button class="close persona-dismiss" aria-label="Close guide selection">Close &times;</button><p class="eyebrow">ASK DHAROHAR</p><h2 id="welcome-title">Where shall we begin?</h2><p>Choose an age range for a suggested guide. You can switch styles at any time, whatever your age.</p><div class="persona-options"><button data-persona="young"><span>Under 18</span><strong>Young Explorer</strong><small>Small questions. Everyday examples.</small></button><button data-persona="adult"><span>18 to 59</span><strong>Curious Adult</strong><small>The people and events behind the market.</small></button><button data-persona="seasoned"><span>60+</span><strong>Seasoned Investor</strong><small>A closer look at institutions and evidence.</small></button></div><p class="persona-note">Optional. Nothing is stored or sent. This demo uses prepared answers.</p><button id="skip-persona" class="text-button">Skip and start exploring &rarr;</button>`;
document.body.append(welcome);
const selector=document.createElement('div');
selector.className='persona-selector';
selector.innerHTML='<label for="persona-style">Your guide</label><select id="persona-style"><option value="young">Young Explorer</option><option value="adult">Curious Adult</option><option value="seasoned">Seasoned Investor</option></select><p id="persona-description"></p>';
document.querySelector('.chat-label').after(selector);
window.requestChatAccess = function(question) {
  if(personaChosen)return true;
  pendingQuestion=question;
  if(!welcome.open)welcome.showModal();
  return false;
}
window.personaReply = function(question) {
  const text=question.toLowerCase(), examples=personaExamples[activePersona];
  let topic,source=0;
  if(/roychand|pioneer/.test(text)){topic='pioneer';source=2;}
  else if(/cotton|boom|bust/.test(text)){topic='cotton';source=1;}
  else if(/bse|exchange|institution/.test(text)){topic='exchange';source=3;}
  else if(/debt|paper|promise|transferable/.test(text))topic='paper';
  else if(/document|evidence|record|gaps/.test(text))topic='evidence';
  else if(/share|ownership/.test(text))topic='share';
  else if(/merchant|business|trade|financ/.test(text))topic='trade';
  else if(/formative|early/.test(text))topic='trade';
  else if(/start|begin|recommend/.test(text)){topic='start';source=examples.startSource;}
  if(topic)return {text:examples[topic],source};
  return {text:'I have a few prepared answers for this preview. Try "'+examples.questions[0]+'" or choose another question below.'};
}
function setPersona(key) {
  activePersona=key;
  const examples=personaExamples[key];
  document.querySelector('#persona-style').value=key;
  document.querySelector('#persona-description').textContent=examples.style;
  document.querySelector('#messages').replaceChildren();
  addMessage(examples.start,'assistant',window.ChatSources[examples.startSource]);
  document.querySelector('#question').value='';
  document.querySelectorAll('.chat-suggestions, .question-list').forEach(container=>{
    container.querySelectorAll('[data-question]').forEach((button,index)=>{
      button.dataset.question=examples.questions[index];
      button.textContent=examples.questions[index];
      button.onclick=()=>answer(button.dataset.question);
    });
  });
}
function choosePersona(key) {
  const question=pendingQuestion;
  pendingQuestion='';personaChosen=true;
  setPersona(key);welcome.close();
  if(question)answer(question);else openChat();
}
welcome.querySelectorAll('[data-persona]').forEach(button=>button.onclick=()=>choosePersona(button.dataset.persona));
welcome.querySelector('.close').onclick=()=>{pendingQuestion='';welcome.close();};
welcome.addEventListener('cancel',()=>{pendingQuestion='';});
document.querySelector('#skip-persona').onclick=()=>choosePersona('adult');
document.querySelector('#persona-style').onchange=e=>setPersona(e.target.value);
setPersona('adult');

})();
