from django.urls import path


from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>/', views.detail, name='detail'),
    path('private', views.private, name='private'),
    path('PublishMQTT', views.PublishMQTT, name='PublishMQTT'),
    path('Console', views.Console, name='Console'),

]