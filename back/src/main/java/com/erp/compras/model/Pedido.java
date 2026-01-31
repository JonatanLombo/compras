package com.erp.compras.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad JPA que representa un pedido dentro del sistema.
 *
 * <p>
 * Define la información asociada a una orden de compra realizada para
 * un producto específico, incluyendo cantidad solicitada, fecha del
 * pedido y estado del proceso de compra.
 * </p>
 *
 * <p>
 * Esta entidad se encuentra mapeada a una tabla de base de datos y es
 * administrada por el contexto de persistencia de JPA.
 * </p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "pedidos")
public class Pedido {

    /**
     * Identificador único del pedido.
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
     * Cantidad solicitada del producto en el pedido.
     *
     * <p>
     * Representa el número de unidades requeridas dentro de la orden
     * de compra.
     * </p>
     *
     * <p>
     * Es un campo obligatorio dentro del sistema.
     * </p>
     */
    @NotNull(message = "La cantidad no puede estar vacio")
    @PositiveOrZero(message = "El valor asignado puede positivo o cero")
    private Integer cantidad;

    /**
     * Fecha de registro del pedido.
     *
     * <p>
     * Indica el día en que se creó o registró la orden de compra
     * dentro del sistema.
     * </p>
     */
    @NotNull(message = "La fecha de inicio es obligatoria")
    @FutureOrPresent(message = "La fecha de inicio debe ser futura o presente")
    private LocalDate fecha;

    /**
     * Estado actual del pedido.
     *
     * <p>
     * Define la etapa del flujo de compra en la que se encuentra el
     * pedido.
     * </p>
     *
     * <p>
     * Ejemplos de estados posibles:
     * <ul>
     * <li>CREADO</li>
     * <li>APROBADO</li>
     * <li>COMPRADO</li>
     * </ul>
     * </p>
     */
    private String estado;

    /**
     * Producto asociado al pedido.
     *
     * <p>
     * Representa la relación muchos a uno con {@link Producto}, donde
     * múltiples pedidos pueden estar asociados a un mismo producto.
     * </p>
     *
     * <p>
     * La relación es obligatoria y se encuentra mapeada mediante la
     * columna <b>producto_id</b> en la base de datos.
     * </p>
     */
    @ManyToOne
    @JoinColumn(name = "proveedor_producto_id", nullable = false)
    private ProveedorProducto proveedorProducto;

}
