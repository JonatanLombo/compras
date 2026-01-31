package com.erp.compras.service;

import java.util.List;
import com.erp.compras.model.Pedido;

public interface IPedidoService {

    public void crearPedido(Long proveedorProductoId, Integer cantidad);

    public List<Pedido> getPedidos();

}
