import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('As variáveis SUPABASE_URL e SUPABASE_KEY são obrigatórias.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncNetwork() {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://www2.hapvida.com.br/unidades', {
      waitUntil: 'networkidle2',
      timeout: 120000
    });

    const units = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.card-unidade'));

      return items
        .map((item) => ({
          name: item.querySelector('.nome')?.innerText?.trim() || null,
          address: item.querySelector('.endereco')?.innerText?.trim() || null,
          city: item.querySelector('.cidade')?.innerText?.trim() || null,
          is_active: true,
          last_seen_at: new Date().toISOString()
        }))
        .filter((unit) => unit.name && unit.address);
    });

    if (!units.length) {
      console.log('Nenhuma unidade encontrada para sincronizar.');
      return;
    }

    const { error } = await supabase
      .from('network_units')
      .upsert(units, { onConflict: 'name,address' });

    if (error) {
      throw error;
    }

    console.log(`${units.length} unidades sincronizadas com sucesso.`);
  } catch (error) {
    console.error('Erro ao sincronizar a rede:', error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

syncNetwork();