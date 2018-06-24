import pandas as pd
import traceback
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from MyModel.models import *
from django.shortcuts import render_to_response
from django.core.exceptions import ObjectDoesNotExist
from datetime import  datetime
import json
import traceback
import DataManager.MongoDB
import pandas as pd
from DataManager.Api import dictToJson
import DataManager.DataHandler_HDF5 as HDF


Chart = testChart

def strToInt(a):
    return int(a)

def conditionChange(cond): #解决转义问题
    cond = cond.replace('and', '&')  # 为了规避转义问题
    cond = cond.replace('or', '|')
    return cond

def divideByCol(selected):
    result = []
    while(len(selected)>0):
        set = []
        cur = selected.pop(0)
        set.append(cur)
        index = []
        for i in range(0, len(selected)):
            if(len(selected[i])!=4):
                continue
            else:
                if cur[0]==selected[i][0] and cur[2]==selected[i][2]:
                    index.append(i)

        for i in index:
            set.append(selected[i])
        result.append(set)

        newSelected = []
        for i in range(0, len(selected)):
            if not i in index:
                newSelected.append(selected[i])
        selected = newSelected

    return result

def select(input_df,selected):
    try:

        input_df.index = input_df.index.map(strToInt) #在选择阶段保证索引正确,从字符转为数字
        input_df.sort_index(inplace=True)             #将数字重排序 速度很快

        if selected == 'selectAll': #全选模式不做任何处理
            return input_df

        divided = divideByCol(selected)
        dfSet = []
        for set in divided:
            df = pd.DataFrame()
            for arr in set:
                if len(arr) != 4:  # 确保输入正确
                    continue
                arr[0] = arr[0] - 1
                arr[3] = arr[3] + 1
                # print(arr[0],arr[2], arr[1],arr[3])
                tmp = input_df.iloc[arr[0]:arr[2], arr[1]:arr[3]]
                df = pd.concat([df,tmp],axis=1)
                # print(df)
            dfSet.append(df)

        result = pd.DataFrame()

        for d in dfSet:
            result = result.append(d)

        return result
    except Exception as e:
        traceback.print_exc()
        return pd.DataFrame()


def selectWholeRows(input_df, selected):
    try:
        if selected == 'selectAll':
            s = []
            s.append(1)
            s.append(123) #whatever
            s.append(len(input_df.index)+1)
            selected = []
            selected.append(s)

        rows = pd.DataFrame()
        for i in selected:
            rows = rows.append(input_df[(i[0] - 1):i[2]])

        return rows
    except Exception as e:
        traceback.print_exc()
        return pd.DataFrame()

def selectWholeCols(input_df, selected):
    try:
        rows = pd.DataFrame()
        input_df = input_df.T
        for i in selected:
            rows = rows.append(input_df[i[1]:(i[3] + 1)])

        return rows.T
    except Exception as e:
        traceback.print_exc()
        return pd.DataFrame()

def query(input_df,condition,type,afterAction,groups): #此处有很大的安全隐患
    try:
        df = input_df
        cond = eval(condition)
        query_result = df[cond]
        if groups != []:
            query_result = query_result.groupby(groups)

        result = calculation(query_result,type,afterAction)
        result = result.reset_index()
        return result
    except:
        traceback.print_exc()
        return None

def groupby(input_df,group,type,afterAction):
    try:
        gb = input_df.groupby(group)
        result = calculation(gb,type,afterAction)
        print(result.reset_index())
        return result.reset_index()
    except Exception as e:
        return None
        traceback.print_exc()

def calculation(input_df,type,action):
    try:
        df = input_df
        axis = 0
        if type == 'col':
            axis = 1

        if not isinstance(df,pd.DataFrame) and (action == 'mean' or action == 'median'): #groupby 有些操作不支持
            if action == 'mean':
                return df.mean()
            if action == 'median':
                return df.median()

        if action == 'sum':
            print(axis)
            return df.sum(axis=axis,numeric_only=True)
        elif action == 'min':
            return df.min(axis=axis,numeric_only=True)
        elif action == 'max':
            return df.max(axis=axis,numeric_only=True)
        elif action == 'mean':
            return df.mean(axis=axis,numeric_only=True)
        elif action == 'median':
            return df.median(axis=axis)
        elif action == 'mode':
            return df.mode(axis=axis)
        elif action == 'count':
            return df.count()
    except Exception as e:
        traceback.print_exc()


