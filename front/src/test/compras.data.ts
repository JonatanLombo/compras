export interface Proveedor {
  id: string;
  codigo: string;
  nombre: string;
  rfc: string;
  contacto: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  estado: string;
  activo: boolean;
  categoria: string;
}

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  unidad: string;
  precioUnitario: number;
  stock: number;
  stockMinimo: number;
  proveedorId: string;
}

export interface OrdenCompra {
  id: string;
  numero: string;
  fecha: string;
  proveedorId: string;
  proveedorNombre: string;
  estado: "borrador" | "pendiente" | "aprobada" | "recibida" | "cancelada";
  subtotal: number;
  iva: number;
  total: number;
  items: number;
}

export interface Recepcion {
  id: string;
  numero: string;
  fecha: string;
  ordenCompraId: string;
  ordenCompraNumero: string;
  proveedorNombre: string;
  estado: "pendiente" | "parcial" | "completa";
  itemsRecibidos: number;
  itemsTotales: number;
}

export const proveedores: Proveedor[] = [
  {
    id: "prov-001",
    codigo: "PROV-001",
    nombre: "Distribuidora Industrial del Norte S.A.",
    rfc: "DIN850101ABC",
    contacto: "Carlos Mendoza",
    email: "ventas@dinorte.com",
    telefono: "+52 81 1234 5678",
    direccion: "Av. Industrial 1250",
    ciudad: "Monterrey",
    estado: "Nuevo León",
    activo: true,
    categoria: "Materiales",
  },
  {
    id: "prov-002",
    codigo: "PROV-002",
    nombre: "Tecnología y Equipos SA de CV",
    rfc: "TEQ900215XYZ",
    contacto: "María García",
    email: "contacto@tecnoequipos.mx",
    telefono: "+52 55 9876 5432",
    direccion: "Calle Reforma 456",
    ciudad: "Ciudad de México",
    estado: "CDMX",
    activo: true,
    categoria: "Equipos",
  },
  {
    id: "prov-003",
    codigo: "PROV-003",
    nombre: "Suministros Oficina Express",
    rfc: "SOE880530QWE",
    contacto: "Roberto Sánchez",
    email: "pedidos@oficinaexpress.com",
    telefono: "+52 33 2468 1357",
    direccion: "Blvd. Empresarial 789",
    ciudad: "Guadalajara",
    estado: "Jalisco",
    activo: true,
    categoria: "Oficina",
  },
  {
    id: "prov-004",
    codigo: "PROV-004",
    nombre: "Químicos Industriales del Bajío",
    rfc: "QIB750820RTY",
    contacto: "Ana López",
    email: "ventas@quimicosbajio.com",
    telefono: "+52 477 123 4567",
    direccion: "Parque Industrial Norte 234",
    ciudad: "León",
    estado: "Guanajuato",
    activo: true,
    categoria: "Químicos",
  },
  {
    id: "prov-005",
    codigo: "PROV-005",
    nombre: "Logística y Empaques Modernos",
    rfc: "LEM920415UIO",
    contacto: "Fernando Torres",
    email: "info@empaques-modernos.mx",
    telefono: "+52 222 987 6543",
    direccion: "Zona Industrial Sur 567",
    ciudad: "Puebla",
    estado: "Puebla",
    activo: false,
    categoria: "Empaques",
  },
];

