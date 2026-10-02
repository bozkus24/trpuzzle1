const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(m=>!m[1].includes('application/ld+json')).map(m=>m[2]);
function setup(iso){
 const storage=new Map(),nodes=new Map();
 function node(){return {children:[],style:{},textContent:'',innerHTML:'',appendChild(x){this.children.push(x)},addEventListener(){},classList:{remove(){}},parentElement:{style:{}}};}
 const ctx={window:{},document:{readyState:'loading',addEventListener(){},getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},createElement:node},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},TrPuzzleClock:{day:()=>Math.floor((Date.parse(iso)+10800000)/86400000)},TrPuzzleRemote:{open:async()=>({token:'test-token',view:{words:Array.from({length:16},(_,i)=>'KELİME'+i),revealed:[],done:false,win:false,solved:[],colors:null,history:[],errors:0}})}};
 vm.createContext(ctx);
 vm.runInContext(scripts.find(s=>s.includes("window.TrPuzzleSecurity =")),ctx);
 ctx.TrPuzzleSecurity=ctx.window.TrPuzzleSecurity;
 for(const marker of ['window.BaglantilarVeri =','window.BaglantilarDepo ='])vm.runInContext(scripts.find(s=>s.includes(marker)),ctx);
 let game=scripts.find(s=>s.includes('function gunuKur(gn)'));
 game=game.replace('  if (document.readyState === "loading")','  window.testApi={bugunNo,gunuKur,yeniOyun,arsivGoster,arsivGun,ciz,gunlukKaydet,gunTarihi,oyun:()=>oyun};\n  if (document.readyState === "loading")');
 vm.runInContext(game,ctx);
 return {...ctx.window,storage,nodes};
}
test('Tüm gömülü JavaScript sözdizimi geçerli',()=>{for(const s of scripts)new vm.Script(s)});
test('İstemci yalnızca bulmaca sayısını taşır; cevap grupları bulunmaz',()=>{const {BaglantilarVeri:v}=setup('2026-10-03T00:00:00Z');assert.equal(v.BULMACALAR.length,16);assert.equal(Array.isArray(v.BULMACALAR),false)});
test('Türkiye gece yarısında ilk bulmaca açılır; arşiv geleceği göstermez',async()=>{
 for(const [iso,no,count] of [['2026-10-02T20:59:59Z',0,0],['2026-10-02T21:00:00Z',1,1],['2026-10-03T21:00:00Z',2,2],['2026-10-17T21:00:00Z',16,16],['2026-10-18T21:00:00Z',17,16]]){
  const env=setup(iso),a=env.testApi;await a.yeniOyun();assert.equal(a.bugunNo(),no);assert.equal(a.oyun().durum,no>=1&&no<=16?'oyunda':'bekliyor');a.arsivGoster();assert.equal(env.nodes.get('arsivListe').children.length,count);
  if(no>=1&&no<=16){assert.equal(a.oyun().idx,no-1);assert.equal(a.oyun().siralama.length,16)}else{a.ciz();assert.ok(env.nodes.get('bilgiSatiri').textContent.length);assert.equal(env.nodes.get('btnGonder').disabled,true)}
 }
});
test('Tarihler 3–18 Ekim; arşivden geleceğe veya eski seriye geçilemez',async()=>{
 const a=setup('2026-10-03T12:00:00Z').testApi;await a.yeniOyun();
 assert.equal(a.gunTarihi(1).toISOString(),'2026-10-03T00:00:00.000Z');assert.equal(a.gunTarihi(16).toISOString(),'2026-10-18T00:00:00.000Z');
 for(const n of [0,-1,2,17,1.5,NaN]){await a.arsivGun(n);assert.equal(a.oyun().gunNo,1)}
});
test('Eski seri kayıtları korunur, yeni seri ayrı kaydedilir',async()=>{
 const e=setup('2026-10-03T12:00:00Z');e.storage.set('baglantilar.gunluk.1','{"idx":0,"durum":"kazandi"}');e.storage.set('baglantilar.istatistik','{"oynanan":99}');await e.testApi.yeniOyun();assert.equal(e.testApi.oyun().durum,'oyunda');assert.equal(e.BaglantilarDepo.istatistik().oynanan,0);
 e.testApi.gunlukKaydet();assert.ok(e.storage.has('baglantilar.2026-10-03.gunluk.1'));assert.equal(JSON.parse(e.storage.get('baglantilar.gunluk.1')).durum,'kazandi');await e.testApi.yeniOyun();assert.equal(e.testApi.oyun().siralama.length,16);
});
