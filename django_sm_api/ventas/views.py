from django.http import JsonResponse
from rest_framework import viewsets
from .models import Venta, DetalleVenta
from .serializer import VentaSerializer, VentaDetalleSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer


class VentaDetalleViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    serializer_class = VentaDetalleSerializer
    

def index(request):
    return JsonResponse({"message": "Ventas API funcionando correctamente"})