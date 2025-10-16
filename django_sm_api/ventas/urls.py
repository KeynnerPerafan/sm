from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='ventas_index'),  # Ruta de prueba
]