# Generated by Django 4.2.3 on 2024-03-18 19:25

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("bleapp", "0011_profile_gender"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="SensorReading",
            new_name="AverageSensorReading",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_0_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_0_value",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_1_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_1_value",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_2_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_2_value",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_3_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_3_value",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_4_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_4_value",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_5_time",
        ),
        migrations.RemoveField(
            model_name="averagestep",
            name="sensor_5_value",
        ),
        migrations.AddField(
            model_name="averagestep",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="max_value",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="mean",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="median",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="min_value",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="std_dev",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagestep",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="averagesensorreading",
            name="step_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bleapp.averagestep"
            ),
        ),
        migrations.DeleteModel(
            name="Step",
        ),
    ]
