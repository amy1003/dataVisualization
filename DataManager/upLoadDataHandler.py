#文件上传处理的模块
from django.http import HttpResponse
import xlrd
from DataManager.MongoDB import mongoConnection
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.core.exceptions import ObjectDoesNotExist
from MyModel.models import DataSet
from django.contrib.auth.models import User
from datetime import datetime
import traceback
import pandas as pd
from DataManager.DataHandler_HDF5 import createHdf5File
import time


chunkSize = 10000 #分块大小

def strToInt(a):
    return int(a)

@login_required
def updateFile(request,type):

    try:
        if request.method != 'POST':
            return render_to_response('403.html')

        mode = request.POST['mode']
        dataSetName = request.POST['name']
        user = User.objects.get(username=request.user)
        ds = DataSet.objects.get(user=user, name=dataSetName)
        docs = {}

        print(mode)
        print(dataSetName)
        print(type)

        if type == 'xl':
            resultSet = handleXls(request)
            docs = resultSet['doc'][0]  # 只取一个

        elif type == 'txt':
            docs = handleTxt(request)
        elif type == 'csv':
            docs = handleCsv(request)

        if mode == 'replace':
            ds.deleteDoc()
            ds.saveDoc(docs)
        elif mode == 'update':
            originDf = ds.getDocInDataFrame()
            originDf.index = originDf.index.map(strToInt)
            newDf = pd.DataFrame(docs['data'])
            newDf.index = newDf.index.map(strToInt)
            combined = pd.concat([originDf,newDf],axis=0) #强制行连接
            print(originDf)
            print(newDf)
            print(combined)
            combined = combined.reset_index(drop=True)
            combined.index = indexToStr(combined)
            docs['data'] = combined.to_dict()
            ds.deleteDoc()
            print(docs)
            ds.saveDoc(docs)

        ds.lastUpdated = datetime.now()
        ds.save()

        return HttpResponse('just updated '+user.username+'\'s'+ds.name)

    except Exception as e:
        traceback.print_exc()
        return HttpResponse('error')


@login_required
def uploadFile(request,type):

    if request.method != 'POST':
        return render_to_response('403.html')

    if type == 'xl':
        resultSet = handleXls(request)
        if resultSet is None:
            return HttpResponse('false')
        nameset = resultSet['nameset']
        docs = resultSet['doc']
        for i in range(0,len(nameset)):
            if not createDataset(request.user,docs[i]['name'],docs[i],'E',docs[i]['filesize']):
                return HttpResponse('false')
    elif type == 'txt':
        doc = handleTxt(request)
        if doc is None or not createDataset(request.user,doc['name'],doc,'T',doc['filesize']):
            return HttpResponse('false')
    elif type == 'csv':
        doc = handleCsv(request)
        if doc is None or not createDataset(request.user,doc['name'],doc,'C',doc['filesize']):
            return HttpResponse('false')
    else:
        return HttpResponse('unkown type')

    return HttpResponse('true')

@login_required
def checkDataSetName(request):

    if request.method != 'POST':
        return render_to_response('403.html')

    try:
        newname = request.POST['newname']

        if len(newname) > 15:
            return HttpResponse('请不要绕开程序提交好么？')

        findObj = DataSet.objects.get(name=newname)

        if findObj != None:
            return HttpResponse('false')

    except Exception as e:
        if isinstance(e,ObjectDoesNotExist): #查找不存在即可创建
            return HttpResponse('true')
        else:
            traceback.print_exc()
            return HttpResponse(repr(e))


def indexToStr(df):
    newindex = []
    for i in range(0,len(df.index)):
        newindex.append(str(i).replace('.','_'))
    return newindex

def handleXls(request):

    print('recieved an excel chart')
    try:
        print(request.FILES)
        print(request.POST['name'])
        newSetName = request.POST['name']
        file = request.FILES.get('file')

        wb = xlrd.open_workbook(filename=None,file_contents=file.read())
        df = pd.read_excel(wb,engine='xlrd',sheet_name=None)

        sheet_names = wb.sheet_names()

        nameset =[]
        if len(sheet_names) == 1:
            nameset.append(newSetName)
        else:
            for n in sheet_names:
                sheet = wb.sheet_by_name(n)
                if sheet.nrows == 0 or sheet.ncols == 0:
                    continue
                nameset.append(newSetName+'_'+n)

        resultSet = {}
        resultSet['nameset'] = nameset
        resultSet['doc'] = []
        for i in range(0,len(nameset)):
            sheet = wb.sheet_by_index(i)
            mongoDoc = {}
            mongoDoc['name'] = nameset[i]
            mongoDoc['user'] = request.user.username
            df[sheet_names[i]].index = indexToStr(df[sheet_names[i]])
            mongoDoc['data'] = df[sheet_names[i]].to_dict()
            mongoDoc['filesize'] = file.size
            resultSet['doc'].append(mongoDoc)

        return resultSet

    except:
        traceback.print_exc()
        return None


def handleTxt(request):
    try:
        print('received an txt table')
        print(request.FILES)
        newSetName = request.POST['name']
        file = request.FILES.get('file')

        df = pd.read_table(file, delim_whitespace=True) #读txt较为简单 以第一行为header 空格分割即可
                                                        #对于复杂的txt也可以有改动 这个再说
        df.index = indexToStr(df)#转Index

        mongoDoc = {}
        mongoDoc['name'] = newSetName
        mongoDoc['user'] = request.user.username
        mongoDoc['data'] = df.to_dict()
        mongoDoc['filesize'] = file.size
        return mongoDoc
    except Exception as e:
        traceback.print_exc()
        return None

