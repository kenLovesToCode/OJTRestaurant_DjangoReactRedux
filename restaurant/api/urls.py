from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .viewsets import MenuViewset, CategoryViewset

router = DefaultRouter()
router.register('menu', MenuViewset, basename='menu')
router.register('category', CategoryViewset, basename='category')

urlpatterns = [

]

urlpatterns += router.urls
