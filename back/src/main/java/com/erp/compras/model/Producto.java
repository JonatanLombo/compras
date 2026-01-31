package com.erp.compras.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad JPA que representa un producto dentro del sistema.
 *
 * <p>
 * Define los atributos persistentes de un producto y aplica validaciones
 * mediante anotaciones de Jakarta Validation para garantizar la integridad
 * de los datos en operaciones de creación.
 * </p>
 *
 * <p>
 * Esta clase se encuentra mapeada a una tabla de base de datos y
 * es administrada por el contexto de persistencia de JPA.
 * </p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "productos")
public class Producto {

    /**
     * Identificador único del producto.
     *
     * <p>
     * Generado automáticamente mediante la estrategia
     * {@link GenerationType#IDENTITY} al persistir la entidad.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre producto.
     *
     * <p>
     * No puede estar vacío y es requerido para el registro.
     * </p>
     * <p>
     * No puede superar los 40 caracteres.
     * </p>
     */
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 40, message = "El nombre no puede superar los 40 caracteres")
    private String nombre;

    /**
     * Descripción de producto.
     *
     * <p>
     * No puede estar vacío y es requerido para ampliar información de producto.
     * </p>
     * <p>
     * No puede superar los 200 caracteres.
     * </p>
     */
    @NotBlank(message = "Realiza una breve descripción del producto")
    @Size(max = 500, message = "El nombre no puede superar los 500 caracteres")
    private String descripcion;

    /**
     * Codigo interno.
     *
     * <p>
     * Número de referencia para su venta.
     * </p>
     * <p>
     * No puede superar los 20 caracteres.
     * </p>
     */
    @NotBlank(message = "Realiza una breve descripción del producto")
    @Size(max = 20, message = "El nombre no puede superar los 20 caracteres")
    private String codigoInterno;

    /**
     * Proveedores asociados al producto.
     *
     * <p>
     * Representa la relación uno a muchos entre {@link Producto} y
     * {@link ProveedorProducto}. Un producto puede estar disponible
     * en múltiples proveedores dentro del sistema.
     * </p>
     *
     * <p>
     * La relación es bidireccional y está controlada por el atributo
     * producto en {@link ProveedorProducto}.
     * </p>
     */
    @OneToMany(mappedBy = "producto")
    private List<ProveedorProducto> proveedores;

}
