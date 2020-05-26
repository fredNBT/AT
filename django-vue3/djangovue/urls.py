from django.conf.urls import url
from catalog import views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    url(r'^api/public/', views.public),
    url(r'^api/private/', views.private),
    path('drones/', include('drones.urls')),
]