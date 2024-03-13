# Generated by Django 4.2.11 on 2024-03-12 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bleapp', '0003_profile_sensorreading_step_remove_user_first_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
        migrations.AddField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]