from django.db import models

class Drone(models.Model):
    Name        = models.TextField()
    Description = models.TextField()
    LastOrder = models.TextField()
    Region = models.TextField()

class Logs(models.Model):
    id = models.IntegerField(primary_key=True)
    Drone = models.ForeignKey(Drone, on_delete=models.CASCADE,)
    Origin = models.TextField(null=True)
    Msg = models.TextField(null=True)
    MsgTime = models.DateTimeField(default=None)


class Alarms(models.Model):
    id = models.IntegerField(primary_key=True)
    Alarm_Name = models.TextField(null=True)
    Alarm_Type = models.TextField(null=True)
    Lat = models.TextField(null=True)
    Long = models.TextField(null=True)


class Alarm_Logs(models.Model):
    id = models.IntegerField(primary_key=True)
    Alarm_id = models.ForeignKey(Alarms, on_delete=models.CASCADE,)
    Alarm_Code = models.IntegerField(null = True)
    Alarm_Time = models.DateTimeField(default=None)

