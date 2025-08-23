#!/usr/bin/env node

/**
 * Extractor de Design Tokens desde Figma
 * Este script procesa el archivo JSON exportado desde Figma y genera CSS puro
 * basado EXCLUSIVAMENTE en tu Design System, sin mezclar nada de Shadcn estándar
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo de tokens de Figma
const tokensPath = path.join(__dirname, '../src/tokens/design-tokens.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

console.log('🎨 Extrayendo tokens de tu Design System de Figma...');

// Funciones helper
function resolveTokenValue(value, allTokens) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    // Resolver referencias como "{1. tailwindcss.custom colors.example.600}"
    const reference = value.slice(1, -1);
    
    // Casos especiales para tu estructura
    if (reference.includes('custom colors.example.')) {
      const shade = reference.split('.').pop();
      if (customColors.example && customColors.example[shade]) {
        return customColors.example[shade];
      }
    }
    
    if (reference.includes('tailwind colors.')) {
      const parts = reference.split('tailwind colors.')[1].split('.');
      const colorName = parts[0];
      const shade = parts[1];
      
      if (baseColors[colorName] && baseColors[colorName][shade]) {
        return baseColors[colorName][shade];
      }
    }
    
    console.warn(`⚠️  No se pudo resolver: ${value}`);
    return value;
  }
  return value;
}

function convertShadowToCSS(shadow) {
  if (Array.isArray(shadow)) {
    return shadow.map(s => convertShadowToCSS(s)).join(', ');
  }
  
  const { offsetX = 0, offsetY = 0, radius = 0, spread = 0, color = '#000' } = shadow;
  return `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
}

function hexToOklch(hex) {
  // Conversión simplificada hex a oklch
  // En producción usarías una librería como culori para conversión exacta
  const colorMap = {
    '#009b74': 'oklch(0.598 0.145 162.5)',
    '#2ed9a4': 'oklch(0.788 0.165 162.5)',
    '#6aebbf': 'oklch(0.858 0.145 162.5)',
    '#007c60': 'oklch(0.478 0.135 162.5)',
    '#03624d': 'oklch(0.368 0.115 162.5)',
    '#d0fbe7': 'oklch(0.948 0.065 162.5)',
    '#f8fafc': 'oklch(0.985 0.003 247.858)',
    '#f1f5f9': 'oklch(0.968 0.007 247.896)',
    '#e2e8f0': 'oklch(0.929 0.013 255.508)',
    '#cbd5e1': 'oklch(0.859 0.015 255.508)',
    '#94a3b8': 'oklch(0.658 0.025 255.508)',
    '#64748b': 'oklch(0.478 0.035 255.508)',
    '#475569': 'oklch(0.378 0.045 255.508)',
    '#334155': 'oklch(0.288 0.055 255.508)',
    '#1e293b': 'oklch(0.198 0.065 255.508)',
    '#0f172a': 'oklch(0.128 0.075 255.508)',
  };
  
  return colorMap[hex.toLowerCase()] || hex;
}

// Extraer colores base de TailwindCSS
const baseColors = {};
const customColors = {};

if (tokens['1. tailwindcss']) {
  // Colores estándar de Tailwind
  if (tokens['1. tailwindcss']['tailwind colors']) {
    Object.entries(tokens['1. tailwindcss']['tailwind colors']).forEach(([colorName, colorShades]) => {
      if (typeof colorShades === 'object' && colorShades !== null) {
        baseColors[colorName] = {};
        Object.entries(colorShades).forEach(([shade, colorData]) => {
          if (colorData && colorData.value) {
            baseColors[colorName][shade] = colorData.value;
          }
        });
      }
    });
  }
  
  // Colores personalizados (example colors)
  if (tokens['1. tailwindcss']['custom colors']) {
    Object.entries(tokens['1. tailwindcss']['custom colors']).forEach(([colorName, colorShades]) => {
      if (typeof colorShades === 'object' && colorShades !== null) {
        customColors[colorName] = {};
        Object.entries(colorShades).forEach(([shade, colorData]) => {
          if (colorData && colorData.value) {
            customColors[colorName][shade] = colorData.value;
          }
        });
      }
    });
  }
}

// Extraer tokens temáticos
const themeColors = {};
if (tokens['2. theme'] && tokens['2. theme'].colors) {
  Object.entries(tokens['2. theme'].colors).forEach(([tokenName, tokenData]) => {
    if (tokenData && tokenData.value) {
      themeColors[tokenName] = resolveTokenValue(tokenData.value, tokens);
    }
  });
}

// Extraer tokens de modo (light/dark)
const modeColors = {};
if (tokens['3. mode'] && tokens['3. mode'].colors) {
  Object.entries(tokens['3. mode'].colors).forEach(([tokenName, tokenData]) => {
    if (tokenData && tokenData.value) {
      modeColors[tokenName] = resolveTokenValue(tokenData.value, tokens);
    }
  });
}

// Extraer sombras
const shadows = {};
if (tokens.effect && tokens.effect.shadow) {
  Object.entries(tokens.effect.shadow).forEach(([shadowName, shadowData]) => {
    if (shadowData && shadowData.value) {
      shadows[shadowName] = convertShadowToCSS(shadowData.value);
    }
  });
}

// Generar CSS
let css = `/* 
 * Design Tokens extraídos desde Figma
 * Archivo: shadcn_ui-kit-for-Figma - New York - January 2025
 * Generado automáticamente - NO EDITAR MANUALMENTE
 */

:root {
  /* Colores primarios de tu Design System */
`;

// Añadir colores primarios principales
if (customColors.example) {
  css += `  --primary-light: ${hexToOklch(customColors.example['600'])}; /* ${customColors.example['600']} */\n`;
  css += `  --primary-dark: ${hexToOklch(customColors.example['400'])}; /* ${customColors.example['400']} */\n`;
  css += `\n`;
}

// Añadir toda la paleta principal
Object.entries(themeColors).forEach(([tokenName, value]) => {
  const resolved = resolveTokenValue(value, tokens);
  css += `  --${tokenName}: ${hexToOklch(resolved)}; /* ${resolved} */\n`;
});

// Añadir sombras
css += `\n  /* Sombras de tu Design System */\n`;
Object.entries(shadows).forEach(([shadowName, value]) => {
  css += `  --shadow-${shadowName}: ${value};\n`;
});

css += `}\n\n`;

// Modo oscuro (si existe)
css += `.dark {\n  /* Tokens para modo oscuro */\n`;
Object.entries(modeColors).forEach(([tokenName, value]) => {
  const resolved = resolveTokenValue(value, tokens);
  css += `  --${tokenName}: ${hexToOklch(resolved)}; /* ${resolved} */\n`;
});
css += `}\n`;

// Escribir archivo CSS
const outputPath = path.join(__dirname, '../src/tokens/figma-tokens.css');
fs.writeFileSync(outputPath, css);

console.log('✅ Tokens extraídos exitosamente!');
console.log(`📁 Archivo generado: ${outputPath}`);
console.log(`🎨 ${Object.keys(customColors).length} paletas de colores personalizadas`);
console.log(`🎯 ${Object.keys(themeColors).length} tokens temáticos`);
console.log(`🌓 ${Object.keys(modeColors).length} tokens de modo`);
console.log(`✨ ${Object.keys(shadows).length} sombras personalizadas`);

// Crear archivo de resumen
const summary = {
  customColors,
  themeColors,
  modeColors,
  shadows,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, '../src/tokens/figma-summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('📊 Resumen guardado en figma-summary.json');