export const productos: Producto[] = [
  {
    id: "prod-001",
    codigo: "MAT-001",
    nombre: "Acero Inoxidable Calibre 18",
    descripcion: "Lámina de acero inoxidable calibre 18, 4x8 pies",
    categoria: "Materiales",
    unidad: "Pieza",
    precioUnitario: 2500.0,
    stock: 45,
    stockMinimo: 20,
    proveedorId: "prov-001",
  },
  {
    id: "prod-002",
    codigo: "MAT-002",
    nombre: "Tornillería Industrial M8",
    descripcion: "Tornillos hexagonales M8x25mm grado 8.8",
    categoria: "Materiales",
    unidad: "Caja (100 pzas)",
    precioUnitario: 350.0,
    stock: 120,
    stockMinimo: 50,
    proveedorId: "prov-001",
  },
  {
    id: "prod-003",
    codigo: "EQP-001",
    nombre: "Laptop HP ProBook 450",
    descripcion: "Laptop empresarial i5, 16GB RAM, 512GB SSD",
    categoria: "Equipos",
    unidad: "Pieza",
    precioUnitario: 18500.0,
    stock: 8,
    stockMinimo: 5,
    proveedorId: "prov-002",
  },
  {
    id: "prod-004",
    codigo: "EQP-002",
    nombre: "Monitor Dell 27 pulgadas",
    descripcion: "Monitor LED 27\" Full HD, ajustable en altura",
    categoria: "Equipos",
    unidad: "Pieza",
    precioUnitario: 5200.0,
    stock: 15,
    stockMinimo: 10,
    proveedorId: "prov-002",
  },
  {
    id: "prod-005",
    codigo: "OFI-001",
    nombre: "Papel Bond Carta",
    descripcion: "Resma de papel bond carta 75g, 500 hojas",
    categoria: "Oficina",
    unidad: "Resma",
    precioUnitario: 95.0,
    stock: 200,
    stockMinimo: 100,
    proveedorId: "prov-003",
  },
  {
    id: "prod-006",
    codigo: "OFI-002",
    nombre: "Tóner HP 58A",
    descripcion: "Cartucho de tóner original HP 58A negro",
    categoria: "Oficina",
    unidad: "Pieza",
    precioUnitario: 1850.0,
    stock: 12,
    stockMinimo: 8,
    proveedorId: "prov-003",
  },
  {
    id: "prod-007",
    codigo: "QUI-001",
    nombre: "Solvente Industrial",
    descripcion: "Solvente multiusos para limpieza industrial, 20L",
    categoria: "Químicos",
    unidad: "Cubeta",
    precioUnitario: 890.0,
    stock: 25,
    stockMinimo: 15,
    proveedorId: "prov-004",
  },
  {
    id: "prod-008",
    codigo: "EMP-001",
    nombre: "Caja de Cartón 40x30x25",
    descripcion: "Caja de cartón corrugado doble, 40x30x25 cm",
    categoria: "Empaques",
    unidad: "Paquete (25 pzas)",
    precioUnitario: 425.0,
    stock: 80,
    stockMinimo: 40,
    proveedorId: "prov-005",
  },
];

export const ordenesCompra: OrdenCompra[] = [
  {
    id: "oc-001",
    numero: "OC-2024-001",
    fecha: "2024-01-15",
    proveedorId: "prov-001",
    proveedorNombre: "Distribuidora Industrial del Norte S.A.",
    estado: "recibida",
    subtotal: 45000.0,
    iva: 7200.0,
    total: 52200.0,
    items: 5,
  },
  {
    id: "oc-002",
    numero: "OC-2024-002",
    fecha: "2024-01-18",
    proveedorId: "prov-002",
    proveedorNombre: "Tecnología y Equipos SA de CV",
    estado: "aprobada",
    subtotal: 92500.0,
    iva: 14800.0,
    total: 107300.0,
    items: 8,
  },
  {
    id: "oc-003",
    numero: "OC-2024-003",
    fecha: "2024-01-20",
    proveedorId: "prov-003",
    proveedorNombre: "Suministros Oficina Express",
    estado: "pendiente",
    subtotal: 12350.0,
    iva: 1976.0,
    total: 14326.0,
    items: 12,
  },
  {
    id: "oc-004",
    numero: "OC-2024-004",
    fecha: "2024-01-22",
    proveedorId: "prov-004",
    proveedorNombre: "Químicos Industriales del Bajío",
    estado: "borrador",
    subtotal: 8900.0,
    iva: 1424.0,
    total: 10324.0,
    items: 3,
  },
  {
    id: "oc-005",
    numero: "OC-2024-005",
    fecha: "2024-01-25",
    proveedorId: "prov-001",
    proveedorNombre: "Distribuidora Industrial del Norte S.A.",
    estado: "cancelada",
    subtotal: 15000.0,
    iva: 2400.0,
    total: 17400.0,
    items: 2,
  },
];

export const recepciones: Recepcion[] = [
  {
    id: "rec-001",
    numero: "REC-2024-001",
    fecha: "2024-01-20",
    ordenCompraId: "oc-001",
    ordenCompraNumero: "OC-2024-001",
    proveedorNombre: "Distribuidora Industrial del Norte S.A.",
    estado: "completa",
    itemsRecibidos: 5,
    itemsTotales: 5,
  },
  {
    id: "rec-002",
    numero: "REC-2024-002",
    fecha: "2024-01-25",
    ordenCompraId: "oc-002",
    ordenCompraNumero: "OC-2024-002",
    proveedorNombre: "Tecnología y Equipos SA de CV",
    estado: "parcial",
    itemsRecibidos: 5,
    itemsTotales: 8,
  },
];

