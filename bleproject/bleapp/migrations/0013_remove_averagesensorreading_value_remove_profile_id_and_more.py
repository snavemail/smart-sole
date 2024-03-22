# Generated by Django 4.1.1 on 2024-03-22 05:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("bleapp", "0012_rename_sensorreading_averagesensorreading_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="averagesensorreading",
            name="value",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="id",
        ),
        migrations.RemoveField(
            model_name="user",
            name="created_at",
        ),
        migrations.RemoveField(
            model_name="user",
            name="updated_at",
        ),
        migrations.AddField(
            model_name="averagesensorreading",
            name="max_value",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagesensorreading",
            name="mean",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagesensorreading",
            name="median",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagesensorreading",
            name="min_value",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="averagesensorreading",
            name="std_dev",
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="profile",
            name="profile_pic",
            field=models.ImageField(null=True, upload_to="profile_pics/"),
        ),
        migrations.AddField(
            model_name="profile",
            name="pw_last_reset",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="user",
            name="email_verified",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="user",
            name="password",
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="profile",
            name="dob",
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="gender",
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="user_id",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                serialize=False,
                to="bleapp.user",
            ),
        ),
        migrations.AlterField(
            model_name="test",
            name="name",
            field=models.CharField(default="Test", max_length=100),
        ),
        migrations.CreateModel(
            name="Step",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("step_number", models.IntegerField()),
                ("timestamp", models.DateTimeField()),
                (
                    "test_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="bleapp.test"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Sensor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("sensor_id", models.IntegerField()),
                ("force", models.FloatField()),
                (
                    "step_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="bleapp.step"
                    ),
                ),
            ],
        ),
        migrations.AlterField(
            model_name="averagesensorreading",
            name="step_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bleapp.step"
            ),
        ),
        migrations.DeleteModel(
            name="AverageStep",
        ),
    ]
