/**
 * Created by cwj on 2018/4/27.
 */
//---------------------------------------以下都是初始化参数------------------------


var concatObj = function(obj1,obj2){
    return $.extend(obj1,obj2);
};

var createTextStyle = function(title){
    var textStyle = {
        color: {
            type:'colorpicker',
            title:title,
            default:'#000000'
        },
        fontStyle: {
            title:title+'字体样式',
            type:'select',
            option:{
                '正常':'noraml',
                '意大利体':'italic',
                '斜体':'oblique'
            },
            default:'normal'
        },
        fontWeight:{
            title:title+'字体粗细',
            type:'select',
            option:{
                '正常':'normal',
                '加粗':'bold',
                '细化':'ligter'
            },
            default:'normal'
        },
        fontFamily:{
            title:title+'字体种类',
            type:'select',
            option:{
                '默认':'sans-serif',
                '微软雅黑':'Microsoft YaHei'
            },
            default: 'sans-serif'
        },
        fontSize: {
            title:title+'字体大小',
            type:'number',
            default:18,
        },
        textBorderColor:{
            default:'transparent',
            title:'字体边界颜色',
            type:'colorpicker'
        },
        textBorderWidth: {
            title:title+'字体边界宽度',
            type:'number',
            default:0,
        },
        textShadowColor:{
            default:'transparent',
            title:'字体阴影颜色',
            type:'colorpicker'
        },
        textShadowBlur: {
            title:title+'字体阴影模糊度',
            type:'number',
            default:0,
        },
        textShadowOffsetX: {
            title:title+'字体阴影X',
            type:'number',
            default:0,
        },
        textShadowOffsetY: {
            title:title+'字体阴影Y',
            type:'number',
            default:0,
        },
    };
    return textStyle;
};

var animationPara = function(){
    var para={
        animation:{
            type:'checkbox',
            title:'是否开启动画',
            default:true
        },
        animationDurationUpdate:{
            type:'number',
            default:300,
            max:10000,
            title:'更新动画时长'
        },
        animationEasingUpdate:{
            type:'number',
            default:'cubicOut',
            title:'更新动画效果'
        },
        animationDelayUpdate:{
            type:'number',
            default:0,
            title:'更新动画延迟',
            max:10000,
        }
    }
};


function createTitlePara(){
    var titlePara = {
            show:{
                type:'checkbox',
                title:'是否显示',
                default:true
            },
            text:{
                type:'text',
                title:'标题文本',
                default:'默认标题'
            },
            link:{
                type:'text',
                title:'网页链接',
                default:'about:blank'
            },
            subtext:{
                type:'text',
                title:'副标题文本',
                default:''
            },
            sublink: {
                type:'text',
                title:'副标题网页链接',
                default:'about:blank'
            },
            itemGap: {
                type:'number',
                title:'正副标题间距',
                default:10,
                tip:'titleGap'
            },
            left:{
                type:'number',
                title:'标题水平位置',
                default:'0',
                tip:'Xpos',
                unit:'%'
            },
            top:{
                type:'number',
                title:'标题垂直位置',
                default:'0',
                tip:'Ypos',
                unit:'%'
            },
            backgroundColor: {
                type:'colorpicker',
                title:'背景颜色',
                default:'transparent'
            },
            borderColor:{
                type:'colorpicker',
                title:'边框颜色',
                default:'transparent'
            },
            borderWidth: {
                type:'number',
                title:'边界宽度',
                default:0
            },
            borderRadius: {
                type:'number',
                title:'边界圆角',
                default:0
            },
            shadowColor:{
                type:'colorpicker',
                title:'标题颜色',
                default:'#000000'
            },
            shadowBlur: {
                type:'number',
                title:'阴影模糊度',
                default:0
            },
            shadowOffsetX: {
                type:'number',
                title:'阴影X',
                default:0
            },
            shadowOffsetY: {
                type:'number',
                title:'阴影Y',
                default:0
            },
            textStyle:{
                type:'wrapper',
                title:'主标题文字设置',
                initPara:createTextStyle('主标题')
            },
            subtextStyle:{
                type:'wrapper',
                title:'副标题文字设置',
                initPara:createTextStyle('副标题')
            }
    };
    return cloneObj(titlePara);
}

function  createGridPara() {
    var gridPara = {
        show: {
            type:'checkbox',
            title:'是否显示',
            default:true
        },
        left:{
            type:'number',
            title:'格栅水平位置',
            default:'0',
            tip:'GridXpos',
            unit:'%',
        },
        top:{
            type:'number',
            title:'格栅垂直位置',
            default:'0',
            tip:'GridYpos',
            unit:'%'
        },
        width: {
            type:'number',
            title:'宽度百分比',
            default:'30',
            unit:'%'
        },
        height:{
            type:'number',
            title:'高度百分比',
            default:'30',
            unit:'%'
        },
        backgroundColor: {
            type:'colorpicker',
            title:'格栅背景颜色',
            default:'transparent',
        },
        borderColor:{
            type:'colorpicker',
            title:'格栅边界颜色',
            default:'transparent'
        },
        borderWidth:{
            type:'number',
            title:'边界宽度',
            default:0
        },
        shadowColor:{
            type:'colorpicker',
            title:'阴影颜色',
            default:'transparent'
        },
        shadowBlur: {
            type:'number',
            title:'阴影深度',
            default:0
        },
        shadowOffsetX: {
            type:'number',
            title:'阴影X',
            default:0
        },
        shadowOffsetY: {
            type:'number',
            title:'阴影Y',
            default:0
        },
    };
    return gridPara;
}

