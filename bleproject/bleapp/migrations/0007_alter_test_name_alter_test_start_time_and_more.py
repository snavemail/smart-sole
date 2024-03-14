# Generated by Django 4.2.3 on 2024-03-13 20:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "bleapp",
            "0006_remove_profile_foot_length_remove_profile_foot_width_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="test",
            name="name",
            field=models.CharField(default="", max_length=100),
        ),
        migrations.AlterField(
            model_name="test",
            name="start_time",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterUniqueTogether(
            name="test",
            unique_together={("name", "profile_id")},
        ),
    ]