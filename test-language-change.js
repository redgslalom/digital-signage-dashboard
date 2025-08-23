const http = require('http');

async function testLanguageChange() {
  console.log('🧪 Probando el cambio de idioma...\n');
  
  // Función para obtener el HTML de la página
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
    
    console.log('📊 Verificando que los textos estén usando identificadores...\n');
    
    // Verificar que NO haya textos hardcodeados en español
    const spanishHardcoded = [
      'Ingresos Totales',
      'Suscripciones', 
      'Ventas',
      'Activos Ahora',
      'desde el mes pasado',
      'Resumen de Ingresos',
      'Calendario',
      'Actividad Reciente',
      'Objetivos de Actividad'
    ];
    
    console.log('🔍 Buscando textos hardcodeados que NO deberían aparecer:');
    let hardcodedFound = 0;
    spanishHardcoded.forEach(text => {
      if (html.includes(`>${text}<`) || html.includes(`"${text}"`)) {
        console.log(`❌ Encontrado hardcodeado: "${text}"`);
        hardcodedFound++;
      }
    });
    
    if (hardcodedFound === 0) {
      console.log('✅ No se encontraron textos hardcodeados (¡bien!)');
    }
    
    // Verificar que SÍ aparezcan los textos en inglés (idioma por defecto)
    const englishExpected = [
      'Total Revenue',
      'Subscriptions',
      'Sales', 
      'Active Now',
      'since last month',
      'Revenue Summary',
      'Calendar',
      'Recent Activity',
      'Activity Goals'
    ];
    
    console.log('\n🎯 Verificando que aparezcan textos en inglés (idioma por defecto):');
    let englishFound = 0;
    englishExpected.forEach(text => {
      if (html.includes(text)) {
        console.log(`✅ Encontrado: "${text}"`);
        englishFound++;
      } else {
        console.log(`❌ No encontrado: "${text}"`);
      }
    });
    
    console.log(`\n📈 Resumen:`);
    console.log(`   Textos en inglés encontrados: ${englishFound}/${englishExpected.length}`);
    console.log(`   Textos hardcodeados: ${hardcodedFound} (debería ser 0)`);
    
    if (englishFound >= englishExpected.length * 0.8 && hardcodedFound === 0) {
      console.log('\n🎉 ¡Sistema de traducción funcionando correctamente!');
      console.log('👉 Ahora cambia el selector EN -> ES en el navegador para ver el cambio');
    } else {
      console.log('\n⚠️  Sistema necesita ajustes');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLanguageChange();
