from rest_framework import serializers
from .models import Venta, DetalleVenta
from datetime import timedelta


class VentaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleVenta
        fields = ['producto', 'costo', 'precio_vendido']


class VentaSerializer(serializers.ModelSerializer):
    # Para enviar varios detalles en la creación
    detalles = VentaDetalleSerializer(many=True, write_only=True)
    # Para mostrar detalles ya creados al consultar
    detalles_info = VentaDetalleSerializer(source="detalleventa_set", many=True, read_only=True)

    class Meta:
        model = Venta
        fields = '__all__'

    def validate(self, data):
        """
        Validaciones personalizadas según el tipo de venta.
        """
        tipo = data.get("tipo_venta")
        cliente = data.get("cliente_final")
        distribuidor = data.get("distribuidor")

        if tipo == "cliente":
            if not cliente:
                raise serializers.ValidationError("Debe seleccionar un cliente final.")
            if distribuidor:
                raise serializers.ValidationError("No puede asignar un distribuidor en una venta a cliente final.")

        elif tipo == "distribuidor":
            if not distribuidor:
                raise serializers.ValidationError("Debe seleccionar un distribuidor.")
            if cliente:
                raise serializers.ValidationError("No puede asignar un cliente final en una venta a distribuidor.")

        return data

    def create(self, validated_data):
        """
        Crea la venta con múltiples detalles:
        - Suma costos y precios
        - Calcula fecha_vencimiento usando la mayor duración
        """
        detalles_data = validated_data.pop("detalles", [])

        if not detalles_data:
            raise serializers.ValidationError("Debe agregar al menos un producto en la venta.")

        venta = Venta.objects.create(**validated_data)

        costo_total = 0
        precio_total = 0
        duracion_max = 0

        for detalle in detalles_data:
            producto = detalle["producto"]

            # Si no mandan costo o precio, usar los del producto
            costo = detalle.get("costo") or producto.costo
            precio = detalle.get("precio_vendido") or producto.precio_final

            # Acumular totales
            costo_total += costo
            precio_total += precio

            # Calcular la mayor duración
            if producto.duracion_dias and producto.duracion_dias > duracion_max:
                duracion_max = producto.duracion_dias

            # Crear el detalle de la venta
            DetalleVenta.objects.create(
                venta=venta,
                producto=producto,
                costo=costo,
                precio_vendido=precio
            )

        # Guardar totales en la venta
        venta.costo_total = costo_total
        venta.precio_total = precio_total

        # Calcular fecha vencimiento con la duración máxima encontrada
        if venta.fecha_compra and duracion_max > 0:
            venta.fecha_vencimiento = venta.fecha_compra + timedelta(days=duracion_max)

        venta.save()
        return venta
