from django import forms
from .models import User  # or your user model

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'firstName',
            'lastName',
            'email',
            'usertype',
            # 'contact_no',
            # 'address',
            # 'profile_image'
        ]
