import pandas as pd
import traceback

path = 'C:\\Users\\cwj\\Desktop\\aqi.xls'
df = pd.read_excel(path)

def strToInt(a):
    return int(a)

def conditionChange(cond): #解决转义问题
    cond = cond.replace('and', '&')  # 为了规避转义问题
    cond = cond.replace('or', '|')
    return cond;

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
                newSelected.append(select([i]))
        selected = newSelected

    return result

# def select(input_df,selected,mode):
#     try:
#
#         input_df.index = input_df.index.map(strToInt)
#         input_df.sort_index(inplace=True)
#
#         if mode == 'selectAll':
#             return input_df
#
#         elif mode == 'byRow' or mode=='byCol':
#             start = 0
#             end =2
#             calDf = input_df
#             if mode == 'byCol':
#                 start = 1
#                 end = 3
#                 calDf = calDf.T
#
#             rows = []
#             for i in selected:
#                 rows.append(calDf[i[start]:i[end]+1])
#
#             if len(rows)>=0:
#                 r0 = rows[0]
#                 for i in range(1,len(rows)):
#                     r0.append(rows[i])
#
#                 if mode == 'byCol':
#                     return r0.T
#                 else:
#                     return r0
#             else:
#                 return pd.DataFrame() #return empty
#
#
#         elif mode == 'specified':
#             divided = divideByCol(selected)
#             dfSet = []
#             for set in divided:
#                 df = pd.DataFrame()
#                 for arr in set:
#                     if len(arr) != 4:  # 确保输入正确
#                         continue
#                     arr[0] = arr[0] - 1
#                     arr[3] = arr[3] + 1
#
#                     tmp = input_df.iloc[arr[0]:arr[2], arr[1]:arr[3]]
#                     df = pd.concat([df,tmp],axis=1)
#
#                 dfSet.append(df)
#
#             result = pd.DataFrame()
#
#             for d in dfSet:
#                 result = result.append(d)
#
#             return result
#
#         return pd.DataFrame()
#     except Exception as e:
#         print(input_df)
#         traceback.print_exc()
#         return pd.DataFrame()

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

                tmp = input_df.iloc[arr[0]:arr[2], arr[1]:arr[3]]
                df = pd.concat([df,tmp],axis=1)

            dfSet.append(df)

        result = pd.DataFrame()

        for d in dfSet:
            result = result.append(d)

        return result
    except Exception as e:
        traceback.print_exc()
        return pd.DataFrame()

def query(input_df,condition,type,afterAction): #此处有很大的安全隐患
    try:
        df = input_df
        cond = eval(condition)
        query_result = df[cond]
        result = calculation(query_result,type,afterAction)
        return result
    except:
        traceback.print_exc()
        return None

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

        if not isinstance(df,pd.DataFrame): #groupby 有些操作不支持
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
        elif action == 'median':
            return df.median(axis=axis)
        elif action == 'mode':
            return df.mode(axis=axis)
        elif action == 'count':
            return df.count()
    except Exception as e:
        traceback.print_exc()

def sliceData(df,type):
    result = []
    if type=='byrow':
        df = df
    elif type=='bycol':
        df = df.T
    for i in df.index:
        result.append(df.loc[i].tolist())

    return result

def selectWholeRows(input_df, selected):
    try:
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

    return result
def runAOption(df,option): #运行一个配置项文件,

    data = {}
    data['main'] = df
    result = {}
    option = [
        {'calculation': {'from': 'main', 'selected': [[1,0,9,1],[1, 2, 9, 2],[1, 3, 9, 3]], 'type': 'row', 'action': 'sum', 'to': 'result0'}},
        {'groupby':{'from':'main','group':['城市','程度'],'selected':[[1, 0, 5580, 8]],'type':'row','action':'count','to':'result1'}},
        {'put':{'from':'main','selected':[[1, 1, 3, 1],[1, 3, 3, 3]],'type':"bycol",'to':'vname1'}},
        {'put':{'from':'result0','selected':[[1,0,1,6]],'type':'bycol','to':'vname2'}},
        {'put':{'from':'result1', 'selected': [[1,2,6,2]], 'type': 'wholeRow', 'to': 'vname3'}},
        {'query':{'from':'main','condition':"(df['城市']=='广州') and (df['PM10']<100)",'action':'sum','type':'row','to':'result2'}}
        ]

    for order in option:
        key = list(order.keys())[0]
        item = order[key]
        origin_data = data[item['from']]
        target = item['to']
        if key == 'calculation':
            input_df = select(origin_data, item['selected'])
            tmp_result = calculation(input_df,item['type'],item['action'])
            data[target] = pd.DataFrame(tmp_result).T
        elif key == 'groupby':
            input_df = select(origin_data, item['selected'])
            tmp_result = groupby(input_df,item['group'],item['type'],item['action'])
            tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result
        elif key == 'query':
            tmp_result = query(df,conditionChange(item['condition']),item['type'],item['action'])
            if isinstance(tmp_result,pd.Series):
                tmp_result = pd.DataFrame(tmp_result).T
            else:
                tmp_result = pd.DataFrame(tmp_result)
            data[target] = tmp_result
        elif key == 'put':

            print(item['type'])
            output_data = []

            if item['type'] == 'wholeCol':
                print(origin_data)
                input_df = selectWholeCols(origin_data,item['selected'])
                print(input_df)
                ouput_data = sliceData(input_df,'bycol')
            elif item['type'] == 'wholeRow':
                input_df = selectWholeRows(origin_data,item['selected'])
                ouput_data = sliceData(input_df,'byrow')
            else:
                input_df = select(origin_data, item['selected'])
                ouput_data = sliceData(input_df, item['type'])

            result[item['to']] = ouput_data

    return result

print(runAOption(df,[]))
# print(sliceData(selectWholeCols(df,[[1,0,3,1]]),'bycol'))

