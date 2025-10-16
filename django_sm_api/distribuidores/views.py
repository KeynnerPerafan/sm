from rest_framework import viewsets
from .models import Distribuidor
from .serializer import DistribuidorSerializer

# Create your views here.

class DistribuidorViewSet(viewsets.ModelViewSet):
    queryset = Distribuidor.objects.all()
    serializer_class = DistribuidorSerializer
