from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    os = models.CharField(max_length=100)
    language = models.CharField(max_length=50)

    # @property
    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(
                user=instance,
                os=instance.os if hasattr(instance, 'os') else '--',
                language=instance.language if hasattr(instance, 'language') else '--'
            )

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
