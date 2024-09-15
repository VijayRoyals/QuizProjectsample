# from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework import status
# from django.utils.text import slugify
# from .models import Quiz
# from .serializers import QuizSerializer

# class QuizListAPIView(generics.ListCreateAPIView):
#     queryset = Quiz.objects.all()
#     serializer_class = QuizSerializer

#     def post(self, request, *args, **kwargs):
#         # Handle both single object and list of objects
#         serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
#         serializer.is_valid(raise_exception=True)
        
#         # Generate slug for each quiz before saving
#         quizzes = serializer.validated_data
#         for quiz_data in quizzes if isinstance(quizzes, list) else [quizzes]:
#             quiz_data['slug'] = slugify(quiz_data['title'])
        
#         # Perform creation
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# class QuizDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Quiz.objects.all()
#     serializer_class = QuizSerializer
#     lookup_field = 'slug'  # Use slug for lookup instead of pk



# 11-09-2024  



# from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework import status


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import authenticate
# from rest_framework import permissions
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from .models import *
# from .serializers import *


# #  this is for quiz put post

# class QuizListAPIView(generics.ListCreateAPIView):
#     queryset = Quiz.objects.all()
#     serializer_class = QuizSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]    

# class QuizDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Quiz.objects.all()
#     serializer_class = QuizSerializer
#     lookup_field = 'slug'  # Use slug for lookup instead of pk

# class AddQuestionToQuizAPIView(generics.CreateAPIView):
#     serializer_class = QuestionSerializer

#     def post(self, request, slug):
#         try:
#             quiz = Quiz.objects.get(slug=slug)  # Get the quiz by slug
#         except Quiz.DoesNotExist:
#             return Response({"detail": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

#         question_data = request.data
#         question_data['quiz'] = quiz.id  # Associate the question with the quiz
#         serializer = self.get_serializer(data=question_data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Quiz, Question
from .serializers import QuestionSerializer, QuizSerializer

class QuizListAPIView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class QuizDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = 'slug'  # Use slug for lookup instead of pk

