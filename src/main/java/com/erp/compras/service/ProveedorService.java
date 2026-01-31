package com.erp.compras.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.erp.compras.model.Proveedor;
import com.erp.compras.repository.IProveedorRepository;

@Service
public class ProveedorService implements IProveedorService {

    @Autowired
    private IProveedorRepository repo;

    @Override
    public void saveProveedor(Proveedor proveedor) {
        repo.save(proveedor);
    }

    @Override
    public List<Proveedor> getProveedores() {
        List<Proveedor> lista = repo.findAll();
        if (lista.isEmpty()) {
            return null;
        }
        return lista;
    }

    @Override
    public Proveedor findProveedor(Long id) {
        return repo.findById(id).orElse(null);
    }

}
