package com.erp.compras.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.erp.compras.model.Producto;
import com.erp.compras.repository.IProductoRepository;

@Service
public class ProductoServices implements IProductoService {

    @Autowired
    private IProductoRepository repo;

    @Override
    public void saveProducto(Producto producto) {
        repo.save(producto);
    }

    @Override
    public List<Producto> getProductos() {
        List<Producto> lista = repo.findAll();
        if (lista.isEmpty()) {
            return null;
        }
        return lista;
    }

    @Override
    public Producto findProducto(Long id) {
        return repo.findById(id).orElse(null);
    }

}
