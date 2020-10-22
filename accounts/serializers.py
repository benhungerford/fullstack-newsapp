from rest_auth.models import TokenModel
from rest_framework import serializers

class TokenSerializer(serializers.ModelSerializer):
    is_staff = serializers.ReadOnlyField(source='user.is_staff')
    class Meta:
        model = TokenModel
        fields = ('key', 'is_staff',)
