# Generated by Django 2.0.2 on 2018-03-27 05:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MyModel', '0005_auto_20180326_2053'),
    ]

    operations = [
        migrations.AddField(
            model_name='chart',
            name='cur_option',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cur_option', to='MyModel.Option'),
        ),
    ]