# Generated by Django 4.2.11 on 2024-03-26 08:58

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        (
            "smartsole_user",
            "0002_user_avatar_user_dob_user_gender_user_height_and_more",
        ),
    ]

    operations = [
        migrations.AlterModelTable(
            name="user",
            table="smartsole_user",
        ),
    ]
