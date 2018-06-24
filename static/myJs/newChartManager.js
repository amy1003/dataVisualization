/**
 * Created by cwj on 2018/5/16.
 */

var DataFormat = {
    geoCoordMap :{ //地图坐标
        "海门":[121.15,31.89],
        "鄂尔多斯":[109.781327,39.608266],
        "招远":[120.38,37.35],
        "舟山":[122.207216,29.985295],
        "齐齐哈尔":[123.97,47.33],
        "盐城":[120.13,33.38],
        "赤峰":[118.87,42.28],
        "青岛":[120.33,36.07],
        "乳山":[121.52,36.89],
        "金昌":[102.188043,38.520089],
        "泉州":[118.58,24.93],
        "莱西":[120.53,36.86],
        "日照":[119.46,35.42],
        "胶南":[119.97,35.88],
        "南通":[121.05,32.08],
        "拉萨":[91.11,29.97],
        "云浮":[112.02,22.93],
        "梅州":[116.1,24.55],
        "文登":[122.05,37.2],
        "上海":[121.48,31.22],
        "攀枝花":[101.718637,26.582347],
        "威海":[122.1,37.5],
        "承德":[117.93,40.97],
        "厦门":[118.1,24.46],
        "汕尾":[115.375279,22.786211],
        "潮州":[116.63,23.68],
        "丹东":[124.37,40.13],
        "太仓":[121.1,31.45],
        "曲靖":[103.79,25.51],
        "烟台":[121.39,37.52],
        "福州":[119.3,26.08],
        "瓦房店":[121.979603,39.627114],
        "即墨":[120.45,36.38],
        "抚顺":[123.97,41.97],
        "玉溪":[102.52,24.35],
        "张家口":[114.87,40.82],
        "阳泉":[113.57,37.85],
        "莱州":[119.942327,37.177017],
        "湖州":[120.1,30.86],
        "汕头":[116.69,23.39],
        "昆山":[120.95,31.39],
        "宁波":[121.56,29.86],
        "湛江":[110.359377,21.270708],
        "揭阳":[116.35,23.55],
        "荣成":[122.41,37.16],
        "连云港":[119.16,34.59],
        "葫芦岛":[120.836932,40.711052],
        "常熟":[120.74,31.64],
        "东莞":[113.75,23.04],
        "河源":[114.68,23.73],
        "淮安":[119.15,33.5],
        "泰州":[119.9,32.49],
        "南宁":[108.33,22.84],
        "营口":[122.18,40.65],
        "惠州":[114.4,23.09],
        "江阴":[120.26,31.91],
        "蓬莱":[120.75,37.8],
        "韶关":[113.62,24.84],
        "嘉峪关":[98.289152,39.77313],
        "广州":[113.23,23.16],
        "延安":[109.47,36.6],
        "太原":[112.53,37.87],
        "清远":[113.01,23.7],
        "中山":[113.38,22.52],
        "昆明":[102.73,25.04],
        "寿光":[118.73,36.86],
        "盘锦":[122.070714,41.119997],
        "长治":[113.08,36.18],
        "深圳":[114.07,22.62],
        "珠海":[113.52,22.3],
        "宿迁":[118.3,33.96],
        "咸阳":[108.72,34.36],
        "铜川":[109.11,35.09],
        "平度":[119.97,36.77],
        "佛山":[113.11,23.05],
        "海口":[110.35,20.02],
        "江门":[113.06,22.61],
        "章丘":[117.53,36.72],
        "肇庆":[112.44,23.05],
        "大连":[121.62,38.92],
        "临汾":[111.5,36.08],
        "吴江":[120.63,31.16],
        "石嘴山":[106.39,39.04],
        "沈阳":[123.38,41.8],
        "苏州":[120.62,31.32],
        "茂名":[110.88,21.68],
        "嘉兴":[120.76,30.77],
        "长春":[125.35,43.88],
        "胶州":[120.03336,36.264622],
        "银川":[106.27,38.47],
        "张家港":[120.555821,31.875428],
        "三门峡":[111.19,34.76],
        "锦州":[121.15,41.13],
        "南昌":[115.89,28.68],
        "柳州":[109.4,24.33],
        "三亚":[109.511909,18.252847],
        "自贡":[104.778442,29.33903],
        "吉林":[126.57,43.87],
        "阳江":[111.95,21.85],
        "泸州":[105.39,28.91],
        "西宁":[101.74,36.56],
        "宜宾":[104.56,29.77],
        "呼和浩特":[111.65,40.82],
        "成都":[104.06,30.67],
        "大同":[113.3,40.12],
        "镇江":[119.44,32.2],
        "桂林":[110.28,25.29],
        "张家界":[110.479191,29.117096],
        "宜兴":[119.82,31.36],
        "北海":[109.12,21.49],
        "西安":[108.95,34.27],
        "金坛":[119.56,31.74],
        "东营":[118.49,37.46],
        "牡丹江":[129.58,44.6],
        "遵义":[106.9,27.7],
        "绍兴":[120.58,30.01],
        "扬州":[119.42,32.39],
        "常州":[119.95,31.79],
        "潍坊":[119.1,36.62],
        "重庆":[106.54,29.59],
        "台州":[121.420757,28.656386],
        "南京":[118.78,32.04],
        "滨州":[118.03,37.36],
        "贵阳":[106.71,26.57],
        "无锡":[120.29,31.59],
        "本溪":[123.73,41.3],
        "克拉玛依":[84.77,45.59],
        "渭南":[109.5,34.52],
        "马鞍山":[118.48,31.56],
        "宝鸡":[107.15,34.38],
        "焦作":[113.21,35.24],
        "句容":[119.16,31.95],
        "北京":[116.46,39.92],
        "徐州":[117.2,34.26],
        "衡水":[115.72,37.72],
        "包头":[110,40.58],
        "绵阳":[104.73,31.48],
        "乌鲁木齐":[87.68,43.77],
        "枣庄":[117.57,34.86],
        "杭州":[120.19,30.26],
        "淄博":[118.05,36.78],
        "鞍山":[122.85,41.12],
        "溧阳":[119.48,31.43],
        "库尔勒":[86.06,41.68],
        "安阳":[114.35,36.1],
        "开封":[114.35,34.79],
        "济南":[117,36.65],
        "德阳":[104.37,31.13],
        "温州":[120.65,28.01],
        "九江":[115.97,29.71],
        "邯郸":[114.47,36.6],
        "临安":[119.72,30.23],
        "兰州":[103.73,36.03],
        "沧州":[116.83,38.33],
        "临沂":[118.35,35.05],
        "南充":[106.110698,30.837793],
        "天津":[117.2,39.13],
        "富阳":[119.95,30.07],
        "泰安":[117.13,36.18],
        "诸暨":[120.23,29.71],
        "郑州":[113.65,34.76],
        "哈尔滨":[126.63,45.75],
        "聊城":[115.97,36.45],
        "芜湖":[118.38,31.33],
        "唐山":[118.02,39.63],
        "平顶山":[113.29,33.75],
        "邢台":[114.48,37.05],
        "德州":[116.29,37.45],
        "济宁":[116.59,35.38],
        "荆州":[112.239741,30.335165],
        "宜昌":[111.3,30.7],
        "义乌":[120.06,29.32],
        "丽水":[119.92,28.45],
        "洛阳":[112.44,34.7],
        "秦皇岛":[119.57,39.95],
        "株洲":[113.16,27.83],
        "石家庄":[114.48,38.03],
        "莱芜":[117.67,36.19],
        "常德":[111.69,29.05],
        "保定":[115.48,38.85],
        "湘潭":[112.91,27.87],
        "金华":[119.64,29.12],
        "岳阳":[113.09,29.37],
        "长沙":[113,28.21],
        "衢州":[118.88,28.97],
        "廊坊":[116.7,39.53],
        "菏泽":[115.480656,35.23375],
        "合肥":[117.27,31.86],
        "武汉":[114.31,30.52],
        "大庆":[125.03,46.58]
    },
    convertData:function (data) {//转换地理坐标
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = DataFormat.geoCoordMap[data[i].name];
            if (geoCoord) {
                geoCoord = geoCoord.concat(data[i].value);
                res.push({name:data[i].name,value:geoCoord});
            }
            else{
                res.push([data[i].name,data[i].value]);
            }
        }
        return res;
    },

    toFormat0(data){ //原封不动传递
        return data;
    },

    toFormat1:function(data){
        if(data.length==0){
            alert('请选择至少一组数据!');
            return null;
        }
        else if(data.length==2){
            return this.toFormat2(data);
        }
        return data[0];
    },

    toFormat2:function(data){
        if(data.length<2){
            alert('请选择两组数据，第一组为名称，第二组为数据');
            return null;
        }
        var dataset = [];
        for(let i=0;i<data.length-1;i++){
            for(let j=0;j<data[i].length;j++){
                if(dataset[j]==undefined)dataset[j]=[];
                if(dataset[j][0]==undefined)dataset[j][0] ="";
                dataset[j][0] += data[i][j];
            }
        }
        var value = data[data.length-1];
        for(let j=0;j<value.length;j++){
            dataset[j][1] = value[j];
        }
        var result =[];
        for(let i=0;i<dataset.length;i++){
            result.push({name:dataset[i][0],value:dataset[i][1]});
        }
        return result;
    },

    toFormat3:function(data){ //转换成图的数据格式

        function arrayFindIndex(array,value){
            for(let i=0;i<array.length;i++){
                if(array[i]==value)return i;
            }
            return -1;
        }

        var result = {
            data:[],
            links:[],
            categories:[],
        };
        var cola = [],colb = [];

        if(data.length==1){
            alert('数据数量不足');
            return ;
        }
        //长短对齐
        if(data[0].length<data[1].length){
            cola = data[0];
            colb = data[1];
        }
        else{
            cola = data[1];
            colb = data[0];
        }

        var categorySet = new Set();
        if(data.length==4){
            for(let i=0;i<data[2].length;i++){
                categorySet.add(data[2][i]);
                categorySet.add(data[3][i]);
            }
            for(let i of categorySet){result.categories.push(i);}
        }
        else{ //没有分类的情况
            var set = new Set();
            result.categories = ['1'];
            for(let i=0;i<cola.length;i++){
                set.add({name:cola[i],category:0});
                set.add({name:colb[i],category:0});
                result.links.push({source:cola[i],target:colb[i]});
            }
            for(let i of set){
                result.data.push(i);
            }
            return result;
        }

        //有分类的情况
        var set = new Set();
        for(let i=0;i<cola.length;i++){
            set.add({name:cola[i],category:arrayFindIndex(result.categories,data[2][i])});
            set.add({name:colb[i],category:arrayFindIndex(result.categories,data[3][i])});
            result.links.push({source:cola[i],target:colb[i]});
        }
        for(let i of set){
            result.data.push(i);
        }

        return result;
    },
    toFormat4:function(data){  //设定雷达坐标时用的
        var d = data[0];
        var result = [];
        for(let i=0;i<d.length;i++){
            result.push({name:d[i],max:data[1][i]});
        }
        return result;
    },
    toFormat5:function(data){   //散点，热力专用
        if(data.length<2)alert('数据维度不足!');
        if(data.length==2){  //按地图坐标转换
            var fd = DataFormat.toFormat2(data);
            return DataFormat.convertData(fd);
        }
        else if(data.length>=3){
            var result = [];
            for(let i=0;i<data[0].length;i++){
                result[i] = [data[0][i],data[1][i],data[2][i]];
            }
            return result;
        }
    },
    toFormat6:function(data){ //雷达图专用
        let result = [];
        for(let i=0;i<data.length;i++){
            var name = data[i][0];
            if(isNaN(name)){
                data[i].splice(0,1);
                result.push({name:name,value:data[i]});
            }
            else{
                result.push({value:data[i]});
            }
        }
        return result;
    },
    toFormat7:function(data){  //箱形图专用
        if(echarts.dataTool){
            return echarts.dataTool.prepareBoxplotData(data).boxData;
        }
        return [];
    },
    changeFormat:function(formatType,data){ //四种数据格式

        var newData = {};

        switch (formatType){
            case '0':
                newData = this.toFormat0(data);
                break;
            case '1':
                newData = this.toFormat1(data);
                break;
            case '2':
                newData = this.toFormat2(data);
                break;
            case '3':
                newData = this.toFormat3(data);
                break;
            case '4':
                newData = this.toFormat4(data);
                break;
            case '5':
                newData = this.toFormat5(data);
                break;
            case '6':
                newData = this.toFormat6(data);
                break;
            case '7':
                newData = this.toFormat7(data);
        }
        return newData;
    }
};

