# Generated by Django 4.1.1 on 2024-03-14 04:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bleapp", "0009_alter_profile_user_id"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="test",
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name="test",
            name="name",
            field=models.CharField(default="Default Test Name", max_length=100),
        ),
    ]