def dataProcess(request): #处理单独一个请求
    if request.method != 'POST':
        return render_to_response('403.html')
    try:
        jsonstr = request.POST['order']
        print(jsonstr)
        chartname = request.POST['cname']

        user = User.objects.get(username=request.user)
        ds = Chart.objects.get(name=chartname, user=user).data_source
        df = ds.getDocInDataFrame()

        order = json.loads(jsonstr)
        print(order)

        procee_type = list(order.keys())[0]
        para = order[procee_type]

        result = pd.DataFrame()

        if procee_type == 'calculation':
            input_df = select(df, para['selected'])#对数据切块
            result = calculation(input_df,para['type'],para['action'])
            result = pd.DataFrame(result)
            result = result.T
        elif procee_type == 'groupby':
            input_df = select(df, para['selected'])#对数据切块
            result = groupby(input_df,para['group'],para['type'],para['action'])
            if result is None:
                return HttpResponse('分组运算错误，请检查维度是否在选择范围内')
            result = pd.DataFrame(result)
        elif procee_type == 'query':
            para['condition'] = conditionChange(para['condition']) #解决转义问题
            print(para['condition'])
            print(para['condition'])
            result = query(df,para['condition'],para['type'],para['action'],para['groups'])
            if result is None:
                return HttpResponse('发生了错误，请查询条件格式是否正确，及查询维度是否在范围内')
            if isinstance(result,pd.Series):
                result = pd.DataFrame(result).T
            else:
                result = pd.DataFrame(result)


        jsonresult = result.to_json(force_ascii=False,orient='index')

        return HttpResponse(jsonresult)

    except Exception as e:
        traceback.print_exc()
        print(type(e))
        return HttpResponse('发生了错误')

def dataProcess_hdf(request): #处理单独一个请求

    if request.method != 'POST':
        return render_to_response('403.html')
    try:
        jsonstr = request.POST['order']
        chartname = request.POST['cname']

        user = User.objects.get(username=request.user)
        ds = Chart.objects.get(name=chartname, user=user).data_source
        filename = user.username+'_'+ds.name+'.hdf5'

        order = json.loads(jsonstr)

        procee_type = list(order.keys())[0]
        para = order[procee_type]


        result = pd.DataFrame()

        if procee_type == 'calculation':
            if para['selected'] == 'selectAll':
                result = HDF.diskCalculation(filename,para['type'],para['action'])
            else:
                input_df = HDF.select_hdf(filename,para['selected'])
                result = calculation(input_df,para['type'],para['action'])
                result = pd.DataFrame(result)
                result = result.T
        elif procee_type == 'groupby':
            if para['selected'] == 'selectAll':
                result = HDF.diskGroupby_hdf(filename,para['group'],para['type'],para['action'])

            else:
                input_df = HDF.select_hdf(filename,para['selected'])#对数据切块
                result = groupby(input_df,para['group'],para['type'],para['action'])
                if result is None:
                    return HttpResponse('分组运算错误，请检查维度是否在选择范围内')
                result = pd.DataFrame(result)
        elif procee_type == 'query':
            para['condition'] = para['condition'] #解决转义问题

            result = HDF.query_hdf(filename,para['condition'],para['type'],para['action'],para['groups'])
            if result is None:
                return HttpResponse('发生了错误，请查询条件格式是否正确，及查询维度是否在范围内')
            if isinstance(result,pd.Series):
                result = pd.DataFrame(result).T
            else:
                result = pd.DataFrame(result)


        jsonresult = result.to_json(force_ascii=False,orient='index')

        return HttpResponse(jsonresult)

    except Exception as e:
        traceback.print_exc()
        print(type(e))
        return HttpResponse('发生了错误')

def sliceData(df,type): #数据分割成数组就完事了
    result = []
    if type=='byrow':
        df = df
    elif type=='bycol':
        df = df.T
    for i in df.index:
        result.append(df.loc[i].tolist())

    return result


def runAOption(df,option): #运行一个配置项文件,
    data = {}
    data['main'] = df
    result = {}
    # option = [
    #     {'calculation': {'from': 'main', 'selected': [[1,0,9,1],[1, 2, 9, 2],[1, 3, 9, 3]], 'type': 'row', 'action': 'sum', 'to': 'result0'}},
    #     {'groupby': {'from': 'main', 'group': ['城市', '程度'], 'selected': [[1, 0, 5580, 8]], 'type': 'row',
    #                  'action': 'count', 'to': 'result1'}},
    #     {'put': {'from': 'main', 'selected': [[1, 1, 2, 2]], 'type': "col", 'to': 'vname1'}},
    #     {'put': {'from': 'result0', 'selected': [[1, 0, 1, 6]], 'type': 'row', 'to': 'vname2'}},
    #     {'put': {'from': 'result1', 'selected': [[1, 2, 12, 2]], 'type': 'row', 'to': 'vname3'}},
    #     # {'query':{'from':'main','condition':"(df['城市']=='广州') and (df['PM10']<100)",'action':'sum','type':'row','to':'result2'}}
    # ]

    for order in option:
        key = list(order.keys())[0]
        item = order[key]
        origin_data = data[item['from']]
        target = item['to']
        if key == 'calculation':
            input_df = select(origin_data, item['selected'])
            tmp_result = calculation(input_df, item['type'], item['action'])
            data[target] = pd.DataFrame(tmp_result).T
        elif key == 'groupby':
            input_df = select(origin_data, item['selected'])
            tmp_result = groupby(input_df, item['group'], item['type'], item['action'])
            tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result
        elif key == 'query':
            tmp_result = query(df, conditionChange(item['condition']), item['type'], item['action'],item['groups'])
            if isinstance(tmp_result, pd.Series):
                tmp_result = pd.DataFrame(tmp_result).T
            else:
                tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result

        elif key == 'put':

            output_data = []

            if item['type'] == 'wholeCol':

                input_df = selectWholeCols(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'bycol')
            elif item['type'] == 'wholeRow':
                input_df = selectWholeRows(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'byrow')
            else:
                input_df = select(origin_data, item['selected'])
                ouput_data = sliceData(input_df, item['type'])

            result[item['to']] = ouput_data

    return result


