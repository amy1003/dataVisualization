/**
 * Created by cwj on 2018/4/9.
 */
var  server = 'http://192.168.43.213:80/';
var api = {
    getCharts:server+'getCharts',
    getAllchart:server+'getAllchart',
    deleteChart:server+'deleteChart',
    getCurOption:server+'getCurOption',
    getDataSource:server+'getDataSource',
    uploadFile:server+'uploadFile',
    checkNewName:server+'checkNewName',
    getAllDataset:server+'getAllDataset',
    deleteDataset:server+'deleteDataset',
    getDatasetContent:server+'getDatasetContent',
    createNewChart:server+'createNewChart',
    saveChart:server+'saveChart',
    getChartOption:server+'getChartOption',
    getAllData:server+'getAllData',
    dataProcess:server+'dataProcess',
    runDataOption:server+'runDataOption',
    getApplication:server+'getApplication',
    getAllApplication:server+'getAllApplication',
    addChartToApp:server+'addChartToApp',
    reduceChartFromApp:server+'reduceChartFromApp',
    saveApp:server+'saveApp',
    createApp:'createApp',
    deleteApp:'deleteApp'
};

function checkNewName(newname){
    return simplePost(api.checkNewName,'newname='+newname);
};

function myAlert(content){
    document.getElementById('dangerContent').innerHTML = content;
    $('#modalDanger').modal('toggle');
};

function normalAlert(content){
    document.getElementById('normalContent').innerHTML = content;
    $('#modalNormal').modal('toggle');
};

function myOkAlert(content) {
    document.getElementById('okContent').innerHTML = content;
    $('#modalOk').modal('toggle');
}

function ObjectToUrlEncode(obj){
    var returnStr = "";
    for(var i in obj){
        returnStr+= (i+"="+obj[i]+"&")
    }
    return returnStr;
};

function simpleGet(api){
    return new Promise(function(resolve){
        var xhr = new XMLHttpRequest();
        xhr.open('get',api,true);
        xhr.onload = function(){
            resolve(xhr.responseText);
        };
        xhr.send();
    });
};

function simplePost(api,data,async){
    if(async===undefined){
        async = true;
    }
    return new Promise(function(resolve){
        var xhr = new XMLHttpRequest();
        xhr.open('post',api,async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            resolve(xhr.responseText);
        };
        if(typeof data == 'object'){
            xhr.send(ObjectToUrlEncode(data));
        }
        else if(typeof data == 'string'){
            xhr.send(data);
        }
    });
};

var cloneObj = function(obj){ //深度复制
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
            cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};