class AddQuestionToQuizAPIView(generics.CreateAPIView):
    serializer_class = QuestionSerializer

    def post(self, request, slug):
        try:
            quiz = Quiz.objects.get(slug=slug)  # Get the quiz by slug
        except Quiz.DoesNotExist:
            return Response({"detail": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        question_data = request.data
        serializer = self.get_serializer(data=question_data, context={'quiz': quiz})
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Create the question with the associated quiz
        return Response(serializer.data, status=status.HTTP_201_CREATED)





from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Quiz, Question
from .serializers import QuestionListSerializer

class QuestionListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        try:
            quiz = Quiz.objects.get(slug=slug)
        except Quiz.DoesNotExist:
            return Question.objects.none()  # Return an empty queryset if quiz not found
        
        return Question.objects.filter(quiz=quiz)
    
    def post(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        try:
            quiz = Quiz.objects.get(slug=slug)
        except Quiz.DoesNotExist:
            return Response({'detail': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()
        data['quiz'] = quiz.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class QuestionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuestionListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        try:
            quiz = Quiz.objects.get(slug=slug)
        except Quiz.DoesNotExist:
            return Question.objects.none()  # Return an empty queryset if quiz not found
        
        return Question.objects.filter(quiz=quiz)
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs.get('pk'))
        return obj





# scorecard
# from rest_framework import generics
# from .models import ScoreCard
# from .serializers import ScoreCardSerializer
# from rest_framework.permissions import IsAuthenticated

# class UserScoreCardList(generics.ListAPIView):
#     serializer_class = ScoreCardSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return ScoreCard.objects.filter(user=user)

# from rest_framework import generics
# from .models import ScoreCard
# from .serializers import ScoreCardSerializer
# from rest_framework.permissions import IsAuthenticated

# class ScoreCardCreateView(generics.CreateAPIView):
#     queryset = ScoreCard.objects.all()
#     serializer_class = ScoreCardSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)  # Automatically associate the logged-in user


from rest_framework import generics
from .models import ScoreCard
from .serializers import ScoreCardSerializer
from rest_framework.permissions import IsAuthenticated

# class UserScoreCardList(generics.ListAPIView):
#     serializer_class = ScoreCardSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return ScoreCard.objects.filter(user=user)

class UserScoreCardList(generics.ListAPIView):
    serializer_class = ScoreCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Check if user is admin
            return ScoreCard.objects.all()  # Admins see all scorecards
        return ScoreCard.objects.filter(user=user)  # Students see their own scorecards


class ScoreCardCreateView(generics.CreateAPIView):
    queryset = ScoreCard.objects.all()
    serializer_class = ScoreCardSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        name = self.request.data.get('name')  # Get name from request data
        slug = self.request.data.get('slug')  # Get slug from request data
        serializer.save(user=user, name=name, slug=slug)




# from rest_framework import status, generics
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .models import Student
# from .serializers import StudentSerializer
# from rest_framework_simplejwt.tokens import RefreshToken

# class StudentListCreateView(generics.ListCreateAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer

# class StudentRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer

# class StudentLoginView(generics.GenericAPIView):
#     serializer_class = StudentSerializer

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         student = Student.objects.filter(email=email).first()
        
#         if student and student.check_password(password):
#             refresh = RefreshToken.for_user(student)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class StudentProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         try:
#             student = Student.objects.get(user=request.user)  # Ensure correct relation
#             serializer = StudentSerializer(student)
#             return Response(serializer.data)
#         except Student.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=404)
        







# # quizapp/views.py
# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.views import APIView
# from .models import Student
# from .serializers import StudentSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from drf_yasg.utils import swagger_auto_schema

# class RegisterUserAPIView(APIView):
#     """Register a new user."""
#     permission_classes = [AllowAny]
#     serializer_class = StudentSerializer

#     @swagger_auto_schema(
#         request_body=StudentSerializer,
#         responses={201: StudentSerializer},
#     )
#     def post(self, request):
#         serializer = StudentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({
#                 'status': status.HTTP_201_CREATED,
#                 'message': 'User registered successfully'
#             })
#         return Response({
#             'status': status.HTTP_400_BAD_REQUEST,
#             'errors': serializer.errors,
#             'message': 'Invalid data'
#         })

# class StudentLoginView(APIView):
#     """Log in a user and return JWT tokens."""
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         student = Student.objects.filter(email=email).first()
        
#         if student and student.check_password(password):
#             refresh = RefreshToken.for_user(student)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class ManageUserView(generics.RetrieveUpdateAPIView):
#     """Retrieve and update user profile."""
#     serializer_class = StudentSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]

#     def get_object(self):
#         return self.request.user

#     def get(self, request, *args, **kwargs):
#         user_obj = self.get_object()
#         serializer = self.get_serializer(user_obj)
#         return Response({
#             'status': status.HTTP_200_OK,
#             'data': serializer.data
#         })

#     def patch(self, request, *args, **kwargs):
#         user_obj = self.get_object()
#         serializer = self.get_serializer(user_obj, data=request.data, partial=True)
#         if not serializer.is_valid():
#             return Response({
#                 'status': status.HTTP_400_BAD_REQUEST,
#                 'errors': serializer.errors,
#                 'message': 'Invalid data'
#             })
#         serializer.save()
#         return Response({
#             'status': status.HTTP_200_OK,
#             'message': 'User partially updated successfully'
#         })

#     def put(self, request, *args, **kwargs):
#         user_obj = self.get_object()
#         serializer = self.get_serializer(user_obj, data=request.data, partial=False)
#         if not serializer.is_valid():
#             return Response({
#                 'status': status.HTTP_400_BAD_REQUEST,
#                 'errors': serializer.errors,
#                 'message': 'Invalid data'
#             })
#         serializer.save()
#         return Response({
#             'status': status.HTTP_200_OK,
#             'message': 'User updated successfully'
#         })







# # quizapp/views.py
# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.views import APIView
# from .models import Student
# from .serializers import StudentSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from drf_yasg.utils import swagger_auto_schema

# class RegisterUserAPIView(generics.ListCreateAPIView):
#     """Register a new user or list all users."""
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     # permission_classes = [AllowAny]
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [permissions.IsAuthenticated]   

#     @swagger_auto_schema(
#         request_body=StudentSerializer,
#         responses={201: StudentSerializer},
#     )
#     def post(self, request, *args, **kwargs):
#         serializer = StudentSerializer(data=request.data)
#         if serializer.is_valid():
#             student = serializer.save()
#             return Response({
#                 'status': status.HTTP_201_CREATED,
#                 'message': 'Student registered successfully',
#                 'data': serializer.data
#             })
#         return Response({
#             'status': status.HTTP_400_BAD_REQUEST,
#             'errors': serializer.errors,
#             'message': 'Invalid data'
#         })
    

# class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     """Retrieve, update, or delete a specific user."""
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]

#     @swagger_auto_schema(
#         responses={200: StudentSerializer},
#     )
#     def get(self, request, *args, **kwargs):
#         return super().get(request, *args, **kwargs)

#     @swagger_auto_schema(
#         request_body=StudentSerializer,
#         responses={200: StudentSerializer},
#     )
#     def put(self, request, *args, **kwargs):
#         return super().put(request, *args, **kwargs)

#     @swagger_auto_schema(
#         request_body=StudentSerializer,
#         responses={200: StudentSerializer},
#     )
#     def patch(self, request, *args, **kwargs):
#         return super().patch(request, *args, **kwargs)

#     @swagger_auto_schema(
#         responses={204: 'No Content'},
#     )
#     def delete(self, request, *args, **kwargs):
#         return super().delete(request, *args, **kwargs)
    


# class StudentLoginView(APIView):
#     """Log in a user and return JWT tokens."""
#     permission_classes = [AllowAny]     

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         student = Student.objects.filter(email=email).first()
        
#         if student and student.check_password(password):
#             refresh = RefreshToken.for_user(student)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)








from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView  # Make sure this is imported
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer

class RegisterUserAPIView(generics.ListCreateAPIView):
    """Register a new user or list all users."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={201: UserSerializer},
    )
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'status': status.HTTP_201_CREATED,
                'message': 'User registered successfully',
                'data': serializer.data
            })
        return Response({
            'status': status.HTTP_400_BAD_REQUEST,
            'errors': serializer.errors,
            'message': 'Invalid data'
        })

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific user."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @swagger_auto_schema(
        responses={200: UserSerializer},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={200: UserSerializer},
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={200: UserSerializer},
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={204: 'No Content'},
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    



# class UserLoginView(APIView):
#     """Log in a user and return JWT tokens."""
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = User.objects.filter(email=email).first()
        
#         if user and user.check_password(password):
#             if not user.is_active:
#                 return Response({'error': 'User account is inactive'}, status=status.HTTP_400_BAD_REQUEST)

#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'user_type': getattr(user, 'user_type', 'unknown'),
#                 'name': user.name  # Add the name to the response
#             })
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


from django.contrib.auth import authenticate

class UserLoginView(APIView):
    """Log in a user and return JWT tokens."""
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user:
            if not user.is_active:
                return Response({'error': 'User account is inactive'}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_type': getattr(user, 'user_type', 'unknown'),
                'name': user.name  # Add the name to the response
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)




from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    @swagger_auto_schema(
        responses={
            200: openapi.Response(
                description="Successful Response",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token'),
                        'access': openapi.Schema(type=openapi.TYPE_STRING, description='Access token'),
                        'user_type': openapi.Schema(type=openapi.TYPE_STRING, description='User type'),
                        'name': openapi.Schema(type=openapi.TYPE_STRING, description='User name'),  # Adding name to Swagger doc
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='User ID'),  # Adding user_id to Swagger doc
                    }
                )
            )
        }
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Add user_type to the response
        data = response.data
        if 'access' in data:
            access_token = data['access']
            # Decode the access token to get the user_type
            from rest_framework_simplejwt.tokens import AccessToken
            token = AccessToken(access_token)
            user_type = token.get('user_type', 'unknown')
            user_id = token.get('user_id', 'unknown')  # Fetch the user_id from the token
            name = token.get('name', 'unknown')  # Adding the name from the token
            data['user_type'] = user_type
            data['name'] = name
            data['user_id'] = user_id  # Add user_id to the response
        return Response(data)



# myapp/views.py
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class FacultyListView(generics.ListAPIView):
    """List all faculty members."""
    queryset = User.objects.filter(user_type='faculty')
    serializer_class = UserSerializer

class StudentListView(generics.ListAPIView):
    """List all students."""
    queryset = User.objects.filter(user_type='student')
    serializer_class = UserSerializer


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Faculty
from .serializers import FacultySerializer  # Ensure this import is correct

class FacultyListCreateView(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class FacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]









# quizapp/views.py

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Voucher
from .serializers import VoucherSerializer, VoucherValidationSerializer

class VoucherViewSet(viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]

class VoucherValidationViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]

    @swagger_auto_schema(
        method='post',
        request_body=VoucherValidationSerializer,
        responses={
            200: openapi.Response(
                description="Voucher is valid",
                examples={
                    'application/json': {
                        'message': 'Voucher is valid'
                    }
                }
            ),
            400: openapi.Response(
                description="Invalid voucher code",
                examples={
                    'application/json': {
                        'error': 'Invalid voucher code'
                    }
                }
            )
        }
    )
    @action(detail=False, methods=['post'], url_path='validate')
    def validate_voucher(self, request):
        serializer = VoucherValidationSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data['code']
            try:
                voucher = Voucher.objects.get(code=code)
                return Response({'message': 'Voucher is valid'}, status=status.HTTP_200_OK)
            except Voucher.DoesNotExist:
                return Response({'error': 'Invalid voucher code'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