export type SearchResultType = "proveedor" | "producto" | "orden" | "recepcion";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  titulo: string;
  subtitulo: string;
  extra?: string;
  estado?: string;
}

export function searchCompras(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Buscar en proveedores
  proveedores.forEach((p) => {
    if (
      p.nombre.toLowerCase().includes(q) ||
      p.codigo.toLowerCase().includes(q) ||
      p.rfc.toLowerCase().includes(q) ||
      p.contacto.toLowerCase().includes(q)
    ) {
      results.push({
        type: "proveedor",
        id: p.id,
        titulo: p.nombre,
        subtitulo: `${p.codigo} • ${p.contacto}`,
        extra: p.ciudad,
        estado: p.activo ? "Activo" : "Inactivo",
      });
    }
  });

  // Buscar en productos
  productos.forEach((p) => {
    if (
      p.nombre.toLowerCase().includes(q) ||
      p.codigo.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q)
    ) {
      results.push({
        type: "producto",
        id: p.id,
        titulo: p.nombre,
        subtitulo: `${p.codigo} • ${p.categoria}`,
        extra: `$${p.precioUnitario.toLocaleString()} / ${p.unidad}`,
        estado: p.stock <= p.stockMinimo ? "Stock bajo" : "Disponible",
      });
    }
  });

  // Buscar en órdenes de compra
  ordenesCompra.forEach((o) => {
    if (
      o.numero.toLowerCase().includes(q) ||
      o.proveedorNombre.toLowerCase().includes(q)
    ) {
      results.push({
        type: "orden",
        id: o.id,
        titulo: o.numero,
        subtitulo: o.proveedorNombre,
        extra: `$${o.total.toLocaleString()}`,
        estado: o.estado,
      });
    }
  });

  // Buscar en recepciones
  recepciones.forEach((r) => {
    if (
      r.numero.toLowerCase().includes(q) ||
      r.ordenCompraNumero.toLowerCase().includes(q) ||
      r.proveedorNombre.toLowerCase().includes(q)
    ) {
      results.push({
        type: "recepcion",
        id: r.id,
        titulo: r.numero,
        subtitulo: `${r.ordenCompraNumero} • ${r.proveedorNombre}`,
        extra: `${r.itemsRecibidos}/${r.itemsTotales} items`,
        estado: r.estado,
      });
    }
  });

  return results;
}

// ============================================
// SUPPLIER QUOTES - Para búsqueda de proveedores
// ============================================

// Categorías de productos
export type ProductCategory =
  | "ferreteria"
  | "tecnologia"
  | "oficina"
  | "mobiliario"
  | "quimicos"
  | "electricos"
  | "seguridad"
  | "limpieza";

export const productCategories: { id: ProductCategory; label: string; labelEn: string }[] = [
  { id: "ferreteria", label: "Ferretería", labelEn: "Hardware" },
  { id: "tecnologia", label: "Tecnología", labelEn: "Technology" },
  { id: "oficina", label: "Oficina", labelEn: "Office" },
  { id: "mobiliario", label: "Mobiliario", labelEn: "Furniture" },
  { id: "quimicos", label: "Químicos", labelEn: "Chemicals" },
  { id: "electricos", label: "Eléctricos", labelEn: "Electrical" },
  { id: "seguridad", label: "Seguridad", labelEn: "Security" },
  { id: "limpieza", label: "Limpieza", labelEn: "Cleaning" },
];

// Opciones de filtro para búsqueda de proveedores
export interface SearchFilters {
  sourceType?: "all" | "local" | "web";
  category?: ProductCategory | "all";
  minRating?: number;
  maxDeliveryDays?: number;
  maxPrice?: number;
  verifiedOnly?: boolean;
  freeShippingOnly?: boolean;
}

export interface SupplierQuote {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierLogo?: string;
  supplierCity: string;
  supplierRating: number;
  reviewCount: number;

  productName: string;
  productDescription: string;
  productCategory: ProductCategory;
  unitPrice: number;
  currency: string;
  minQuantity: number;
  availableStock: number;
  unit: string;

  deliveryDays: { min: number; max: number };
  shippingCost: number;
  freeShippingMinimum?: number;

  paymentTerms: string[];
  conditions: string[];

  verified: boolean;
  highlight?: "price" | "rating" | "delivery";
  sourceType: "local" | "web";
}

