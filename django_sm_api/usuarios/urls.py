from django.urls import path
from . import views
from .views import MyTokenObtainPairView, register_user, create_admin
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .tokens import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path("create-admin/", create_admin),
    path('', views.index, name='usuarios_index'),  # Ruta de prueba
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user)
]

