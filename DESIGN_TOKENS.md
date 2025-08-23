# Design Tokens - Digital Signage Dashboard

Este documento describe el sistema completo de tokens de diseño implementado para el Digital Signage Dashboard, basado en las mejores prácticas de Shadcn UI y optimizado para aplicaciones de señalización digital.

## 🎨 Tokens de Color

### Colores Primarios
```css
/* Modo Claro */
--primary-light: oklch(0.478 0.28 264.6);   /* Azul vibrante #2563eb */
--primary-dark: oklch(0.218 0.095 265.75);  /* Azul marino profundo #1e293b */

/* Modo Oscuro */
--primary-light: oklch(0.658 0.32 264.6);   /* Azul más brillante para modo oscuro */
--primary-dark: oklch(0.128 0.055 265.75);  /* Azul marino muy oscuro */
```

### Colores de Estado
```css
--status-online: var(--success);   /* Verde para dispositivos conectados */
--status-offline: var(--destructive); /* Rojo para dispositivos desconectados */
--status-warning: var(--warning);  /* Amarillo para advertencias */

/* Específicos */
--success: oklch(0.618 0.173 142.495);  /* Verde */
--destructive: oklch(0.577 0.245 27.325); /* Rojo */
--warning: oklch(0.808 0.171 85.594);   /* Amarillo */
```

### Colores de Gráficos
```css
--chart-1: var(--primary-light);           /* Azul primario */
--chart-2: oklch(0.618 0.173 142.495);     /* Verde */
--chart-3: oklch(0.708 0.185 60.72);       /* Naranja */
--chart-4: oklch(0.658 0.22 316.6);        /* Púrpura */
--chart-5: oklch(0.578 0.19 355.8);        /* Rosa */
```

### Colores de Superficie

#### Modo Claro
```css
--background: oklch(1 0 0);                 /* Blanco puro */
--card: oklch(0.995 0.003 264.6);          /* Blanco ligeramente azulado */
--sidebar: oklch(0.985 0.008 264.6);       /* Gris muy claro azulado */
--border: oklch(0.918 0.015 264.6);        /* Gris para bordes */
```

#### Modo Oscuro
```css
--background: var(--primary-dark);         /* Azul marino como fondo */
--card: oklch(0.168 0.065 265.75);        /* Azul marino ligeramente más claro */
--sidebar: oklch(0.148 0.055 265.75);     /* Más oscuro que las cards */
--border: oklch(0.288 0.085 265.75);      /* Azul marino para bordes */
```

## 📏 Tokens de Espaciado

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
```

## 🔤 Tokens de Tipografía

```css
--font-size-display: 3rem;     /* 48px - Para títulos principales */
--font-size-headline: 2rem;    /* 32px - Para subtítulos */
--font-size-title: 1.5rem;     /* 24px - Para títulos de sección */
--font-size-body: 1rem;        /* 16px - Para texto normal */
--font-size-caption: 0.875rem; /* 14px - Para texto pequeño */
```

## 🌊 Tokens de Sombras

### Modo Claro
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

### Modo Oscuro
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
```

## ⚡ Tokens de Animación

```css
--transition-fast: 150ms ease-in-out;      /* Para hover y focus */
--transition-normal: 300ms ease-in-out;    /* Para cambios de estado */
--transition-slow: 500ms ease-in-out;      /* Para transiciones complejas */
```

## 🎯 Clases Utilitarias Personalizadas

### Cards de Digital Signage
```css
.ds-card {
  @apply bg-card text-card-foreground rounded-lg border shadow-md;
  transition: all var(--transition-normal);
}

.ds-card:hover {
  @apply shadow-lg;
  transform: translateY(-2px);
}
```

### Estados de Dispositivos
```css
.ds-status-online {
  @apply text-green-600 dark:text-green-400;
}

.ds-status-offline {
  @apply text-red-600 dark:text-red-400;
}

.ds-status-warning {
  @apply text-yellow-600 dark:text-yellow-400;
}
```

### Elementos del Sidebar
```css
.ds-sidebar-item {
  @apply transition-all duration-200 ease-in-out;
}

.ds-sidebar-item:hover {
  @apply bg-accent text-accent-foreground transform translate-x-1;
}
```

### Botones Primarios
```css
.ds-button-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80;
  transition: all var(--transition-fast);
}
```

### Contenedores de Gráficos
```css
.ds-chart-container {
  @apply bg-card/50 backdrop-blur-sm border rounded-lg p-4;
}
```

## 🌗 Sistema de Temas

El sistema soporta tres modos:
- **Light**: Colores claros optimizados para entornos bien iluminados
- **Dark**: Colores oscuros con alto contraste para entornos con poca luz
- **System**: Automáticamente sigue la preferencia del sistema operativo

### Implementación
```jsx
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// En layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>

// En componentes
<ThemeToggle />
```

## 📱 Optimizaciones para Digital Signage

### Colores de Alto Contraste
- Los colores están optimizados para ser visibles en pantallas digitales
- Ratio de contraste WCAG AA cumplido en todos los modos
- Colores vibrantes para llamar la atención en entornos comerciales

### Transiciones Suaves
- Todas las transiciones están optimizadas para pantallas de alta frecuencia
- Animaciones sutiles que no distraen del contenido principal
- Estados de hover mejorados para interfaces táctiles

### Responsive Design
- Tokens de espaciado que escalan correctamente en diferentes tamaños
- Tipografía legible en pantallas desde móviles hasta displays grandes
- Componentes que se adaptan automáticamente al contexto

## 🔧 Cómo Usar los Tokens

### En CSS
```css
.my-component {
  background-color: var(--primary-light);
  padding: var(--spacing-md);
  border-radius: var(--radius);
  transition: var(--transition-normal);
}
```

### En Tailwind CSS
```jsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg ds-card">
  Contenido
</div>
```

### En Componentes React
```jsx
const MyComponent = () => (
  <Card className="ds-card">
    <CardContent>
      <span className="ds-status-online">En línea</span>
    </CardContent>
  </Card>
);
```

## 🎨 Personalización

Para personalizar los tokens según tu Design System de Figma:

1. **Actualiza los valores en `globals.css`**:
   ```css
   :root {
     --primary-light: tu-color-aqui;
     --primary-dark: tu-color-aqui;
   }
   ```

2. **Mantén la estructura de naming**:
   - Usa nombres semánticos (`--primary-light`, no `--blue-500`)
   - Sigue el patrón `--componente-estado-variante`

3. **Testa en ambos modos**:
   - Verifica que los colores funcionen en light y dark mode
   - Asegúrate de que el contraste sea adecuado

## 📋 Checklist de Implementación

- ✅ Tokens de color primarios definidos
- ✅ Sistema de modo oscuro/claro implementado
- ✅ Colores de estado para Digital Signage
- ✅ Tokens de espaciado y tipografía
- ✅ Clases utilitarias personalizadas
- ✅ Animaciones y transiciones optimizadas
- ✅ Componentes actualizados con nuevos tokens
- ✅ Documentación completa

Este sistema de tokens proporciona una base sólida y consistente para el desarrollo de interfaces de Digital Signage modernas y accesibles.