export const supplierQuotes: SupplierQuote[] = [
  // Tornillos M8 - Ferretería
  {
    id: "sq-001",
    supplierId: "prov-001",
    supplierName: "Ferretería Industrial del Norte",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.8,
    reviewCount: 245,
    productName: "Tornillos Hexagonales M8x25mm",
    productDescription: "Tornillos de acero galvanizado grado 8.8, cabeza hexagonal",
    productCategory: "ferreteria",
    unitPrice: 3.50,
    currency: "USD",
    minQuantity: 100,
    availableStock: 5000,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 150,
    freeShippingMinimum: 2000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Mínimo 100 piezas", "Garantía de calidad"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-002",
    supplierId: "prov-006",
    supplierName: "Tornillos y Fijaciones Express",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.9,
    reviewCount: 189,
    productName: "Tornillos Hexagonales M8x25mm",
    productDescription: "Tornillos de acero inoxidable grado 8.8, alta resistencia",
    productCategory: "ferreteria",
    unitPrice: 4.20,
    currency: "USD",
    minQuantity: 50,
    availableStock: 3200,
    unit: "pieza",
    deliveryDays: { min: 2, max: 3 },
    shippingCost: 0,
    freeShippingMinimum: 500,
    paymentTerms: ["Transferencia", "Tarjeta", "PayPal"],
    conditions: ["Mínimo 50 piezas", "Envío gratis +$500"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },
  {
    id: "sq-003",
    supplierId: "prov-007",
    supplierName: "Distribuidora de Materiales CDMX",
    supplierCity: "Ciudad de México",
    supplierRating: 4.5,
    reviewCount: 312,
    productName: "Tornillos Hexagonales M8x25mm",
    productDescription: "Tornillos galvanizados estándar, uso industrial",
    productCategory: "ferreteria",
    unitPrice: 3.80,
    currency: "USD",
    minQuantity: 200,
    availableStock: 8500,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 200,
    paymentTerms: ["Crédito 15 días", "Transferencia"],
    conditions: ["Mínimo 200 piezas", "Entrega mismo día CDMX"],
    verified: true,
    highlight: "delivery",
    sourceType: "local",
  },

  // Laptops - Tecnología
  {
    id: "sq-004",
    supplierId: "prov-002",
    supplierName: "TecnoEquipos Empresariales",
    supplierCity: "Ciudad de México",
    supplierRating: 4.7,
    reviewCount: 156,
    productName: "Laptop HP ProBook 450 G10",
    productDescription: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, Windows 11 Pro",
    productCategory: "tecnologia",
    unitPrice: 18500,
    currency: "USD",
    minQuantity: 1,
    availableStock: 45,
    unit: "pieza",
    deliveryDays: { min: 3, max: 5 },
    shippingCost: 0,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Garantía 3 años", "Soporte técnico incluido"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-005",
    supplierId: "prov-008",
    supplierName: "CompuMayor México",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.9,
    reviewCount: 423,
    productName: "Laptop HP ProBook 450 G10",
    productDescription: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, Windows 11 Pro",
    productCategory: "tecnologia",
    unitPrice: 19200,
    currency: "USD",
    minQuantity: 1,
    availableStock: 120,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta", "Leasing"],
    conditions: ["Garantía 3 años", "Configuración incluida", "Envío express gratis"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },
  {
    id: "sq-006",
    supplierId: "prov-009",
    supplierName: "Soluciones IT Empresarial",
    supplierCity: "Querétaro, QRO",
    supplierRating: 4.6,
    reviewCount: 89,
    productName: "Laptop HP ProBook 450 G10",
    productDescription: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, Windows 11 Pro",
    productCategory: "tecnologia",
    unitPrice: 18800,
    currency: "USD",
    minQuantity: 5,
    availableStock: 28,
    unit: "pieza",
    deliveryDays: { min: 2, max: 3 },
    shippingCost: 350,
    freeShippingMinimum: 50000,
    paymentTerms: ["Crédito 60 días", "Transferencia"],
    conditions: ["Mínimo 5 equipos", "Garantía extendida disponible"],
    verified: true,
    highlight: "delivery",
    sourceType: "local",
  },

  // Papel Bond - Oficina
  {
    id: "sq-007",
    supplierId: "prov-003",
    supplierName: "Oficina Express",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.4,
    reviewCount: 567,
    productName: "Papel Bond Carta 75g",
    productDescription: "Resma de 500 hojas, papel blanco alta calidad",
    productCategory: "oficina",
    unitPrice: 89,
    currency: "USD",
    minQuantity: 10,
    availableStock: 2500,
    unit: "resma",
    deliveryDays: { min: 2, max: 4 },
    shippingCost: 150,
    freeShippingMinimum: 3000,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Mínimo 10 resmas"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-008",
    supplierId: "prov-010",
    supplierName: "Papelería Corporativa SA",
    supplierCity: "Ciudad de México",
    supplierRating: 4.8,
    reviewCount: 234,
    productName: "Papel Bond Carta 75g",
    productDescription: "Resma de 500 hojas, certificación FSC",
    productCategory: "oficina",
    unitPrice: 95,
    currency: "USD",
    minQuantity: 5,
    availableStock: 4200,
    unit: "resma",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 1000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Mínimo 5 resmas", "Envío gratis +$1000"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },
  {
    id: "sq-009",
    supplierId: "prov-011",
    supplierName: "Mayoreo Oficina",
    supplierCity: "Puebla, PUE",
    supplierRating: 4.3,
    reviewCount: 145,
    productName: "Papel Bond Carta 75g",
    productDescription: "Resma de 500 hojas, blancura superior",
    productCategory: "oficina",
    unitPrice: 92,
    currency: "USD",
    minQuantity: 20,
    availableStock: 8000,
    unit: "resma",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 100,
    paymentTerms: ["Transferencia"],
    conditions: ["Mínimo 20 resmas", "Entrega mismo día zona centro"],
    verified: false,
    highlight: "delivery",
    sourceType: "web",
  },

  // Sillas de oficina - Mobiliario
  {
    id: "sq-010",
    supplierId: "prov-012",
    supplierName: "Muebles Ejecutivos MX",
    supplierCity: "Ciudad de México",
    supplierRating: 4.7,
    reviewCount: 289,
    productName: "Silla Ejecutiva Ergonómica",
    productDescription: "Silla con soporte lumbar, brazos ajustables, base cromada",
    productCategory: "mobiliario",
    unitPrice: 3500,
    currency: "USD",
    minQuantity: 1,
    availableStock: 85,
    unit: "pieza",
    deliveryDays: { min: 3, max: 5 },
    shippingCost: 250,
    freeShippingMinimum: 10000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Garantía 2 años", "Armado incluido"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-011",
    supplierId: "prov-013",
    supplierName: "ErgoOffice Pro",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.9,
    reviewCount: 412,
    productName: "Silla Ejecutiva Ergonómica Premium",
    productDescription: "Silla ergonómica certificada, malla transpirable, 5 ajustes",
    productCategory: "mobiliario",
    unitPrice: 4200,
    currency: "USD",
    minQuantity: 1,
    availableStock: 42,
    unit: "pieza",
    deliveryDays: { min: 2, max: 3 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta", "MSI"],
    conditions: ["Garantía 5 años", "Prueba 30 días"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },
  {
    id: "sq-012",
    supplierId: "prov-014",
    supplierName: "Mobiliario Industrial Express",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.5,
    reviewCount: 178,
    productName: "Silla Ejecutiva Estándar",
    productDescription: "Silla ejecutiva básica, brazos fijos, base negra",
    productCategory: "mobiliario",
    unitPrice: 2800,
    currency: "USD",
    minQuantity: 5,
    availableStock: 200,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 5000,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Mínimo 5 piezas", "Entrega rápida"],
    verified: true,
    highlight: "delivery",
    sourceType: "local",
  },

  // Monitores - Tecnología
  {
    id: "sq-013",
    supplierId: "prov-002",
    supplierName: "TecnoEquipos Empresariales",
    supplierCity: "Ciudad de México",
    supplierRating: 4.7,
    reviewCount: 156,
    productName: "Monitor Dell 27\" UltraSharp",
    productDescription: "Monitor IPS 27\", 4K UHD, USB-C, ajuste altura",
    productCategory: "tecnologia",
    unitPrice: 8900,
    currency: "USD",
    minQuantity: 1,
    availableStock: 32,
    unit: "pieza",
    deliveryDays: { min: 2, max: 4 },
    shippingCost: 0,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Garantía 3 años Dell"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-014",
    supplierId: "prov-008",
    supplierName: "CompuMayor México",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.9,
    reviewCount: 423,
    productName: "Monitor Dell 27\" UltraSharp",
    productDescription: "Monitor IPS 27\", 4K UHD, USB-C, ajuste altura",
    productCategory: "tecnologia",
    unitPrice: 9200,
    currency: "USD",
    minQuantity: 1,
    availableStock: 58,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta", "Leasing"],
    conditions: ["Garantía 3 años", "Calibración incluida"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },
  {
    id: "sq-015",
    supplierId: "prov-015",
    supplierName: "DisplayTech Solutions",
    supplierCity: "Querétaro, QRO",
    supplierRating: 4.6,
    reviewCount: 98,
    productName: "Monitor Dell 27\" UltraSharp",
    productDescription: "Monitor IPS 27\", 4K UHD, USB-C, base ergonómica",
    productCategory: "tecnologia",
    unitPrice: 9050,
    currency: "USD",
    minQuantity: 3,
    availableStock: 24,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 200,
    freeShippingMinimum: 25000,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Mínimo 3 monitores", "Entrega mismo día"],
    verified: true,
    highlight: "delivery",
    sourceType: "web",
  },

  // Cables HDMI - Eléctricos
  {
    id: "sq-016",
    supplierId: "prov-016",
    supplierName: "CableMax Industrial",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.6,
    reviewCount: 234,
    productName: "Cable HDMI 2.1 Alta Velocidad 2m",
    productDescription: "Cable HDMI 2.1, 48Gbps, 8K@60Hz, 4K@120Hz, eARC",
    productCategory: "electricos",
    unitPrice: 185,
    currency: "USD",
    minQuantity: 10,
    availableStock: 1500,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 1000,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Mínimo 10 piezas", "Garantía 2 años"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-017",
    supplierId: "prov-017",
    supplierName: "Conectividad Total SA",
    supplierCity: "Ciudad de México",
    supplierRating: 4.8,
    reviewCount: 567,
    productName: "Cable HDMI 2.1 Premium 2m",
    productDescription: "Cable HDMI certificado, blindaje triple, conectores dorados",
    productCategory: "electricos",
    unitPrice: 220,
    currency: "USD",
    minQuantity: 5,
    availableStock: 800,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 0,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Garantía de por vida", "Certificación oficial"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },

  // Teclados - Tecnología
  {
    id: "sq-018",
    supplierId: "prov-018",
    supplierName: "Periféricos Pro MX",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.5,
    reviewCount: 189,
    productName: "Teclado Inalámbrico Logitech MX Keys",
    productDescription: "Teclado bluetooth multidispositivo, retroiluminado, recargable",
    productCategory: "tecnologia",
    unitPrice: 2450,
    currency: "USD",
    minQuantity: 1,
    availableStock: 75,
    unit: "pieza",
    deliveryDays: { min: 2, max: 3 },
    shippingCost: 0,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Garantía 2 años Logitech"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-019",
    supplierId: "prov-008",
    supplierName: "CompuMayor México",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.9,
    reviewCount: 423,
    productName: "Teclado Inalámbrico Logitech MX Keys",
    productDescription: "Teclado bluetooth multidispositivo, retroiluminado, recargable",
    productCategory: "tecnologia",
    unitPrice: 2580,
    currency: "USD",
    minQuantity: 1,
    availableStock: 120,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta", "Leasing"],
    conditions: ["Garantía extendida 3 años", "Configuración incluida"],
    verified: true,
    highlight: "delivery",
    sourceType: "web",
  },

  // Químicos - Limpieza industrial
  {
    id: "sq-020",
    supplierId: "prov-004",
    supplierName: "Químicos Industriales del Bajío",
    supplierCity: "León, GTO",
    supplierRating: 4.4,
    reviewCount: 156,
    productName: "Desengrasante Industrial 20L",
    productDescription: "Desengrasante biodegradable concentrado, uso industrial",
    productCategory: "quimicos",
    unitPrice: 650,
    currency: "USD",
    minQuantity: 5,
    availableStock: 200,
    unit: "cubeta",
    deliveryDays: { min: 2, max: 4 },
    shippingCost: 300,
    freeShippingMinimum: 5000,
    paymentTerms: ["Crédito 30 días", "Transferencia"],
    conditions: ["Ficha técnica incluida", "Certificación ambiental"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-021",
    supplierId: "prov-019",
    supplierName: "QuimPro Industrial",
    supplierCity: "Querétaro, QRO",
    supplierRating: 4.7,
    reviewCount: 289,
    productName: "Desengrasante Industrial Premium 20L",
    productDescription: "Desengrasante de alto rendimiento, fórmula avanzada",
    productCategory: "quimicos",
    unitPrice: 780,
    currency: "USD",
    minQuantity: 3,
    availableStock: 150,
    unit: "cubeta",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 3000,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta"],
    conditions: ["Asesoría técnica gratuita", "Muestras disponibles"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },

  // Productos de limpieza
  {
    id: "sq-022",
    supplierId: "prov-020",
    supplierName: "Limpieza Total Empresarial",
    supplierCity: "Ciudad de México",
    supplierRating: 4.3,
    reviewCount: 345,
    productName: "Kit Limpieza Oficina Completo",
    productDescription: "Incluye: 10 multiusos, 10 limpiavidrios, 20 microfibras, cubeta",
    productCategory: "limpieza",
    unitPrice: 1250,
    currency: "USD",
    minQuantity: 1,
    availableStock: 500,
    unit: "kit",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Productos certificados", "Envío gratis"],
    verified: true,
    highlight: "delivery",
    sourceType: "local",
  },
  {
    id: "sq-023",
    supplierId: "prov-021",
    supplierName: "Distribuidora Higiene Pro",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.6,
    reviewCount: 234,
    productName: "Kit Limpieza Oficina Premium",
    productDescription: "Kit profesional con productos eco-friendly y dispensadores",
    productCategory: "limpieza",
    unitPrice: 1580,
    currency: "USD",
    minQuantity: 1,
    availableStock: 200,
    unit: "kit",
    deliveryDays: { min: 2, max: 3 },
    shippingCost: 150,
    freeShippingMinimum: 2000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Productos biodegradables", "Capacitación incluida"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },

  // Equipos de seguridad
  {
    id: "sq-024",
    supplierId: "prov-022",
    supplierName: "Seguridad Industrial MX",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.8,
    reviewCount: 412,
    productName: "Casco de Seguridad Industrial",
    productDescription: "Casco tipo I, clase E, con suspensión de 4 puntos",
    productCategory: "seguridad",
    unitPrice: 185,
    currency: "USD",
    minQuantity: 10,
    availableStock: 2000,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 1500,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Certificación ANSI", "Personalización disponible"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-025",
    supplierId: "prov-023",
    supplierName: "EPP Solutions",
    supplierCity: "Ciudad de México",
    supplierRating: 4.9,
    reviewCount: 567,
    productName: "Casco de Seguridad Premium",
    productDescription: "Casco ventilado con visor integrado y protección auditiva",
    productCategory: "seguridad",
    unitPrice: 350,
    currency: "USD",
    minQuantity: 5,
    availableStock: 800,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta"],
    conditions: ["Garantía 5 años", "Certificación internacional"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },

  // Guantes de seguridad
  {
    id: "sq-026",
    supplierId: "prov-022",
    supplierName: "Seguridad Industrial MX",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.8,
    reviewCount: 412,
    productName: "Guantes de Nitrilo Industriales",
    productDescription: "Guantes desechables nitrilo, caja de 100, sin polvo",
    productCategory: "seguridad",
    unitPrice: 380,
    currency: "USD",
    minQuantity: 5,
    availableStock: 5000,
    unit: "caja",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 2000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Certificación FDA", "Disponible en varios tamaños"],
    verified: true,
    highlight: "delivery",
    sourceType: "local",
  },

  // Escritorios - Mobiliario
  {
    id: "sq-027",
    supplierId: "prov-012",
    supplierName: "Muebles Ejecutivos MX",
    supplierCity: "Ciudad de México",
    supplierRating: 4.7,
    reviewCount: 289,
    productName: "Escritorio Ejecutivo 180cm",
    productDescription: "Escritorio en L con acabado nogal, pasacables integrado",
    productCategory: "mobiliario",
    unitPrice: 8500,
    currency: "USD",
    minQuantity: 1,
    availableStock: 25,
    unit: "pieza",
    deliveryDays: { min: 5, max: 7 },
    shippingCost: 500,
    freeShippingMinimum: 15000,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta", "MSI"],
    conditions: ["Armado incluido", "Garantía 3 años"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-028",
    supplierId: "prov-013",
    supplierName: "ErgoOffice Pro",
    supplierCity: "Monterrey, NL",
    supplierRating: 4.9,
    reviewCount: 412,
    productName: "Escritorio Ajustable Eléctrico",
    productDescription: "Escritorio sit-stand motorizado, memoria 4 posiciones",
    productCategory: "mobiliario",
    unitPrice: 12500,
    currency: "USD",
    minQuantity: 1,
    availableStock: 40,
    unit: "pieza",
    deliveryDays: { min: 3, max: 5 },
    shippingCost: 0,
    paymentTerms: ["Crédito 45 días", "Transferencia", "Tarjeta", "MSI", "Leasing"],
    conditions: ["Garantía 5 años motor", "Prueba 30 días"],
    verified: true,
    highlight: "rating",
    sourceType: "web",
  },

  // Tóner HP - Oficina
  {
    id: "sq-029",
    supplierId: "prov-003",
    supplierName: "Oficina Express",
    supplierCity: "Guadalajara, JAL",
    supplierRating: 4.4,
    reviewCount: 567,
    productName: "Tóner HP 58A Original",
    productDescription: "Cartucho de tóner negro original HP CF258A, 3000 páginas",
    productCategory: "oficina",
    unitPrice: 1650,
    currency: "USD",
    minQuantity: 2,
    availableStock: 150,
    unit: "pieza",
    deliveryDays: { min: 1, max: 2 },
    shippingCost: 0,
    freeShippingMinimum: 2000,
    paymentTerms: ["Transferencia", "Tarjeta"],
    conditions: ["Producto original HP", "Garantía HP"],
    verified: true,
    highlight: "price",
    sourceType: "local",
  },
  {
    id: "sq-030",
    supplierId: "prov-010",
    supplierName: "Papelería Corporativa SA",
    supplierCity: "Ciudad de México",
    supplierRating: 4.8,
    reviewCount: 234,
    productName: "Tóner HP 58X Alto Rendimiento",
    productDescription: "Cartucho de tóner negro HP CF258X, 10000 páginas",
    productCategory: "oficina",
    unitPrice: 2850,
    currency: "USD",
    minQuantity: 1,
    availableStock: 80,
    unit: "pieza",
    deliveryDays: { min: 1, max: 1 },
    shippingCost: 0,
    paymentTerms: ["Crédito 30 días", "Transferencia", "Tarjeta"],
    conditions: ["Envío express gratis", "Producto sellado"],
    verified: true,
    highlight: "delivery",
    sourceType: "web",
  },
];

// Sugerencias de búsqueda populares
export const searchSuggestions = [
  "tornillos M8",
  "laptops empresariales",
  "papel bond carta",
  "sillas de oficina",
  "monitores 27 pulgadas",
  "tóner HP",
  "cables HDMI",
  "teclados inalámbricos",
  "escritorios",
  "guantes nitrilo",
  "desengrasante",
  "cascos seguridad",
];

// Función de búsqueda de proveedores (simula llamada al backend)
export async function searchSupplierQuotes(
  query: string,
  filters: SearchFilters = {}
): Promise<SupplierQuote[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // Simular delay de API/búsqueda
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let results = supplierQuotes.filter((sq) =>
    sq.productName.toLowerCase().includes(q) ||
    sq.productDescription.toLowerCase().includes(q) ||
    sq.supplierName.toLowerCase().includes(q) ||
    sq.productCategory.toLowerCase().includes(q)
  );

  // Filtrar por tipo de fuente
  if (filters.sourceType && filters.sourceType !== "all") {
    results = results.filter((sq) => sq.sourceType === filters.sourceType);
  }

  // Filtrar por categoría
  if (filters.category && filters.category !== "all") {
    results = results.filter((sq) => sq.productCategory === filters.category);
  }

  // Filtrar por rating mínimo
  const minRating = filters.minRating;
  if (minRating && minRating > 0) {
    results = results.filter((sq) => sq.supplierRating >= minRating);
  }

  // Filtrar por días de entrega máximos
  const maxDeliveryDays = filters.maxDeliveryDays;
  if (maxDeliveryDays && maxDeliveryDays > 0) {
    results = results.filter((sq) => sq.deliveryDays.max <= maxDeliveryDays);
  }

  // Filtrar por precio máximo
  const maxPrice = filters.maxPrice;
  if (maxPrice && maxPrice > 0) {
    results = results.filter((sq) => sq.unitPrice <= maxPrice);
  }

  // Filtrar solo verificados
  if (filters.verifiedOnly) {
    results = results.filter((sq) => sq.verified);
  }

  // Filtrar solo con envío gratis
  if (filters.freeShippingOnly) {
    results = results.filter((sq) => sq.shippingCost === 0);
  }

  // Ordenar por rating y retornar máximo 6 para más resultados
  return results
    .sort((a, b) => b.supplierRating - a.supplierRating)
    .slice(0, 6);
}
