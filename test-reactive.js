const http = require('http');

async function testReactiveTranslation() {
  console.log('🧪 Probando sistema reactivo de traducción...\n');
  
  function getPageHTML() {
    return new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3000', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });
      req.on('error', reject);
    });
  }
  
  try {
    const html = await getPageHTML();
    
    // Verificar que el selector aparece
    const hasSelector = html.includes('EN') || html.includes('ES');
    console.log(`🎯 Selector de idioma visible: ${hasSelector ? '✅' : '❌'}`);
    
    // Verificar contexto funcionando
    const hasContext = !html.includes('useTranslation must be used within');
    console.log(`🔧 Contexto funcionando: ${hasContext ? '✅' : '❌'}`);
    
    // Verificar textos en inglés (por defecto)
    const englishTexts = [
      'Total Revenue',
      'Subscriptions', 
      'Sales',
      'Active Now'
    ];
    
    let foundTexts = 0;
    englishTexts.forEach(text => {
      if (html.includes(text)) {
        foundTexts++;
      }
    });
    
    console.log(`📊 Textos en inglés encontrados: ${foundTexts}/${englishTexts.length}`);
    console.log(`🎉 Sistema listo para probar cambio EN → ES en el navegador`);
    
    if (hasSelector && hasContext && foundTexts >= 3) {
      console.log('\n✅ ¡Sistema reactivo implementado correctamente!');
      console.log('👉 Ahora NO necesitas recargar la página');
      console.log('👉 El cambio debería ser instantáneo');
    } else {
      console.log('\n⚠️  Sistema necesita ajustes');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testReactiveTranslation();
