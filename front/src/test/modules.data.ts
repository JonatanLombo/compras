import type { IconName } from "@/components/atoms/Icon/Icon";

export interface SubModule {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  path: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  subModules: SubModule[];
}

export const modulesData: Module[] = [
  {
    id: "ventas",
    name: "Ventas",
    description: "Gestión de ventas y facturación",
    icon: "sales",
    subModules: [
      {
        id: "facturas",
        name: "Facturas",
        description: "Crear y gestionar facturas",
        icon: "invoice",
        path: "/ventas/facturas",
      },
      {
        id: "clientes",
        name: "Clientes",
        description: "Gestión de clientes",
        icon: "users",
        path: "/ventas/clientes",
      },
      {
        id: "cotizaciones",
        name: "Cotizaciones",
        description: "Crear cotizaciones",
        icon: "quote",
        path: "/ventas/cotizaciones",
      },
    ],
  },
  {
    id: "inventario",
    name: "Inventario",
    description: "Control de stock y productos",
    icon: "inventory",
    subModules: [
      {
        id: "productos",
        name: "Productos",
        description: "Catálogo de productos",
        icon: "product",
        path: "/inventario/productos",
      },
      {
        id: "movimientos",
        name: "Movimientos",
        description: "Entradas y salidas",
        icon: "transfer",
        path: "/inventario/movimientos",
      },
      {
        id: "almacenes",
        name: "Almacenes",
        description: "Gestión de almacenes",
        icon: "warehouse",
        path: "/inventario/almacenes",
      },
    ],
  },
  {
    id: "contabilidad",
    name: "Contabilidad",
    description: "Gestión contable y financiera",
    icon: "accounting",
    subModules: [
      {
        id: "libro-diario",
        name: "Libro Diario",
        description: "Registros contables",
        icon: "ledger",
        path: "/contabilidad/libro-diario",
      },
      {
        id: "cuentas",
        name: "Plan de Cuentas",
        description: "Catálogo de cuentas",
        icon: "chart-accounts",
        path: "/contabilidad/cuentas",
      },
      {
        id: "reportes",
        name: "Reportes",
        description: "Reportes financieros",
        icon: "report",
        path: "/contabilidad/reportes",
      },
    ],
  },
  {
    id: "rrhh",
    name: "Recursos Humanos",
    description: "Gestión del personal",
    icon: "hr",
    subModules: [
      {
        id: "empleados",
        name: "Empleados",
        description: "Directorio de empleados",
        icon: "employee",
        path: "/rrhh/empleados",
      },
      {
        id: "nomina",
        name: "Nómina",
        description: "Gestión de nómina",
        icon: "payroll",
        path: "/rrhh/nomina",
      },
      {
        id: "asistencia",
        name: "Asistencia",
        description: "Control de asistencia",
        icon: "attendance",
        path: "/rrhh/asistencia",
      },
    ],
  },
  {
    id: "compras",
    name: "Compras",
    description: "Gestión de proveedores y compras",
    icon: "purchases",
    subModules: [
      {
        id: "proveedores",
        name: "Proveedores",
        description: "Gestión de proveedores",
        icon: "supplier",
        path: "/compras/proveedores",
      },
      {
        id: "ordenes",
        name: "Órdenes de Compra",
        description: "Crear órdenes de compra",
        icon: "order",
        path: "/compras/ordenes",
      },
      {
        id: "recepciones",
        name: "Recepciones",
        description: "Recepción de mercancía",
        icon: "reception",
        path: "/compras/recepciones",
      },
    ],
  },
  {
    id: "configuracion",
    name: "Configuración",
    description: "Ajustes del sistema",
    icon: "settings",
    subModules: [
      {
        id: "usuarios",
        name: "Usuarios",
        description: "Gestión de usuarios",
        icon: "user-group",
        path: "/configuracion/usuarios",
      },
      {
        id: "roles",
        name: "Roles y Permisos",
        description: "Control de acceso",
        icon: "lock",
        path: "/configuracion/roles",
      },
      {
        id: "empresa",
        name: "Datos de Empresa",
        description: "Información de la empresa",
        icon: "building",
        path: "/configuracion/empresa",
      },
    ],
  },
];