var defaultMainChart = {

    tooltip:{
        show:true,
        trigger:'item',
    },
    //默认调色板
    color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    //固定组件
    legend:{
        textStyle:{
            fontSize:12
        }
    },
    theme:'default',
    title:[

    ],
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
    datazoom:[],
    series:[],
    grid:[],
    xAxis:[],
    yAxis:[],
    geo:[],
    calendar:[],
    radar:[],
    parallel:{
        count:0,
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
    visualMap:[],
    dataOptions:[],  //存放在此
};

function createChartManager(chart,MainChart,paras,chartName){ //paras 获取参数

    var chartName = chartName;

    var DataFormatIndex = {  //数据格式
        'bar':'1',
        'line':'1',
        'funnel':'1',
        'gauge':'1',
        'map':'5',
        'pie':'2',
        'graph':'3',
        'parallel':'0',
        'radar':'6',
        'scatter':'5',
        'heatmap':'5',
        'boxplot':'7',
        'effectScatter':'5',
    };

    function extractDefault(para){    //参数应用
        var result = {};
        for(name in para){
            if(para[name]['type'] == 'wrapper'){
                result[name] = extractDefault(para[name]['initPara']);
            }
            else{
                result[name] = para[name]['default'];
            }
        }
        return result;
    }

    function applyDefault(para,defaultOption){ //参数应用
        for(name in para){
            if(para[name]['type'] === 'wrapper'){
                if(defaultOption[name] === undefined)continue;
                applyDefault(para[name]['initPara'],defaultOption[name]);
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
    }

    class BasicType{

         constructor(set,idType,paraIndex){
             this.set = set;
             this.idType = idType;
             this.paraIndex= paraIndex;
         }
         checkUnique(newName){
             for(let i=0;i<this.set.length;i++){
                 if(this.set[i][this.idType]==newName)return false;
             }
             return true;
         }
         create(newname){
            if(this.checkUnique(newname)){
                let newObj = extractDefault(paras(this.paraIndex));
                newObj[this.idType] = newname;
                this.set.push(newObj);
                itf.renew();
                return true;
            }
            return false;
         }
         get(name){
             for(let i =0;i<this.set.length;i++){
                 if(this.set[i][this.idType]==name){
                     return this.set[i];
                 }
             }
             return {};
         }
         getAll(){
             console.log(this.set);
            var list = [];
            for(let i=0;i<this.set.length;i++)list.push(this.set[i][this.idType]);
            return list;
         }
         update(name,newObj){
             var obj = this.get(name);
             for(name in newObj){
                 obj[name] = newObj[name];
             }
             itf.renew();
         }
         getInitPara(name){
             var para = paras(this.paraIndex);
             applyDefault(para,this.get(name));
             return para;
         }
         showset(){
             return this.set;
         }
         removeFromSet(name){
             for(let i=0;i<this.set.length;i++){
                 if(this.set[this.idType]==name){
                     this.set.splice(i,1);
                     return ;
                 }
             }
         }
        getAllIndex(){
            var result = [];
            for(let i=0;i<this.set.length;i++){
                result.push({name:this.set[i][this.idType],index:i});
            }
            return result;
        }
    }

    class SimpleType{
        constructor(obj,paraIndex){
            this.obj=obj;
            this.paraIndex = paraIndex;
        }
        getInitPara(){
           var para = paras(this.paraIndex);
           applyDefault(para,this.obj);
           return para;
        }
        update(option){
            for(name in option)this.obj[name] = option[name];
            itf.renew();
        }
    }

    class DataZoom extends  BasicType{
        create(newname,type){
            if(this.checkUnique(newname)){
                let newObj = extractDefault(paras(this.paraIndex,type));
                newObj[this.idType] = newname;
                this.set.push(newObj);
                itf.renew();
                return true;
            }
            return false;
        };
    }

    class Grid extends BasicType{  //直角坐标格栅
        create(newname){
            if(this.checkUnique){
                super.create(newname);
                let index = 0;
                for(let i =0;i<this.set.length;i++){
                    if(this.set[i][this.idType] == newname){
                        index = i;
                        break;
                    }
                }
                //创建轴
                MainChart.xAxis.push({
                    type: 'category',
                    gridIndex:index,
                    position:'bottom',
                    data:[1,2,3,4,5,6],
                    gname:newname
                });
                MainChart.yAxis.push({
                    type: 'value',
                    gridIndex:index,
                    position:'right',
                    gname:newname
                });
                itf.renew();
                return true;
            }
            return false;
        }
        getAxis(name,type){
            let set = [];
            if(type=='x')set = MainChart.xAxis;
            else if(type=='y')set = MainChart.yAxis;
            console.log(set);
            for(let i=0;i<set.length;i++){
                if(set[i]['gname']==name)return set[i];
            }
            return null;
        }
        getAxisIndex(name,type){
            let set = [];
            if(type=='x')set = MainChart.xAxis;
            else if(type=='y')set = MainChart.yAxis;
            console.log(set);
            for(let i=0;i<set.length;i++){
                if(set[i]['gname']==name)return i;
            }
            return -1;
        }
        updateAxis(name,type,option){
            var axis = this.getAxis(name,type);
            for(name in option)axis[name] = option[name];
            itf.renew();
        }
        setAxisTick(name,type,data){
            var axis = this.getAxis(name,type);
            axis['data'] = data;
            itf.renew();
        }
        getAxisPara(name,type){
            var axis = this.getAxis(name,type);
            var para = paras('axis');
            applyDefault(para,axis);
            return para;
        }
        resetIndex(){
            for(let i=0;i<this.set.length;i++){
                let xaxis = this.getAxis(this.set[i]['gname']);
                let yaxis = this.getAxis(this.set[i]['gname']);
                xaxis.gridIndex = i;
                yaxis.gridIndex = i;
            }
        }
    };

    //---------------------------------平行轴单独拿出-------------------

    class Visualizations extends BasicType{
        create(type,name,dataname){
            if(this.checkUnique(name)){
                let newObj = extractDefault(paras(type));
                newObj[this.idType] = name;
                newObj['name'] = dataname;
                console.log(newObj);
                this.set.push(newObj);
                return true;
            }
            return false;
        }
        getInitPara(name){
            var obj = this.get(name);
            var para = paras(obj['type']);
            applyDefault(para,obj);
            return para;
        }
        createOnContainer(type,name,dataname,axisType,axisName){
            if(this.checkUnique(name)){
                let newObj = extractDefault(paras(type));
                newObj[this.idType] = name;
                if(axisType=='grid'){
                    newObj['xAxisIndex'] = itf.grid.getAxisIndex(axisName,'x');
                    newObj['yAxisIndex'] = itf.grid.getAxisIndex(axisName,'y');
                }
                else if(axisType == 'radarContainer'){
                    newObj['radarIndex'] = itf.radarContainer.getIndex(axisName);
                }
                else if(axisType == 'geo'){
                    newObj['coordinateSystem'] = 'geo';
                    newObj['geoIndex'] = itf.geo.getIndex(axisName);
                }
                else if(axisType == 'calendar'){
                    newObj['coordinateSystem']='calendar';
                    newObj['calendarIndex'] = itf.calendar.getIndex(axisName);
                }
                newObj['name'] = dataname;
                this.set.push(newObj);
                return true;
            }
            return false;
        }
        setDataTo(name,data){
            var obj = this.get(name);
            var type = obj['type'];
            var fd = DataFormat.changeFormat(DataFormatIndex[type],data);
            if(type=='graph'){ //图单独处理
                obj['categories'] = fd['categories'];
                obj['links'] = fd['links'];
                obj['data'] = fd['data'];
                console.log(obj);
                itf.renew();
                return;
            }
            obj.data = fd;
            console.log(JSON.stringify(MainChart));
            itf.renew();
        }
        setFunction(name,propsName,ratio){
            var obj = this.get(name);
            obj[propsName] = function(value){
                return value[2]/ratio;
            }
        }
        addMark(name,type,valueType){
            var obj = this.get(name);
            if(!obj.hasOwnProperty(type)){
                obj[type] = {data:[]};
            }
            obj[type].data.push({type:valueType});
            itf.renew();
        }
        clearMark(name,type){
            var obj = this.get(name);
            if(obj.hasOwnProperty(type)){
                obj[type] = {data:[]};
            }
            itf.renew();
        }

    };

    //-------------------图的设置较为特殊，单独拿出来设置--------------

    //--------------------------------------------------------------

    // containers
    class Containers extends BasicType{
          getIndex(name){
              for(let i=0;i<this.set.length;i++){
                  if(this.set[i][this.idType]==name)return i;
              }
              return -1;
          }
    };

    class ParallelAxis extends Containers{
          create(newname){
              if(this.checkUnique(newname)){
                var i = MainChart.parallel.count;
                let newObj = extractDefault(paras(this.paraIndex));
                newObj[this.idType] = newname;
                newObj['dim'] = i+1;
                MainChart.parallel.count++;
                this.set.push(newObj);
                itf.rerender();
                return true;
            }
            return false;
          }
    };



    var itf = { //interface

        //功能组件
        title:new BasicType(MainChart.title,'tname','title'), //ok
        visualmap:new BasicType(MainChart.visualMap,'vnname','visualmap'), //ok
        dataZoom:new DataZoom(MainChart.dataZoom,'dzname','datazoom'), //ok
        //可视化
        visualization:new Visualizations(MainChart.series,'vname',''),
        //容器
        grid:new Grid(MainChart.grid,'gname','grid'), //ok
        radarContainer:new Containers(MainChart.radar,'rname','radarContainer'),//ok
        parallelAxis:new ParallelAxis(MainChart.parallelAxis,'paname','parallelAxis'),//ok
        geo:new Containers(MainChart.geo,'geoname','geo'),          //ok
        calendar:new Containers(MainChart.calendar,'cldname','calendar'),//ok
        //固定组件
        legend:new SimpleType(MainChart.legend,'legend'), //ok
        parallel:new SimpleType(MainChart.parallel,'parallelLayout'), //ok
        tooltip:new SimpleType(MainChart.tooltip,'tooltip'), //ok
        toolbox:new SimpleType(MainChart.toolbox,'toolbox'), //ok

        //背景颜色，
        setBgColor:function(value){
            MainChart.backgroundColor = value;
            this.renew();
        },

        getBgColor:function(){
            return MainChart.backgroundColor;
        },
        //调色盘
        setColors:function(value){
            MainChart.color = value;
            this.renew();
        },

        getColors:function(){
            return MainChart.color;
        },

        //可调用的功能，包括更新 初始化 重新渲染
        getMainChart:function(){
            return MainChart;
        },
        renew:function(){
            chart.setOption(MainChart);
        },
        rerender:function(){ //重新渲染
            chart.setOption(MainChart,true,true);
        },
        setToDefaultMainChart(){
            MainChart = defaultMainChart;
            this.rerender();
        },
        saveChart(){
            simplePost(api.saveChart,{jsonChart:JSON.stringify(MainChart),chartName:chartName}).then(function(result){
                if(result === 'true'){
                    myOkAlert('保存成功!');
                }
                else{
                    myAlert('保存失败!');
                }
            });
        },

        //数据项管理------------------------------------------------
        getResultCount:function(){
            if(MainChart.hasOwnProperty('resultCount')){
                return MainChart.resultCount;
            }
            else{
                MainChart.resultCount = 0;
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
            MainChart.dataOptions = [];
        },

        getDataOptions:function(){
            return MainChart.dataOptions;
        },

        //主题切换
        changeTheme:function(type){
            var theme = {
                df:{ //default
                    bg:'transparent',
                    color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
                },
                dark:{
                    bg:'#333',
                    color:['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42']
                },
                shine:{
                    color:[
                        '#c12e34','#e6b600','#0098d9','#2b821d',
                        '#005eaa','#339ca8','#cda819','#32a487'
                    ],
                    bg:'transparent',
                },
                infographic:{
                    color:[
                        '#C1232B','#27727B','#FCCE10','#E87C25','#B5C334',
                        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                    ],
                    bg:'transparent'
                }
            };
            if(type=='default'){
                MainChart.backgroundColor = df['bg'];
                MainChart.color = df['color'];
                chart.dispose();
                chart = echarts.init($('#chart').get(0));
                chart.setOption(MainChart);
            }
            else{
                MainChart.backgroundColor = theme[type]['bg'];
                MainChart.color = theme[type]['color'];
                chart.dispose();
                chart = echarts.init($('#chart').get(0),type);
                chart.setOption(MainChart);
            }
            MainChart.theme = type;
        },

        //获取数据时间点
        getMiliTime:function(){
            if(MainChart.hasOwnProperty('miliTime')){
                return MainChart['miliTime'];
            }
            else{
                return new Date().getTime()
            }
        },
        setMiliTime:function(value){
            MainChart['miliTime'] = value;
        }
    };

    return itf;
};
//----------------------containers----------------------------------
//
//
// //
// var chart = echarts.init(document.getElementById('testarea'));
//
// var interface = createChartManager(chart,defaultMainChart,getParas);

// console.log(interface.title.get('1'));
// console.log(interface.title.get('2'));
// console.log(interface.title.create('5'));
// console.log(interface.title.update('1',{text:'123'}));
// console.log(interface.title.update('5',{text:'imspecial'}));
// console.log(interface.title.showset());
// interface.visualization.create('123','pie');
// // interface.visualization.setDataTo('123',[{name:'haha',value:123},{name:'333',value:89}]);
// interface.grid.create('grid1');
// // interface.visualization.createOnContainer('bar1','bar','grid','grid1');
// // setTimeout(function(){
// //     // interface.visualization.create('456','pie');
// //     // interface.visualization.update('456',{radius:['72%','80%']});
// //     // interface.visualization.setDataTo('456',[{name:'haha',value:150},{name:'333',value:69}]);
//     alert('hi');
//     interface.grid.setAxisTick('grid1','x',['维度1','维度2','维度3']);
// //     interface.visualization.setDataTo('bar1',[2,3,4,3,2,6]);
//     interface.grid.update('grid1',{width:'80%',height:'80%'});
// //     interface.renew();
// // },2000);
// interface.renew();