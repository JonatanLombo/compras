import type { IconName } from "@/components/atoms/Icon/Icon";

export interface MarketplaceModule {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: IconName;
  price: number;
  currency: string;
  billingPeriod: "monthly" | "yearly" | "one-time";
  features: string[];
  category: "finanzas" | "operaciones" | "rrhh" | "crm" | "analytics" | "integraciones";
  popular?: boolean;
  new?: boolean;
}

export const marketplaceModules: MarketplaceModule[] = [
  {
    id: "crm",
    name: "CRM Avanzado",
    description: "Gestión de relaciones con clientes",
    longDescription: "Sistema completo de gestión de clientes con seguimiento de oportunidades, pipeline de ventas y automatización de marketing.",
    icon: "users",
    price: 299,
    currency: "USD",
    billingPeriod: "monthly",
    category: "crm",
    popular: true,
    features: [
      "Pipeline de ventas visual",
      "Seguimiento de oportunidades",
      "Automatización de emails",
      "Reportes de conversión",
      "Integración con calendario",
    ],
  },
  {
    id: "bi-analytics",
    name: "Business Intelligence",
    description: "Análisis avanzado y dashboards",
    longDescription: "Herramientas de análisis de datos con dashboards personalizables, KPIs en tiempo real y reportes automatizados.",
    icon: "report",
    price: 449,
    currency: "USD",
    billingPeriod: "monthly",
    category: "analytics",
    popular: true,
    features: [
      "Dashboards personalizables",
      "KPIs en tiempo real",
      "Reportes automatizados",
      "Exportación a Excel/PDF",
      "Alertas configurables",
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Tienda en línea integrada",
    longDescription: "Módulo de comercio electrónico completamente integrado con inventario, pagos y logística.",
    icon: "purchases",
    price: 399,
    currency: "USD",
    billingPeriod: "monthly",
    category: "operaciones",
    new: true,
    features: [
      "Catálogo de productos online",
      "Carrito de compras",
      "Pasarelas de pago",
      "Gestión de envíos",
      "Sincronización con inventario",
    ],
  },
  {
    id: "proyectos",
    name: "Gestión de Proyectos",
    description: "Control de proyectos y tareas",
    longDescription: "Administre proyectos, asigne tareas, controle tiempos y presupuestos de manera eficiente.",
    icon: "quote",
    price: 199,
    currency: "USD",
    billingPeriod: "monthly",
    category: "operaciones",
    features: [
      "Tableros Kanban",
      "Diagramas de Gantt",
      "Control de tiempos",
      "Presupuestos por proyecto",
      "Asignación de recursos",
    ],
  },
  {
    id: "produccion",
    name: "Producción y Manufactura",
    description: "Control de producción industrial",
    longDescription: "Gestione órdenes de producción, control de calidad, y planificación de recursos de manufactura (MRP).",
    icon: "warehouse",
    price: 549,
    currency: "USD",
    billingPeriod: "monthly",
    category: "operaciones",
    features: [
      "Órdenes de producción",
      "Lista de materiales (BOM)",
      "Control de calidad",
      "Planificación MRP",
      "Costos de producción",
    ],
  },
  {
    id: "activos-fijos",
    name: "Activos Fijos",
    description: "Control de activos y depreciación",
    longDescription: "Administre el ciclo de vida completo de sus activos fijos, incluyendo depreciación y mantenimiento.",
    icon: "building",
    price: 149,
    currency: "USD",
    billingPeriod: "monthly",
    category: "finanzas",
    features: [
      "Registro de activos",
      "Cálculo de depreciación",
      "Programación de mantenimiento",
      "Historial de movimientos",
      "Reportes fiscales",
    ],
  },
  {
    id: "tesoreria",
    name: "Tesorería",
    description: "Gestión de flujo de caja",
    longDescription: "Control completo de tesorería con proyecciones de flujo de caja, conciliación bancaria y gestión de pagos.",
    icon: "payroll",
    price: 249,
    currency: "USD",
    billingPeriod: "monthly",
    category: "finanzas",
    new: true,
    features: [
      "Flujo de caja proyectado",
      "Conciliación bancaria",
      "Programación de pagos",
      "Gestión de cheques",
      "Multi-moneda",
    ],
  },
  {
    id: "reclutamiento",
    name: "Reclutamiento",
    description: "Gestión de talento humano",
    longDescription: "Sistema de reclutamiento y selección con publicación de vacantes, seguimiento de candidatos y evaluaciones.",
    icon: "user-group",
    price: 179,
    currency: "USD",
    billingPeriod: "monthly",
    category: "rrhh",
    features: [
      "Portal de empleo",
      "Seguimiento de candidatos",
      "Evaluaciones en línea",
      "Entrevistas programadas",
      "Onboarding digital",
    ],
  },
  {
    id: "capacitacion",
    name: "Capacitación (LMS)",
    description: "Plataforma de aprendizaje",
    longDescription: "Sistema de gestión de aprendizaje para capacitación de empleados con cursos, evaluaciones y certificaciones.",
    icon: "ledger",
    price: 199,
    currency: "USD",
    billingPeriod: "monthly",
    category: "rrhh",
    features: [
      "Cursos en línea",
      "Evaluaciones",
      "Certificaciones",
      "Seguimiento de progreso",
      "Biblioteca de contenidos",
    ],
  },
  {
    id: "api-integraciones",
    name: "API & Integraciones",
    description: "Conecte con sistemas externos",
    longDescription: "API REST completa y conectores pre-construidos para integrar NexusPro con sus sistemas existentes.",
    icon: "transfer",
    price: 349,
    currency: "USD",
    billingPeriod: "monthly",
    category: "integraciones",
    features: [
      "API REST documentada",
      "Webhooks configurables",
      "Conectores pre-construidos",
      "Sincronización en tiempo real",
      "Logs de integración",
    ],
  },
];

export const categories = [
  { id: "all", name: "Todos" },
  { id: "finanzas", name: "Finanzas" },
  { id: "operaciones", name: "Operaciones" },
  { id: "rrhh", name: "Recursos Humanos" },
  { id: "crm", name: "CRM" },
  { id: "analytics", name: "Analytics" },
  { id: "integraciones", name: "Integraciones" },
];
