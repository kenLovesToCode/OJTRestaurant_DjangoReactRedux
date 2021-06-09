from django.db import models


class Tbl_category(models.Model):
    CategoryName = models.CharField(max_length=100)
    IsActive = models.CharField(max_length=4, default='Yes')

    def __str__(self):
        return self.CategoryName


class Tbl_menu(models.Model):
    MenuName = models.CharField(max_length=255)
    MenuDescription = models.TextField()
    MenuPrice = models.DecimalField(decimal_places=2, max_digits=10)
    CategoryID = models.ForeignKey(Tbl_category, on_delete=models.PROTECT)
    IsActive = models.CharField(max_length=4, default='Yes')

    def __str__(self):
        return self.MenuName
