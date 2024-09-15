# from django.urls import path
# from .views import QuizListAPIView, QuizDetailAPIView

# urlpatterns = [
#     path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
#     path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
# ]


# from django.urls import path
# from .views import *


# from rest_framework_simplejwt.views import (    TokenObtainPairView,    TokenRefreshView,)

# urlpatterns = [
#     path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
#     path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
#     path('quizzes/<slug:slug>/add-question/', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),  # New URL for adding questions
    


#     # path('register/student', RegisterUserAPIView.as_view(), name='register-student'),  # Handles GET and POST for listing and creating users
#     # path('register/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),  # Handles GET, PUT, PATCH, DELETE for specific user
#     # path('login/student/', StudentLoginView.as_view(), name='student-login'),# Handles user login
#     # # path('login/faculty/', FacultyLoginView.as_view(), name='faculty-login'),
#     # # path('login/admin/', AdminLoginView.as_view(), name='admin-login'),

#     path('register/', RegisterUserAPIView.as_view(), name='register_user'),
#     path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
#     path('login/', UserLoginView.as_view(), name='user_login'),




#     # JWT token endpoints
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

# ]





# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import (
#     QuizListAPIView,
#     QuizDetailAPIView,
#     AddQuestionToQuizAPIView,
#     RegisterUserAPIView,
#     UserDetailAPIView,
#     UserLoginView,
#     CustomTokenObtainPairView,
#     FacultyListView,
#     StudentListView,
#     FacultyDetailView,
#     VoucherViewSet,    
#     validate_voucher,
#     VoucherValidationViewSet
# )
# from rest_framework_simplejwt.views import TokenRefreshView

# # Create a router and register the VoucherViewSet
# router = DefaultRouter()
# router.register(r'vouchers', VoucherViewSet)
# router.register(r'vouchers', VoucherValidationViewSet, basename='voucher')

# urlpatterns = [
#     path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
#     path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
#     path('quizzes/<slug:slug>/add-question/', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),

#     path('register/', RegisterUserAPIView.as_view(), name='register_user'),
#     path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
#     path('login/', UserLoginView.as_view(), name='user_login'),
#     path('faculties/', FacultyListView.as_view(), name='faculty-list'),
#     path('api/faculties/<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),
#     path('students/', StudentListView.as_view(), name='student-list'),

#     # Include the router URLs for vouchers
#     path('', include(router.urls)),

#     # Voucher validation endpoint
#         path('vouchers/validate/', validate_voucher, name='validate_voucher'),

#     # JWT token endpoints
#     path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuizListAPIView,
    QuizDetailAPIView,
    AddQuestionToQuizAPIView,
    RegisterUserAPIView,
    UserDetailAPIView,
    UserLoginView,
    CustomTokenObtainPairView,
    FacultyListView,
    StudentListView,
    FacultyDetailView,
    VoucherViewSet,    
    VoucherValidationViewSet,
    QuestionListCreateAPIView, 
    QuestionDetailAPIView,
    UserScoreCardList,
    ScoreCardCreateView,
)
from rest_framework_simplejwt.views import TokenRefreshView

# Create a router and register the VoucherViewSet
router = DefaultRouter()
router.register(r'vouchers', VoucherViewSet, basename='voucher')  # Use the base name for VoucherViewSet
router.register(r'vouchers/validate', VoucherValidationViewSet, basename='voucher-validation')  # Different base name for validation

urlpatterns = [
    # path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
    # path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
    # path('quizzes/<slug:slug>/add-question/', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),

    path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
    path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
    path('quizzes/<slug:slug>/add-question/', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),


# for quiz list crud

    path('quizzes/<slug:slug>/questions/', QuestionListCreateAPIView.as_view(), name='question-list-create'),
    path('quizzes/<slug:slug>/questions/<int:pk>/', QuestionDetailAPIView.as_view(), name='question-detail'),


# scorecard

    path('user/scorecards/', UserScoreCardList.as_view(), name='user-scorecards'),
    path('user/scorecards/create/', ScoreCardCreateView.as_view(), name='create-scorecard'),



    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
    path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('faculties/', FacultyListView.as_view(), name='faculty-list'),
    path('api/faculties/<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),
    path('students/', StudentListView.as_view(), name='student-list'),

    # Include the router URLs for vouchers
    path('', include(router.urls)),

    # JWT token endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


