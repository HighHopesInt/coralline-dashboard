"""HighHopes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from Profiles import views

urlpatterns = [

    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    url(r'^admin/', admin.site.urls, name='admin'),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^accounts/profile/(?P<pk>\d+)', views.UserProfileView.as_view(),
        name='user_profile'),

    url(r'^register/$', views.RegisterFormView.as_view(), name='register'),

    url(r'^dashboard/$', views.DashboardView.as_view(), name='dashboard'),
    url(r'^profiles_list/$', views.ProfileListView.as_view(),
        name='profiles_list'),
]
