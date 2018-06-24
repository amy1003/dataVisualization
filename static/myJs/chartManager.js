/**
 * Created by cwj on 2018/5/2.
 */
//图表管理

//从界面获取图表名字
var chartName = $('#chartName').get(0).innerHTML;

function getChartOption(){
    simplePost('getChartOption',{chartName:chartName}).then(function(result){
        console.log(JSON.parse(result))
    });
}

//
var currentChartManager = {}; //当前的表管理对象

function ChartManager(chart){

    //-----------------------数据格式规范-----------------
    var toDataFormat1=function(data){   //柱状图数据格式处理
        if(data.length==0){
            alert('请选择至少一组数据!');
            return null;
        }
        else if(data.length==2){
            return toDataFormat2(data);
        }
        return data[0];
    };
    var toDataFormat2=function(data){   //线状图数据格式处理
        if(data.length<2){
            alert('请选择两组数据，第一组为名称，第二组为数据');
            return null;
        }
        var dataset = [];
        if(data.length==3){
            var combine = [];
            for(var i=0;i<data[0].length;i++){
                combine[i] = data[0][i] +':'+ data[1][i];
            }
            dataset.push(combine);
            dataset.push(data[2]);
            return toDataFormat2(dataset);
        }
        else{
            dataset = data;
        }
        var dataResult = [];
        for(var i=0;i<data[0].length;i++){
            dataResult.push({'name':data[0][i],'value':data[1][i]});
        }
        return dataResult;
    };

    var defaultMainChart = { //默认的内容

        backgroundColor:'transparent',

        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

        tooltip:{
            show:true,
            trigger:'item',
        },

        dataZoom:[],

        parallel:{
            zlevel: 0,
            z: 2,
            left: 80,
            top: 60,
            right: 80,
            bottom: 60,
            width: 'auto',
            height: 'auto',
            layout: 'horizontal',
            axisExpandable: false,
        },

        parallelAxis:[],

        toolbox: {
            feature:{
                dataZoom: {},
                dataView: {readOnly: false},
                magicType: {},
                restore: {},
                saveAsImage: {}
            },
            show:true,
            left:"80%",
            top:"0%"
        },

        title:[],

        legend:{
            textStyle:{
                fontSize:12
            }
        },

        visualMap:[],

        calendar:[],

        geo:[],

        grid:[{
            gname:'grid0',
        }],

        xAxis:[ {
            type: 'category',
            gridIndex:0,
            data:[1,2,3,4,5,50]
        }],
        yAxis:[ {
            type: 'value',
            gridIndex:0,
            data:[1,2,3,4,5,50]
        }],

        singleAxis:[],

        series: [],

        visualizations:{},

        dataOptions:[],  //存放在此

        resultCount:0

    };

    var MainChart = {};

    var interface = {

         //-----------------------------------以下为数据配置项相关--------------------------------

        //dataOption
        getResultCount:function(){
            if(MainChart.hasOwnProperty('resultCount')){
                return MainChart.resultCount;
            }
            else{
                return 0;
            }
        },

        saveDataOption:function(order,putOption){
            if(MainChart.dataOptions==undefined){
                MainChart.dataOptions = [];
            }
            if(order!=undefined)MainChart.dataOptions.push(order);
            MainChart.dataOptions.push(putOption);
            console.log(MainChart.dataOptions);
        },

        reduceDataOption:function(option){  //删除部分

        },

        deleteDataOption:function(option){ //删除全部

        },

        getDataOptions:function(){
            return MainChart.dataOptions;
        },

        //发送数据配置项，获取数据并且分发
        askForDataUpdate:function(){

        },

        //-----------------------------------以上为数据配置项相关-----------------------------------

        //------------------------------------常用的函数----------------------------------------
        getMainChart:function(){
            return MainChart;
        },

        deleteMany:function(target,idexName,value){
            var result = [];
            for(var i=0;i<target.length;i++){
                if(target[i][idexName] != value){
                    result.push(target[i]);
                }
            }
            return result;
        },

        extractDefault:function(para){
            var result = {};
            for(name in para){
                if(para[name]['type'] == 'wrapper'){
                    result[name] = this.extractDefault(para[name]['initPara']);
                }
                else{
                    result[name] = para[name]['default'];
                }
            }
            return result;
        },

        applyDefault:function(para,defaultOption){
            for(name in para){
                if(para[name]['type'] === 'wrapper'){
                    if(defaultOption[name] === undefined)continue;
                    this.applyDefault(para[name]['initPara'],defaultOption[name]);
                }
                else{
                    if(defaultOption.hasOwnProperty(name)){
                        para[name]['default'] = defaultOption[name];
                    }
                }
            }
            for(name in defaultOption){
                if(para.hasOwnProperty(name)){
                    continue;
                }
                else{
                    para[name] = {'default':defaultOption[name]};
                }
            }
        },

        getByIndex:function(set,indexName,value){
            for(var i=0;i<set.length;i++){
                if(value==set[i][indexName]){
                    return set[i];
                }
            }
            return {};
        },

        checkUnique:function(set,name,value){
            for(var i=0;i<set.length;i++){
                if(set[name]==value){
                    alert('名字:'+name+'已存在，请换一个名字!');
                    return false;
                }
            }
            return true;
        },

        getIndexByName:function(set,name,value){
            for(var i=0;i<set.length;i++){
                if(value === set[i][name]){
                    return i;
                }
            }
            return -1;
        },

        renew:function(){
            chart.setOption(MainChart);
        },
        rerender:function(){
            chart.setOption(MainChart,true,true);
        },
        saveChart:function(){
            MainChart.resultCount = DataManager.count;
            simplePost(api.saveChart,{jsonChart:JSON.stringify(MainChart),chartName:chartName}).then(function(result){
                if(result === 'true'){
                    myOkAlert('保存成功!');
                }
                else{
                    myAlert('保存失败!');
                }
            });
        },

        //---------------------backgroundColor-------------------

        setBgColor:function(value){
            MainChart.backgroundColor = value;
            this.renew();
        },

        getBgColor:function(){
            return MainChart.backgroundColor;
        },

        //--------------------color------------------------------

        setColors:function(value){
            MainChart.color = value;
            this.renew();
        },

        getColors:function(){
            return MainChart.color;
        },

        //--------------------Legend------------------------------

        setLegend:function(option){
            MainChart.legend = option;
            this.renew();
        },

        getLegendInitPara:function(){
            var para = createLegendPara();
            this.applyDefault(para,MainChart.legend);
            return para;
        },

        //------------------ToolBox----------------------------------

        setToolBox:function(option){
            MainChart.toolbox = option;
            this.renew();
        },
        getToolBoxInitPara:function(){
            var para = createToolBoxPara();
            this.applyDefault(para,MainChart.toolbox);
            return para;
        },

        //-------------------ToolTip----------------------------------
        setToolTip:function(option){
            MainChart.tooltip = option;
            this.renew();
        },
        getToolTipInitPara:function(){
            var para = createToolTipPara();
            this.applyDefault(para,MainChart.tooltip);
            return para;
        },


        //------------------DataZoom---------------------------------

        DataZoom:{
            dataZoomObj:function(dzname){
                this.dzname = dzname;
                this.index = interface.getIndexByName(MainChart.dataZoom,'dzname',dzname);
                if(MainChart.dataZoom[this.index].hasOwnProperty('xAxisIndex')){
                    this.axis = 'x';
                }
                else if(MainChart.dataZoom[this.index].hasOwnProperty('yAxisIndex')){
                    this.axis = 'y';
                }
                this.update = function(option){
                    console.log(option);
                    for(name in option){
                        MainChart.dataZoom[this.index][name] = option[name];
                    }
                    interface.renew();
                };
                this.getInitPara = function(){
                    var initPara = createDataZoomPara(this.axis);
                    interface.applyDefault(initPara,MainChart.dataZoom[this.index]);
                    return initPara;
                };
            },
            create:function(dzname,type){  //创建标题
                var defaultOption = interface.extractDefault(createDataZoomPara(type));
                for(var i =0;i<MainChart.title.length;i++){
                    if(MainChart.title[i]['dzname']==dzname){
                        return false;
                    }
                }
                defaultOption['dzname'] = dzname;
                MainChart.dataZoom.push(defaultOption);
                interface.renew();
                return true;
            },
            get:function(dzname){
                return new this.dataZoomObj(dzname);
            },
            getAll:function(){
                var result = [];
                for(var i in MainChart.dataZoom){
                    result.push(this.get(MainChart.dataZoom[i]['dzname']));
                }
                return result;
            },
            delete:function(dzname){
                var tmp = this.get(dzname);
                MainChart.dataZoom.splice(tmp.index,1);
                tmp = null;
           },
        },

        //------------------Title------------------------------------
        Title:{

            titleObj:function(tname){
                this.tname = tname;
                this.index = interface.getIndexByName(MainChart.title,'tname',tname);
                this.update = function(option){
                    console.log(option);
                    for(name in option){
                        MainChart.title[this.index][name] = option[name];
                    }
                    interface.renew();
                };
                this.getInitPara = function(){
                    var initPara = createTitlePara();
                    interface.applyDefault(initPara,MainChart.title[this.index]);
                    return initPara;
                };
            },
            create:function(tname){  //创建标题
                var defaultOption = interface.extractDefault(createTitlePara());
                for(var i =0;i<MainChart.title.length;i++){
                    if(MainChart.title[i]['tname']==tname){
                        return false;
                    }
                }
                defaultOption['tname'] = tname;
                MainChart.title.push(defaultOption);
                interface.renew();
                return true;
            },
            get:function(tname){
                return new this.titleObj(tname);
            },
            getAll:function(){
                var result = [];
                for(var i in MainChart.title){
                    result.push(this.get(MainChart.title[i]['tname']));
                }
                return result;
            },
            delete:function(tname){
                var tmp = this.get(tname);
                MainChart.title.splice(tmp.index,1);
                tmp = null;
           },
        },
        //------Title-----------------------------------------

        //------Grid------------------------------------------

        Grid:{

           gridObj:function(gname){

                this.gname = gname;
                this.index = interface.getIndexByName(MainChart.grid,'gname',gname);
                this.getGridObj = function(){
                    return MainChart.grid[this.index];
                };
                this.update = function(option){
                    var obj = this.getGridObj();
                    option['gname'] = this.gname;
                    for(name in option){
                        obj[name] = option[name];
                    }
                    interface.renew();
                };
                this.getInitPara = function(){
                    var obj = this.getGridObj();
                    var para = createGridPara();
                    interface.applyDefault(para,obj);
                    return para;
                };

                this.getAxis = function(type){
                    var target = {};
                    if(type === 'x')target = MainChart.xAxis;
                    else if(type === 'y')target = MainChart.yAxis;
                    var result = {};
                    for(var i=0;i<target.length;i++){
                        if(target[i].gridIndex === this.index){
                            return target[i];
                        }
                    }
                    return result;
                };
                this.getAxisIndex = function(type){
                    var target = {};
                    if(type === 'x')target = MainChart.xAxis;
                    else if(type === 'y')target = MainChart.yAxis;
                    var result = {};
                    for(var i=0;i<target.length;i++){
                        if(target[i].gridIndex === this.index){
                            return i;
                        }
                    }
                    return -1;
                },
                this.getAxisInitPara = function(type){
                     var para = createAxisPara();
                     interface.applyDefault(para,this.getAxis(type));
                     return para;
                };
                this.setAxis = function(type,option){
                    var axis = this.getAxis(type);
                    for(name in option){
                        axis[name] = option[name];
                    }
                    interface.renew();
                };
                this.setAxisTick = function(type,data){
                    var processedData = toDataFormat1(data);
                    var a = this.getAxis(type);
                    a['type'] = 'category';
                    a['data'] = processedData;
                    interface.renew();
                };
                this.deleteAxis = function(){

                    //此处应有级联删除
                    //TODO

                    for(var i=0;i<MainChart.series;i++){
                        var a = MainChart.series;
                        if(a[i]['xAxisIndex'] == this.getAxisIndex('x')){
                            a.splice(i,1);
                        }
                        else if(a[i]['yAxisIndex'] == this.getAxisIndex('y')){
                            a.splice(i,1);
                        }
                    }

                    for(var i=0;i<MainChart.yAxis.length;i++){
                        if(MainChart.yAxis[i].gridIndex == this.index){
                            MainChart.xAxis.splice(i,1);
                        }
                    }
                    for(var i=0;i<MainChart.xAxis.length;i++){
                        if(MainChart.xAxis[i].gridIndex == this.index){
                            MainChart.yAxis.splice(i,1);
                        }
                    }
                };
           },
           create:function(gname){
                var defaultOption = interface.extractDefault(createGridPara());
                for(var i=0;i<MainChart.grid.length;i++){
                    if(MainChart.grid[i]['gname'] == gname){
                        return false;
                    }
                }
                defaultOption['gname'] = gname;
                MainChart.grid.push(defaultOption);
                var index = this.get(gname).index;
                //-----------插入坐标轴-------------
                MainChart.xAxis.push({
                    type: 'category',
                    gridIndex:index,
                    position:'bottom',
                    data:[1,2,3,4,5,6]
                });
                MainChart.yAxis.push({
                    type: 'value',
                    gridIndex:index,
                    position:'right'
                });
                //-------test---------------
                interface.renew();
                return true;
           },
           get:function(gname){
                return new this.gridObj(gname);
           },
           getAll:function(){
                var result = [];
                for(var i in MainChart.grid){
                    result.push(this.get(MainChart.grid[i]['gname']));
                }
                return result;
           },
           delete:function(gname){
                var tmp = this.get(gname);
                MainChart.grid.splice(tmp.index,1);
                tmp = null;
           },

        },
        //------------------------Axis---------------------------------------------

        Axis:{

            axisobj:function(type,aname){
                this.type = type;
                this.aname = aname;
                this.serires = null;
                for(var i=0;i<MainChart[type].length;i++){
                    if(MainChart[type][i]['aname'] === aname){
                        this.series = MainChart[type][i];
                    }
                }
                if(this.series === null){
                    alert(type + ' '+ aname + ' ' +'init Fail!');
                    return ;
                }
                this.getInitPara = function(){
                    var para = getAxisInitPara(this.type);
                    interface.applyDefault(para,this.series);
                    return para;
                };

                this.setTick = function(data){
                    if(this.type === 'parallel' || this.type === 'singleAxis'){
                        this.series.data = data;
                    }
                    return ;
                }
            },
            get:function(type,aname){
                return new this.axisobj(type,aname);
            },
            getAllByType:function(type){
                var set = [];
                if(type==='geo'){
                    set = MainChart.geo;
                }
                else if(type === 'singleAxis'){
                    set = MainChart.singleAxis;
                }
                else if(type === 'calendar'){
                    set = MainChart.calendar;
                }
                else if(type === 'parallel'){
                    set = MainChart.parallelAxis;
                }
                var result = [];
                for(var i=0;i<set.length;i++){
                    result.push(this.get(type,set[i]['aname']));
                }
                return result;
            },
            delete:function(type,aname){

            }
        },

        singleAxis:{
            create:function(aname){
                if(interface.checkUnique(MainChart.singleAxis,'aname',aname)){
                    var para = createSingleAxisPara();
                    var init = interface.extractDefault(para);
                    init['aname'] = aname;
                    MainChart.singleAxis.push(init);
                    interface.renew();
                }
                else{
                    alert('创建失败');
                }
            }
        },

        geo:{
            create:function(aname){
                if(interface.checkUnique(MainChart.geo,'aname',aname)){
                    var para = createGeoPara();
                    var init = interface.extractDefault(para);
                    init.aname = aname;
                    MainChart.geo.push(init);
                    interface.renew();
                }
                else{
                    alert('创建失败');
                }
            }
        },

        calendar:{
            create:function(aname){
                if(interface.checkUnique(MainChart.calendar,'aname',aname)){
                    var para = createCalendarPara();
                    var init = interface.extractDefault(para);
                    init.aname = aname;
                    MainChart.calendar.push(init);
                    interface.renew();
                }
                else{
                    alert('创建失败');
                }
            }
        },

        parallel:{
            create:function(aname){
                if(interface.checkUnique(MainChart.parallelAxis,'aname',aname)){
                    var para = createParallelAxisPara();
                    var init = interface.extractDefault(para);
                    init.aname = aname;
                    init.dim = MainChart.parallelAxis.length;
                    MainChart.parallelAxis.push(init);
                    interface.rerender();
                }
                else{
                    alert('创建失败');
                }
            }
        },

        //-----------------------VisualMap-----------------------------------------
        VisualMap:{
            obj:function(index){
                this.index = index;
                this.obj = MainChart.visualMap[index];
                this.update=function(option){
                    for(name in option){
                        MainChart.visualMap[index][name] = option[name];
                    }
                    interface.renew();
                };
                this.getInitPara = function(){
                    var para = createVisualMap();
                    interface.applyDefault(para,MainChart.visualMap[this.index]);
                    return para;
                }
            },
            getAll:function(){
                var set = [];
                for(var i=0;i<MainChart.visualMap.length;i++){
                    set.push(new this.obj(i));
                }
                return set;
            },
            remove:function(index){
                MainChart.visualMap.splice(index,1);
            },
            create:function(){
                var option = interface.extractDefault(createVisualMap());
                MainChart.visualMap.push(option);
                interface.rerender();
            },
            update:function(index,option){
                MainChart.visualMap[index] = option;
            },
        },

        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        Visualizations:{
            getAll:function(){
                var set = [];
                for(name in MainChart.visualizations){
                    set.push(new interface.seriesObj(name));
                }
                return set;
            },
            get:function(vname){
                try{
                    return new interface.seriesObj(vname);
                }catch(e){
                    return null;
                    console.log(e);
                }
            },
            register:function(type,vname){
                for(var i =0;i<MainChart.series.length;i++){
                    if(MainChart.series[i]['vname']==vname){
                        MainChart.visualizations[vname] = {
                            vname:vname,
                            type:type,
                        }
                    }
                }
            },
            checkUnique:function(vname){
                if(MainChart.visualizations.hasOwnProperty(vname)){
                    return false;
                }
                return true;
            },
            delete:function(vname){
                var obj = this.get(vname);
                var index = obj.index;
                MainChart.series.splice(index,1);
                delete MainChart.visualizations[vname]; //从注册表中删除
                interface.rerender();
                return true;
            }
        },

        seriesObj:function(vname){
                console.log(MainChart.visualizations);
                if(!MainChart.visualizations.hasOwnProperty(vname)){
                    alert('初始化错误!');
                }
                var t = MainChart.visualizations[vname];
                this.vname = vname;
                for(var i=0;i<MainChart.series.length;i++){
                    if(vname == MainChart.series[i].vname){
                        this.index = i;
                    }
                }
                this.series = MainChart.series[this.index];
                this.type = t['type'];

                this.setData = function(data){
                    var processedData = interface[this.type].dataFormatProcess(data);
                    this.series.data = processedData;
                    console.log(this);

                    interface.renew();
                };

                this.update = function(option){
                    for(name in option){
                        this.series[name] = option[name];
                    }
                    interface.renew();
                };

                this.getInitPara = function(){
                    console.log(this);
                    var para = getSeriesInitPara(this.type);
                    interface.applyDefault(para,this.series);
                    return para;
                };
                this.addMarkLine = function(data){
                    this.series.markPoint.data.push(data);
                };
                this.addMarkPoint = function(data){
                    this.series.markLine.data.push(data);
                };
                this.removePointMark = function(){
                   this.series.markPoint.data = [];
                };
                this.removeLineMark = function(){
                    this.series.markLine.data = [];
                }
        },
        //----------------Bar-------------------------------------------------------

        bar:{
            create:function(vname,name,grid){  //bar 的参数初始化
                if(!interface.Visualizations.checkUnique(vname)){
                    myAlert('您的命名重复了，请重新命名');
                    return;
                }
                MainChart.series.push({
                    type:'bar',
                    name:name,
                    vname:vname,
                    xAxisIndex:grid.getAxisIndex('x'),
                    yAxisIndex:grid.getAxisIndex('y'),
                    data:[],
                    barCategoryGap:'20%',
                    barGap:'30%',
                    stack:null,
                });
                interface.Visualizations.register('bar',vname);
            },
            dataFormatProcess:toDataFormat1  //bar的数据处理格式
        },
        pie:{
            create:function(vname,name){
                if(!interface.Visualizations.checkUnique(vname)){
                    myAlert('您的命名重复了，请重新命名');
                    return;
                }
                MainChart.series.push({ //pie 的初始化参数
                    type:'pie',
                    name:name,
                    vname:vname,
                    data:[],
                    center: ['50%', '50%'],
                    radius: [0, '50%'],
                    legendHoverLink: true,
                    hoverAnimation: true,
                    hoverOffset: 10,
                    selectedMode: false,
                    selectedOffset: 10,
                    clockwise: true,
                    startAngle: 90,
                    minAngle: 0,
                    roseType: false,
                });
                interface.Visualizations.register('pie',vname);
            },
            dataFormatProcess:toDataFormat2
        },
        line:{
            create:function(vname,name,grid){
                if(!interface.Visualizations.checkUnique(vname)){
                    myAlert('您的命名重复了，请重新命名');
                    return;
                }
                MainChart.series.push({
                    type:'line',
                    name:name,
                    vname:vname,
                    data:[],
                    xAxisIndex:grid.getAxisIndex('x'),
                    yAxisIndex:grid.getAxisIndex('y'),

                });
                interface.Visualizations.register('line',vname);
            },
            dataFormatProcess:toDataFormat1
        },
        scatter:{
            create:function(vname,name,AxisIndexs){

            }
        },
        map:{
            create:function(vname,name){
                if(!interface.Visualizations.checkUnique(vname)){
                    myAlert('您的命名重复了，请重新命名');
                    return;
                }
                MainChart.series.push({
                    type:'map',
                    name:name,
                    vname:vname,
                    data:[],
                    map:'china'
                });
                interface.Visualizations.register('map',vname);
            },
            dataFormatProcess:toDataFormat2
        },
        tree:{

        },
        gauge:{

        },
    };

        //initialize
    simplePost(api.getChartOption,{chartName:chartName},false).then(function(result){

        if(result==''){
            alert('为你创建了一张空表');
            MainChart=defaultMainChart;
            interface.rerender();
            return ;
        }
        else{
            MainChart = JSON.parse(result);
        }
        setTimeout(function(){
            console.log(MainChart);
            chart.setOption(MainChart);
        },1000);
    });

    return interface;
};

