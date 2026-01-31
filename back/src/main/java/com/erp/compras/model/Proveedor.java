package com.erp.compras.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entidad JPA que representa un proveedor dentro del sistema.
 *
 * <p>
 * Define los atributos persistentes de un proveedor y aplica validaciones
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
@Table(name = "proveedores")
public class Proveedor {

    /**
     * Identificador único del proveedor.
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
     * Nit proveedor.
     *
     * <p>
     * No puede estar vacío y es requerido para el registro de la entidad.
     * </p>
     * <p>
     * No puede superar los 40 caracteres.
     * </p>
     */
    @NotBlank(message = "El nit es obligatorio")
    @Size(max = 20, message = "El nit no puede superar los 20 caracteres")
    private String nit;

    /**
     * Nombre proveedor.
     *
     * <p>
     * No puede estar vacío y es requerido para el registro de la entidad.
     * </p>
     * <p>
     * No puede superar los 40 caracteres.
     * </p>
     */
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 40, message = "El nombre no puede superar los 40 caracteres")
    private String nombre;

    /**
     * Número de telefono de la empresa.
     *
     * <p>
     * Campo obligatorio dentro del sistema.
     * </p>
     */
    @NotBlank(message = "El número de telefono es obligatorio")
    @Size(max = 20, message = "El número no puede superar los 20 caracteres")
    private String numero;

    /**
     * Email de la empresa.
     *
     * <p>
     * Campo obligatorio dentro del sistema.
     * </p>
     */
    @Email
    @NotBlank(message = "El email es obligatorio")
    @Size(max = 30, message = "El email no puede superar los 30 caracteres")
    private String email;

    /**
     * Productos asociados al proveedor.
     *
     * <p>
     * Representa la relación uno a muchos entre {@link Proveedor} y
     * {@link ProveedorProducto}. Un proveedor puede tener múltiples
     * productos disponibles en el catálogo.
     * </p>
     *
     * <p>
     * La relación es bidireccional y está controlada por el atributo
     * proveedor en {@link ProveedorProducto}.
     * </p>
     */
    @OneToMany(mappedBy = "proveedor")
    private List<ProveedorProducto> productos;

}
