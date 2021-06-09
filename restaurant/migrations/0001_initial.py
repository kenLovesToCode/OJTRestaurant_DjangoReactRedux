# Generated by Django 3.2.4 on 2021-06-09 00:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tbl_category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CategoryName', models.CharField(max_length=100)),
                ('IsActive', models.CharField(default='Yes', max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Tbl_menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MenuName', models.CharField(max_length=255)),
                ('MenuDescription', models.TextField()),
                ('MenuPrice', models.DecimalField(decimal_places=2, max_digits=10)),
                ('IsActive', models.CharField(default='Yes', max_length=4)),
                ('CategoryID', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='restaurant.tbl_category')),
            ],
        ),
    ]
