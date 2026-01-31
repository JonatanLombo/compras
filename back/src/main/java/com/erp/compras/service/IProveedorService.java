package com.erp.compras.service;

import java.util.List;
import com.erp.compras.model.Proveedor;

public interface IProveedorService {

    public void saveProveedor(Proveedor proveedor);

    public List<Proveedor> getProveedores();

    public Proveedor findProveedor(Long id);

}
