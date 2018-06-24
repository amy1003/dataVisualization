from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from MyModel.models import *
from django.shortcuts import render_to_response
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
import json
import traceback
import DataManager.MongoDB
import pandas as pd
from DataManager.DataHandler_HDF5 import getByPage

Chart = testChart
# 此部分包括了数据的出入，处理等等

def getHdfName(user,dataset):
    return user.username+'_'+dataset.name+'.hdf5'

@login_required
def sendTestData(request):

    #测试数据集
    testdata =[
            ['product', '2012', '2013', '2014', '2015'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
        ]
    data = {'data':testdata}

    print(request.user)
    return HttpResponse(json.dumps(data))

#DataSource方法作废
# @login_required
# def createDataSource(request):
#     pass
#
# @login_required
# def getDataSource(request):
#     if request.method !='POST' or not request.POST.__contains__('chartName'):
#         return render_to_response('403.html')
#
#     try:
#         user = User.objects.get(username=request.user)
#         chart = Chart.objects.get(user=user,name=request.POST['chartName'])
#         ds = chart.data_source
#
#         if ds.data_type == 'T':
#             json_source = ds.data
#             print(json_source)
#             return HttpResponse(json_source)
#         else:
#             pass
#
#     except Exception as e:
#         traceback.print_exc()
#
#     #出错或查无情况下返回空json
#     return HttpResponse('{}')

##########################################################################

def isUniqueChartName(name,user):

    try:
        tryobj = testChart.objects.get(name=name,user=user)
        if tryobj is not None:
            return False
    except Exception as e:

        if isinstance(e, ObjectDoesNotExist):  # 查找不存在即可创建
            return True
        else:
            traceback.print_exc()
            return False

@login_required
def createNewChart(request):

    if request.method != 'POST':
        return render_to_response('403.html')

    try:
        user = User.objects.get(username=request.user)
        newname = request.POST['name']
        dataset = DataSet.objects.get(user=user,name=request.POST['dataset'])
        if not isUniqueChartName(newname,user):
            return HttpResponse('图表名重复了!')
        else:
            newChart = Chart.objects.create(
                user=user,
                name=newname,
                created_time=datetime.now(),
                data_source=dataset,
                cur_option=""
            )
            newChart.save()
            return HttpResponse('true')


    except Exception as e:
        traceback.print_exc()
        return HttpResponse(repr(e))

@login_required
def getCharts(request): #GET

    try:
        charts = Chart.objects.filter(user=User.objects.get(username=request.user))
        result = {}
        if len(charts) == 0 :
            return HttpResponse('{}')
        for ct in charts:
            tmp = {}
            tmp['time'] = ct.created_time.strftime("%Y-%m-%d-%H")
            tmp['dataset'] = ct.data_source.name
            result[ct.name] = tmp
        return HttpResponse(dictToJson(result))
    except Exception as e:
        traceback.print_exc()
        return HttpResponse(repr(e))


@login_required
def deleteChart(request):
    try:
        chartname = request.POST['chartname']
        chart = Chart.objects.get(user=User.objects.get(username=request.user),name=chartname)
        chart.delete()

        return HttpResponse('true')
    except:
        traceback.print_exc()
        return HttpResponse('false')

# JSON数据格式的转换:


def dictToJson(data):

    if isinstance(data,dict):
        res = json.dumps(data,ensure_ascii=False)
        return res
    else:
        return 'data is not a dictionary'


def jsonToDict(jsonData):

    if isinstance(jsonData,str):
        res = json.loads(s=jsonData)
        return res
    else:
        return {'error':'not a str'};

def changeFormat(df):
    result = {}
    for i in df.index:
        result['row_'+i] = df.loc[i].to_dict()
    return result


@login_required
def getAllDataset(request):

    if request.method != 'GET':
        return render_to_response('403.html')

    try:
        username = request.user
        user = User.objects.get(username=username)
        DSobj = DataSet.objects.filter(user=user)
        choice = {
            'E':'excel',
            'T':'txt',
            'C':'csv'
        }
        result = {}
        if len(DSobj) == 0 :
            return HttpResponse('{}')
        for ds in DSobj:
            tmp = {}
            tmp['time'] = ds.created_time.strftime("%Y-%m-%d-%H")
            tmp['type'] = choice[ds.data_type]
            tmp['size'] = ds.size+'KB'
            result[ds.name] = tmp

        return HttpResponse(dictToJson(result))

    except Exception as e:
        traceback.print_exc()
        return HttpResponse({'err':'unknown'})

def getDatasetContent(request):

    if request.method != 'POST':
        return render_to_response('403.html')

    try:
        datasetName = request.POST['name']
        user = User.objects.get(username=request.user)
        dataset = DataSet.objects.get(user=user, name=datasetName)

        #mongodb
        # doc = dataset.readDoc()
        # print(doc)
        # df = pd.DataFrame(doc['data'])

        filename = getHdfName(user,dataset)
        df = getByPage(filename,0)

        return HttpResponse(df.to_string())
    except:
        traceback.print_exc()
        return HttpResponse('error')

@login_required
def deletADataset(request):

    if request.method != 'POST':
        return render_to_response('403.html')

    try:
        datasetName = request.POST['name']
        user = User.objects.get(username=request.user)
        dataset = DataSet.objects.get(user=user,name=datasetName)
        dataset.deleteDoc()
        dataset.delete()
        print('to here')
        return HttpResponse('true')
    except:
        traceback.print_exc()
        return HttpResponse('error')


#数据操作
@login_required
def getAllDimensions(request):
    try:
        chartName = request.POST['name']
        user = User.objects.get(username=request.user)
        chart = Chart.objects.get(user=user,name=chartName)
        df = chart.data_source.getDocInDataFrame()
        result = {}
        set = []
        for i in df.columns:
            set.append(i)
        result['dimensions'] = set
        return HttpResponse(dictToJson(result))
    except Exception as e:
        traceback.print_exc()
        return '{}'

@login_required
def getDContent(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')

        chartname = request.POST['cname']
        dimensionName = request.POST['dname']
        user = User.objects.get(username=request.user)
        ds = Chart.objects.get(name=chartname,user=user).data_source
        df = ds.getDocInDataFrame()

        return HttpResponse(df[dimensionName].to_json(force_ascii=False)) #防止中文转码
    except Exception as e:
        traceback.print_exc()

def getCurOption():
    pass

@login_required
def getAllData(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')
        chartname = request.POST['cname']
        pageNum = 0
        try:
            pageNum = request.POST['pageNum']
        except:
            traceback.print_exc()

        user = User.objects.get(username=request.user)
        ds = Chart.objects.get(name=chartname,user=user).data_source
        # df = ds.getDocInDataFrame() #mongodb
        print(ds.name)

        filename = getHdfName(user,ds)
        print(pageNum)
        df = getByPage(filename,pageNum)
        print(df.reset_index())

        return HttpResponse(df.to_json(force_ascii=False,orient='index')) #防止中文转码
    except Exception as e:
        traceback.print_exc()
        return HttpResponse('false')

@login_required
def saveOption(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')
        chartname = request.POST['name']
        jsonOption = request.POST['option']
        user = User.objects.get(username=request.user)
        chart = Chart.objects.get(name=chartname,user=user)
        chart.cur_option = jsonOption;
        chart.save()

        return HttpResponse('true')
    except Exception as e:
        traceback.print_exc()
        return HttpResponse('false')

#saveChart

def saveChart(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')
        chartContent = request.POST['jsonChart']
        chartName = request.POST['chartName']
        user = User.objects.get(username=request.user);
        chart = Chart.objects.get(user=user,name=chartName)
        chart.cur_option = chartContent
        chart.save()
        print('ok')
        return HttpResponse('true')
    except Exception as e:
        traceback.print_exc()
        return HttpResponse('false')

def getChartOption(request):
    try:
        user = User.objects.get(username=request.user)
        chartName = request.POST['chartName']
        print(chartName)
        chart = Chart.objects.get(user=user, name=chartName)
        print(chart.cur_option)
        return HttpResponse(chart.cur_option)
    except Exception as e:
        traceback.print_exc()
        return render_to_response('403.html')

#applications 应用相关接口

@login_required
def createApplication(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')

        user = User.objects.get(username=request.user)
        newname = request.POST['appname']
        newApp = Application.objects.create(name=newname,user=user)
        newApp.save()

        return HttpResponse('true')

    except Exception as e:
        traceback.print_exc()
        return HttpResponse('false')

def deleteApplication(request):
    try:
        appname = request.POST['appname']
        app = Application.objects.get(user=User.objects.get(username=request.user),name=appname)
        app.delete()

        return HttpResponse('true')
    except:
        traceback.print_exc()
        return HttpResponse('false')

@login_required
def getApplication(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')
        appname = request.POST['appname']
        app = Application.objects.get(name=appname)
        result = {}
        result['bg'] = app.backGroundOption
        result['charts'] = {}
        charts = app.chartSet.all()
        for item in charts:
            result['charts'][item.name] = item.cur_option

        return HttpResponse(dictToJson(result))
    except:
        traceback.print_exc()
        return HttpResponse('{}')

@login_required
def getAllApplication(request):
    try:
        user = User.objects.get(username=request.user)
        apps = Application.objects.filter(user=user)
        result = {}
        result['nameset'] = []
        for i in apps:
            result['nameset'].append(i.name)

        return HttpResponse(dictToJson(result))
    except:
        traceback.print_exc()
        return HttpResponse('{}')

@login_required
def addChartToApp(request):
    try:
        user = User.objects.get(username=request.user)
        appname = request.POST['appname']
        chartname = request.POST['chartname']
        chart = Chart.objects.get(user=user,name=chartname)
        app = Application.objects.get(name=appname,user=user)
        app.chartSet.add(chart)
        app.save()

        return HttpResponse('ok')
    except:
        traceback.print_exc()
        return HttpResponse('false')

@login_required
def reduceChartFromApp(request): #copy.......
    try:
        user = User.objects.get(username=request.user)
        appname = request.POST['appname']
        chartname = request.POST['chartname']
        chart = Chart.objects.get(user=user,name=chartname)
        app = Application.objects.get(name=appname,user=user)
        app.chartSet.remove(chart)
        app.save()

        return HttpResponse('ok')
    except:
        traceback.print_exc()

        return HttpResponse('false')

@login_required
def saveApp(request):
    try:
        if request.method != 'POST':
            return render_to_response('403.html')

        bgopt = request.POST['bg']
        appname = request.POST['appname']
        user = User.objects.get(username=request.user)
        app = Application.objects.get(name=appname, user=user)

        app.backGroundOption = bgopt
        app.save()
        return HttpResponse('true')
    except:
        traceback.print_exc()
        return HttpResponse('false')

# test area

def justRun(request):

    result = DataManager.MongoDB.find_one({})
    print(type(result))
    return HttpResponse(result['title'])

@login_required
def search(request):
    type = request.POST['type']
    content = request.POST['content']

def order():
    pass

def filter():
    pass