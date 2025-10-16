from django.db import models
from clientes.models import Cliente
from distribuidores.models import Distribuidor
from productos.models import Producto


class Venta(models.Model):
    MEDIOS_PAGO = [
        ("nequi", "Nequi"),
        ("efectivo", "Efectivo"),
        ("transferencia", "Transferencia"),
    ]
    TIPOS_VENTA = [
        ("cliente", "Cliente Final"),
        ("distribuidor", "Distribuidor"),
    ]

    id_venta = models.AutoField(primary_key=True)
    tipo_venta = models.CharField(max_length=20, choices=TIPOS_VENTA, default="cliente")

    # Solo uno se usará dependiendo del tipo de venta
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, blank=True)
    distribuidor = models.ForeignKey(Distribuidor, on_delete=models.SET_NULL, null=True, blank=True)

    productos = models.ManyToManyField("productos.Producto", through="DetalleVenta")
    fecha_compra = models.DateField()
    fecha_vencimiento = models.DateField()
    medio_pago = models.CharField(max_length=50, choices=MEDIOS_PAGO)
    nota = models.TextField(blank=True, null=True)

    # 🔹 Totales calculados dinámicamente
    @property
    def costo_total(self):
        return sum(detalle.costo_total for detalle in self.detalleventa_set.all())

    @property
    def precio_total(self):
        return sum(detalle.precio_total for detalle in self.detalleventa_set.all())

    def save(self, *args, **kwargs):
        # Validación: coherencia entre tipo_venta y campos relacionados
        if self.tipo_venta == "cliente" and not self.cliente:
            raise ValueError("Debe seleccionar un cliente si la venta es de tipo 'cliente'")
        if self.tipo_venta == "distribuidor" and not self.distribuidor:
            raise ValueError("Debe seleccionar un distribuidor si la venta es de tipo 'distribuidor'")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Venta #{self.id_venta} - {self.get_tipo_venta_display()}"


class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    costo_unitario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    @property
    def costo_total(self):
        return (self.costo_unitario or 0) * self.cantidad

    @property
    def precio_total(self):
        return (self.precio_unitario or 0) * self.cantidad

    def save(self, *args, **kwargs):
        # Si no se asignó precio_unitario, lo toma del producto según tipo de venta
        if not self.precio_unitario:
            if self.venta.tipo_venta == "cliente":
                self.precio_unitario = self.producto.precio_cliente
            elif self.venta.tipo_venta == "distribuidor":
                self.precio_unitario = self.producto.precio_distribuidor

        # Si no se asignó costo_unitario, lo toma del producto
        if not self.costo_unitario:
            self.costo_unitario = self.producto.costo

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.producto.nombre} x{self.cantidad} (Venta {self.venta.id_venta})"
