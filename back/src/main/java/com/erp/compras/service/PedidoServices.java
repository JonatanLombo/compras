package com.erp.compras.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.erp.compras.model.Pedido;
import com.erp.compras.model.ProveedorProducto;
import com.erp.compras.repository.IPedidoRepository;
import com.erp.compras.repository.IProveedorProductoRepository;

@Service
public class PedidoServices implements IPedidoService {

    @Autowired
    private IPedidoRepository pedidoRepo;

    @Autowired
    private IProveedorProductoRepository proveedorProductoRepo;

    @Override
    public void crearPedido(Long proveedorProductoId, Integer cantidad) {

        ProveedorProducto provp = proveedorProductoRepo.findById(proveedorProductoId)
                .orElse(null);

        if (provp == null) {
            throw new RuntimeException("Catalogo no encontrado");
        }

        Pedido pedido = new Pedido();
        pedido.setCantidad(cantidad);
        pedido.setFecha(LocalDate.now());
        pedido.setEstado("CREADO");
        pedido.setProveedorProducto(provp);

        pedidoRepo.save(pedido);
    }

    @Override
    public List<Pedido> getPedidos() {
        List<Pedido> lista = pedidoRepo.findAll();
        if (lista.isEmpty()) {
            return null;
        }
        return lista;
    }

}
