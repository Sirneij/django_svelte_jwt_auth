from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            'email',
            'username',
        )


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    list_filter = (
        'email',
        'username',
        'is_staff',
        'is_active',
    )
    fieldsets = (
        (
            None,
            {
                'fields': (
                    'email',
                    'username',
                    'password',
                    'bio',
                    'full_name',
                    'birth_date',
                )
            },
        ),
        (
            'Permissions',
            {
                'fields': (
                    'is_staff',
                    'is_active',
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {'classes': ('wide',), 'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')},
        ),
    )
    search_fields = (
        'email',
        'username',
    )
    ordering = (
        'email',
        'username',
    )


admin.site.register(User, CustomUserAdmin)
