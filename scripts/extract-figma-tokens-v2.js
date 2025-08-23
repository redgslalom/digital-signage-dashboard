#!/usr/bin/env node

/**
 * Extractor SIMPLIFICADO de Design Tokens desde Figma
 * Enfoque directo usando los valores extraídos del summary
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Creando CSS desde tu Design System de Figma...');

// Usar los datos ya extraídos del summary
const summaryPath = path.join(__dirname, '../src/tokens/figma-summary.json');
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

const { customColors, themeColors, shadows } = summary;

// Mapa de colores de Tailwind que necesitas
const tailwindColors = {
  'zinc.50': '#fafafa',
  'zinc.100': '#f4f4f5',
  'zinc.200': '#e4e4e7',
  'zinc.300': '#d4d4d8',
  'zinc.400': '#a1a1aa',
  'zinc.500': '#71717a',
  'zinc.600': '#52525b',
  'zinc.700': '#3f3f46',
  'zinc.800': '#27272a',
  'zinc.900': '#18181b',
  'zinc.950': '#09090b',
  'base.white': '#ffffff',
  'base.black': '#000000',
  'red.50': '#fef2f2',
  'red.600': '#dc2626',
  'red.900': '#7f1d1d',
  'blue.700': '#1d4ed8',
  'gray.200': '#e5e7eb'
};

function resolveColorReference(reference) {
  // Resolver referencias como "{1. tailwindcss.custom colors.example.600}"
  if (reference.includes('custom colors.example.')) {
    const shade = reference.split('.').pop();
    return customColors.example[shade];
  }
  
  if (reference.includes('tailwind colors.')) {
    const colorKey = reference.split('tailwind colors.')[1];
    return tailwindColors[colorKey];
  }
  
  return reference;
}

function hexToOklch(hex) {
  // Conversión específica para tu paleta
  const colorMap = {
    // Tu paleta verde (example colors)
    '#ebfef6ff': 'oklch(0.975 0.025 162.5)',
    '#ebfef6': 'oklch(0.975 0.025 162.5)',
    '#d0fbe7ff': 'oklch(0.948 0.065 162.5)',
    '#d0fbe7': 'oklch(0.948 0.065 162.5)',
    '#a4f6d5ff': 'oklch(0.908 0.095 162.5)',
    '#a4f6d5': 'oklch(0.908 0.095 162.5)',
    '#6aebbfff': 'oklch(0.858 0.145 162.5)',
    '#6aebbf': 'oklch(0.858 0.145 162.5)',
    '#2ed9a4ff': 'oklch(0.788 0.165 162.5)',
    '#2ed9a4': 'oklch(0.788 0.165 162.5)',
    '#09aa7eff': 'oklch(0.648 0.155 162.5)',
    '#09aa7e': 'oklch(0.648 0.155 162.5)',
    '#009b74ff': 'oklch(0.598 0.145 162.5)',
    '#009b74': 'oklch(0.598 0.145 162.5)',
    '#007c60ff': 'oklch(0.478 0.135 162.5)',
    '#007c60': 'oklch(0.478 0.135 162.5)',
    '#03624dff': 'oklch(0.368 0.115 162.5)',
    '#03624d': 'oklch(0.368 0.115 162.5)',
    '#035141ff': 'oklch(0.308 0.095 162.5)',
    '#035141': 'oklch(0.308 0.095 162.5)',
    '#012d26ff': 'oklch(0.178 0.065 162.5)',
    '#012d26': 'oklch(0.178 0.065 162.5)',
    
    // Zinc colors
    '#fafafa': 'oklch(0.985 0.002 106.423)',
    '#f4f4f5': 'oklch(0.968 0.004 106.423)',
    '#e4e4e7': 'oklch(0.922 0.006 106.423)',
    '#d4d4d8': 'oklch(0.863 0.009 106.423)',
    '#a1a1aa': 'oklch(0.681 0.014 106.423)',
    '#71717a': 'oklch(0.506 0.016 106.423)',
    '#52525b': 'oklch(0.377 0.019 106.423)',
    '#3f3f46': 'oklch(0.309 0.021 106.423)',
    '#27272a': 'oklch(0.203 0.025 106.423)',
    '#18181b': 'oklch(0.142 0.028 106.423)',
    '#09090b': 'oklch(0.089 0.032 106.423)',
    '#ffffff': 'oklch(1 0 0)',
    '#000000': 'oklch(0 0 0)',
    
    // Red colors
    '#fef2f2': 'oklch(0.977 0.013 17.38)',
    '#dc2626': 'oklch(0.577 0.214 27.325)',
    '#7f1d1d': 'oklch(0.372 0.158 27.325)',
    
    // Blue colors
    '#1d4ed8': 'oklch(0.474 0.196 264.376)',
    
    // Gray colors
    '#e5e7eb': 'oklch(0.922 0.003 247.858)',
  };
  
  const cleanHex = hex.replace('ff', '').toLowerCase();
  return colorMap[cleanHex] || colorMap[hex.toLowerCase()] || hex;
}

// Generar CSS para modo claro
let lightModeCSS = `:root {\n`;
lightModeCSS += `  /* Colores primarios de tu Design System */\n`;
lightModeCSS += `  --primary: ${hexToOklch(customColors.example['600'])}; /* ${customColors.example['600']} - Verde esmeralda */\n`;
lightModeCSS += `  --primary-foreground: ${hexToOklch('#ffffff')}; /* Blanco */\n`;
lightModeCSS += `\n`;

// Procesar todos los tokens de tema para modo claro
Object.entries(themeColors).forEach(([key, value]) => {
  if (key.endsWith('-light')) {
    const resolved = resolveColorReference(value);
    const cssVarName = key.replace('-light', '');
    lightModeCSS += `  --${cssVarName}: ${hexToOklch(resolved)}; /* ${resolved} */\n`;
  }
});

// Agregar sombras
lightModeCSS += `\n  /* Sombras */\n`;
Object.entries(shadows).forEach(([key, value]) => {
  lightModeCSS += `  --shadow-${key}: ${value};\n`;
});

lightModeCSS += `}\n\n`;

// Generar CSS para modo oscuro
let darkModeCSS = `.dark {\n`;
darkModeCSS += `  /* Colores primarios para modo oscuro */\n`;
darkModeCSS += `  --primary: ${hexToOklch(customColors.example['300'])}; /* ${customColors.example['300']} - Verde más claro */\n`;
darkModeCSS += `  --primary-foreground: ${hexToOklch(customColors.example['800'])}; /* Verde oscuro */\n`;
darkModeCSS += `\n`;

// Procesar todos los tokens de tema para modo oscuro
Object.entries(themeColors).forEach(([key, value]) => {
  if (key.endsWith('-dark')) {
    const resolved = resolveColorReference(value);
    const cssVarName = key.replace('-dark', '');
    darkModeCSS += `  --${cssVarName}: ${hexToOklch(resolved)}; /* ${resolved} */\n`;
  }
});

darkModeCSS += `}\n`;

// CSS completo
const fullCSS = `/* 
 * Design Tokens desde tu Figma Design System
 * shadcn_ui-kit-for-Figma - New York - January 2025
 * 
 * ✅ Usando EXCLUSIVAMENTE tus tokens de Figma
 * 🎨 Paleta principal: Verde (#009b74 - #2ed9a4)
 * 🌗 Soporte completo para light/dark mode
 */

