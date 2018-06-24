# Generated by Django 2.0.2 on 2018-05-23 15:05

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('MyModel', '0014_auto_20180508_2220'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='lastUpdated',
            field=models.DateTimeField(default=datetime.datetime(2018, 5, 23, 15, 5, 8, 358790, tzinfo=utc), verbose_name=datetime.datetime(2018, 5, 23, 23, 3, 59, 497525)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='testchart',
            name='dataLastUpdated',
            field=models.DateTimeField(default=datetime.datetime(2018, 5, 23, 23, 3, 59, 498500)),
        ),
    ]