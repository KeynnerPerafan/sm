from django.db import models

# Create your models here.

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    precio_cliente = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    precio_distribuidor = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    duracion_dias = models.IntegerField()

    def __str__(self):
        return self.nombre
