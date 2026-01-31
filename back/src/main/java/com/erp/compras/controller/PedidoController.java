package com.erp.compras.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.erp.compras.model.Pedido;
import com.erp.compras.service.IPedidoService;

@RestController
public class PedidoController {

    @Autowired
    private IPedidoService serv;

    @PostMapping("/pedidos/crear")
    public ResponseEntity<?> crear(
            @RequestParam Long proveedorProductoId,
            @RequestParam Integer cantidad) {

        try {
            serv.crearPedido(proveedorProductoId, cantidad);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Pedido creado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error " + e.getMessage());
        }
    }

    @GetMapping("/pedidos/traer")
    public ResponseEntity<?> traer() {

        List<Pedido> lista = serv.getPedidos();

        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay pedidos");
        }

        return ResponseEntity.ok(lista);
    }

}
