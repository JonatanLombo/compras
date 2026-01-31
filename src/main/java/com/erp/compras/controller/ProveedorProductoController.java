package com.erp.compras.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.erp.compras.model.ProveedorProducto;
import com.erp.compras.service.IProveedorProductoService;

@RestController
public class ProveedorProductoController {

    @Autowired
    private IProveedorProductoService serv;

    @GetMapping("/catalogo/buscar")
    public ResponseEntity<?> buscar(@RequestParam String nombre) {

        List<ProveedorProducto> lista = serv.buscarCatalogo(nombre);

        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontraron productos");
        }

        return ResponseEntity.ok(lista);
    }

}
