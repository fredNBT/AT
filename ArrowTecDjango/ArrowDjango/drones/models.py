from django.db import models

class Drone(models.Model):
    Name        = models.TextField()
    Description = models.TextField()
    LastOrder = models.TextField()
    LastOrderTime = models.TextField()

# Create your models here.
