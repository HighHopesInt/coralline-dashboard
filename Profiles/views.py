from django.contrib.auth import login
from django.views.generic.edit import FormView
from django.contrib.auth.forms import UserCreationForm
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView, ListView, DetailView

from Profiles.models import Profile

auth_decorators = [login_required]


class ProfileListView(ListView):
    queryset = Profile.objects.all()

    template_name = "profiles.html"


class RegisterFormView(FormView):
    form_class = UserCreationForm

    success_url = "/dashboard/"

    template_name = "register.html"

    def form_valid(self, form):
        instance = form.save(commit=False)

        instance.os = self.request.user_agent.os.family + ' ' + self.request.user_agent.os.version_string
        instance.language = self.request.META['LANGUAGE']

        instance.save()
        login(self.request, instance)

        return super(RegisterFormView, self).form_valid(form)


class UserProfileView(DetailView):
    model = Profile

    template_name = 'user_profile.html'


@method_decorator(auth_decorators, name='dispatch')
class DashboardView(TemplateView):
    template_name = "dashboard.html"
