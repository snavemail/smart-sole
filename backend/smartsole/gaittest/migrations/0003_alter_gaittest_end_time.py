# Generated by Django 4.2.11 on 2024-03-25 10:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("smartsole_gaittest", "0002_alter_gaittest_end_time"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gaittest",
            name="end_time",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]