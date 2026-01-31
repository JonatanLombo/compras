package com.erp.compras.model;

import java.math.BigDecimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad JPA que representa la relación entre proveedores y productos
 * dentro del sistema.
 *
 * <p>
 * Permite asociar un proveedor con un producto específico junto con
 * información comercial relevante como precio, stock disponible y
 * tiempos estimados de entrega.
 * </p>
 *
 * <p>
 * Esta entidad actúa como tabla intermedia en la relación muchos a muchos
 * entre {@link Proveedor} y {@link Producto}, permitiendo almacenar
 * atributos adicionales propios de la relación comercial.
 * </p>
 *
 * <p>
 * La clase se encuentra mapeada a la tabla <b>proveedor_producto</b> y es
 * administrada por el contexto de persistencia de JPA.
 * </p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "proveedor_producto")
public class ProveedorProducto {

    /**
     * Identificador único del registro proveedor-producto.
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
     * Precio del producto ofrecido por el proveedor.
     *
     * <p>
     * Representa el valor comercial definido por el proveedor para el
     * producto asociado.
     * </p>
     */
    @NotNull(message = "El precio no puede estar vacio")
    @Positive(message = "El valor asignado debe ser positivo superior a cero")
    private BigDecimal precio;

    /**
     * Cantidad disponible del producto en inventario.
     *
     * <p>
     * Indica el stock actual que el proveedor tiene disponible para
     * el producto asociado.
     * </p>
     */
    @NotNull(message = "El precio no puede estar vacio")
    @Positive(message = "El valor asignado debe ser positivo superior a cero")
    private Integer stock;

    /**
     * Tiempo estimado de entrega del producto.
     *
     * <p>
     * Expresado en días calendario según las condiciones logísticas
     * definidas por el proveedor.
     * </p>
     */
    @NotNull(message = "El precio no puede estar vacio")
    @PositiveOrZero(message = "El valor asignado puede positivo o cero")
    private Integer diasEntrega;

    /**
     * Ubicación del producto.
     *
     * <p>
     * Indica el lugar o punto de partida el producto
     * </p>
     */
    @NotBlank(message = "La ubicación es obligatoria")
    @Size(max = 40, message = "La ubicación no puede superar 10 caracteres")
    private String ubicacion;

    /**
     * Indicación de procedencia de proveedor.
     *
     * <p>
     * Indica si el proveedor es local o web
     * </p>
     */
    @NotBlank(message = "La procedencia es obligatoria")
    @Size(max = 10, message = "La procedencia no puede superar 10 caracteres")
    private String procedencia;

    /**
     * Proveedor asociado a la relación comercial.
     *
     * <p>
     * Representa la relación muchos a uno con {@link Proveedor}, donde
     * múltiples registros de {@link ProveedorProducto} pueden estar
     * asociados a un mismo proveedor.
     * </p>
     *
     * <p>
     * La relación es obligatoria y se encuentra mapeada mediante la
     * columna <b>proveedor_id</b> en la base de datos.
     * </p>
     */
    @ManyToOne
    @JoinColumn(name = "proveedor_id", nullable = false)
    private Proveedor proveedor;

    /**
     * Producto asociado a la relación comercial.
     *
     * <p>
     * Representa la relación muchos a uno con {@link Producto}, donde
     * múltiples registros de {@link ProveedorProducto} pueden estar
     * asociados a un mismo producto.
     * </p>
     *
     * <p>
     * La relación es obligatoria y se encuentra mapeada mediante la
     * columna <b>producto_id</b> en la base de datos.
     * </p>
     */
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

}
