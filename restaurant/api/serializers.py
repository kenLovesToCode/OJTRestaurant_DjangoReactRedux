from rest_framework import serializers
from restaurant.models import Tbl_menu, Tbl_category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tbl_category
        fields = (
            'id',
            'CategoryName',
            'IsActive',
        )


class MenuSerializer(serializers.ModelSerializer):

    CategoryID = serializers.CharField(source='CategoryID.CategoryName')
    # CategoryName = CategorySerializer(source='CategoryID')

    class Meta:
        model = Tbl_menu
        fields = (
            'id',
            'MenuName',
            'MenuDescription',
            'MenuPrice',
            'CategoryID',
            'IsActive',
        )

    def create(self, request):
        data = request.data
        m = Tbl_menu()

        m.MenuName = data['MenuName']
        m.MenuDescription = data['MenuDescription']
        m.MenuPrice = data['MenuPrice']
        m.IsActive = data['IsActive']
        m.CategoryID = Tbl_category.objects.get(
            CategoryName=data['CategoryID'])
        m.save()

        return m

    def update(self, instance, request):
        data = request.data
        instance.MenuName = data['MenuName']
        instance.MenuDescription = data['MenuDescription']
        instance.MenuPrice = data['MenuPrice']
        instance.IsActive = data['IsActive']
        instance.CategoryID = Tbl_category.objects.get(
            CategoryName=data['CategoryID'])
        instance.save()

        return instance
