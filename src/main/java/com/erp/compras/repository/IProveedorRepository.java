package com.erp.compras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.erp.compras.model.Proveedor;

@Repository
public interface IProveedorRepository extends JpaRepository<Proveedor, Long> {

}
