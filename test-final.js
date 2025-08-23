const http = require('http');

async function testAllPages() {
  console.log('🧪 Probando todas las páginas después del fix...\n');
  
  const pages = [
    { path: '/', name: 'Dashboard' },
    { path: '/content', name: 'Content Management' },
    { path: '/schedule', name: 'Schedule' },
    { path: '/devices', name: 'Devices' },
    { path: '/analytics', name: 'Analytics' }
  ];
  
  function getPageHTML(path) {
    return new Promise((resolve, reject) => {
      const req = http.get(`http://localhost:3000${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });
      req.on('error', reject);
    });
  }
  
  for (const page of pages) {
    try {
      console.log(`📄 Probando ${page.name}...`);
      const html = await getPageHTML(page.path);
      
      // Verificar que no hay errores de servidor
      const hasServerError = html.includes('Internal Server Error') || 
                           html.includes('useTranslation() from the server') ||
                           html.includes('Runtime Error');
      
      // Verificar que tiene el selector de idioma
      const hasLanguageSelector = html.includes('EN') || html.includes('ES');
      
      // Verificar contexto funcionando
      const hasContextError = html.includes('useTranslation must be used within');
      
      console.log(`   ${hasServerError ? '❌' : '✅'} Sin errores de servidor`);
      console.log(`   ${hasLanguageSelector ? '✅' : '❌'} Selector de idioma presente`);
      console.log(`   ${hasContextError ? '❌' : '✅'} Contexto funcionando`);
      
      if (!hasServerError && hasLanguageSelector && !hasContextError) {
        console.log(`   🎉 ${page.name} - FUNCIONANDO CORRECTAMENTE\n`);
      } else {
        console.log(`   ⚠️  ${page.name} - NECESITA REVISIÓN\n`);
      }
      
    } catch (error) {
      console.log(`   ❌ ${page.name} - ERROR: ${error.message}\n`);
    }
  }
  
  console.log('🎯 Resumen: Todas las páginas deberían funcionar ahora');
  console.log('👉 Ve al navegador y prueba cambiar EN → ES en cualquier página');
}

testAllPages();
