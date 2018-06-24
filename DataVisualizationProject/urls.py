"""DataVisualizationProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url

from . import view
from . import userAdmin
from DataManager import Api
from DataManager import DataHandler
from DataManager import upLoadDataHandler
# 界面导航

urlpatterns = [
    url(r'^$',view.sendWelcome),
    url(r'^index$',view.sendWelcome),
    url(r'^home$',view.homePage),
    url(r'^editPanel/(.+)$',view.editPanel),
    url(r'^dataset$',view.datasetPage),
    url(r'^applications$',view.applicationsPage),
    url(r'^updatePage$',view.updatePage),
    url(r'^editApp/(.+)$',view.editApp),
]

# 测试
urlpatterns += {
    url(r'^run$',view.TEST),
    url(r'^test$',view.testPage),
    url(r'^fuckReact$',view.toTest),
    url(r'^testPhone$',view.testPhone)
}

# 用户登录 注册 注销功能 userAdmin的app
urlpatterns += [
    url(r'^login$',userAdmin.login),
    url(r'^register$',userAdmin.register),
    url(r'^logout$',userAdmin.logout)
]

# 功能 API
urlpatterns += [

    #data
    url(r'^getCurOption$',Api.getCurOption), # POST
    url(r'^getAllDataset$',Api.getAllDataset),
    url(r'^deleteChart',Api.deleteChart),
    url(r'^deleteDataset$',Api.deletADataset),
    url(r'^getDatasetContent$',Api.getDatasetContent),

    #charts
    url(r'^getCharts$',Api.getCharts),
    url(r'^createNewChart$',Api.createNewChart),
    url(r'^getAllDimensions$',Api.getAllDimensions),
    url(r'^getDContent$',Api.getDContent),
    url(r'^saveChart',Api.saveChart),
    url(r'^getChartOption',Api.getChartOption),
    url(r'^getAllData',Api.getAllData),
    url(r'^dataProcess',DataHandler.dataProcess_hdf),
    url(r'^runDataOption',DataHandler.processADataOption),

    #apps
    url(r'^getApplication',Api.getApplication),
    url(r'^getAllApplication',Api.getAllApplication),
    url(r'^addChartToApp',Api.addChartToApp),
    url(r'^reduceChartFromApp',Api.reduceChartFromApp),
    url(r'^saveApp',Api.saveApp),
    url(r'^createApp',Api.createApplication),
    url(r'^deleteApp',Api.deleteApplication)
]

# 文件上传
urlpatterns += [
    url(r'^uploadFile/(xl|txt|csv)$',upLoadDataHandler.uploadFile2Hdf), #POST
    url(r'^checkNewName$',upLoadDataHandler.checkDataSetName), #POST
    url(r'^updateFile/(xl|txt|csv)$',upLoadDataHandler.updateFile2Hdf),
    url(r'^uploadFile2HDF/(xl|txt|csv)$',upLoadDataHandler.uploadFile2Hdf)
]