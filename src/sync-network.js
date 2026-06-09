import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase via variáveis de ambiente
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function syncNetwork() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('🔍 Mapeando links das unidades...');
    await page.goto('https://www2.hapvida.com.br/unidades', { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Captura todos os links individuais das unidades
    const unitLinks = await page.evaluate(() => {
      const anchors = document.querySelectorAll('.card-unidade a, [class*="unidade"] a');
      return Array.from(anchors).map(a => a.href).filter(href => href.includes('/unidades/'));
    });

    const uniqueLinks = [...new Set(unitLinks)];
    console.log(`📍 ${uniqueLinks.length} unidades encontradas. Iniciando extração detalhada...`);

    const detailedUnits = [];

    for (const link of uniqueLinks) {
      try {
        console.log(`🚀 Processando: ${link.split('/').pop()}`);
        await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 20000 });
        
        const unitData = await page.evaluate(() => {
          const name = document.querySelector('h1, .titulo-unidade')?.innerText?.trim();
          const address = document.querySelector('.endereco, [class*="address"]')?.innerText?.trim();
          
          // Captura a lista de especialidades/serviços
          const specs = Array.from(document.querySelectorAll('.especialidades-lista li, .servicos-item, .item-especialidade'))
            .map(el => el.innerText.trim())
            .filter(txt => txt.length > 0);

          return {
            name,
            address,
            specialties: specs.join(', ') || 'Consultar unidade',
            city: address?.split('-')?.pop()?.trim() || 'Não identificada',
            is_active: true,
            last_seen_at: new Date().toISOString()
          };
        });

        if (unitData.name) detailedUnits.push(unitData);
      } catch (e) {
        console.log(`⚠️ Falha ao acessar link: ${link}`);
      }
    }

    if (detailedUnits.length > 0) {
      console.log('📤 Enviando para o Supabase...');
      const { error } = await supabase
        .from('network_units')
        .upsert(detailedUnits, { onConflict: 'name,address' });

      if (error) throw error;
      console.log(`✅ Sucesso! ${detailedUnits.length} unidades sincronizadas com especialidades.`);
    }

  } catch (err) {
    console.error('❌ Erro crítico:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

syncNetwork();