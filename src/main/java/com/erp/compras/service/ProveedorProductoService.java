package com.erp.compras.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.erp.compras.model.ProveedorProducto;
import com.erp.compras.repository.IProveedorProductoRepository;

@Service
public class ProveedorProductoService implements IProveedorProductoService {

    @Autowired
    private IProveedorProductoRepository repo;

    @Override
    public List<ProveedorProducto> buscarCatalogo(String nombreProducto) {
        List<ProveedorProducto> lista = repo.findByProductoNombreContainingIgnoreCase(nombreProducto);

        if (lista.isEmpty()) {
            return null;
        }
        return lista;
    }

}
