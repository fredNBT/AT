# Generated by Django 3.0.2 on 2020-01-24 13:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drones', '0004_auto_20200116_1459'),
    ]

    operations = [
        migrations.RenameField(
            model_name='drone',
            old_name='LastOrderTime',
            new_name='Region',
        ),
    ]
