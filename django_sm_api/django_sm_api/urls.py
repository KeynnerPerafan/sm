from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usuarios.views import ProfileView, RolViewSet, UsuarioViewSet
from clientes.views import ClienteViewSet
from distribuidores.views import DistribuidorViewSet
from productos.views import ProductoViewSet
from ventas.views import VentaViewSet, VentaDetalleViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from usuarios.tokens import MyTokenObtainPairView  # 👈 tu nueva vista personalizada

# Configurar router principal
router = DefaultRouter()
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'distribuidores', DistribuidorViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'ventas', VentaViewSet)
router.register(r'venta-detaller', VentaDetalleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔑 Login JWT personalizado con rol
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # 🔗 Rutas de tus apps
    path('api/', include(router.urls)),
    path('api/usuarios/', include('usuarios.urls')),
    path('api/ventas/', include('ventas.urls')),

    # 👤 Perfil de usuario autenticado
    path('api/profile/', ProfileView.as_view(), name='profile'),
]
