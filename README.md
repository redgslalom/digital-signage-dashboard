# Digital Signage Dashboard

Un dashboard moderno y funcional para la gestión de contenido de Digital Signage, construido con Next.js, TypeScript y Shadcn UI.

## 🚀 Características

### Dashboard Principal
- **Métricas en tiempo real**: Visualización de ingresos, suscripciones, ventas y usuarios activos
- **Gráficos interactivos**: Análisis de ingresos mensuales y actividad de dispositivos
- **Calendario integrado**: Programación y visualización de eventos
- **Monitoreo de objetivos**: Seguimiento de contenido publicado, engagement rate y dispositivos activos
- **Tabla de actividades**: Historial de transacciones y actividades del sistema

### Gestión de Contenido
- **Biblioteca de contenido**: Gestión completa de archivos multimedia (imágenes, videos, texto)
- **Programación de contenido**: Sistema de scheduling con fechas, horarios y repeticiones
- **Gestión de dispositivos**: Monitoreo del estado de pantallas y configuración
- **Estados de contenido**: Control de contenido activo, programado e inactivo

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4 con tokens personalizados
- **Componentes UI**: Shadcn UI con sistema de Design Tokens
- **Tema**: next-themes para modo oscuro/claro
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Fechas**: date-fns

## 🎨 Sistema de Design Tokens

### Colores Primarios Personalizados
- **primary-light**: `oklch(0.478 0.28 264.6)` - Azul vibrante para modo claro
- **primary-dark**: `oklch(0.218 0.095 265.75)` - Azul marino profundo

### Tokens Optimizados para Digital Signage
- Colores de estado: online (verde), offline (rojo), warning (amarillo)
- Palette de gráficos con 5 colores distintos
- Sombras adaptativas para modo claro/oscuro
- Transiciones suaves optimizadas para pantallas digitales

Ver documentación completa en [`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md)

## 📦 Componentes Shadcn UI Incluidos

- Card, Button, Badge, Progress
- Calendar, Chart, Avatar, Table
- Dropdown Menu, Separator, Dialog
- Input, Textarea, Select, Switch, Tabs

## 🚀 Instalación y Configuración

1. **Clona el repositorio**:
   ```bash
   git clone <repository-url>
   cd shadcn-digital-signage
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

## 📱 Rutas Disponibles

- `/` - Dashboard principal con métricas y analíticas
- `/content` - Gestión de contenido y programación

## 🎨 Diseño y UX

El diseño está basado en el sistema de componentes de Shadcn UI, siguiendo las mejores prácticas de:

- **Responsive Design**: Adaptado para desktop, tablet y móvil
- **Accesibilidad**: Componentes accesibles y navegación por teclado
- **Modo Oscuro**: Soporte nativo para temas claro y oscuro
- **Tipografía**: Sistema tipográfico consistente
- **Espaciado**: Grid system y espaciado coherente

## 🔧 Estructura del Proyecto

```
src/
├── app/
│   ├── content/           # Página de gestión de contenido
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Dashboard principal
├── components/
│   ├── charts/            # Componentes de gráficos
│   ├── ui/                # Componentes base de Shadcn UI
│   └── content-manager.tsx # Gestor de contenido
└── lib/
    └── utils.ts           # Utilidades compartidas
```

## 🔄 Funcionalidades Implementadas

### ✅ Completadas
- [x] Inicialización del proyecto Next.js con TypeScript
- [x] Configuración de Shadcn UI y Tailwind CSS
- [x] Instalación de componentes base de Shadcn
- [x] Layout principal del dashboard
- [x] Componentes de Digital Signage (métricas, gráficos, calendario)
- [x] Gestión de contenido multimedia
- [x] Sistema de programación de contenido
- [x] Monitoreo de dispositivos

### 🚧 Funcionalidades Adicionales Sugeridas
- [ ] Autenticación de usuarios
- [ ] API para gestión de contenido real
- [ ] Notificaciones push en tiempo real
- [ ] Integración con servicios de almacenamiento en la nube
- [ ] Análisis avanzado con métricas personalizadas
- [ ] Gestión de roles y permisos
- [ ] Exportación de reportes
- [ ] Integración con sistemas de CMS

## 📊 Datos de Ejemplo

El dashboard incluye datos simulados para demostrar todas las funcionalidades:

- Métricas financieras con tendencias
- Contenido multimedia de ejemplo
- Estados de dispositivos simulados
- Programación de contenido ficticia

## 🎯 Casos de Uso

Este dashboard es ideal para:

- **Centros comerciales**: Gestión de publicidad en pantallas
- **Oficinas corporativas**: Comunicación interna y anuncios
- **Restaurantes**: Menús digitales y promociones
- **Hospitales**: Información y navegación
- **Transporte público**: Horarios y anuncios
- **Educación**: Comunicados y horarios

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)

---

Desarrollado con ❤️ usando las mejores prácticas de desarrollo web moderno.