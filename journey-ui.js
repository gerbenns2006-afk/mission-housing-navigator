import {getJourneyQuestions,getJourneyOutcome,pruneJourneyAnswers} from './data/journey.js';

// A short branching conversation. Optional profile details are edited on the result.
export function createJourneyUI(ui){
  let answers={},position=0,finished=false,reply='',refineOpen=false;
  const profileIds=new Set(['age','household','needs']);
  const questions=()=>getJourneyQuestions(answers).filter(q=>!profileIds.has(q.id));
  const outcome=()=>getJourneyOutcome(answers);
  const e=ui.esc;
  const optionLabel=(q,value)=>q.options.find(o=>o.value===value)?.label||'';
  const answered=()=>questions().filter(q=>answers[q.id]!==undefined);
  const resultIds=()=>outcome().resourceIds.filter(id=>ui.find(id));
  const primaryIds=()=>[...new Set(outcome().steps.flatMap(s=>s.resourceIds||[]).concat(resultIds()))].filter(id=>ui.find(id)).slice(0,3);
  function sync(){ui.sync(answers);}
  function renderAgain(focus=true){sync();ui.render(focus);}
  function answerTrail(){return `<div class="answer-trail" aria-label="Your answers so far">${answered().map(q=>`<button data-journey-edit="${e(q.id)}" title="Change this answer"><span>✓</span>${e(optionLabel(q,answers[q.id]))}<span class="trail-edit">↗</span></button>`).join('')}</div>`;}
  function immediateHelp(){
    const o=outcome();if(!o.urgency)return '';
    const r=o.steps.flatMap(step=>step.resourceIds||[]).map(ui.find).find(resource=>resource?.phone);
    return `<aside class="journey-urgent"><span>${ui.icon('phone')}</span><div><strong>You can get in touch now.</strong><p>${e(o.urgency)}</p>${r?.phone?`<a href="${ui.tel(r.phone)}">${e(r.phone)}</a> · `:''}<button class="text-button" data-journey-finish>See options now →</button></div></aside>`;
  }
  function rail(current,total){return `<aside class="journey-rail"><div class="eyebrow">YOUR NEXT TURN</div><div class="route-illustration" aria-hidden="true"><img src="./assets/bay-map.svg" alt=""><div class="moving-marker" style="--progress:${Math.max(0,current)/Math.max(total-1,1)}">${ui.icon('pin')}</div><span class="route-stamp">MISSION → WHAT’S NEXT</span></div><ol class="journey-stops">${questions().map((q,i)=>`<li class="${i===current?'here':i<current?'done':''}"><span>${i<current?'✓':i+1}</span><div>${i===0?'Your starting point':q.id==='location'?'Your service area':q.kicker||'One useful detail'}</div></li>`).join('')}</ol><p>No name. No documents.<br>Your choices stay on this page.</p><button class="text-button" data-page="map">Explore Mission & the city ↗</button></aside>`;}
  function questionView(){
    const qs=questions();position=Math.min(position,qs.length-1);const q=qs[position];
    if(!q)return resultView();
    const message=reply||'Tell me what’s going on. We’ll take the next turn together.';
    return `<section class="page journey-page"><div class="journey-heading"><span class="eyebrow"><span class="tiny-dot"></span>YOUR PATHWAY · A FEW QUICK CHOICES</span><button class="text-button" data-journey-finish>Show options now ↗</button></div><div class="journey-layout">${rail(position,qs.length)}<div class="journey-conversation"><div class="monarch-response" role="status"><span class="monarch-mark" aria-hidden="true"><img src="./assets/mission-monarch.png" alt=""></span><div><strong>MONARCH</strong><p>${e(message)}</p></div></div>${immediateHelp()}<div class="question-enter"><div class="question-step">CHOICE ${String(position+1).padStart(2,'0')} <span>${e(q.kicker||'YOUR SITUATION')}</span></div><h1 id="journey-question" class="subhead" tabindex="-1">${e(q.title)}</h1><p class="question-body">${e(q.body)}</p><div class="journey-options" aria-labelledby="journey-question">${q.options.map((o,i)=>`<button class="journey-option ${answers[q.id]===o.value?'selected':''}" data-journey-answer="${e(o.value)}" data-question="${e(q.id)}"><span class="option-number">${answers[q.id]===o.value?'✓':String.fromCharCode(65+i)}</span><span><strong>${e(o.label)}</strong>${o.description?`<small>${e(o.description)}</small>`:''}</span><span class="option-arrow">→</span></button>`).join('')}</div><div class="journey-bottom"><button class="text-button" data-journey-back>${position?'← Previous answer':'← Start here'}</button><span>Choose an answer to continue.</span></div></div>${answerTrail()}</div></div></section>`;
  }
  function refine(){const qs=getJourneyQuestions(answers).filter(q=>profileIds.has(q.id));const extra=resultIds().filter(id=>!primaryIds().includes(id)).map(ui.find);return `<details class="journey-refine" ${refineOpen?'open':''}><summary>Want a closer fit? <span>Age, household & other support · optional</span></summary><div class="refine-body">${qs.map(q=>`<fieldset><legend>${e(q.title)}</legend><div class="refine-options">${q.options.map(o=>{const selected=Array.isArray(answers[q.id])?answers[q.id].includes(o.value):answers[q.id]===o.value;return `<button class="chip ${selected?'active':''}" data-refine-question="${e(q.id)}" data-refine-value="${e(o.value)}" aria-pressed="${selected}">${e(o.label)}</button>`;}).join('')}</div></fieldset>`).join('')}${extra.length?`<div class="refine-matches"><strong>Added for your choices</strong>${extra.map(r=>`<div><button class="text-button" data-detail="${r.id}">${e(r.name)} ↗</button><p>${e(outcome().reasons[r.id]||r.summary)}</p>${outcome().avoidSaving?'':ui.saveButton(r)}</div>`).join('')}</div>`:''}<p>These choices refine the suggestions. Each provider confirms its own requirements.</p></div></details>`;}
  function resultView(){
    const o=outcome(),ids=primaryIds();
    return `<section class="page journey-result"><div class="result-topline"><span class="eyebrow"><span class="tiny-dot"></span>YOUR ROUTE / READY WHEN YOU ARE</span><button class="text-button" data-journey-restart>Start over ↺</button></div><div class="result-heading"><div><h1 class="subhead">${e(o.title)}</h1><p>${e(o.summary)}</p></div><span class="monarch-mark" aria-hidden="true"><img src="./assets/mission-monarch.png" alt=""></span></div>${answerTrail()}${immediateHelp()}<div class="route-receipt"><span>BASED ON YOUR CHOICES</span><p>${e((o.why||[]).slice(0,2).join(' '))||'Start with Mission support, then explore the program that fits your situation.'}</p></div><div class="next-turns">${o.steps.slice(0,3).map((s,i)=>{const r=(s.resourceIds||[]).map(ui.find).find(Boolean);return `<article class="next-turn"><div class="turn-number">${i+1}</div><div class="turn-content"><h2>${e(s.title)}</h2><p>${e(s.body)}</p>${r?`<div class="turn-contact"><button class="text-button" data-detail="${r.id}">${e(r.name)} ↗</button><div class="turn-actions">${r.phone?`<a class="mini-call" href="${ui.tel(r.phone)}" aria-label="Call ${e(r.name)}">${ui.icon('phone')} ${e(r.phone)}</a>`:''}${o.avoidSaving?'':ui.saveButton(r)}</div></div>${o.reasons[r.id]?`<details class="turn-why"><summary>Why this fits your answer</summary><p>${e(o.reasons[r.id])}</p></details>`:''}`:''}</div></article>`;}).join('')}</div><div class="result-tools">${o.avoidSaving?'<p class="small">You can use these contacts without saving a plan on this device.</p>':`<button class="button" data-journey-save>Save my starting points ${ui.icon('check')}</button>`}<button class="button secondary" data-journey-map>${ui.icon('pin')} See support on the map</button></div><details class="journey-script"><summary>A question you can use when you reach out <span>+</span></summary><div><p>“${e(o.script)}”</p>${o.avoidSaving?'':'<button class="text-button" data-journey-copy>Copy this question</button>'}<p class="small"><strong>If this doesn’t work:</strong> ${e(o.alternate)}</p></div></details>${refine()}<div class="result-footnote"><p>Suggestions to explore, not an eligibility decision. Details, documents, and sources are inside each contact.</p><button class="text-button" data-page="learn">Keep exploring Housing Explained →</button><button class="text-button" data-page="directory">Browse all resources ↗</button></div>${ui.campus()}</section>`;
  }
  return {
    render:()=>finished?resultView():questionView(),
    outcome,
    recommendations:()=>resultIds().map(ui.find),
    hasAnswers:()=>Object.keys(answers).length>0,
    summaryText:()=>finished?`${outcome().title}\n${outcome().steps.slice(0,3).map((s,i)=>`${i+1}. ${s.title}: ${s.body}`).join('\n')}\nQuestion to ask: ${outcome().script}\n`:'' ,
    reset(){answers={};position=0;finished=false;reply='';refineOpen=false;sync();},
    handleClick(b){
      if(b.hasAttribute('data-start')){answers=pruneJourneyAnswers({...answers,path:b.dataset.start},'path');position=1;finished=false;reply=getJourneyQuestions(answers)[0]?.options.find(o=>o.value===answers.path)?.reply||'';sync();ui.navigate('pathway');return true;}
      if(b.hasAttribute('data-journey-answer')){const id=b.dataset.question;const qs=questions();const q=qs.find(q=>q.id===id);const option=q?.options.find(o=>o.value===b.dataset.journeyAnswer);if(!option)return true;answers=pruneJourneyAnswers({...answers,[id]:option.value},id);reply=option.reply||'';position=questions().findIndex(q=>q.id===id)+1;finished=position>=questions().length;renderAgain();return true;}
      if(b.hasAttribute('data-journey-edit')){const id=b.dataset.journeyEdit;const i=questions().findIndex(q=>q.id===id);if(i>=0){position=i;finished=false;reply='You can change your answer. I’ll update the next turn to match.';renderAgain();}return true;}
      if(b.hasAttribute('data-journey-back')){if(position>0){position--;reply='Let’s go back one turn.';renderAgain();}else ui.navigate('home');return true;}
      if(b.hasAttribute('data-journey-finish')){finished=true;renderAgain();return true;}
      if(b.hasAttribute('data-journey-restart')){this.reset();renderAgain();return true;}
      if(b.hasAttribute('data-refine-question')){const id=b.dataset.refineQuestion,value=b.dataset.refineValue,q=getJourneyQuestions(answers).find(q=>q.id===id);if(q?.multiple){const picked=new Set(answers[id]||[]);picked.has(value)?picked.delete(value):picked.add(value);answers[id]=[...picked];}else answers[id]=value;answers=pruneJourneyAnswers(answers,id);refineOpen=true;const y=window.scrollY;renderAgain(false);window.scrollTo(0,y);document.querySelector(`[data-refine-question="${CSS.escape(id)}"][data-refine-value="${CSS.escape(value)}"]`)?.focus({preventScroll:true});return true;}
      if(b.hasAttribute('data-journey-save')){if(outcome().avoidSaving)return true;ui.saveMany(primaryIds());ui.toast('Your starting points are in My Next Steps.');return true;}
      if(b.hasAttribute('data-journey-map')){ui.showMap(resultIds());return true;}
      if(b.hasAttribute('data-journey-copy')){if(outcome().avoidSaving)return true;ui.copy(outcome().script);return true;}
      return false;
    }
  };
}
