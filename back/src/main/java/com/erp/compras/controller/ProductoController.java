package com.erp.compras.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.erp.compras.model.Producto;
import com.erp.compras.service.IProductoService;

@RestController
public class ProductoController {

    @Autowired
    private IProductoService serv;

    @PostMapping("/productos/crear")
    public ResponseEntity<?> crear(@RequestBody Producto producto) {
        try {
            serv.saveProducto(producto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Producto creado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error " + e.getMessage());
        }
    }

    @GetMapping("/productos/traer")
    public ResponseEntity<?> traer() {
        List<Producto> lista = serv.getProductos();
        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay productos");
        }
        return ResponseEntity.ok(lista);
    }

}
