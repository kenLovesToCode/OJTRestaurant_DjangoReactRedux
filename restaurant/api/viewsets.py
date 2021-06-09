from rest_framework import serializers, viewsets
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from django.db.models.deletion import ProtectedError
from django.http import JsonResponse

from restaurant.models import Tbl_category, Tbl_menu
from .serializers import CategorySerializer, MenuSerializer


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Tbl_category.objects.all()
    serializer_class = CategorySerializer

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return JsonResponse({'message': 'success'})
        except ProtectedError:
            return JsonResponse({'message': 'error'})


class MenuViewset(viewsets.ModelViewSet):
    queryset = Tbl_menu.objects.all()
    serializer_class = MenuSerializer

    def create(self, request):
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            menu = serializer.create(request)
            if menu:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MenuSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            menu = serializer.update(instance, request)
            if menu:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     try:
    #         instance.delete()
    #     except ProtectedError:
    #         return JsonResponse({'error': 'relation existed'})
