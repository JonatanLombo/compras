import { createStore, createTypedHooks } from "easy-peasy";
import { authModel, AuthModel } from "./models/auth.model";
import { proveedoresModel, ProveedoresModel } from "./models/proveedores.model";
import { productosModel, ProductosModel } from "./models/productos.model";
import { ordenesModel, OrdenesModel } from "./models/ordenes.model";
import { cotizacionesModel, CotizacionesModel } from "./models/cotizaciones.model";

// Store model interface
export interface StoreModel {
  auth: AuthModel;
  proveedores: ProveedoresModel;
  productos: ProductosModel;
  ordenes: OrdenesModel;
  cotizaciones: CotizacionesModel;
}

// Create store
const storeModel: StoreModel = {
  auth: authModel,
  proveedores: proveedoresModel,
  productos: productosModel,
  ordenes: ordenesModel,
  cotizaciones: cotizacionesModel,
};

export const store = createStore(storeModel);

// Typed hooks
const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
export const useStoreDispatch = typedHooks.useStoreDispatch;

// Re-export models
export * from "./models/auth.model";
export * from "./models/proveedores.model";
export * from "./models/productos.model";
export * from "./models/ordenes.model";
export * from "./models/cotizaciones.model";
