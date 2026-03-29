import * as https from 'https';

const API_KEY = process.env.CRICAPI_KEY || '';

function httpsGet(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk: string) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Failed to parse response'));
        }
      });
    }).on('error', reject);
  });
}

async function discoverSeries() {
  if (!API_KEY) {
    console.error('Please set CRICAPI_KEY environment variable');
    process.exit(1);
  }

  console.log('Fetching IPL series from CricAPI...\n');

  const iplMap: Record<number, string> = {};
  let offset = 0;
  const limit = 25;

  while (true) {
    const url = `https://api.cricapi.com/v1/series?apikey=${API_KEY}&search=Indian+Premier+League&offset=${offset}`;
    const response = await httpsGet(url) as { status: string; data?: { name: string; startDate: string; id: string }[] };

    if (response.status !== 'success' || !response.data?.length) break;

    for (const series of response.data) {
      if (series.name.toLowerCase().includes('indian premier league')) {
        const year = new Date(series.startDate).getFullYear();
        if (year >= 2008 && year <= 2025) {
          iplMap[year] = series.id;
          console.log(`${year}: "${series.id}", // ${series.name}`);
        }
      }
    }

    if (response.data.length < limit) break;
    offset += limit;
  }

  console.log('\n// Paste into src/lib/ipl-series-map.ts:');
  console.log('export const IPL_SERIES_MAP: Record<number, string> = {');
  for (const [year, id] of Object.entries(iplMap).sort()) {
    console.log(`  ${year}: "${id}",`);
  }
  console.log('};');
}

discoverSeries().catch(console.error);
