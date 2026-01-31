package com.erp.compras.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.erp.compras.model.Proveedor;
import com.erp.compras.service.IProveedorService;

@RestController
public class ProveedorController {

    @Autowired
    private IProveedorService serv;

    @PostMapping("/proveedores/crear")
    public ResponseEntity<?> crear(@RequestBody Proveedor proveedor) {
        try {
            serv.saveProveedor(proveedor);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Proveedor creado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error " + e.getMessage());
        }
    }

    @GetMapping("/proveedores/traer")
    public ResponseEntity<?> traer() {
        List<Proveedor> lista = serv.getProveedores();
        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay proveedores");
        }
        return ResponseEntity.ok(lista);
    }

}
