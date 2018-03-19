from django.db import models
from django.db.models.signals import post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver


class UserImage(models.Model):
    user_id = models.PositiveIntegerField(verbose_name="User ID")
    image_id = models.CharField(max_length=71, verbose_name="Docker image ID")
    created = models.DateTimeField(verbose_name="Created")
    size = models.PositiveIntegerField(verbose_name="Size")

    def __str__(self):
        return self.image_id

    @receiver(post_delete, sender=User)
    def delete_user_images(sender, instance, **kwargs):
        UserImage.objects.filter(user_id=instance.id).delete()
