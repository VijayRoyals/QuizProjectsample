# from django.db import models
# from django.utils.text import slugify

# class Quiz(models.Model):
#     title = models.CharField(max_length=255)
#     slug = models.SlugField(default='',db_index=True,editable=False)
#     color = models.CharField(max_length=7)  # e.g., '#FFF1E9'
#     icon = models.CharField(max_length=255)  # e.g., './assets/icon-html.svg'

#     def __str__(self):
#         return self.title

#     # def save(self, *args, **kwargs):
#     #     if not self.slug:
#     #         self.slug = slugify(f'{self.sub_id} {self.title}')  # Automatically generate slug from title
#     #     super(Quiz, self).save(*args, **kwargs)

#     def save(self, *args, **kwargs):
#         self.full_name = slugify(f' {self.title}')
#         super(Quiz, self).save(*args,**kwargs)

# class Question(models.Model):
#     quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
#     question = models.CharField(max_length=255)
#     options = models.JSONField(default=list)
#     answer = models.CharField(max_length=255, default='Unknown')

#     def __str__(self):
#         return self.question


#  this is for quiz put post


# 11-09-2024

# from django.db import models
# from django.utils.text import slugify


# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from django.db import models


# class Quiz(models.Model):
#     title = models.CharField(max_length=255)
#     slug = models.SlugField(default='', db_index=True, editable=False)
#     color = models.CharField(max_length=7)  # e.g., '#FFF1E9'
#     icon = models.CharField(max_length=255)  # e.g., './assets/icon-html.svg'

#     def __str__(self):
#         return self.title

#     def save(self, *args, **kwargs):
#         # Generate slug from the title if not already set
#         if not self.slug:
#             self.slug = slugify(self.title)
#         super(Quiz, self).save(*args, **kwargs)

# class Question(models.Model):
#     quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
#     question = models.CharField(max_length=255)
#     options = models.JSONField(default=list)
#     answer = models.CharField(max_length=255, default='Unknown')

#     def __str__(self):
#         return self.question



from django.db import models
from django.utils.text import slugify

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(default='', db_index=True, editable=False)
    color = models.CharField(max_length=7)  # e.g., '#FFF1E9'
    icon = models.CharField(max_length=255)  # e.g., './assets/icon-html.svg'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    options = models.JSONField(default=list)
    answer = models.CharField(max_length=255, default='Unknown')

    def __str__(self):
        return self.question





# # scorecard

# from django.conf import settings
# from django.db import models
# from .models import Quiz  # Import the existing Quiz model

# class ScoreCard(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
#     score = models.DecimalField(max_digits=5, decimal_places=2)
#     date_attempted = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.quiz.title} - {self.score}"



from django.conf import settings
from django.db import models
from .models import Quiz  # Import the existing Quiz model

class ScoreCard(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    date_attempted = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, null=True)  # New field for user name
    difficulty = models.CharField(max_length=100, null=True)  # New field for quiz difficulty
    slug = models.SlugField(null=True)  # New field for slug

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"



























#  this is for all login put post


# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from django.utils.translation import gettext_lazy as _

# class StudentManager(BaseUserManager):
#     def create_user(self, email, name, contact, password=None):
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         email = self.normalize_email(email)
#         student = self.model(email=email, name=name, contact=contact)
#         student.set_password(password)
#         student.save(using=self._db)
#         return student

#     def create_superuser(self, email, name, contact, password=None):
#         student = self.create_user(email, name, contact, password)
#         student.is_admin = True
#         student.save(using=self._db)
#         return student

# class Student(AbstractBaseUser):
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=255)
#     contact = models.CharField(max_length=15)
#     password = models.CharField(max_length=255)
    
#     objects = StudentManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'contact']

#     def __str__(self):
#         return self.email



# working code


# # quizapp/models.py
# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from django.utils.translation import gettext_lazy as _

# class StudentManager(BaseUserManager):
#     def create_user(self, email, name, contact, password=None):
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         email = self.normalize_email(email)
#         student = self.model(email=email, name=name, contact=contact)
#         student.set_password(password)
#         student.save(using=self._db)
#         return student

#     def create_superuser(self, email, name, contact, password=None):
#         student = self.create_user(email, name, contact, password)
#         student.is_staff = True
#         student.is_superuser = True
#         student.save(using=self._db)
#         return student

# class Student(AbstractBaseUser):
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=255)
#     contact = models.CharField(max_length=15)
    
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)

#     objects = StudentManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'contact']

#     def __str__(self):
#         return self.email








# # quizapp/models.py
# from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from django.utils.translation import gettext_lazy as _

# class StudentManager(BaseUserManager):
#     def create_user(self, email, name, contact, password=None):
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         email = self.normalize_email(email)
#         student = self.model(email=email, name=name, contact=contact)
#         student.set_password(password)
#         student.save(using=self._db)
#         return student

#     def create_superuser(self, email, name, contact, password=None):
#         student = self.create_user(email, name, contact, password)
#         student.is_staff = True
#         student.is_superuser = True
#         student.save(using=self._db)
#         return student

# class Student(AbstractBaseUser):
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=255)
#     contact = models.CharField(max_length=15)
    
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)

#     objects = StudentManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'contact']

#     def __str__(self):
#         return self.email



from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, name, contact, password=None, user_type='student'):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, contact=contact, user_type=user_type)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, contact, password=None):
        user = self.create_user(email, name, contact, password, user_type='admin')
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    ]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=15)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='student')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'contact']

    def __str__(self):
        return self.email

class Student(User):
    class Meta:
        proxy = True

class Faculty(User):
    class Meta:
        proxy = True

class Admin(User):
    class Meta:
        proxy = True






# quizapp/models.py
from django.db import models

class Voucher(models.Model):
    code = models.CharField(max_length=255, unique=True)

    
    def __str__(self):
        return self.code