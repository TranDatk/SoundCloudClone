# Generated by Django 4.2.8 on 2024-05-10 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soundcloud', '0011_remove_playlisttracks_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
