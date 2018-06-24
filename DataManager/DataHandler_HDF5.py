import pandas as pd
import traceback
import json
import traceback

#pyTable pandas会自动帮你引入

savePath = r'C:\Users\cwj\PycharmProjects\DataVisualizationProject\userData\\'#hdf 文件保存地点

chunkSize = 1000

pageSize = 5000 #5000分为一页

testFilename = 'cwjghg_hjsjda.hdf5'

def sliceData(df,type): #数据分割成数组就完事了
    result = []
    if type=='byrow':
        df = df
    elif type=='bycol':
        df = df.T
    for i in df.index:
        result.append(df.loc[i].tolist())

    return result

def groupby(input_df,group,type,afterAction):
    try:
        gb = input_df.groupby(group)
        result = calculation(gb,type,afterAction)
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


def select(input_df,selected):
    try:

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

def createHdf5File(name):
    try:
        store = pd.HDFStore(savePath +name)
        store.close()
        return True
    except:
        traceback.print_exc()
        return False

def getByPage(filename,pageNum): #分页获取
    try:

        start = 0
        stop = pageSize
        start = start+int(pageNum)*pageSize
        stop = stop+int(pageNum)*pageSize
        file = pd.HDFStore(savePath+filename)
        df = file.select('data',start=start,stop=stop)
        file.close()
        return df

    except:
        file.close()
        traceback.print_exc()
        return pd.DataFrame() #返回空

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

def select_hdf(filename,selected): #区域选取
    try:

        h5 = pd.HDFStore(savePath+filename)

        divided = divideByCol(selected)

        info = h5.get_storer('data')

        dfSet = []
        for set in divided:
            df = pd.DataFrame()
            for arr in set:
                if len(arr) != 4:  # 确保输入正确
                    continue
                arr[0] = arr[0] - 1
                arr[3] = arr[3] + 1
                # print(arr[0],arr[2], arr[1],arr[3])
                columns = []
                columnsName = info.data_columns
                for i in range(arr[1],arr[3]):
                    columns.append(columnsName[i])
                tmp = h5.select('data',start=arr[0],stop=arr[2],columns=columns)
                df = pd.concat([df,tmp],axis=1)
                # print(df)
            dfSet.append(df)

        result = pd.DataFrame()

        for d in dfSet:
            result = result.append(d)

        h5.close()
        return result
    except Exception as e:
        h5.close()
        traceback.print_exc()
        return pd.DataFrame()

#整行选取与整列选取



def query_hdf(filename,condition,type,afterAction,groups): #hdf上查询
    try:
        h5 = pd.HDFStore(savePath+filename)
        query_result = h5.select('data',where=condition)
        if groups != []:
            query_result = query_result.groupby(groups)

        result = calculation_hdf(query_result,type,afterAction)
        result = result.reset_index()

        h5.close()
        return result
    except:
        h5.close()
        traceback.print_exc()
        return None

def groupby_hdf(input_df,group,type,afterAction): #普通分组
    try:
        gb = input_df.groupby(group)
        result = calculation_hdf(gb,type,afterAction)
        return result.reset_index()
    except Exception as e:
        return None
        traceback.print_exc()


def calculation_hdf(input_df,type,action): #普通计算
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
            return df.sum(axis=axis,numeric_only=True)
        elif action == 'min':
            return df.min(axis=axis,numeric_only=True)
        elif action == 'max':
            return df.max(axis=axis,numeric_only=True)
        elif action == 'mean':
            return df.mean(axis=axis,numeric_only=True)
        elif action == 'count':
            return df.count()
    except Exception as e:
        traceback.print_exc()

def diskGroupby_hdf(filename,groups,type,afterAction): #磁盘分组
    try:
        h5 = pd.read_hdf(savePath+filename,key='data',iterator=True,chunksize=chunkSize)
        df = pd.DataFrame()

        for chunk in h5:
            part_data = calculation_hdf(chunk.groupby(groups), type, afterAction)
            df = df.append(part_data)

        if afterAction=='count':
            df = df.groupby(groups).sum()
            df = df.reset_index()
            return df

        result = calculation_hdf(df.groupby(groups),type,afterAction)

        h5.close()
        return result.reset_index()

    except:
        h5.close()
        traceback.print_exc()
        return pd.DataFrame()

