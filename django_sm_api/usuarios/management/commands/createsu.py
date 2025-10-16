from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Crea un superusuario automáticamente si no existe'

    def handle(self, *args, **kwargs):
        username = 'admin'
        email = 'admin@sm.com'
        password = 'admin123'

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS('✅ Superusuario creado correctamente'))
        else:
            self.stdout.write(self.style.WARNING('⚠️ El superusuario ya existe'))