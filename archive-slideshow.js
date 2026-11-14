// Architecture images and catalogue context from Dharohar, inspected 14 November 2026.
(() => {
  const slides = [
    {place:'London / East India House',title:'Trade had an address.',image:'https://dur682txgv28e.cloudfront.net/pointers/c2c3abef-582a-4704-bf98-736a8ab68008/image/1cc7da01-d9e5-4a6d-86ad-a48b899436e4_8%20(2).png',alt:'Historical illustration of East India House, with its columned entrance and street traffic',text:'East India House was the London centre of the British East India Company. Dharohar traces the company through its trade in tea, spices and textiles, its shares traded in London, and the far-reaching consequences of its commercial power.',url:'https://mism.org/pointer/RR01DD08'},
    {place:'Bombay / Places of commerce',title:'The city around the market.',image:'https://dur682txgv28e.cloudfront.net/pointers/6291d99a-76c0-40a7-92f5-f1321d61fa14/image/7609c7af-ef9a-4174-90bf-fd3a5c3405fb_10%20(2).png',alt:'Historical view of buildings, an open square and the waterfront in Bombay',text:'Streets, public spaces and exchange buildings form part of the market’s history. This Dharohar record follows places of commerce, from brokers in Bombay’s Fort area to the changing buildings of India’s stock exchanges.',url:'https://mism.org/pointer/RR01DD10'},
    {place:'June 1813 / Debt security',title:'A promise in two currencies.',image:'https://dur682txgv28e.cloudfront.net/pointers/14a69c29-2f1b-4999-b278-414d7fb85af8/image/948a7f66-f8f6-48ff-a3ef-30d8a410b9a4_I1000374.jpg',alt:'Debt security issued in June 1813, from the Cassim family collection',text:'This 6% debt security was payable after twelve months in sterling or Sicca rupees. Its catalogue entry preserves the repayment period, rate and currencies in which the obligation could be settled. From the Cassim family collection, Chennai.',url:'https://mism.org/pointer/I1000374',paper:true},
    {place:'7 November 1623 / Dutch East India Company',title:'A bond across four centuries.',image:'https://dur682txgv28e.cloudfront.net/pointers/d5c0f4a9-3158-424d-aa2a-ae619c90d2c7/image/30b31df4-1d4f-49fa-80a6-16b0425d50ba_7%20(2).png',alt:'Dutch East India Company bond dated 7 November 1623',text:'Dharohar identifies this document as a Dutch East India Company bond dated 7 November 1623. Its accompanying account explores early trading companies and the development of securities markets. Read the original record for the historical context.',url:'https://mism.org/pointer/RR01DD07',paper:true},
    {place:'Company certificates / Cassim family collection',title:'The Madras Irrigation and Canal Company.',image:'https://dur682txgv28e.cloudfront.net/pointers/eb929d23-06a4-43dc-8d2b-97e3c155e1c3/image/3069ba79-2b38-49ab-b212-dcfebd663ab0_I1000316.jpg',alt:'Madras Irrigation and Canal Company security certificate',text:'Preserved by Sayeed Cassim, Maleeha Cassim, Misbah Cassim and Adil Cassim in Chennai, this company record forms part of Dharohar’s security certificate collection. Open the catalogue entry to examine the original image.',url:'https://mism.org/pointer/I1000316',paper:true}
  ];
  const root=document.querySelector('#archive-slideshow');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,paused=reduced.matches,timer;
  const images=slides.map((slide,i)=>{
    const img=document.createElement('img');img.src=slide.image;img.alt=slide.alt;
    img.className='architecture-image'+(slide.paper?' paper-image':'')+(i===0?' is-active':'');img.setAttribute('aria-hidden',String(i!==0));
    if(i===0)img.fetchPriority='high';root.querySelector('.architecture-images').append(img);return img;
  });
  function render(){
    const slide=slides[current];root.classList.toggle('paper-slide',!!slide.paper);
    images.forEach((img,i)=>{img.classList.toggle('is-active',i===current);img.setAttribute('aria-hidden',String(i!==current));});
    document.getElementById('slide-place').textContent=slide.place;
    document.getElementById('slide-title').textContent=slide.title;
    document.getElementById('slide-description').textContent=slide.text;
    document.getElementById('slide-source').href=slide.url;
  }
  function schedule(){
    clearInterval(timer);root.classList.toggle('is-paused',paused);
    document.getElementById('slide-pause').textContent=paused?'Play slideshow':'Pause slideshow';
    if(!paused&&!document.hidden)timer=setInterval(()=>{const next=(current+1)%slides.length;if(images[next].complete&&images[next].naturalWidth){current=next;render();}},8000);
  }
  document.getElementById('slide-pause').onclick=()=>{paused=!paused;schedule();};
  document.getElementById('slide-source').addEventListener('focus',()=>{paused=true;schedule();});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',()=>{if(reduced.matches){paused=true;schedule();}});
  render();schedule();
})();