def diskCalculation(filename,type,action): #磁盘计算
    try:
        h5 = pd.read_hdf(savePath+filename,key='data',iterator=True,chunksize=chunkSize)
        df = pd.DataFrame()

        for chunk in h5:
            part_data = calculation_hdf(chunk, type, action)
            part_data = pd.DataFrame(part_data)

            if type == 'row':
                part_data = part_data.T
            df = df.append(part_data)

        if action=='count' and type=='row':
            df = df.sum()
            df = pd.DataFrame(df)
            return df.T

        if type=='row':
            df = calculation_hdf(df, type, action)
            df = pd.DataFrame(df)
            df = df.T

        h5.close()
        return df

    except:
        h5.close()
        traceback.print_exc()
        return pd.DataFrame()

def hdf_wholeCol(filename):
    pass

def hdf_wholeRow(filename):
    pass


def runAOption_hdf(filename,option): #运行一个配置项文件,
    print('runing a dataOption')
    data = {}
    data['main'] = filename
    result = {}
    for order in option:
        key = list(order.keys())[0]
        item = order[key]
        origin_data = data[item['from']]
        target = item['to']

        if key == 'calculation':
            if isinstance(origin_data,str):
                input_df = []
                if item['selected'] == 'selectAll':
                    data[target] = diskCalculation(origin_data,item['type'],item['action'])
                    continue
                else:
                    input_df = select_hdf(origin_data,item['selected'])
            else:
                input_df = select(origin_data,item['selected'])

            tmp_result = calculation(input_df, item['type'], item['action'])
            data[target] = pd.DataFrame(tmp_result).T

        elif key == 'groupby':
            if isinstance(origin_data,str):
                input_df = []
                if item['selected'] == 'selectAll':
                    data[target] = diskGroupby_hdf(origin_data,item['groups'],item['type'],item['action'])
                    continue
                else:
                    input_df = select_hdf(origin_data,item['selected'])
            else:
                input_df = select(origin_data, item['selected'])

            tmp_result = groupby(input_df, item['group'], item['type'], item['action'])
            tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result

        elif key == 'query':
            tmp_result = query_hdf(filename, item['condition'], item['type'], item['action'],item['groups'])
            if isinstance(tmp_result, pd.Series):
                tmp_result = pd.DataFrame(tmp_result).T
            else:
                tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result

        elif key == 'put':


            output_data = []

            if item['type'] == 'wholeCol':
                input_df = []

                if origin_data == filename:

                    input_df= selectWholeCols_hdf(origin_data,item['selected'])
                else:
                    input_df = selectWholeCols(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'bycol')
            elif item['type'] == 'wholeRow':
                input_df = selectWholeRows(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'byrow')
            else:
                input_df = []
                if isinstance(origin_data, str):
                    input_df = select_hdf(origin_data, item['selected'])
                else:
                    input_df = select(origin_data, item['selected'])
                ouput_data = sliceData(input_df, item['type'])

            result[item['to']] = ouput_data


    return result


def selectWholeRows_hdf(filename, selected): #todo
    pass

def selectWholeCols_hdf(filename, selected): #todo
    try:
        h5 = pd.HDFStore(savePath+filename)
        dc = h5.get_storer('data').data_columns
        result = pd.DataFrame()
        for select in selected:
            columns = []
            for j in range(select[1],select[3]+1):
                columns.append(dc[j])
            df = h5.select('data',columns=columns)
            result = pd.concat([result,df],axis=1)

        return result
    except Exception as e:
        traceback.print_exc()
        return pd.DataFrame()

# print(runAOption_hdf(testFilename,{}))
# print(diskGroupby_hdf(testFilename,['城市','程度',],'row','count'))