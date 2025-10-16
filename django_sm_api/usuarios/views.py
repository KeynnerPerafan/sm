from rest_framework import viewsets
from .models import Rol, Usuario
from .serializer import RolSerializer, UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .tokens import MyTokenObtainPairSerializer

# Create your views here.

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
def index(request):
    return JsonResponse({"message": "Usuarios API funcionando correctamente"})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer