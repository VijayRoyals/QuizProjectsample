# from rest_framework import serializers
# from .models import Quiz, Question

# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['question', 'options', 'answer']
#         read_only=True

# class QuizSerializer(serializers.ModelSerializer):
#     questions = QuestionSerializer(many=True)
#     slug = serializers.SlugField(read_only=True)  # Add slug field (read-only)

#     class Meta:
#         model = Quiz
#         fields = [ 'title', 'slug', 'color', 'icon', 'questions', 'sub_id']  # Include slug in fields

#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions')
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             Question.objects.create(quiz=quiz, **question_data)
#         return quiz
    
# class QuizSerializer(serializers.ModelSerializer):
#     questions = QuestionSerializer(many=True)
#     slug = serializers.SlugField(read_only=True)

#     class Meta:
#         model = Quiz
#         fields = ['title', 'slug', 'color', 'icon', 'questions']

#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions')
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             Question.objects.create(quiz=quiz, **question_data)
#         return quiz

#     def update(self, instance, validated_data):
#         questions_data = validated_data.pop('questions', [])
#         # Update Quiz instance fields
#         instance.title = validated_data.get('title', instance.title)
#         instance.color = validated_data.get('color', instance.color)
#         instance.icon = validated_data.get('icon', instance.icon)
#         instance.save()

#         # Update or create Question instances
#         for question_data in questions_data:
#             question_id = question_data.get('id')
#             if question_id:
#                 question = Question.objects.get(id=question_id, quiz=instance)
#                 question.question = question_data.get('question', question.question)
#                 question.options = question_data.get('options', question.options)
#                 question.answer = question_data.get('answer', question.answer)
#                 question.save()
#             else:
#                 Question.objects.create(quiz=instance, **question_data)
#         return instance


# 11-09-2024

# from rest_framework import serializers
# from .models import Quiz, Question


# #  this is for quiz put post

# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['question', 'options', 'answer']  # Include 'quiz' in the fields

# class QuizSerializer(serializers.ModelSerializer):
#     questions = QuestionSerializer(many=True)

#     class Meta:
#         model = Quiz
#         fields = ['title', 'slug', 'color', 'icon', 'questions']
#         read_only_fields = ['slug']  # Slug is read-only and auto-generated

#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions', [])
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             Question.objects.create(quiz=quiz, **question_data)
#         return quiz

#     def update(self, instance, validated_data):
#         questions_data = validated_data.pop('questions', [])

#         # Update Quiz instance fields
#         instance.title = validated_data.get('title', instance.title)
#         instance.color = validated_data.get('color', instance.color)
#         instance.icon = validated_data.get('icon', instance.icon)
#         instance.save()

#         # Update or create Question instances
#         existing_question_ids = [question.id for question in instance.questions.all()]
#         new_question_ids = [question_data.get('id') for question_data in questions_data if question_data.get('id')]

#         # Update existing questions
#         for question_data in questions_data:
#             question_id = question_data.get('id')
#             if question_id in existing_question_ids:
#                 question = Question.objects.get(id=question_id, quiz=instance)
#                 question.question = question_data.get('question', question.question)
#                 question.options = question_data.get('options', question.options)
#                 question.answer = question_data.get('answer', question.answer)
#                 question.save()
#             else:
#                 Question.objects.create(quiz=instance, **question_data)

#         # Delete questions that are no longer present in the update
#         for question_id in existing_question_ids:
#             if question_id not in new_question_ids:
#                 Question.objects.filter(id=question_id, quiz=instance).delete()

#         return instance

