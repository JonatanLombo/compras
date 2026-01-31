package com.erp.compras.service;

import java.util.List;
import com.erp.compras.model.ProveedorProducto;

public interface IProveedorProductoService {

    public List<ProveedorProducto> buscarCatalogo(String nombreProducto);

}
