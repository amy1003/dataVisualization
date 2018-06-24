/**
 * Created by cwj on 2018/5/9.
 */
function ChartManager(chart,ChartObj){

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

    var MainChart = ChartObj;

    var interface = {
        renew:function(){
            chart.setOption(MainChart);
        },
        rerender:function(){
            chart.setOption(MainChart,true,true);
        },
        saveChart:function(chartName){
            simplePost(api.saveChart,{jsonChart:JSON.stringify(MainChart),chartName:chartName}).then(function(result){
                console.log("save "+chartName+":"+result);
            });
        },
        getDataOptions:function(){
            return MainChart['dataOptions'];
        },
        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        //----------------------以下都是可视化选项-----------------------------------
        Visualizations:{   //要与chartManager的同步更新!!!!
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

    return interface;
};