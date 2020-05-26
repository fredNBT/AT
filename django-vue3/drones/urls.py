from django.urls import path


from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('Alarms', views.AlarmsDetails, name='Alarms'),
    path('<int:id>/', views.detail, name='detail'),
    path('private', views.private, name='private'),
    path('PublishMQTT', views.PublishMQTT, name='PublishMQTT'),
    path('Console', views.Console, name='Console'),
    path('DroneGPS', views.DroneGPS, name='DroneGPS'),
    path('AlarmState', views.AlarmState, name='AlarmState'),
    path('ClearAllAlarms', views.ClearAllAlarms, name='ClearAllAlarms'),
]