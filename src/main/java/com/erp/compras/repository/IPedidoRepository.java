package com.erp.compras.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.erp.compras.model.Pedido;

@Repository
public interface IPedidoRepository extends JpaRepository<Pedido, Long> {

}