function createAxisPara(){
    var axisPara = {
        show: {
            type:'checkbox',
            title:'是否显示坐标轴',
            default:true
        },
        gridIndex: {
            default:0
        },
        position:{
            title:'坐标位置',
            type:'select',
            option:{
                '靠上':'top',
                '靠左':'left',
                '靠右':'right',
                '靠下':'bottom'
            },
            default:'left'
        },
        min:{
            type:'text',
            title:'坐标轴最小值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        max:{
            type:'text',
            title:'坐标轴最大值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        offset: {
            type:'number',
            title:'轴偏移',
            default:0
        },
        type:{
            title:'轴类型',
            type:'select',
            option:{
                '分类':'category',
                '数值':'value',
            },
            default:'value'
        },
        name:{
            type:'text',
            title:'坐标轴名称',
            default:''
        },
        nameLocation:{
            title:'坐标轴位置',
            type:'select',
            option:{
                '头':'start',
                '中':'center',
                '尾':'end'
            },
            default:'value'
        },
        nameTextStyle:{
            type:'wrapper',
            title:'坐标轴名字文字',
            initPara:createTextStyle('坐标轴名称')
        },
        nameGap: {
            type:'number',
            title:'坐标轴名称与轴线距离',
            default:15
        },
        nameRotate:{
            type:'number',
            title:'坐标名称轴旋转角度',
            default:0
        },
        inverse:{
            type:'checkbox',
            title:'刻度反转',
            default:false
        },
        scale: {
            type:'checkbox',
            title:'刻度自动缩放',
            default:true
        },
        axisLine: {
            type:'wrapper',
            title:'轴线设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示轴线',
                    default:true
                },
                onZero:{
                    type:'checkbox',
                    title:'是否在另一轴0刻度上(另一轴为数值轴)',
                    default:true
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'轴线颜色',
                            default:'#333'
                        },
                        width:{
                            type:'number',
                            title:'轴线宽度',
                            default:1
                        },
                        type:{
                            title:'轴线类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisTick:{
            type:'wrapper',
            title:'轴刻度设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示刻度',
                    default:true
                },
                inside:{
                    type:'checkbox',
                    title:'刻度朝里',
                    default:true
                },
                length:{
                     type:'number',
                     title:'刻度长度',
                     default:10
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'刻度线颜色',
                            default:'#c0c0c0'
                        },
                        width:{
                            type:'number',
                            title:'刻度宽度',
                            default:1
                        },
                        type:{
                            title:'刻度类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisLabel:{
            type:'wrapper',
            title:'轴标签设置',
            initPara:concatObj(
                {
                    show:{
                        type:'checkbox',
                        title:'是否显示标签',
                        default:true
                    },
                    rotate:{
                        type:'number',
                        title:'旋转角度',
                        default:0
                    },
                    margin:{
                        type:'number',
                        title:'与轴线之间距离',
                        default:8
                    }
                }
                ,createTextStyle('标签'))
        },
        splitArea:{
            type:'wrapper',
            initPara:{
                show:{
                    default:false,
                    title:'划分区域',
                    type:'checkbox'
                }
            }
        },
    };
    return axisPara;
}

//--------------------图表初始化项---------------------------

