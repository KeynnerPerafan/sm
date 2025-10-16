from rest_framework import serializers
from .models import Cliente
from usuarios.serializer import UsuarioSerializer
from usuarios.models import Usuario

class ClienteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only = True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset = Usuario.objects.all(), source = 'usuario', write_only = True
    )
    
    class Meta:
        model = Cliente
        fields = '__all__'