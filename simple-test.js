// Test simple del selector de idioma usando fetch nativo de Node
const http = require('http');

function testPage(path = '') {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`📄 Página ${path || '/'}: ${res.statusCode === 200 ? '✅' : '❌'}`);
        
        // Buscar elementos específicos
        const hasLanguageButton = data.includes('Languages') || data.includes('"EN"') || data.includes('🇺🇸') || data.includes('>EN<');
        console.log(`  🎯 Selector encontrado: ${hasLanguageButton ? '✅' : '❌'}`);
        
        const hasErrors = data.includes('Error:') || data.includes('useLanguage must be used');
        console.log(`  🐛 Errores JS: ${hasErrors ? '❌ SÍ' : '✅ NO'}`);
        
        resolve({ status: res.statusCode, hasSelector: hasLanguageButton, hasErrors });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => reject(new Error('Timeout')));
  });
}

async function runTests() {
  console.log('🧪 Iniciando tests del selector de idioma...\n');
  
  try {
    // Test páginas principales
    await testPage('');
    await testPage('/schedule');
    await testPage('/devices');
    await testPage('/content');
    
    console.log('\n✅ Tests completados!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runTests();
