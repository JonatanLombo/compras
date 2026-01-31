package com.erp.compras.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.erp.compras.model.ProveedorProducto;

@Repository
public interface IProveedorProductoRepository extends JpaRepository<ProveedorProducto, Long> {

    List<ProveedorProducto> findByProductoNombreContainingIgnoreCase(String nombre);

}