def runAOption_hdf(filename,option): #运行一个配置项文件,
    data = {}
    data['main'] = filename
    result = {}
    # option = [
    #     {'calculation': {'from': 'main', 'selected': [[1,0,9,1],[1, 2, 9, 2],[1, 3, 9, 3]], 'type': 'row', 'action': 'sum', 'to': 'result0'}},
    #     {'groupby': {'from': 'main', 'group': ['城市', '程度'], 'selected': [[1, 0, 5580, 8]], 'type': 'row',
    #                  'action': 'count', 'to': 'result1'}},
    #     {'put': {'from': 'main', 'selected': [[1, 1, 2, 2]], 'type': "col", 'to': 'vname1'}},
    #     {'put': {'from': 'result0', 'selected': [[1, 0, 1, 6]], 'type': 'row', 'to': 'vname2'}},
    #     {'put': {'from': 'result1', 'selected': [[1, 2, 12, 2]], 'type': 'row', 'to': 'vname3'}},
    #     {'query':{'from':'main','condition':"城市=='广州'&PM10<100",'action':'sum','type':'row','to':'result2','groups':[]}}
    # ]

    for order in option:
        key = list(order.keys())[0]
        item = order[key]
        origin_data = data[item['from']]
        target = item['to']

        if key == 'calculation':
            if isinstance(origin_data,str):
                input_df = []
                if item['selected'] == 'selectAll':
                    data[target] = HDF.diskCalculation(origin_data,item['type'],item['action'])
                    continue
                else:
                    input_df = HDF.select_hdf(origin_data,item['selected'])
            else:
                input_df = select(origin_data,item['selected'])

            tmp_result = calculation(input_df, item['type'], item['action'])
            data[target] = pd.DataFrame(tmp_result).T

        elif key == 'groupby':
            if isinstance(origin_data,str):
                input_df = []
                if item['selected'] == 'selectAll':
                    data[target] = HDF.diskGroupby_hdf(origin_data,item['group'],item['type'],item['action'])
                    continue
                else:
                    input_df = HDF.select_hdf(origin_data,item['selected'])
            else:
                input_df = select(origin_data, item['selected'])

            tmp_result = groupby(input_df, item['group'], item['type'], item['action'])
            tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result

        elif key == 'query':
            tmp_result = HDF.query_hdf(filename, item['condition'], item['type'], item['action'],item['groups'])
            if isinstance(tmp_result, pd.Series):
                tmp_result = pd.DataFrame(tmp_result).T
            else:
                tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result

        elif key == 'put':

            print(item['type'])
            output_data = []

            if item['type'] == 'wholeCol':
                input_df = []
                if isinstance(origin_data,str):
                    input_df = HDF.selectWholeCols_hdf(filename,item['selected'])
                else:
                    input_df = selectWholeCols(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'bycol')
            elif item['type'] == 'wholeRow':
                input_df = selectWholeRows(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'byrow')
            else:
                input_df = []
                if isinstance(origin_data, str):
                    input_df = HDF.select_hdf(origin_data, item['selected'])
                else:
                    input_df = select(origin_data, item['selected'])
                ouput_data = sliceData(input_df, item['type'])

            result[item['to']] = ouput_data

    return result


#处理一个数据配置项，并将数据打包返回
def processADataOption(request):
    if request.method!='POST':
        return render_to_response('403.html')
    try:
        chartname = request.POST['chartname']
        optionstr = request.POST['dataoption']

        print('chartName:' + ' ' + chartname)
        if optionstr == []:
            return HttpResponse(dictToJson({})) #空时不处理
        user = User.objects.get(username=request.user)
        chart = Chart.objects.get(user=user,name=chartname)
        ds = chart.data_source

        #hdf运算时候需要获取数据名字
        filename = user.username+'_'+ds.name+'.hdf5'

        miliTime = ds.miliTime #毫秒时间

        result = {'status':'false','miliTime':miliTime} #数据没更新时的返回

        try:
            chartMili = request.POST['miliTime']
            dataOption = json.loads(optionstr)
            print('chart:'+chartMili)
            print('data:' + miliTime)
            if(chartMili != miliTime):
                # if not ds.lastUpdated == chart.dataLastUpdated:
                #     chart.dataLastUpdated = ds.lastUpdated
                #     chart.save()

                # 运行一个配置项得到结果

                # result = runMethod(df, dataOption)
                result = runAOption_hdf(filename, dataOption)
                result['app_data_miliTime'] = miliTime
                # else:
                #     print('wont calculate')
            else:
                print('no data update')
        except:
            print('mili not exist')

        return HttpResponse(dictToJson(result))

    except:
        traceback.print_exc()
        return HttpResponse('run DataOption error')