//----------------------------------------------此处是数据组件-----------------------------------------



var hot,hot2; //原表 结果表

var firstClick = true;

var dataColHeader = [];

var resultData = [];

var currentDataFrom = "main";

var pageNum = 0;//页码
var pageSize = 50;//每一页的大小

//-------------------------------对操作组件的初始化---------------------------------
//-------------------------------groupby--------------------------------------
$('#groupbyPanel').on('shown.bs.modal', function (e) {
    for (var i = 0; i < dataColHeader.length; i++) {
        $('#colSelect').append("<option value=" + dataColHeader[i] + ">" + dataColHeader[i] + "</option>");
    }
    $('#colSelect').selectpicker('refresh');
    console.log(dataColHeader);
});

$('#groupbyPanel').on('hide.bs.modal', function (e) {
    $('#colSelect').get(0).innerHTML = "";
});

$('#handleGroupby').click(function(){
    var groups = $('#colSelect').val();
    console.log(groups);
    var action = $('#groupAction').val();
    var para = action.split(':');
    DataManager.groupby(currentSelected,groups,para[0],para[1],'main');
    $('#groupbyPanel').modal('hide');
});

//-------------------------------query--------------------------------------
$('#queryPanel').on('shown.bs.modal', function (e) {
    for (var i = 0; i < dataColHeader.length; i++) {
        $('#qcolSelect').append("<option value=" + dataColHeader[i] + ">" + dataColHeader[i] + "</option>");
    }
    $('#qcolSelect').selectpicker('refresh');
    console.log(dataColHeader);
});

