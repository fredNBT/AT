from rest_framework import serializers
from .models import Drone
from .models import Logs
from .models import Alarms

class DroneSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drone
        fields = ('id', 'Name', 'Description','LastOrder','Region','Lat','Lon')

class AlarmsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Alarms
        fields = ('id', 'Alarm_Name', 'Alarm_Type','Lat','Long')
     
class LogsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Logs
        fields = ('id', 'Msg', 'Origin','Drone_id','MsgTime')
        
