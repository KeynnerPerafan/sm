from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.

class Rol(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre

class Usuario(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    telefono1 = models.CharField(max_length=15, blank=True, null=True)
    telefono2 = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True)
    fecha_registro = models.DateField(auto_now_add=True, null=True, blank=True)

    # Relación con tabla de roles
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null= True, blank=True)

    def __str__(self):
        return self.username