/**
 * Created by cwj on 2018/4/9.
 */
/*ID查询↓*/
/*
* openUpload 打开上传数据集的面板按钮
* uploadPanel 上传数据集的面板
* fileHandle 上传按钮
* uploadingBar 上传进度条
* dangerContent 警告modal中的警告内容
* modalDanger 警告modal
* fileInput 文件的Input
* dataSetName 数据集名字
* */
/*ID查询↑*/

//post key standard:
/*
* chartName
* chartsName -- for getAllChart
* */

var Chart = React.createClass({

    propTypes:{
        chartID:React.PropTypes.string.isRequired
    },

    getDefaultProps:function(){
        return {
            chartID : 'chartmain',
            chartName : 'defaultName'
        };
    },

    getInitialState:function(){
        return {
            chartName : this.props.chartName,
            option : {},
            datasource : {},
            echartObj : {},
            style : { width:'100%',height:'400px'}
        };
    },

    drawChart :function(){
        var newchart = echarts.init(document.getElementById(this.props.chartID));
        this.setState({echartObj:newchart});
        newchart.showLoading();
        var reactPointer = this;
        simplePost(api.getCurOption,{chartName:reactPointer.state.chartName}).then(
            function(result){
                reactPointer.state.option = JSON.parse(result);
                simplePost(api.getDataSource,{chartName:reactPointer.state.chartName}).then(function(result){
                    var jsonObj = JSON.parse(result);
                    console.log(jsonObj['dataset']);
                    reactPointer.state.datasource =  jsonObj['dataset'];

                    //开始绘图
                    reactPointer.state.option['dataset'] = reactPointer.state.datasource;
                    newchart.setOption(reactPointer.state.option);
                    newchart.hideLoading();
                });
            }
        )
    },

    componentDidMount:function(){
        this.drawChart();
    }
    ,
    callPanel:function(){
       togglePanel();
    },

    askForData:function(){
        alert('i m called');
    },

    askForOption:function(){

    },

    render:function(){
        return <div className="col-xs-6">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <div className="title">{this.state.chartName}</div>
                    </div>
                    <div className="pull-right card-action" >
                        <div className="btn-group" role="group" aria-label="...">
                            <button type="button" className="btn btn-link" onClick={this.callPanel}><i className="fa fa-code"></i></button>
                            <button type="button" className="btn btn-link" onClick={this.askForData}><i className="fa fa-refresh"></i></button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-xs-12">
                        <div id={this.props.chartID} style={this.state.style}></div>
                    </div>
                </div>
            </div>

        </div>;
    }
});

var togglePanel = function(){
   $('#chartleftPanel').modal('toggle');
   $('#chartrightPanel').modal('toggle');
   $('#chartPanel').modal('toggle');
};

var closePanel = function(){
   alert('i m called')
   $('#chartPanel').modal('hide');
};

$('#modalclose').click(function(){
  closePanel();
});

$(function(){

    //initialize
    //获取主页所有的表格

   /*simpleGet(api.getAllchart).then(function(result){

        var chartset = JSON.parse(result);
        var chartsName = [];
        var username = $('#usernamePos').val();
        var reactComponent = [];

        if(chartset.hasOwnProperty('chartsName')){
            chartsName = chartset['chartsName'];
        }
        for(var i =0;i<chartsName.length;i++){
            reactComponent.push(
                <Chart chartID={username+chartsName[i]} chartName={chartsName[i]} key={username+chartsName[i]}/>
            );
        }


   });*/
});