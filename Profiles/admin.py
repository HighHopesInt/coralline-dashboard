"""Admin CBV's."""
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
    """Profiles list CBV."""
    list_display = ('user', 'os', 'language')
    list_filter = ('os', 'language')


class UserInline(admin.StackedInline):
    """Inline for user CBV."""
    model = Profile
    can_delete = False


class UserProfileCreationForm(UserCreationForm):
    """User profile creation form."""
    inlines = ()
    os1 = forms.CharField(max_length=50, required=False)
    language1 = forms.CharField(max_length=50, required=False)

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'os1', 'language1')

    def save(self, commit=True):
        if self.is_valid():
            user = super(UserProfileCreationForm, self).save(commit=False)
            user.os = self.cleaned_data["os1"]
            user.language = self.cleaned_data["language1"]
            if commit:
                user.save()
            return user


class UserProfileAdmin(UserAdmin):
    """User profile CBV."""
    inlines = (UserInline,)

    add_form = UserProfileCreationForm

    list_display = ('username', 'profile_os', 'profile_lang', 'is_staff')
    # list_filter = ('profile_os', 'profile_lang')

    def profile_os(self, obj):
        return obj.profile.os
    profile_os.short_description = 'OS'

    def profile_lang(self, obj):
        return obj.profile.language
    profile_os.short_description = 'Language'


admin.site.unregister(User)
admin.site.register(User, UserProfileAdmin)