var createVisualMap = function(){
    var vm = {
        seriesIndex:{
            default:'all'
        },
        show:{
            type: 'checkbox',
            title: '是否显示',
            default: true
        },
        type:{
            default: 'continuous'
        },
        text:{
             type:'headandend',
             setting:'text',
             default:[],
             title:['头标题','尾标题']
        },
        min:{
            type:'text',
            title:'最小值',
            default:'0',
        },
        max:{
            type:'text',
            title:'最大值',
            default:'500',
        },
        calculable:{
            default:'true'
        },
        inverse: {
            type: 'checkbox',
            title: '是否反转',
            default: true
        },
        precision:{
             default:0.0001,
        },
        itemWidth:{
            type:'number',
            title:'宽度',
            default:20,
        },
        itemHeight:{
            type:'number',
            title:'高度',
            default:140,
        },
        seriesIndex:{
            default:"all",
        },
        left:{
            type:'number',
            title:'图例水平位置',
            default:'10',
            unit:'%'
        },
        top:{
            type:'number',
            title:'图例垂直位置',
            default:'10',
            unit:'%'
        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        backgroundColor:{
            type:'colorpicker',
            title:'背景颜色',
            default:'rgba(0,0,0,0)'
        },
        inRange:{
            type:'wrapper',
            title:'值范围内设置',
            initPara:{
                colorLightness:{
                     type:'headandend',
                     setting:'text',
                     default:[0.5,0.5],
                     title:['渐变颜色开始系数','渐变颜色结束系数']
                },
                color:{
                    type:"multicolor",
                    default:[],
                    title:"渐变颜色序列"
                }
            }
        },
        outOfRange: {
            default:{
            color: 'transparent'
            }
        },
        controller: {
            type:'wrapper',
            title:'控制手柄设置',
            initPara:{
                inRange: {
                    type:'wrapper',
                    title:'范围内设置',
                    initPara:{
                        color:{
                            title:'滑动条颜色',
                            type:'colorpicker',
                            default: '#2f4524',
                        }
                    }
                }
            }
        }
    };
    return vm;
};

var createToolBoxPara = function(){
    var toolboxPara = {
        show:{
            type: 'checkbox',
            title: '是否显示',
            default: true
        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        itemSize:{
            type:'number',
            title:'组件大小',
            default:15,
        },
        itemGap:{
            type:'number',
            title:'组件间隔',
            default:10,
        },
        left:{
            type:'number',
            title:'工具栏水平位置',
            default:'80%',
            unit:'%'
        },
        top:{
            type:'number',
            title:'工具栏垂直位置',
            default:'0%',
            unit:'%'
        },
        width: {
            type:'number',
            title:'宽度',
            default:'auto',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        height:{
            type:'number',
            title:'高度',
            default:'auto',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        feature: {
            type:'wrapper',
            title:'工具选择',
            initPara:{
                saveAsImage:{
                    type:'wrapper',
                    title:'保存为图片',
                    initPara:{
                        type:{
                            title:'截图保存格式',
                            type:'select',
                            option:{
                                'png':'png',
                                'jpeg':'jpeg',
                            },
                            default:'png'
                        },
                        show:{
                            title:'展示保存图表',
                            type:'checkbox',
                            default:true,
                        }
                    }
                },
                restore: {
                    type:'wrapper',
                    title:'还原工具',
                    initPara:{
                        show:{
                            title:'展示还原图标',
                            type:'checkbox',
                            default:true,
                        }
                    }
                },
                dataView:{
                    type:'wrapper',
                    title:'数据查看工具',
                    initPara:{
                        show:{
                            title:'展示数据查看图标',
                            type:'checkbox',
                            default:true,
                        }
                    },
                },
                magicType:{
                    type:'wrapper',
                    title:'类型转换工具',
                    initPara:{
                        show:{
                            title:'展示切换图标',
                            type:'checkbox',
                            default:false,
                        },
                        type:{
                            default:['line', 'bar', 'stack', 'tiled']
                        },
                    }
                },
            }
        }
    };
    return toolboxPara;
};

var createDataZoomPara = function(type){

    var para = {};
    if(type=='x'){
        para.xAxisIndex = {
            type:'axisselector',
            mode:'x',
            default:[0]
        }
    }
    else{
        para.yAxisIndex = {
            type:'axisselector',
            mode:'y',
            default:[0]
        }
    };
    var paras = {
        type:{
            default:'slider'
        },
        show:{
            title:'是否显示',
            type:'checkbox',
            default:true,
        },
        backgroundColor:{
            type:'colorpicker',
            default: 'rgba(47,69,84,0)',
            title:'背景颜色',
        },
        filterMode:{
            type:'select',
            title:'数据过滤模式',
            option:{
                'filter':'filter',
                'weakFilter':'weakFilter',
                'none':'none',
                'empty':'empty',
            },
            default:'weakFilter'
        },
        start:{
            type:'number',
            title:'开始百分比',
            default:0,
        },
        end:{
            type:'number',
            title:'结束百分比',
            default:100,

        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
                '默认':null
            },
            default:null,
        },
        left:{
            type:'text',
            title:'水平位置',
            default:'auto',
            specialVal:'auto',
            specialTip:'设为自适应',
            openSpecial:true,
        },
        top:{
            type:'text',
            title:'垂直位置',
            default:'auto',
            specialVal:'auto',
            specialTip:'设为自适应',
            openSpecial:true,
        },
        dataBackground:{
            type:'wrapper',
            title:'数据轴样式',
            initPara:{
                lineStyle:{
                    title:'线样式',
                    type:'wrapper',
                    initPara:{
                        color:{
                            default:'#2f4554',
                            title:'线颜色',
                            type:'colorpicker'
                        },
                        width:{
                            default:0.5,
                            titile:'线宽',
                            type:'number'
                        },
                        type:{
                            title:'线描边类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影模糊度',
                            default:0
                        },
                        shadowColor: {
                            type:'colorpicker',
                            title:'阴影颜色',
                            default:'transparent'
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                    }
                },
                areaStyle:{
                    type:'wrapper',
                    title:'背景样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            default:'rgba(47,69,84,0.3)',
                            title:'区域颜色'
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影模糊度',
                            default:0
                        },
                        shadowColor: {
                            type:'colorpicker',
                            title:'阴影颜色',
                            default:'transparent'
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                    }
                },
            }
        },
        handleStyle: {
            type:'wrapper',
            title:'握把样式',
            initPara:{
                color:{
                    type:'colorpicker',
                    default: '#a7b7cc',
                    title:'组件颜色'
                },
                borderColor:{
                    type:'colorpicker',
                    default:'#000',
                    title:'边界颜色'
                },
                borderWidth:{
                    type:'number',
                    default:0,
                    title:'边界宽度'
                },
                borderType:{
                    title:'边界描边类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影模糊度',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        }
    };
    for(name in paras){
        para[name] = paras[name];
    }
    return para;
};

var createAxisPointer = function(){

};

var createToolTipPara = function(){
    var para = {
        show:{
            type:'checkbox',
            default:true,
            title:'显示提示框'
        },
        trigger:{
            title:'触发模式',
            type:'select',
            default:'item',
            option:{
                '数据项触发':'item',
                '坐标轴触发':'axis',
                '不触发':'none'
            },
        },
        showContent:{
            title:'展示标签内容',
            type:'checkbox',
            default: true
        },
        showDelay:{
            type:'number',
            default:0,
            title:'显示延迟'
        },
        hideDelay:{
            type:'number',
            default:100,
            title:'隐藏延迟',
            max:1000
        },
        transitionDuration:{
            type:'text',
            default:'0.4',
            title:'悬浮框跟随延迟',
        },
        position:{
            title:'悬浮窗位置',
            type:'select',
            default:'right',
            option:{
                '左侧':'left',
                '右侧':'right',
                '上侧':'top',
                '底部':'bottom',
            },
        }
    };
    return para;
};

var createLegendPara = function(){
    var para = {
        show:{
            type:'checkbox',
            title:'是否显示图例',
            default:true
        },
        type:{
            title:'图例类型',
            type:'select',
            option:{
                '平铺':'plain',
                '可滚动':'scroll',
            },
            default:'plain',
        },
        left:{
            type:'number',
            title:'图例水平位置',
            default:'10',
            unit:'%'
        },
        top:{
            type:'number',
            title:'图例垂直位置',
            default:'10',
            unit:'%'
        },
        width:{
            type:'number',
            title:'组件宽度',
            max:'1000',
            default:'auto',
            specialVal:'auto',
            specialTip:'设为自适应',
            openSpecial:true
        },
        height:{
            type:'number',
            title:'组件高度',
            default:'auto',
            max:'1000',
            specialVal:'auto',
            specialTip:'设为自适应',
            openSpecial:true,
        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        padding:{
            type:'number',
            title:'图例内边距',
            default:5,
        },
        itemGap:{
            type:'number',
            title:'图例间隔',
            default:10,
        },
        itemWidth:{
            type:'number',
            title:'图例标记宽度',
            default:25,
        },
        itemHeight:{
            type:'number',
            title:'图例标记高度',
            default:14,
        },
        selectedMode:{
            title:'选择模式',
            type:'select',
            option:{
                '单选':'single',
                '多选':'multiple',
            },
            default:'multiple',
        },
        textStyle:{
            type:'wrapper',
            title:'图例文本样式',
            initPara:createTextStyle('图例文本')
        },
        backgroundColor:{
            type:'colorpicker',
            title:'背景颜色',
            default:'transparent'
        },
    };
    return para;
};

var createBarPara = function(){
    var bar = {
        type:{
            default:'bar'
        },
        itemStyle:{
            type:'wrapper',
            title:'柱样式',
            initPara:{
                color:{
                    type:'colorpicker',
                    title:'柱颜色',
                    default:'',
                    specialVal:'',
                    specialTip:'启用颜色自动分配',
                    openSpecial:true
                },
                borderColor:{
                    type:'colorpicker',
                    title:'柱边界颜色',
                    default:'#000000',
                },
                borderWidth:{
                    type:'number',
                    title:'边界宽度',
                    default:0
                },
                borderType:{
                    title:'边界描边类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                barBorderRadius:{
                    type:'number',
                    title:'边界圆角',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影深度',
                    default:0
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
                opacity:{
                    title:'透明度',
                    type:'number',
                    min:0,
                    max:1,
                    step:0.1,
                    default:1
                }
            }
        },
        stack:{
            type:'text',
            title:'堆叠区域',
            default:null,
            specialVal:null,
            specialTip:'取消堆叠',
            openSpecial:true
        },
        barWidth: {
            type:'number',
            title:'柱子宽度',
            default:'自适应',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true
        }
        ,
        barMinHeight:{
            type:'number',
            title:'柱子最小高度',
            default:0,
        },
        barGap:{
            type:'number',
            title:'柱间距离',
            default:30,
            unit:'%'
        },
        barCategoryGap:{
            type:'number',
            title:'类目间柱形距离',
            default:20,
            unit:'%'
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        }
        //这两个待做，因为面板需要调整
        // markPoint:{
        //     type:'wrapper',
        //     initPara:{
        //
        //     }
        // },
        // markLine: {...},
    };
    return bar;
};

var createPiePara = function(){
    var piePara ={
        type:{
            default:'pie'
        },
        legendHoverLink:{
            type:'checkbox',
            default:true,
            title:'图例联动高亮'
        },
        radius:{
            type:'headandend',
            title:['内径大小','外径大小'],
            default:['0%','50%'],
            setting:'text',
            unit:'%'
        },
        center:{
            type:'headandend',
            title:['圆心x相对位置','圆心y相对位置'],
            default:['50%','50%'],
            setting:'text',
            unit:'%'
        },
        hoverAnimation:{
            title:'扇区放大动画',
            type:'checkbox',
            default:true,
        },
        hoverOffset:{
            title:'扇区高亮偏移距离',
            type:'number',
            default:10
        },
        selectedMode:{
            title:'是否多选',
            type:'checkbox',
            default:false
        },
        selectedOffset:{
            title:'选中偏移',
            type:'number',
            default:10
        },
        clockwise:{
            title:'顺时针排布',
            type:'checkbox',
            default:true,
        },
        avoidLabelOverlap:{
            title:'标签避免重叠',
            type:'checkbox',
            default:true
        },
        startAngle:{
            title:'开始角度',
            type:'number',
            default:90,
            max:360
        },
        minAngle:{
            title:'扇区最小角度',
            type:'number',
            default:0,
            max:360
        },
        roseType:{
            title:'南丁格尔图效果',
            type:'select',
            option:{
                '半径展示大小':'radius',
                '面积展示大小':'area',
                '关闭': false
            },
            default:false,
        },
        label:{
            type:"wrapper",
            title:'标签样式',
            initPara:{
                normal:{
                    type:'wrapper',
                    title:'未高亮标签设置',
                    initPara:{
                        show:{
                            title:'未高亮展示',
                            type:'checkbox',
                            default:true
                        },
                        fontSize:{
                            title:'未高亮字体大小',
                            type:'number',
                            default:12
                        },
                        position:{
                            title:'未高亮标签位置',
                            type:'select',
                            option:{
                                '外围':'outside',
                                '内部':'inside',
                                '中央':'center'
                            },
                            default:'outside',
                        }
                    }
                },
                emphasis:{
                    type:'wrapper',
                    title:'高亮标签设置',
                    initPara:{
                        show:{
                            title:'高亮展示',
                            type:'checkbox',
                            default:false
                        },
                        fontSize:{
                            title:'高亮字体大小',
                            type:'number',
                            default:12
                        },
                        position:{
                            title:'高亮标签位置',
                            type:'select',
                            option:{
                                '外围':'outside',
                                '内部':'inside',
                                '中央':'center'
                            },
                            default:'outside',
                        }
                    }
                },
            }
        },
        labelLine:{
            type:'wrapper',
            titile:'线样式',
            initPara:{
                normal:{
                    type:'wrapper',
                    title:'未高亮线样式',
                    initPara:{
                        show:{
                            type:'checkbox',
                            default:true,
                            title:'未高亮显示引导线'
                        },
                        length:{
                            type:'number',
                            default:10,
                            title:'未高亮第一段引导线长'
                        },
                        length2:{
                            type:'number',
                            default:5,
                            title:'未高亮第二段引导线长'
                        },
                        smooth:{
                            default:'0.1',
                            title:'未高亮平滑值（小数）',
                            type:'text'
                        },
                        lineStyle:{
                            type:'wrapper',
                            title:'线设置',
                            initPara:{
                                width:{
                                    type:'number',
                                    default:1,
                                    title:'未高亮线宽'
                                },
                                type:{
                                    title:'未高亮线类型',
                                    type:'select',
                                    option:{
                                        'solid':'solid',
                                        'dashed':'dashed',
                                        'dotted':'dotted'
                                    },
                                    default:'solid',
                                }
                            }
                        }
                    }
                },
                emphasis:{
                    type:'wrapper',
                    title:"高亮时线样式",
                    initPara:{
                        show:{
                            type:'checkbox',
                            default:false,
                            title:'高亮显示引导线'
                        },
                        length:{
                            type:'number',
                            default:10,
                            title:'高亮第一段引导线长'
                        },
                        length2:{
                            type:'number',
                            default:5,
                            title:'高亮第二段引导线长'
                        },
                        smooth:{
                            default:'0.1',
                            title:'高亮平滑值（小数）',
                            type:'text'
                        },
                        lineStyle:{
                            type:'wrapper',
                            title:'线样式',
                            initPara:{
                                width:{
                                    type:'number',
                                    default:1,
                                    title:'高亮线宽'
                                },
                                type:{
                                    title:'高亮线类型',
                                    type:'select',
                                    option:{
                                        'solid':'solid',
                                        'dashed':'dashed',
                                        'dotted':'dotted'
                                    },
                                    default:'solid',
                                }
                            }
                        }
                    }
                }
            }
        },
        itemStyle:{
            title:'饼颜色设置',
            type:'wrapper',
            initPara:{
                color:{
                    type:"colorpicker",
                    default:"",
                    title:"设置单一颜色",
                    openSpecial:true,
                    specialTip:'自动分配颜色',
                    specialVal:''
                }
            }
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        }
    };
    return piePara;
};

var createLinePara = function(){
    var para={
        type:{
            default:'line'
        },
        symbol:{
            title:'点外观类型',
            type:'select',
            option:{
                '空心圆':'emptyCircle' ,
                '圆':'circle',
                '方':'rect',
                '圆方':'roundRect',
                '三角形':'triangle',
                '钻石': 'diamond',
                '图钉':'pin',
                '箭头':'arrow',
            },
            default:'emptyCircle',
        },
        symbolSize: {
            title:'标签大小',
            default:4,
            type:'number'
        },
        symbolRotate:{
            title:'标签旋转',
            default:0,
            type:'number' ,
            max:360
        },
        symbolOffset:{
            default: [0, 0]
        },
        showSymbol:{
            title:'显示点',
            default:true,
            type:'checkbox'
        },
        showAllSymbol:{
            title:'显示所有点',
            default:false,
            type:'checkbox'
        },
        hoverAnimation:{
            title:'高亮动画',
            default:true,
            type:'checkbox'
        },
        legendHoverLink:{
            title:'图例选择高亮',
            default:true,
            type:'checkbox'
        },
        stack:{
            type:'text',
            title:'堆叠区域',
            default:null,
            specialVal:null,
            specialTip:'取消堆叠',
            openSpecial:true
        },
        step:{
            title:'阶梯类型',
            type:'select',
            option:{
                '开始点攀升':'start' ,
                '中间点攀升':'middle',
                '结束点攀升':'end',
                '关闭':false
            },
            default:false,
        },
        itemStyle:{
            type:'wrapper',
            title:'线颜色',
            initPara:{
                color:{
                    type:'colorpicker',
                    openSpecial:true,
                    specialVal:'',
                    default:''
                }
            }
        },
        lineStyle:{
            type:'wrapper',
            title:'线样式',
            initPara:{
                width: {
                    type:'number',
                    title:'线宽',
                    default:2
                },
                type:{
                    title:'线类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影模糊度',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        },
        smooth:{
            type:'checkbox',
            default:false,
            title:'平滑曲线'
        },
        sampling:{
            type:'select',
            title:'采样策略(当点多时)',
            option:{
                '取滤点大值':'max',
                '取滤点小值':'min',
                '取滤点平均':'average',
                '取滤和':'sum'
            },
            default:'average',
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        areaStyle:{
            type:'wrapper',
            title:'填充区域设置',
            initPara:{
                color:{
                    type:"colorpicker",
                    default:'transparent',
                    title:'填充颜色'
                },
                origin:{
                    type:'select',
                    title:'填充样式',
                    default:'auto',
                    option:{
                        'start':'start',
                        'end':'end',
                        'auto':'auto'
                    }
                },
            }
        }
    };
    return para;
};

var createScatterPara = function(){
    var para = {
        type:{
            default: 'scatter'
        },
        // coordinateSystem: 'cartesian2d',
        // xAxisIndex: 0,
        // yAxisIndex: 0,
        // polarIndex: 0,
        // geoIndex: 0,
        // calendarIndex: 0,
        symbol:{
            title:'点外观类型',
            type:'select',
            option:{
                '空心圆':'emptyCircle' ,
                '圆':'circle',
                '方':'rect',
                '圆方':'roundRect',
                '三角形':'triangle',
                '钻石': 'diamond',
                '图钉':'pin',
                '箭头':'arrow',
            },
            default:'circle',
        },
        symbolSize: {
            default:12
        },
        symbolRotate:{
            title:'点旋转',
            default:0,
            type:'number' ,
            max:360
        },
        large:{
             title:'开启大数据优化',
             default: false,
             type:'checkbox'
        },
        largeThreshold:{
            title:'开启大数据优化阈值',
            default: 2000,
            type:'text'
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        label:{
            type:"wrapper",
            title:'标签样式',
            initPara:{
                normal:{
                    type:'wrapper',
                    title:'未高亮标签设置',
                    initPara:{
                        show:{
                            title:'未高亮展示',
                            type:'checkbox',
                            default:true
                        },
                        fontSize:{
                            title:'未高亮字体大小',
                            type:'number',
                            default:12
                        },
                        position:{
                            title:'未高亮标签位置',
                            type:'select',
                            option:{
                                '外围':'outside',
                                '内部':'inside',
                                '中央':'center'
                            },
                            default:'outside',
                        }
                    }
                },
                emphasis:{
                    type:'wrapper',
                    title:'高亮标签设置',
                    initPara:{
                        show:{
                            title:'高亮展示',
                            type:'checkbox',
                            default:false
                        },
                        fontSize:{
                            title:'高亮字体大小',
                            type:'number',
                            default:12
                        },
                        position:{
                            title:'高亮标签位置',
                            type:'select',
                            option:{
                                '外围':'outside',
                                '内部':'inside',
                                '中央':'center'
                            },
                            default:'outside',
                        }
                    }
                },
            }
        },
        scatterSymbol:{
            default:{
                size:12,
                ratio:10,
                fixed:false
            }
        },
    };
    return para;
};

var gaugePara = function(){
    var para = {
        type:{
            default: 'gauge'
        },
        radius:{
            type:'text',
            default:'75%',
            title:'半径'
        },
        startAngle:{
            type:'number',
            default: 225,
            title:'开始角度'
        },
        endAngle:{
            type:'number',
            default: -45,
            title:'结束角度'
        },
        clockwise:{
            type:'checkbox',
            default:true,
            title:'是否顺时针'
        },
        min:{
            type:'number',
            default:0,
            title:'最小值'
        },
        max: {
            type:'number',
            default:100,
            title:'最大值'
        },
        splitNumber:{
            type:'number',
            default:5,
            title:'分割段数'
        },
        axisLine:{
            type:'wrapper',
            title:'刻度设置',
            initPara:{
                show:{type:'checkbox',default:true,title:'显示刻度'},
                lineStyle: {
                    type:'wrapper',
                    title:'刻度线设置',
                    initPara:{
                        color:{
                            default:[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                        },
                        width:{
                            type:'number',
                            title:'线宽度',
                            default:20
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                    }
                }
            }
        }
    };
    return para;
};

var createMapPara = function(){
    var para = {
        type:{
            default:'map'
        },
        map:{
            type:'select',
            option:{
                '中国':'china',
                '世界':'world'
            },
            title:'地图类型',
            default:'china'
        },
        roam:{
            type:'checkbox',
            default:true,
            title:'开启自由拖放'
        },
        aspectScale:{
            type:'text',
            default:'0.75',
            title:'长宽比'
        },
        zoom:{
            default:0,
            type:'number',
            title:'缩放'
        },
        scaleLimit:{
            title:'缩放设置',
            type:'wrapper',
            initPara:{
                min:{
                    type:'text',
                    title:'最小缩放',
                    default:'0'
                },
                max:{
                    type:'text',
                    title:'最大缩放',
                    default:'2'
                }
            }
        },
        selectedMode:{
            title:'是否多选',
            type:'checkbox',
            default:false
        },
        label: {
            default:true
        },
        itemStyle: {
            type:'wrapper',
            title:'地图样式设置',
            initPara:{
                areaColor:{
                    type:'colorpicker',
                    default:'#eee',
                    title:'地图颜色'
                },
                borderColor:{
                    type:'colorpicker',
                    title:'边框颜色',
                    default:'#000'
                },
                borderWidth: {
                    type:'text',
                    title:'边界宽度',
                    default:'0.4'
                },
                borderType:{
                    title:'边界描边类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影模糊度',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'10',
            min:-100,
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'10',
            min:-100,
            unit:'%'
        },
        mapValueCalculation:{
            title:'同图数值计算',
            type:'select',
            option:{
                '取和':'sum',
                '取平均值':'average',
                '取最小':'min',
                '取最大':'max',
            },
            default:'sum'
        },
        showLegendSymbol:{
            title:'显示标记',
            type:'checkbox',
            default:false,
        },
    };
    return para;
};


var getSeriesInitPara =function(type){
    if(type==='bar'){
        return createBarPara();
    }
    else if(type === 'pie'){
        return createPiePara();
    }
    else if(type=== 'line'){
        return createLinePara();
    }
    else if(type=== 'scatter'){
        return ;
    }
    else if(type==='map'){
        return createMapPara();
    }
    else if(type==='gauge'){
        return gaugePara();
    }
    return {};
};

var getAxisInitPara = function(type){
    if(type === 'singleAxis'){
        return createSingleAxisPara();
    }
    else if(type === 'geo'){
        return createGeoPara();
    }
    else if(type === 'parallel'){
        return createParallelAxisPara();
    }
    else if(type === 'calendar'){
        return createCalendarPara();
    }
    return {};
};

//-------------------------------------axis---------------------------------------------

var createGeoPara = function(){
    var para = {
        type:{
            default:'map'
        },
        map:{
            type:'select',
            option:{
                '中国':'china',
                '世界':'world'
            },
            title:'地图类型',
            default:'china'
        },
        roam:{
            type:'checkbox',
            title:'漫游模式',
            default:true
        },
        aspectScale:{
            type:'text',
            default:'0.75',
            title:'长宽比'
        },
        zoom:{
            default:0,
            type:'number',
            title:'缩放'
        },
        scaleLimit:{
            title:'缩放设置',
            type:'wrapper',
            initPara:{
                min:{
                    type:'text',
                    title:'最小缩放',
                    default:'0'
                },
                max:{
                    type:'text',
                    title:'最大缩放',
                    default:'2'
                }
            }
        },
        selectedMode:{
            title:'是否多选',
            type:'checkbox',
            default:false
        },
        label: {
            default:false
        },
        itemStyle: {
            type:'wrapper',
            title:'地图样式设置',
            initPara:{
                areaColor:{
                    type:'colorpicker',
                    default:'#eee',
                    title:'地图颜色'
                },
                borderColor:{
                    type:'colorpicker',
                    title:'边框颜色',
                    default:'#000'
                },
                borderWidth: {
                    type:'text',
                    title:'边界宽度',
                    default:'0.4'
                },
                borderType:{
                    title:'边界描边类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影模糊度',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        },
        z:{
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'10',
            min:-100,
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'10',
            min:-100,
            unit:'%'
        },
        mapValueCalculation:{
            title:'同图数值计算',
            type:'select',
            option:{
                '取和':'sum',
                '取平均值':'average',
                '取最小':'min',
                '取最大':'max',
            },
            default:'sum'
        },
        showLegendSymbol:{
            title:'显示标记',
            type:'checkbox',
            default:false,
        },
        itemStyle:{
            default:{
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        }
    };
    return para;
};

var createSingleAxisPara = function(){
    var para = {
        z: {
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        width: {
            type:'number',
            title:'宽度',
            default:'auto',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        height:{
            type:'number',
            title:'高度',
            default:'auto',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        type:{
            title:'轴类型',
            type:'select',
            option:{
                '分类':'category',
                '数值':'value',
            },
            default:'category'
        },
        data:{
            default:[1,2,3,4,5],
        },
        name:{
            type:'text',
            title:'单坐标轴名称',
            default:''
        },
        nameLocation:{
            title:'单坐标轴位置',
            type:'select',
            option:{
                '头':'start',
                '中':'center',
                '尾':'end'
            },
            default:'value'
        },
        nameTextStyle:{
            type:'wrapper',
            title:'坐标轴名字文字',
            initPara:createTextStyle('单坐标轴名称')
        },
        nameGap: {
            type:'number',
            title:'单坐标轴名称与轴线距离',
            default:15
        },
        nameRotate:{
            type:'number',
            title:'单坐标名称轴旋转角度',
            default:0
        },
        inverse:{
            type: 'checkbox',
            title: '是否反转',
            default: true
        },
        min:{
            type:'text',
            title:'坐标轴最小值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        max:{
            type:'text',
            title:'坐标轴最大值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        scale:{
            type:'checkbox',
            title:'刻度自动缩放',
            default:true
        },
        splitNumber:{
            type:'number',
            default:5,
            title:'分割段数'
        },
        minInterval:{
            type:'text',
            title:'最小分割大小',
            default:0
        },
        axisLine: {
            type:'wrapper',
            title:'轴线设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示轴线',
                    default:true
                },
                onZero:{
                    type:'checkbox',
                    title:'是否在另一轴0刻度上(另一轴为数值轴)',
                    default:true
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'轴线颜色',
                            default:'#333'
                        },
                        width:{
                            type:'number',
                            title:'轴线宽度',
                            default:1
                        },
                        type:{
                            title:'轴线类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisTick:{
            type:'wrapper',
            title:'轴刻度设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示刻度',
                    default:true
                },
                inside:{
                    type:'checkbox',
                    title:'刻度朝里',
                    default:true
                },
                length:{
                     type:'number',
                     title:'刻度长度',
                     default:10
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'刻度线颜色',
                            default:'#c0c0c0'
                        },
                        width:{
                            type:'number',
                            title:'刻度宽度',
                            default:1
                        },
                        type:{
                            title:'刻度类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisLabel:{
            type:'wrapper',
            title:'轴标签设置',
            initPara:concatObj(
                {
                    show:{
                        type:'checkbox',
                        title:'是否显示标签',
                        default:true
                    },
                    rotate:{
                        type:'number',
                        title:'旋转角度',
                        default:0
                    },
                    margin:{
                        type:'number',
                        title:'与轴线之间距离',
                        default:8
                    }
                }
                ,createTextStyle('标签'))
        }
    };
    return para;
};

var createCalendarPara = function(){
    var para = {
        z: {
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        width: {
            type:'number',
            title:'宽度',
            default:'200',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        height:{
            type:'number',
            title:'高度',
            default:'200',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        orient:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        range:{
            type:'datepicker',
            title:'时间区间选择',
            default:['2018-1-1','2018-2-1']
        },
        cellSize:{
             type:'headandend',
             setting:'text',
             default:['auto','auto'],
             title:['网格长','网格宽']
        },
        itemStyle: {
            type:'wrapper',
            title:'网格样式设置',
            initPara:{
                color:{
                    type:'colorpicker',
                    default:'#eee',
                    title:'颜色'
                },
                borderColor:{
                    type:'colorpicker',
                    title:'边框颜色',
                    default:'#000'
                },
                borderWidth: {
                    type:'text',
                    title:'边界宽度',
                    default:'0.4'
                },
                borderType:{
                    title:'边界描边类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影模糊度',
                    default:0
                },
                shadowColor: {
                    type:'colorpicker',
                    title:'阴影颜色',
                    default:'transparent'
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        },
        dayLabel:{
            title:'天标签',
            type:'wrapper',
            initPara:{
                show:{
                    title:'是否显示',
                    default:true,
                    type:'checkbox'
                }
            }
        },
        monthLabel:{
            title:'月标签',
            type:'wrapper',
            initPara:{
                show:{
                    title:'是否显示',
                    default:true,
                    type:'checkbox'
                }
            }
        },
        yearLabel:{
            title:'年标签',
            type:'wrapper',
            initPara:{
                show:{
                    title:'是否显示',
                    default:true,
                    type:'checkbox'
                }
            }
        },
    };
    return para;
};

var createParallelAxisPara = function(){

   var para = {

        type:{
            title:'轴类型',
            type:'select',
            option:{
                '分类':'category',
                '数值':'value',
            },
            default:'value'
        },
        data:{
            default:[1,2,3,4,5],
        },
        name:{
            type:'text',
            title:'平行坐标轴名称',
            default:'坐标轴名'
        },
        nameLocation:{
            title:'名称位置',
            type:'select',
            option:{
                '头':'start',
                '中':'center',
                '尾':'end'
            },
            default:'end'
        },
        nameTextStyle:{
            type:'wrapper',
            title:'坐标轴名字文字',
            initPara:createTextStyle('单坐标轴名称')
        },
        nameGap: {
            type:'number',
            title:'单坐标轴名称与轴线距离',
            default:15
        },
        nameRotate:{
            type:'number',
            title:'单坐标名称轴旋转角度',
            default:0
        },
        inverse:{
            type: 'checkbox',
            title: '是否反转',
            default: true
        },
        min:{
            type:'text',
            title:'坐标轴最小值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        max:{
            type:'text',
            title:'坐标轴最大值',
            default:null,
            specialVal:null,
            specialTip:'设为自适应',
            openSpecial:true
        },
        scale:{
            type:'checkbox',
            title:'刻度自动缩放',
            default:true
        },
        splitNumber:{
            type:'number',
            default:5,
            title:'分割段数'
        },
        minInterval:{
            type:'text',
            title:'最小分割大小',
            default:0
        },
        axisLine: {
            type:'wrapper',
            title:'轴线设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示轴线',
                    default:true
                },
                onZero:{
                    type:'checkbox',
                    title:'是否在另一轴0刻度上(另一轴为数值轴)',
                    default:true
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'轴线颜色',
                            default:'#333'
                        },
                        width:{
                            type:'number',
                            title:'轴线宽度',
                            default:1
                        },
                        type:{
                            title:'轴线类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisTick:{
            type:'wrapper',
            title:'轴刻度设置',
            initPara:{
                show:{
                    type:'checkbox',
                    title:'是否显示刻度',
                    default:true
                },
                inside:{
                    type:'checkbox',
                    title:'刻度朝里',
                    default:true
                },
                length:{
                     type:'number',
                     title:'刻度长度',
                     default:10
                },
                lineStyle:{
                    type:'wrapper',
                    title:'线样式',
                    initPara:{
                        color:{
                            type:'colorpicker',
                            title:'刻度线颜色',
                            default:'#c0c0c0'
                        },
                        width:{
                            type:'number',
                            title:'刻度宽度',
                            default:1
                        },
                        type:{
                            title:'刻度类型',
                            type:'select',
                            option:{
                                'solid':'solid',
                                'dashed':'dashed',
                                'dotted':'dotted'
                            },
                            default:'solid',
                        },
                        shadowBlur: {
                            type:'number',
                            title:'阴影深度',
                            default:0
                        },
                        shadowOffsetX: {
                            type:'number',
                            title:'阴影X',
                            default:0
                        },
                        shadowOffsetY: {
                            type:'number',
                            title:'阴影Y',
                            default:0
                        },
                        opacity:{
                            title:'透明度',
                            type:'number',
                            min:0,
                            max:1,
                            step:0.1,
                            default:1
                        }
                    }
                }
            }
        },
        axisLabel:{
            type:'wrapper',
            title:'轴标签设置',
            initPara:concatObj(
                {
                    show:{
                        type:'checkbox',
                        title:'是否显示标签',
                        default:true
                    },
                    rotate:{
                        type:'number',
                        title:'旋转角度',
                        default:0
                    },
                    margin:{
                        type:'number',
                        title:'与轴线之间距离',
                        default:8
                    }
                }
                ,createTextStyle('标签'))
        }
    };

  return para;
};

var createParallelLayoutPara = function(){
    var para ={
        z: {
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'10',
            min:-100,
            max:100,
            unit:'%'
        },
        width: {
            type:'number',
            title:'宽度',
            default:'200',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        height:{
            type:'number',
            title:'高度',
            default:'200',
            specialVal:'自适应',
            specialTip:'设为自适应',
            openSpecial:true,
            max:500
        },
        layout:{
            title:'布局',
            type:'select',
            option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
            default:'horizontal',
        },
        axisExpandable:{
            default:false,
            title:'维度自动拓展',
            type:'chekcbox'
        },
        axisExpandCount:{
            type:'number',
            title:'展开轴的数量',
            default:0,
        },
        axisExpandWidth:{
            type:'number',
            title:'展开轴时轴间距',
            default:5,
        },
    };
    return para;
};

var createParallel = function(){
    var para = {
        type:{
            default: 'parallel'
        },
        lineStyle:{
            type:'wrapper',
            title:'线样式',
            initPara:{
                color:{
                    type:'colorpicker',
                    title:'线颜色',
                    default:''
                },
                width:{
                    type:'number',
                    title:'轴线宽度',
                    default:1
                },
                type:{
                    title:'轴线类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影深度',
                    default:0
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
                opacity:{
                    title:'透明度',
                    type:'number',
                    min:0,
                    max:1,
                    step:0.1,
                    default:1
                }
            }
        },
        smooth:{
            default:false,
            title:'平滑曲线',
            type:'checkbox'
        }
    };
    return para;
};

var createRadarContainer = function(){
    var para = {
        z: {
            title:'图像优先级',
            type:'number',
            default:2,
            max:1000
        },
        radius:{
            title:'半径大小',
            type:'text',
            default:'50%'
        },
        center:{
            type:'headandend',
            title:['中心x相对位置','中心y相对位置'],
            default:['50%','50%'],
            setting:'text',
            unit:'%'
        },
        startAngle:{
            type:'number',
            default: 225,
            title:'开始角度'
        },
         nameGap: {
            type:'number',
            title:'名称与轴线距离',
            default:15
        },
        splitNumber:{
            type:'number',
            default:5,
            title:'分割段数'
        },
        shape:{
            title:'外形选择',
            type:'select',
            option:{
                '圆形':'circle',
                '多边形':'polygon',
            },
            default:'polygon'
        },
        scale:{
            title:'脱离零值',
            type:'checkbox',
            default:false,
        },
        silent:{
            title:'能否交互',
            type:'checkbox',
            default:false,
        },
        indicator:{
            default:[
                {name:111,max:200},
                {name:222,max:200},
                {name:333,max:200},
            ]
        }
    };
    return para;
};

var createRadar = function(){
    var para = {
        type:{
            default:'radar'
        },
        symbol:{
            title:'点外观类型',
            type:'select',
            option:{
                '空心圆':'emptyCircle' ,
                '圆':'circle',
                '方':'rect',
                '圆方':'roundRect',
                '三角形':'triangle',
                '钻石': 'diamond',
                '图钉':'pin',
                '箭头':'arrow',
            },
            default:'emptyCircle',
        },
        symbolSize: {
            title:'标签大小',
            default:4,
            type:'number'
        },
        symbolRotate:{
            title:'标签旋转',
            default:0,
            type:'number' ,
            max:360
        },
        symbolOffset:{
            default: [0, 0]
        },
        areaStyle:{
            type:'wrapper',
            initPara:{
                color:{
                    title:'雷达图填充颜色',
                    type:'colorpicker',
                    default:'transparent'
                }
            }
        },
        z: {
            title:'图像优先级',
            type:'number',
            default:3,
            max:1000
        },
        tooltip:{default:{}}
    };
    return para;
};

var createFunnel = function(){
    var para = {
        type:{
            default: 'funnel',
        },
        min:{
            title:'数据最小值',
            default:'0',
            type:'text'
        },
        max:{
            title:'数据最大值',
            default:'100',
            type:'text'
        },
        width: {
            type:'text',
            title:'宽度',
            default:'500',
        },
        height:{
            type:'text',
            title:'高度',
            default:'300',
        },
        minSize:{
            type:'text',
            title:'最小值映射宽度',
            default:'0',
        },
        maxSize:{
            type:'text',
            title:'最大值映射宽度',
            default:'100%',
        },
        left:{
            type:'number',
            title:'水平位置',
            default:'40',
            unit:'%'
        },
        top:{
            type:'number',
            title:'垂直位置',
            default:'40',
            unit:'%'
        },
        sort:{
            title:'排序类型',
            default: 'descending',
            option:{
                '降序':'descending' ,
                '升序':'ascending',
                '按数据顺序':'none',
            },
            type:'select'
        },
        gap:{
            title:'元素间隔',
            default:0,
            type:'number' ,
            max:1000
        },
        funnelAlign:{
            title:'布局类型',
            default: 'center',
            option:{
                '居中':'center',
                '左对齐':'left',
                '右对齐':'right',
            },
            type:'select'
        },
        label:{
            type:'wrapper',
            initPara:{
                position:{
                    default:'inside',
                    title:'标签位置',
                    type:'select',
                    option:{
                        '外围':'outside',
                        '内部':'inside',
                        '中央':'center'
                    },
                },
                show:{
                    default:true,
                    type:'checkbox',
                    title:'显示图标',
                }
            }
        },
        z: {
            title:'图像优先级',
            type:'number',
            default:3,
            max:1000
        }
    };
    return para;
};

var createBoxPlot = function(){
    var para = {
        type:{
            default: 'boxplot'
        },
        text:{
             type:'headandend',
             setting:'text',
             default:['7','50'],
             title:['盒子宽度下限','盒子宽度上限']
        },
        layout:{
             type:'select',
             default:null,
             title:'布局',
             option:{
                '水平':'horizontal',
                '垂直':'vertical',
            },
        },
        z: {
            title:'图像优先级',
            type:'number',
            default:3,
            max:1000
        }
    };
    return para;
};

var createHeatMap = function(){
    var para = {
        type:{
            default: 'heatmap'
        },
        // coordinateSystem: 'cartesian2d',
        // xAxisIndex: 0,
        // yAxisIndex: 0,
        // geoIndex: 0,
        // calendarIndex: 0,
        blurSize:{
            title:'模糊程度',
            type:'text',
            default:''
        },
        minOpacity:{
            title:'最小透明度',
            type:'text',
            default:'0'
        },
        maxOpacity:{
            title:'最大透明度',
            type:'text',
            default:'1'
        },
        z: {
            title:'图像优先级',
            type:'number',
            default:3,
            max:1000
        },
    };
    return para;
};

var createGraphPara = function(){
    var para = {
        type:{
            default:'graph'
        },
        legendHoverLink:{
            default:true
        },
        layout:{
            title:'布局',
            type:'select',
            option:{
                '引力布局':'force',
                '圆形布局':'circular'
            },
            default:'force'
        },
        force:{
            type:'wrapper',
            title:'引力布局设置',
            initPara:{
                repulsion:{
                    title:'相互斥力大小',
                    type:'number',
                    max:2000,
                    default:100
                },
                gravity:{
                    title:'中心引力大小',
                    default:'0.1',
                    type:"text"
                },
                edgeLength: {
                    title:'连接线长度',
                    default:50,
                    type:'number'
                },
            }
        },
        roam:{
            title:'开启缩放与漫游',
            type:'checkbox',
            default:true
        },
        nodeScaleRatio:{
            title:'节点缩放比例',
            type:'text',
            default:'0.6'
        },
        draggable:{
            title:'节点可拖动',
            type:'checkbox',
            default:true
        },
        focusNodeAdjacency:{
            default: true,
            title:'点高亮显示临近边',
            type:'checkbox'
        },
        symbol:{
            title:'点外观类型',
            type:'select',
            option:{
                '空心圆':'emptyCircle' ,
                '圆':'circle',
                '方':'rect',
                '圆方':'roundRect',
                '三角形':'triangle',
                '钻石': 'diamond',
                '图钉':'pin',
                '箭头':'arrow',
            },
            default:'circle',
        },
        symbolSize: {
            title:'标签大小',
            default:50,
            type:'number'
        },
        symbolRotate:{
            title:'标签旋转',
            default:0,
            type:'number' ,
            max:360
        },
        categories:{
            default:[]
        },
        z: {
            title:'图像优先级',
            type:'number',
            default:3,
            max:1000
        },
        label:{
            type:'wrapper',
            title:'标签设置',
            initPara:{
                show:{
                    default:false,
                    type:'checkbox',
                    title:'显示标签'
                },
                position:{
                    title:'未高亮标签位置',
                    type:'select',
                    option:{
                        '外围':'outside',
                        '内部':'inside',
                        '中央':'center',
                        '左侧':'left',
                        '右侧':'right',
                        '上侧':'top',
                        '下侧':'bottom'
                    },
                    default:'inside',
                }
            }
        },
        lineStyle:{
            type:'wrapper',
            title:'线外观设置',
            initPara:{
                color:{
                    type:'colorpicker',
                    title:'轴线颜色',
                    default:'#333'
                },
                width:{
                    type:'number',
                    title:'轴线宽度',
                    default:3
                },
                type:{
                    title:'轴线类型',
                    type:'select',
                    option:{
                        'solid':'solid',
                        'dashed':'dashed',
                        'dotted':'dotted'
                    },
                    default:'solid',
                },
                shadowBlur: {
                    type:'number',
                    title:'阴影深度',
                    default:0
                },
                shadowOffsetX: {
                    type:'number',
                    title:'阴影X',
                    default:0
                },
                shadowOffsetY: {
                    type:'number',
                    title:'阴影Y',
                    default:0
                },
            }
        }
    };
    return para;
};

var createEffectScatter = function(){
    var para = {
        type:{
            default:'effectScatter'
        }
    };
    return para;
}

var getParas = function(type,options){
    switch (type){
        //fixed
        case 'legend':
            return createLegendPara();
            break;
        case 'toolbox':
            return createToolBoxPara();
            break;
        case 'parallelLayout':
            return createParallelLayoutPara();
            break;
        case 'tooltip':
            return createToolTipPara();
            break;

        // functional components
        case 'title':
            return createTitlePara();
            break;
        case 'datazoom':
            return createDataZoomPara(options);
            break;
        case 'visualmap':
            return createVisualMap();
            break;
        case 'toolbox':
            return createToolBoxPara();
            break;

        //containers
        case 'axis':
            return createAxisPara();
            break;
        case 'radarContainer':
            return createRadarContainer();
            break;
        case 'grid':
            return createGridPara();
            break;
        case 'parallelAxis':
            return createParallelAxisPara();
            break;
        case 'geo':
            return createGeoPara();
            break;
        case 'calendar':
            return createCalendarPara();
            break;

        //visualizations
        case 'pie':  //v
            return createPiePara();
            break;
        case 'bar':  //v
            return createBarPara();
            break;
        case 'line': //v
            return createLinePara();
            break;
        case 'map': //v
            return createMapPara();
            break;
        case 'gauge'://v
            return gaugePara();
            break;
        case 'boxplot':
            return createBoxPlot();
            break;
        case 'graph':
            return createGraphPara();
            break;
        case 'scatter':
            return createScatterPara();
            break;
        case 'radar':
            return createRadar();
            break;
        case 'parallel':
            return createParallel();
            break;
        case 'funnel':
            return createFunnel();
            break;
        case 'heatmap':
            return createHeatMap();
            break;
        case 'effectScatter':
            var para = createScatterPara();
            para.type.default = 'effectScatter';
            return para;
        default:
            return {};
    }
};