$('#queryPanel').on('hide.bs.modal', function (e) {
    $('#qcolSelect').get(0).innerHTML = "";
});


$('#handleQuery').click(function(){
    var condition = $('#queryCondition').val();
    var action = $('#queryAction').val();
    var groups = $('#qcolSelect').val();
    if(groups==null)groups = [];
    var para = action.split(':');
    DataManager.query(condition,para[0],para[1],'main',groups);
    $('#queryPanel').modal('hide');
});

///--------------------------------

var changeFormat = function(data,type){

    var result = [];
    if(type==='row'){
        for(name in data){
            if(data[name]!==null){
                result.push(Object.keys(data[name]));
            }
            break;
        }
        for(name in data){
            var row = [];
            for(i in data[name]){
                row.push(data[name][i]);
            }
            result.push(row);
        }
    };
    if(type==='col'){
        var col = [];
        for(name in data){
            for(i in data[name]){
                col.push([data[name][i]]);
            }
        }
        result = col;
    }
    return result;
};

function createTable(container,contentName,canCalculate,enableSearch,searchDom,hasPages){

    var pagination = false;
    if(hasPages)pagination = true;

    var createDataOption = function(type){  //计算选项创建
        var title = type==='rowOptions'?'行':type==='colOptions'?'列':'';
        var dataOption = [
            {
                name:title+'求和',
                key:type+":sum"
            },
             {
                name:title+'求均值',
                 key:type+":mean"
            },
            //  {
            //     name:title+'求中位数',
            //      key:type+":median"
            // },
             {
                name:title+'求最大',
                 key:type+":max"
            },
             {
                name:title+'求最小',
                 key:type+":min"
            },
            // {
            //     name:title+'求众数',
            //     key:type+":mode"
            // },
        ];
        if(type=='row'){
            dataOption.push({
                name:title+'计数',
                key:type+":count"
            });
        }
        return dataOption;
    };

    function searchResultCounter(instance, row, col, value, result) { //搜索方法
        const DEFAULT_CALLBACK = function(instance, row, col, data, testResult) {
            instance.getCellMeta(row, col).isSearchResult = testResult;
        };

        DEFAULT_CALLBACK.apply(this, arguments);

        if (result) {
            searchResultCount++;
        }
    }

    if(enableSearch==true){
        s = searchDom;

        Handsontable.dom.addEvent(s, 'keyup', function(event) {

            searchResultCount = 0;

            var search = hot.getPlugin('search');
            var queryResult = search.query(this.value);

            document.getElementById('resultNum').innerHTML = searchResultCount;

            console.log(queryResult);
            if(queryResult.length>0){
                hot.scrollViewportTo(queryResult[0]['row'],queryResult[0]['col'])
            }
            hot.render();
        });
    }

    var calculationOption = {
        'selectAll': {
                name: '全选',
            },
        'row': {
            name: '按行操作',
            submenu: {
                items: createDataOption('row')
            }
        },
        'col': {
            name: '按列操作',
            submenu: {
                items: createDataOption('col')
            }
        },
        'query': {
            name: '条件查询'
        },
        'groupBy': {
            name: '分组运算',
        },
    };

    var options ={
        'selectAll': {
            name: '全选',
        },
        'setData': {
            name: '应用数据',
            submenu: {
                items: [
                    {
                        name: '按列获取',
                        key: 'setData' + ":bycol"
                    },
                    {
                        name: '按行获取',
                        key: 'setData' + ":byrow"
                    }
                ]
            }
        },
        'saveAndSet': {
            name: '应用数据并保存配置项',
            submenu: {
                items: [
                    {
                        name: '按列获取',
                        key: 'saveAndSet' + ":wholeCol"
                    },
                    {
                        name: '按行获取',
                        key: 'saveAndSet' + ":wholeRow"
                    },
                    {
                        name: '按特定位置获取，列分割',
                        key: 'saveAndSet' + ":bycol"
                    },
                    {
                        name: '按特定位置获取，行分割',
                        key: 'saveAndSet' + ":byrow"
                    }
                ]
            }
        }
    };

    if(canCalculate){
        for(name in calculationOption){
            options[name] = calculationOption[name];
        }
    }

    //矩阵操作

    function verticalCat(a,b){ //数值连接
        var c = a.transpose();
        var d = b.transpose();
        var e = c.augment(d);
        return e.transpose();
    }

     function divideByCol(selected){ //按同行分类
        var result = [];

        while(selected.length>0) {
            var set = [];
            var cur = selected[0];
            set.push(cur);
            selected.splice(0,1);
            var index = [];
            for(var i=0;i<selected.length;i++){
                if(cur[0]==selected[i][0] && cur[2]==selected[i][2]){
                    index.push(i);
                }
            }
            for(var j=0;j<index.length;j++){
                set.push(selected[index[j]]);
            }
            for(var j=0;j<index.length;j++){
                delete selected[index[j]]
            }
            var newSelected = [];
            for(var j=0;j<selected.length;j++){
                if(selected[j]!=undefined)newSelected.push(selected[j])
            }
            selected = newSelected;
            result.push(set);
        }
        return result;
    }

    function handleData(data,type){  //对数据合并
        try{
            if(data.length==0)return;
            var matrix =[];
            for(var i=0;i<data.length;i++){
                var line = $M(data[i][0]);
                for(var j=1;j<data[i].length;j++){
                    line = line.augment($M(data[i][j]));
                }
                matrix.push(line);
            }

            var result = matrix[0];
            for(var i=1;i<matrix.length;i++){
                result = verticalCat(result,matrix[i]);
            }

            if(type=='byrow'){
                return result.elements;
            }
            else if(type =='bycol'){
                return result.transpose().elements;
            }

        }catch (e){
            console.log(e);
        }
        return [];
    }

    var processData=function(para,selected){  //处理数据的整个流程
        var divided = divideByCol(selected);
        var data = [];
        for(var i=0;i<divided.length;i++){
            var colData = [];
            for(var j=0;j<divided[i].length;j++){
                colData.push(newHot.getSourceData(divided[i][j][0],divided[i][j][1],divided[i][j][2],divided[i][j][3]));
            }
            data.push(colData);
        }
        var result = handleData(data,para[1]);
        return result;
    };

    function isSelectAll(selected,rows,cols){  //过滤全选

        if(selected.length==1){
            if(selected[0][3]-selected[0][1]+1==cols&&selected[0][2]-selected[0][0]+2==rows){
                return "selectAll";
            }
        }
        return selected;
    }

    function align(selected,pageNum,pageSize){
        for(let i=0;i<selected.length;i++){
            selected[i][0] += pageNum*pageSize;
            selected[i][3] += pageNum*pageSize;
        }
    } //与页数对齐


    var newHot = new Handsontable(container,
        {
        data: [[]],
        colHeaders: true,
        height: 600,
        width: 600,
        colWidths: "68px",

        readOnly: true,
        cells: function (row) { //锁定第一行
            var cellProperties = {};
            if (row === 0) {
                cellProperties.readOnly = true;
            }
            return cellProperties;
        },
        contextMenu: {
            callback: function (key, options) {

                currentSelected = isSelectAll(newHot.getSelected(),newHot.rowsNum,newHot.colsNum);
                if(currentSelected!='selectAll'){
                    align(currentSelected,pageNum,pageSize);
                }

                console.log('select:');
                console.log(newHot.getSelected());

                if (key === 'selectAll') {
                    newHot.selectRows(1, newHot.rowsNum - 1); //第一行不用于计算 是columnsHeader
                }
                else if (key === 'groupBy') {
                    currentDataFrom = newHot.content;
                    $('#groupbyPanel').modal('toggle');
                }
                else if (key === 'query') {
                    currentDataFrom = newHot.content;
                    $('#queryPanel').modal('toggle');
                }
                else if (key.indexOf('setData') == 0) {
                    var para = key.split(':');
                    var selected = newHot.getSelected();
                    var result = processData(para,selected);
                    newHot.dataCallBack(result);
                }
                else if (key.indexOf('saveAndSet')==0) {
                    //提取数据的操作与普通设置是一样的
                    var para = key.split(':');
                    var selected = newHot.getSelected();
                    var selectedBackup = cloneObj(selected);

                    var calPara = [];//计算时的参数(为了方便)
                    calPara[0] = para[0],calPara[1] = para[1];
                    if(para[1] == "wholeCol")calPara[1] = 'bycol';
                    else if(para[1] == "wholeRow")calPara[1] = 'byrow';

                    console.log('calPara'+ ' '+calPara[0]+' '+calPara[1]);
                    var result = processData(calPara,selected);
                    console.log(result);
                    newHot.dataCallBack(result);

                    var target = newHot.potentialTarget;
                    var content = newHot.content;
                    var order = newHot.order;

                    var savedSelected = isSelectAll(selectedBackup,newHot.rowsNum,newHot.colsNum);
                    if(savedSelected!='selectAll'){
                        align(savedSelected,pageNum,pageSize);
                    }

                    var putOption = {'put':{'from':content,'to':target,'selected':savedSelected,type:para[1]}};
                    currentChartManager.saveDataOption(order,putOption);
                    currentChartManager.getDataOptions();
                    console.log(putOption);

                    myOkAlert('已保存数据配置项');
                }
                else {
                    var para = key.split(':');
                    var selected = isSelectAll(newHot.getSelected(),newHot.rowsNum,newHot.colsNum);

                    if(selected!='selectAll'){
                        align(selected,pageNum,pageSize);
                    }

                    for (var i = 0; i < selected.length; i++) {
                        if (selected[i][0] == 0 || selected[i][2] == 0) {
                            alert('列名称不可参与运算!');
                            return;
                        }
                    }
                    DataManager.Calculation(selected, para[0], para[1], 'main');
                }
            },
            items: options
        },
        search: {
            callback: searchResultCounter
        }
    });

    newHot.content = contentName; //目前装载的内容
    newHot.dataCallBack = function(){}; //数据接口

    return newHot;
};

