from rest_framework import serializers
from .models import Drone

class DroneSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drone
        fields = ('id', 'Name', 'Description','LastOrder','LastOrderTime')