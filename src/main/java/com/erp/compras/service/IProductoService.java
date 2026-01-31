package com.erp.compras.service;

import java.util.List;
import com.erp.compras.model.Producto;

public interface IProductoService {

    public void saveProducto(Producto producto);

    public List<Producto> getProductos();

    public Producto findProducto(Long id);

}
