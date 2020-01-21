from django.http import HttpResponse
from .models import Drone
from .models import Logs
from django.http import JsonResponse
from django.core import serializers
from rest_framework.decorators import api_view
from .serializers import DroneSerializers
from .serializers import LogsSerializers
import json
import paho.mqtt.client as mqtt #import the client1
import datetime



def index(request):
    qs = Drone.objects.all()
    serializer = DroneSerializers(qs, many=True)
    return JsonResponse(serializer.data, safe=False)
    #return HttpResponse(json.dumps(qs[0]))


def Console(request):
    print(request)
    Drone = request.GET.get('Drone', '5')
    qs = Logs.objects.all().filter(Drone_id=1)
    Logserializer = LogsSerializers(qs, many=True)
    return JsonResponse(Logserializer.data, safe=False)

def detail(request, id):
    return HttpResponse(qs[1].Name)


@api_view(['GET'])
def private(request):
    qs = Drone.objects.values()
    print("QS",qs[0])
    return HttpResponse(json.dumps(qs[0]))


#@api_view(['GET'])
def PublishMQTT(request):
    print(request)
    Topic = request.GET.get('Topic', '')
    Msg = request.GET.get('Msg', '')
    client.publish(Topic,Msg, qos=1)
    print(Topic, Msg)
    print("PublishMQTT")
    now = datetime.datetime.now()
    DroneID =  Topic
    p = Logs(Msg= Msg, Drone_id= DroneID, Origin = "Web", MsgTime = now )
    p.save()
    print('got message')
    return HttpResponse("Published Mqtt")

    ############
def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)
    if message.topic == "Alarm1":
        print("Alarm1")
        client.publish("1","Alarm1")
    if message.topic == "Alarm2":
        print("Alarm2")
        client.publish("1","Alarm2")
    if message.topic == "Alarm3":
        print("Alarm3")
        client.publish("1","Alarm3")
    
  
########################################

broker_address="78.47.164.96"
#broker_address="iot.eclipse.org"
print("creating new instance")
client = mqtt.Client("P1") #create new instance
client.on_message=on_message #attach function to callback
print("connecting to broker")
client.connect(broker_address) #connect to broker
client.loop_start() #start the loop
print("Subscribing to topic","#")
client.subscribe("#")
print("Publishing message to topic","Alarm1")
client.publish("Alarm11","Message sent to test topic")