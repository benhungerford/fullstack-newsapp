# Generated by Django 3.1.2 on 2020-10-15 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('body', models.TextField()),
                ('author', models.CharField(max_length=255)),
                ('category', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255)),
                ('top_story', models.BooleanField(default=False)),
                ('date_published', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
