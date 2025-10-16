from django.db import models
from usuarios.models import Usuario

# Create your models here.

class Distribuidor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre_negocio = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_negocio
