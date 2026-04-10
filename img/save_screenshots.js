const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.connect({ browserWSEndpoint: 'ws://127.0.0.1:18800' });
  
  // Resident app screenshots
  const pages = await b.pages();
  let rp = pages.find(p => p.url().includes('insuretech-resident'));
  if (!rp) {
    rp = await b.newPage();
    await rp.setViewport({ width: 390, height: 844 });
    await rp.goto('https://aiconsilium-dev.github.io/insuretech-resident/#/', { waitUntil: 'networkidle2' });
  }
  await rp.setViewport({ width: 390, height: 844 });
  
  // Home
  await rp.goto('https://aiconsilium-dev.github.io/insuretech-resident/#/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await rp.screenshot({ path: 'app-home.png' });
  
  // Claim
  await rp.goto('https://aiconsilium-dev.github.io/insuretech-resident/#/claim', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await rp.screenshot({ path: 'app-claim.png' });
  
  // My claims
  await rp.goto('https://aiconsilium-dev.github.io/insuretech-resident/#/myclaims', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await rp.screenshot({ path: 'app-myclaims.png' });
  
  // More
  await rp.goto('https://aiconsilium-dev.github.io/insuretech-resident/#/more', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await rp.screenshot({ path: 'app-more.png' });
  
  console.log('Resident app done');
  
  // Admin screenshots
  let ap = pages.find(p => p.url().includes('cgl-admin'));
  if (!ap) {
    ap = await b.newPage();
  }
  await ap.setViewport({ width: 1440, height: 900 });
  
  const adminPages = ['#/', '#/claims', '#/type-a', '#/type-b', '#/type-c', '#/field', '#/estimation', '#/approve', '#/opinion', '#/appeals', '#/indemnity'];
  const adminNames = ['admin-dash', 'admin-claims', 'admin-typea', 'admin-typeb', 'admin-typec', 'admin-field', 'admin-estimation', 'admin-approve', 'admin-opinion', 'admin-appeals', 'admin-indemnity'];
  
  for (let i = 0; i < adminPages.length; i++) {
    await ap.goto('https://cgl-admin.vercel.app/' + adminPages[i], { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await ap.screenshot({ path: adminNames[i] + '.png' });
    console.log(adminNames[i] + ' done');
  }
  
  console.log('ALL DONE');
})();