${lightModeCSS}${darkModeCSS}

/* Variables adicionales para Digital Signage */
:root {
  /* Branding específico */
  --brand-primary: var(--primary);
  --brand-secondary: ${hexToOklch(customColors.example['400'])};
  
  /* Estados para Digital Signage */
  --status-online: var(--primary);
  --status-offline: var(--destructive);
  --status-warning: ${hexToOklch('#f59e0b')};
  
  /* Radius de tu sistema */
  --radius: 0.625rem;
}`;

// Escribir archivo
const outputPath = path.join(__dirname, '../src/tokens/figma-pure.css');
fs.writeFileSync(outputPath, fullCSS);

console.log('✅ CSS generado exitosamente desde tu Figma!');
console.log(`📁 Archivo: ${outputPath}`);
console.log(`🎨 Paleta verde: ${Object.keys(customColors.example).length} tonos`);
console.log(`🎯 Tokens light: ${Object.keys(themeColors).filter(k => k.endsWith('-light')).length}`);
console.log(`🌙 Tokens dark: ${Object.keys(themeColors).filter(k => k.endsWith('-dark')).length}`);
console.log(`✨ Sombras: ${Object.keys(shadows).length}`);

// Mostrar paleta principal
console.log('\n🎨 Tu paleta verde principal:');
Object.entries(customColors.example).forEach(([shade, color]) => {
  console.log(`   ${shade}: ${color}`);
});

console.log('\n🎯 Principales tokens extraídos:');
console.log(`   primary-light: ${resolveColorReference(themeColors['primary-light'])}`);
console.log(`   primary-dark: ${resolveColorReference(themeColors['primary-dark'])}`);
console.log(`   background-light: ${resolveColorReference(themeColors['background-light'])}`);
console.log(`   background-dark: ${resolveColorReference(themeColors['background-dark'])}`);
