// Test script para verificar el selector de idioma
const { chromium } = require('playwright');

async function testLanguageSelector() {
  console.log('🔍 Iniciando prueba del selector de idioma...');
  
  let browser, page;
  try {
    // Usar puppeteer si está disponible, sino usar fetch
    const fetch = require('node-fetch').default || require('node-fetch');
    
    console.log('📡 Probando conectividad básica...');
    const response = await fetch('http://localhost:3000');
    console.log(`✅ Servidor responde con status: ${response.status}`);
    
    const html = await response.text();
    
    // Buscar elementos del selector de idioma
    const hasLanguageButton = html.includes('Languages') || html.includes('EN') || html.includes('🇺🇸');
    console.log(`🎯 Selector de idioma encontrado: ${hasLanguageButton ? '✅' : '❌'}`);
    
    // Buscar errores de JavaScript en el HTML
    const hasJSErrors = html.includes('Error:') || html.includes('useLanguage must be used');
    console.log(`🐛 Errores JS en HTML: ${hasJSErrors ? '❌ SÍ' : '✅ NO'}`);
    
    // Buscar el contexto problemático
    const hasContextError = html.includes('LanguageProvider') || html.includes('useLanguage');
    console.log(`🔥 Referencias al contexto: ${hasContextError ? '⚠️ Encontradas' : '✅ Limpias'}`);
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar si no tiene playwright, usar método básico
testLanguageSelector().catch(console.error);
