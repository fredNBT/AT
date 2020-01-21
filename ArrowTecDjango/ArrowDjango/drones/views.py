from django.http import HttpResponse
from django.shortcuts import render
from .models import Drone
from .serializers import DroneSerializers
from rest_framework import viewsets

# Create your views here.

class DroneView(viewsets.ModelViewSet):
    queryset = Drone.objects.all()
    serializer_class = DroneSerializers


