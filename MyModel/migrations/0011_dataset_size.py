# Generated by Django 2.0.2 on 2018-04-10 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyModel', '0010_auto_20180410_1054'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='size',
            field=models.TextField(default=100),
            preserve_default=False,
        ),
    ]