function initDataTable(){

    var container = document.getElementById('example');

    hot = createTable(container,'main',true,false);

    hot2 = createTable($('#example2').get(0),'',false,false);

    hot.rowsNum = 0,hot.colsNum = 0;

    hot.content = 'main'; //目前装载着的内容-主表
    hot2.content = '';  //一开始什么都没有

    simplePost(api.getAllData,{cname:chartName,pageNum:pageNum}).then(function(result){

        var result = JSON.parse(result);
        var data = changeFormat(result,'row');
        console.log(result);
        hot.updateSettings({
            data:data
        });
        hot.rowsNum = data.length;
        try{
            hot.colsNum = data[0].length;
            dataColHeader = data[0];
            hot2.updateSettings({data:[dataColHeader],height: 600,
        width: 600,});
            resultData.push(dataColHeader);
        }
        catch (e){
            console.log(e)
        }
    });
}

$('#pageNum').change(function(){
   var value = $('#pageNum').val()
   if(!isNaN(value)){
       pageNum = Number(value);
       simplePost(api.getAllData,{cname:chartName,pageNum:pageNum}).then(function(result){

        var result = JSON.parse(result);
        var data = changeFormat(result,'row');
        hot.updateSettings({
            data:data
        });
        hot.rowsNum = data.length;
        try{
            hot.colsNum = data[0].length;
            dataColHeader = data[0];
        }
        catch (e){
            console.log(e)
        }
    });
   }
});//页码转换


