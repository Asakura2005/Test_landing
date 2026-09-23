import fs from 'fs';
import path from 'path';

const outDir = 'E:/Landingp page công ty/frontend/public/assets/stitch';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function download(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const filePath = path.join(outDir, filename);
    fs.writeFileSync(filePath, buf);
    console.log(`Saved ${filename} (${buf.byteLength} bytes)`);
    return `/assets/stitch/${filename}`;
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
    return url;
  }
}

async function run() {
  const s1Images = [
    { url: 'https://lh3.googleusercontent.com/aida/AEtjO1WDfxqgqnQWEhtZEbaea-NUARSNmnJTnjGv4TDTPCoKVxhe5pz_F--FayxMoCw7NIRJwwiogsnoDFj-QWgaO1jAXSZOQv8h0cEj8K4ju0PKDKh2XfKv29jxEF5tIoZ7NAvZINTTZ-VHlkAWorV3DoGjIYCoIUwGBPj_XdTu1FS-60phJ05ZPxlUoLWqgoUnQdwwWF_sbYIAAKmu1r6j8Dj8VwQM7SpUvH48Qi044myA_9teecZtpEZtwXg', name: 'logo_haq.png' },
    { url: 'https://lh3.googleusercontent.com/aida/AEtjO1XWfmX53-3oUhMebDOsc-CjsMQ8O-w8uEFhZ0jyvZ8WKGyq4zP7xPyis0gM8oqqOj_jGBiNf1ob1PZiD7VeyBgAhFTQvi2BFG2Orj8klSyGi_XQ2pxQ_TkP69gLRFufpOfj8YfQ8tTxRJ28ItFWnSMKCK1k-uvIo7y8NxTlkFVs3n-owcE4qdsZwkgapvXD3zEobsRmrC9h9K10gvBRfAoJgHmCxSra6z-1A6NxGynZgN5crgrH5SQ86xY', name: 'hero_products_kv.png' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8zJnxOCn3-p-chtJg6L-g3oMxWnENQ_DpFtHyMsRRCCeFps95_j4wA9anPrfjUFYrdtnEYm6OGaEQCBVivA3b-AaxKySWVBp3uZsMH2Q9LPgQr7c-K3EeurDG4hFqIb_AVGZp-8d-LCU-HtxLL7YLze4NqWISSjDRFFM8ZLeUthSOWu2X6QI9NTaAKrXxTa-ndf2NseoUZaIalIn3a9cf24Jp-pumzgCm6dpsZt2GcYXFe0Q8N0a', name: 'product_showcase_1.png' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdorlzkVl8kklH2Gbjjjoc7JLPGzNoINLsVrM_j-JWHkK1Z-aV8rtCKNsbc9TmH3MWFoEPh13pYO3WcWUMQ-afhlaV15DKhBNeI78gUZuGim3tmd_hwCq8-YW5sSupklawkDzA1bWVknHjySDbuPtt06toJnwEkp4fXGva2LCjmg35Oagzmj9yL-gfAZ2RCdNg9kjUNvNBTl-paFacSXh6Q-EskghyX182fm4OdXGpDFlGetg5ZsB1', name: 'product_showcase_2.png' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLD6tfdtvlaAi0xUI5rtc696lEe1ZCiMaPHtajxVY4ML3_50QAe5YgdmWNWG7wFJqh__Bl8l0j5kACr_XK0V8F-hcXqqUssRv9_LSm-6bByJ5NAF2rBoBaW_aW27_j0kK7YohZPk8xuwv872d423xmM1bZJov2RUeDRKurSBjZAhhoow_tw4us7lsB3YZm2DiJ2lRJGPtMdI5SRaej7HJS3r_vhLGjygEGM4jTmy1onzrAJ3gzwCaD', name: 'product_showcase_3.png' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6kQvRVWVxQIGL7reYKNdM5S_tt1fV0uqtuYtEB8QAqoEkEoJOLXdKYno9rlgeCR4ZRJ5_8OZhMKsPl84rw4jHw_n4DTojrHaInNORXZvD0jPtTNglzyxaJPV-gvpdXxaegLldoCstiQXg1BIq_VyUtixxSlPebJNJafLblZFDRAnAkxNtU-1h0eMSIItiKqszIg0sW5Yx7FNCFQzP9DRtjRdP4jOOOEMbFu8oiyLO-WRZKa3c_fce', name: 'product_showcase_4.png' }
  ];

  const s2Images = [
    { url: 'https://lh3.googleusercontent.com/aida/AEtjO1V2sbnvCcwRDpfM2myrmUkZiQxVtf7RqEL2ufQCOROKH7ccvcHb70ze1IVq-gKdrUrqT2uPzZPLZYDjJ9X-1wCAlB34AmHRDm9qAcqRxfFGpTh0cSDnlQky1wpHdb5bIiSNblgDoTKbkvM75DejPPSPbY368C_bwc8IVZXrcsABDtqzjNdcukWPmPod-6e01lwSXufPy8ZQUwk3V508ZtEeMFlTXD1lt2E9g0xVSttWFCCzNYjPy-EgPxc', name: 'about_exhibition_booth.png' },
    { url: 'https://lh3.googleusercontent.com/aida/AEtjO1Vdq3pSh9HY2NgwTLAp9Z9l2Vw6sWRsKrVhNNTDN7medi_XEx06Hm0Clkia5T9yQhRZGl9P9AiPdhVg-lTMBgddOvtGo3CYMAVT0xUGdPQQAd2_ll264kR-esgAg6om2DR5z0QGuD2w2MM-DFXBwwJWLG77CK-DoSENij6hma9GvijpGlCPfuznsfqLCAcIlzs180UU6XLdD6RW5_n6h7kEFKf_bsgtdxMKYf6Zus4xDDXEOAYfz86hyBE', name: 'about_team_photo.png' }
  ];

  for (const item of [...s1Images, ...s2Images]) {
    await download(item.url, item.name);
  }
}
run();