from rest_framework import serializers
from .models import Quiz, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question', 'options', 'answer']

    def create(self, validated_data):
        quiz = self.context['quiz']  # Access the quiz instance from context
        return Question.objects.create(quiz=quiz, **validated_data)

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'slug', 'color', 'icon', 'questions']
        read_only_fields = ['slug', 'id']  # Slug and ID are read-only

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        quiz = Quiz.objects.create(**validated_data)
        for question_data in questions_data:
            Question.objects.create(quiz=quiz, **question_data)
        return quiz

    def update(self, instance, validated_data):
        questions_data = validated_data.pop('questions', [])

        # Update Quiz instance fields
        instance.title = validated_data.get('title', instance.title)
        instance.color = validated_data.get('color', instance.color)
        instance.icon = validated_data.get('icon', instance.icon)
        instance.save()

        # Update or create Question instances
        existing_question_ids = [question.id for question in instance.questions.all()]
        new_question_ids = [question_data.get('id') for question_data in questions_data if question_data.get('id')]

        # Update existing questions
        for question_data in questions_data:
            question_id = question_data.get('id')
            if question_id in existing_question_ids:
                question = Question.objects.get(id=question_id, quiz=instance)
                question.question = question_data.get('question', question.question)
                question.options = question_data.get('options', question.options)
                question.answer = question_data.get('answer', question.answer)
                question.save()
            else:
                Question.objects.create(quiz=instance, **question_data)

        # Delete questions that are no longer present in the update
        for question_id in existing_question_ids:
            if question_id not in new_question_ids:
                Question.objects.filter(id=question_id, quiz=instance).delete()

        return instance



from rest_framework import serializers
from .models import Question

class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


# scorecard

# from rest_framework import serializers
# from .models import ScoreCard

# class ScoreCardSerializer(serializers.ModelSerializer):
#     quiz_title = serializers.CharField(source='quiz.title', read_only=True)

#     class Meta:
#         model = ScoreCard
#         fields = ['user', 'quiz', 'quiz_title', 'score', 'date_attempted']
#         read_only_fields = ['quiz_title', 'date_attempted']

#     # Override create method to add the user dynamically
#     def create(self, validated_data):
#         user = self.context['request'].user  # Get user from the request context
#         validated_data['user'] = user
#         return super().create(validated_data)


from rest_framework import serializers
from .models import ScoreCard

class ScoreCardSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)

    class Meta:
        model = ScoreCard
        fields = ['id', 'user', 'quiz', 'quiz_title', 'score', 'date_attempted', 'name', 'slug', 'difficulty']  # Include name and slug
        read_only_fields = ['quiz_title', 'date_attempted']

    # Override create method to add the user dynamically
    def create(self, validated_data):
        user = self.context['request'].user  # Get user from the request context
        validated_data['user'] = user
        return super().create(validated_data)





# from rest_framework import serializers
# from .models import Student

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'name', 'email', 'contact', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         student = Student(**validated_data)
#         student.set_password(password)
#         student.save()
#         return student
    






# # quizapp/serializers.py
# from rest_framework import serializers
# from .models import Student

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'name', 'email', 'contact', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         student = Student(**validated_data)
#         if password:
#             student.set_password(password)
#         student.save()
#         return student


# # quizapp/serializers.py
# from rest_framework import serializers
# from .models import Student

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'name', 'email', 'contact', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         student = Student(**validated_data)
#         if password:
#             student.set_password(password)
#         student.save()
#         return student

#     def update(self, instance, validated_data):
#         password = validated_data.pop('password', None)
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         if password:
#             instance.set_password(password)
#         instance.save()
#         return instance






# # quizapp/serializers.py
# from rest_framework import serializers
# from .models import Student

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'name', 'email', 'contact', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         student = Student(**validated_data)
#         if password:
#             student.set_password(password)
#         student.save()
#         return student

#     def update(self, instance, validated_data):
#         password = validated_data.pop('password', None)
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         if password:
#             instance.set_password(password)
#         instance.save()
#         return instance

# # quizapp/serializers.py

# from rest_framework import serializers
# from .models import Student # Ensure Faculty and Admin are imported

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'name', 'email', 'contact', 'password']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         student = Student(**validated_data)
#         if password:
#             student.set_password(password)
#         student.save()
#         return student

#     def update(self, instance, validated_data):
#         password = validated_data.pop('password', None)
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         if password:
#             instance.set_password(password)
#         instance.save()
#         return instance


from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'contact', 'password', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['user_type'] = user.user_type
        token['name'] = user.name
        token['user_id'] = user.id  # Add user_id to the token
        return token



from rest_framework import serializers
from .models import Faculty  # Ensure this import is correct

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'email', 'contact']  # Specify the fields you need





# quizapp/serializers.py
from rest_framework import serializers
from .models import Voucher

class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = ['id', 'code']


from rest_framework import serializers

class VoucherValidationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=255, required=True)