//调用数据面板 传入回调函数获取数据
function callDataPanel(cb,vname){
    $('#dataPanel').modal('toggle');
    if(firstClick) {
        firstClick = false;
        setTimeout(function () {
            initDataTable();
            hot.dataCallBack = cb;
            hot2.dataCallBack = cb;
            hot.potentialTarget = vname;
            hot2.potentialTarget = vname;
        }, 1000);
        return ;
    }
    else{ //setTimeOut是不是异步的??
        hot.dataCallBack = cb;
        hot2.dataCallBack = cb;
        hot.potentialTarget = vname;
        hot2.potentialTarget = vname;
    }
}


var DataManager={

    dataOptions : [], //存放当前的dataOptions

    getAllDimensions:function(){ //return Promise
        return simplePost('getAllDimensions',{name:'测试画板'});
    },
    askForData:function(){ //return Promise
        var dname = this.props.name;
        return simplePost('getDContent',{'cname':'测试画板','dname':dname});
    },

    count:0, //标识result

    Calculation:function(selected,type,action,from){
        var data = {};
        data['calculation'] = {
            from:from,
            selected:selected,
            type:type,
            action:action,
            to:'result'+this.count++
        };
        this.startProcess(data);
    },
    groupby:function(selected,groups,type,action,from){
        var data = {};
        data['groupby'] = {
            group:groups,
            type:type,
            selected:selected,
            action:action,
            from:from,
            to:'result'+this.count++
        };
        this.startProcess(data);
    },
    query:function(condition,type,action,from,groups){
        var data = {};
        data['query'] ={
            condition:condition,
            type:type,
            action:action,
            from:from,
            groups:groups,
            to:'result'+this.count++
        };
        this.startProcess(data);
    },
    startProcess:function(data){
        simplePost(api.dataProcess,{cname:chartName,order:JSON.stringify(data)}).then(function(result){
            try{
                resultData = JSON.parse(result);
                console.log(resultData);
                var formatedData = [];
                if(data[Object.keys(data)[0]]['type']==='col'&&data[Object.keys(data)[0]]['action']==='mode'){
                    formatedData = changeFormat(resultData,'row'); //求列众数按这种效果显示好一些
                }
                else{
                    formatedData = changeFormat(resultData,data[Object.keys(data)[0]]['type']);
                }
                resultData = formatedData;
                hot2.updateSettings({data:resultData});
                hot2.data = resultData;

                //记录当前装载的内容,以及产生这个结果的命令
                hot2.content = data[Object.keys(data)[0]]['to'];
                hot2.order = data;
                //
                try{
                    hot2.rowsNum = resultData.length;
                    hot2.colsNum = resultData[0].length;
                }catch (e){
                    console.log(e);
                }
            }catch (e){
                console.log(e);
                myAlert(result);
            }
        });
    },
};

//-----------------------------测试代码-------------------------------------

function runApplication(chartManager){
    var chartname = chartName;
    var doptstr = JSON.stringify(chartManager.getDataOptions());
    console.log(chartname);
    console.log(doptstr);
    simplePost(api.runDataOption,{'chartname':chartname,'dataoption':doptstr}).then(function(result){
        console.log(result);
        var obj = JSON.parse(result);
        for(name in obj){
            var vobj = currentChartManager.Visualizations.get(name);
            vobj.setData(obj[name]);
        }
    });
};
