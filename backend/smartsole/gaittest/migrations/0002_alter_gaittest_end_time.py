# Generated by Django 4.2.11 on 2024-03-25 09:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("smartsole_gaittest", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gaittest",
            name="end_time",
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]