import { chromium } from 'playwright';
const dir=process.argv[2]; const scale=+process.argv[3]||1;
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1584,height:396},deviceScaleFactor:scale});
for (const n of ['blue-wave','navy-harmony','navy-aurora','blue-dots']){
  await p.goto(`file://${dir}/${n}.html`); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
  const ok=await p.evaluate(()=>document.fonts.check('500 40px Poppins'));
  await p.screenshot({path:`${dir}/out-${n}${scale>1?'@'+scale+'x':''}.png`}); console.log(n,'poppins',ok);
}
await b.close();
