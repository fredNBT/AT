from rest_framework import serializers
from .models import Drone
from .models import Logs

class DroneSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drone
        fields = ('id', 'Name', 'Description','LastOrder','LastOrderTime')
        #fields = '__all__'
class LogsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Logs
        fields = ('id', 'Msg', 'Origin','Drone_id','MsgTime')
        #fields = '__all__'
