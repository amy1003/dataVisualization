from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import pymongo
import traceback
import pandas as pd

mongoConnection = pymongo.MongoClient(host='localhost',port = 27017)
# Create your models here

class TestModel(models.Model):
    name = models.CharField(max_length=20)
    age = models.CharField(max_length=3)

    def __unicode__(self):
        return self.name+' '+self.age

class Application(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    chartSet = models.ManyToManyField('testChart')
    backGroundOption = models.TextField() #JSON
    class Meta:
        unique_together = ('name','user')


#新数据源
class DataSet(models.Model):
    name = models.CharField(max_length=20)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_time = models.DateTimeField()
    size = models.TextField()
    lastUpdated = models.DateTimeField(datetime.now())
    DATA_TYPE = (
        ('T', 'txt'),
        ('E', 'excel'),
        ('C','csv')
    )
    data_type = models.CharField(max_length=1, choices=DATA_TYPE)
    miliTime = models.TextField() #毫秒时间 记录数据更新的时间

    def saveDoc(self,mongoDoc):
        try:
            print(self.user.username)
            db = mongoConnection['user_' + self.user.username]
            cl = db.dataset
            result = cl.insert_one(mongoDoc)
            return result
        except Exception as e:
            print(repr(e))
            return None

    def readDoc(self):
        try:
            db = mongoConnection['user_' + self.user.username]
            cl = db.dataset
            result = cl.find_one({'name': self.name,'user':self.user.username})
            if result is not None:
                return result
            else:
                return {};
        except Exception as e:
            traceback.print_exc()
            return {}

    def appendDoc(self):  #追加内容
        pass

    def getDocInDataFrame(self):
        data = self.readDoc();
        return pd.DataFrame(data['data'])

    def deleteDoc(self):
        try:
            db = mongoConnection['user_' + self.user.username]
            cl = db.dataset
            result = cl.remove({'name':self.name,'user':self.user.username})
            if result['ok'] == 1:
                print('removed '+self.name)
        except:
            pass

    def getHDFName(self):
        dataname = self.name
        username = self.user.username
        return username+"_"+dataname+".hdf5"

    class Meta:
        unique_together = ('name','user')

# 一张图表
class testChart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    data_source = models.ForeignKey(DataSet,on_delete=models.CASCADE)
    created_time = models.DateTimeField()
    cur_option = models.TextField()
    dataLastUpdated = models.DateTimeField(default=datetime.now())
    # data_option = models.TextField()

    class Meta:
        unique_together = ('user','name')

#
# # 图表的设置，设置单方向关联一张图表:
# class Option(models.Model):
#     name = models.CharField(max_length=20)
#     chart = models.ForeignKey(Chart,on_delete=models.CASCADE)
#     created_time = models.DateTimeField()
#     json_option = models.TextField() # 以json字符串内存储的设置
#
#     class Meta:
#         unique_together = ("name","chart")


