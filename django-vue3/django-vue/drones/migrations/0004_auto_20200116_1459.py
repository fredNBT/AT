# Generated by Django 3.0.2 on 2020-01-16 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drones', '0003_auto_20200116_1458'),
    ]

    operations = [
        migrations.RenameField(
            model_name='logs',
            old_name='Drone_id',
            new_name='Drone',
        ),
    ]
