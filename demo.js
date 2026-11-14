// Small, independent demo modules. All data and responses stay in this browser.
const stories = [
  {year:'The early years', category:'Origins', title:'The formative years', image:'https://dur682txgv28e.cloudfront.net/pointers/852d8f72-3b21-4d99-8ec0-c0850574d117/thumbnail/5e9ab016-863a-4476-94bc-7d872e11d5a9_56-Indian%20Stock%20Market%20Formative%20Years.jpg', name:'Indian Stock Market: Formative Years', description:'This article introduces early trading and financing practices in India. Read the original account for its historical context and references.', url:'https://mism.org/pointer/indian-stock-market-formative-years'},
  {year:'1861 to 1865', category:'Market turning points', title:'The cotton boom and bust', image:'https://dur682txgv28e.cloudfront.net/pointers/5b3e895c-6631-49da-b9a0-87d12cfc1db8/cover_image/f61871a6-0e73-40f2-8083-8c456c5502ae_45-Cotton%20Boom%20and%20Bust%20or%20American%20Civil%20War%20or%20%20Share%20Mania%20of%201965%20or%20Black%20Day.jpg', name:'Cotton Boom and Bust', description:'An archive story about the cotton boom, share mania and India’s early stock market history. Discover the wider context through the original article.', url:'https://mism.org/collections/articles'},
  {year:'People & pioneers', category:'Personalities', title:'Meet Premchand Roychand', image:'https://dur682txgv28e.cloudfront.net/pointers/0ef8299d-0795-4270-8216-e391d58b72be/cover_image/ec0044be-415e-4941-b644-7474baa9b4eb_49-%20premchand%20roychand.jpg', name:'Premchand Roychand', description:'Dharohar explores the rise, fall and enduring legacy of this Indian stockbroker. Read the original profile in the article collection.', url:'https://mism.org/collections/articles'},
  {year:'The exchange', category:'Institutions', title:'The journey of the BSE', image:'https://dur682txgv28e.cloudfront.net/pointers/9be5d882-50eb-429d-897d-b60338957d4d/thumbnail/f46778dd-1336-490e-8337-cc1b1f708c86_70-%20Journey%20of%20the%20BSE.jpg', name:'Journey of the BSE', description:'Read about the history of the BSE in the original article collection.', url:'https://mism.org/collections/articles'}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
// Artifact module
let artifactIndex = 0;
function openArtifact(index) {
  artifactIndex = index; const s = stories[index];
  $('#artifact-img').src = s.image; $('#artifact-img').alt = s.name + ' article cover';
  $('#artifact-img').classList.remove('zoomed'); $('#zoom').textContent = 'Enlarge image';
  $('#artifact-title').textContent = s.name; $('#artifact-description').textContent = s.description;
  $('#artifact-source').href = s.url;
  $('#artifact-source').textContent = index===0 ? 'Read original article ↗' : 'Find article in original collection ↗';
  $('#artifact').showModal();
}
// Wire the demo modules together.
$$('[data-object]').forEach(b=>b.onclick=()=>openArtifact(Number(b.dataset.object)));
$$('[data-filter]').forEach(b=>b.onclick=()=>{const filter=b.dataset.filter;$$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b);});let count=0;$$('[data-object]').forEach(c=>{c.hidden=filter!=='all'&&c.dataset.category!==filter;if(!c.hidden)count++;});$('#result-count').textContent=count+' selected '+(count===1?'story':'stories');});
$$('#artifact .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#zoom').onclick=()=>{const zoomed=$('#artifact-img').classList.toggle('zoomed');$('#zoom').textContent=zoomed?'Fit image':'Enlarge image';};
$('#artifact-ask').onclick=()=>{$('#artifact').close();answer('Tell me about '+stories[artifactIndex].name);};