def handleCsv(request):
    try:
        print('recieved an csv chart')
        print(request.FILES)

        newSetName = request.POST['name']
        file = request.FILES.get('file')

        df = pd.DataFrame()
        try:                          #尝试不同编码格式，不行就返回错误
            df = pd.read_csv(file,encoding="gb2312") #国标2312
        except Exception as e:
            traceback.print_exc()
            try:
                df = pd.read_csv(file, encoding="utf-8") #utf-8
            except:
                traceback.print_exc()
                return HttpResponse('false')

        df.index = indexToStr(df)  # 转Index
        mongoDoc = {}
        mongoDoc['name'] = newSetName
        mongoDoc['user'] = request.user.username
        mongoDoc['data'] = df.to_dict()
        mongoDoc['filesize'] = file.size

        return mongoDoc
    except Exception as e:
        traceback.print_exc()
        return None



def createDataset(username,name,content,data_type,filesize):

    try:

        logic_Dataset = DataSet.objects.create(
            name=name,
            user=User.objects.get(username=username),
            created_time=datetime.now(),
            data_type=data_type,
            size=filesize,
            lastUpdated=datetime.now()
        )
        result = logic_Dataset.saveDoc(content)
        if result is not None:
            print('saving is done')
            return True
        else:
            return False


    except Exception as e:
        print(type(e))
        traceback.print_exc()

#更新hdf文件
def updateFile2Hdf(request,type):
    if request.method != 'POST':
        return render_to_response('403.html')

    try:
        path = r'C:\Users\cwj\PycharmProjects\DataVisualizationProject\tmpFile\\'
        savePath = r'C:\Users\cwj\PycharmProjects\DataVisualizationProject\userData\\'  # hdf 路径

        ##文件处理 写入临时文件夹
        print(request.FILES)
        file = request.FILES.get('file')
        f = open(path + file.name, 'wb')
        print(path + file.name)

        for chunk in file.chunks():  # 分块处理
            f.write(chunk)
        f.close()

        mode = request.POST['mode']
        print(mode)
        dataSetName = request.POST['name']
        user = User.objects.get(username=request.user)
        ds = DataSet.objects.get(user=user, name=dataSetName)

        filename = user.username+'_'+dataSetName+'.hdf5'

        if toHdf(path + file.name, savePath + filename, type, mode=mode):
            ds.miliTime = str(round(time.time()*1000))
            ds.save()
            return HttpResponse('just updated ' + filename)
        else:
            return HttpResponse('false')

    except:
        traceback.print_exc()
        return HttpResponse('false')

#对hdf文件的上传与处理
def uploadFile2Hdf(request,type):
    if request.method != 'POST':
        return render_to_response('403.html')
    #先将文件写到临时文件夹里 临时文件夹路径如下

    try:
        path = r'C:\Users\cwj\PycharmProjects\DataVisualizationProject\tmpFile\\'
        savePath = r'C:\Users\cwj\PycharmProjects\DataVisualizationProject\userData\\'  # hdf 路径

        print(request.FILES)
        file = request.FILES.get('file')
        f = open(path + file.name, 'wb')

        for chunk in file.chunks():  # 分块处理
            f.write(chunk)
        f.close()

        # 获取用户
        user = User.objects.get(username=request.user)
        username = user.username
        datasetName = request.POST['name']
        # HDF文件的名字 用户名+数据集名
        hdfName = username + '_' + datasetName + '.hdf5'
        if createHdf5File(hdfName):
            toHdf(path + file.name, savePath + hdfName, type,mode='replace')

        import os
        # 删除源文件
        os.remove(path + file.name)

        if createFileIndex(request.POST['name'],user,type,file.size):
            return HttpResponse('true')
        else:
            return HttpResponse('false')

    except:
        traceback.print_exc()
        return HttpResponse('false')


def createFileIndex(name,user,data_type,filesize):   #hdf格式下使用 创建用户的文件索引
    type = 'E'
    if data_type == 'txt':
        type = 'T'
    elif data_type == 'csv':
        type = 'C'

    try:
        logic_Dataset = DataSet.objects.create(
            name=name,
            user=user,
            created_time=datetime.now(),
            data_type=type,
            size=filesize,
            lastUpdated=datetime.now(),
            miliTime=str(round(time.time()*1000))
        )
        print('saving is done')
        return True


    except Exception as e:
        traceback.print_exc()
        return False


def toHdf(OriginPath,hdfPath,type,mode='update'):

    hdf = pd.HDFStore(hdfPath)

    isAppend = ""
    if mode=='replace':
        isAppend = False
    elif mode == 'update':
        isAppend = True

    file = ""
    if type=='csv':
        try: #格式测试
            file = pd.read_csv(OriginPath, encoding='utf-8', iterator=True)
        except:
            file = pd.read_csv(OriginPath, encoding='gb2312', iterator=True)
    elif type=='xl':
        file = pd.read_excel(OriginPath)
    elif type== 'txt':
        file = pd.read_table(OriginPath, delim_whitespace=True,iterator=True)

    try:
        if type== 'xl':
            hdf.put('data',file, format='t', append=isAppend, data_columns=True,min_itemsize={'values': 50}) #每项的长度
        else:
            while True:
                try:
                    df = file.get_chunk(chunkSize)
                    hdf.put('data', df, format='t', append=isAppend, data_columns=True,min_itemsize={'values': 50}) #每项的长度
                    isAppend = True
                except StopIteration:
                    print('finished iteration')
                    break;

        hdf.close()
        return True

    except Exception as e:
        traceback.print_exc()
        return False

