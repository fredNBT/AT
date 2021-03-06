# Generated by Django 3.0.2 on 2020-01-16 12:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alarms',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('Alarm_Name', models.TextField(null=True)),
                ('Alarm_Type', models.TextField(null=True)),
                ('Lat', models.TextField(null=True)),
                ('Long', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Drone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.TextField()),
                ('Description', models.TextField()),
                ('LastOrder', models.TextField()),
                ('LastOrderTime', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('Origin', models.TextField(null=True)),
                ('Msg', models.TextField(null=True)),
                ('MsgTime', models.DateTimeField(default=None)),
                ('Drone_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drones.Drone')),
            ],
        ),
        migrations.CreateModel(
            name='Alarm_Logs',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('Alarm_Code', models.IntegerField(null=True)),
                ('Alarm_Time', models.DateTimeField(default=None)),
                ('Alarm_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drones.Alarms')),
            ],
        ),
    ]
