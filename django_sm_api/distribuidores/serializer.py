from rest_framework import serializers
from .models import Distribuidor
from usuarios.models import Usuario
from usuarios.serializer import UsuarioSerializer

class DistribuidorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only = True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset = Usuario.objects.all(), source = 'usuario', write_only = True
    )
    
    
    class Meta:
        model = Distribuidor
        fields = '__all__'