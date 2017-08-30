$(document).ready(function() {
	clickLeftStatic();
	clickRightStatic();
    clickInfo();
});

//点击统计详情
function clickLeftStatic() {
	$('#toView').click(function() {
	    let height = $('#detail_left').height() - 375;
        $('.static_detail_left').css('top', height);
		$('.static_detail_left').transition('fade left');
        fadePanel($('#detail_right'), 'fade'); //隐藏统计列表面板
	});
}

function clickRightStatic() {
	$('#toViewRight').click(function() {
        let height = $('#detail_right').height() - 375;
        $('.static_detail_right').css('top', height);
		$('.static_detail_right').transition('fade left');
        fadePanel($('#detail_left'), 'fade'); //隐藏统计列表面板
	});
}

//点击关闭信息框
function clickInfo() {
    $('#info .remove').click(function () {
        $('#info').transition('fade');
    });
}



/*echarts视图*/
//初始化echarts
var $one = echarts.init($('#left_echarts_one')[0]);
var $two = echarts.init($('#left_echarts_two')[0]);
//var $three = echarts.init($('#left_echarts_three')[0]);

var $four = echarts.init($('#right_echarts_one')[0]);
var $five = echarts.init($('#right_echarts_two')[0]);
//var $six = echarts.init($('#right_echarts_three')[0]);

//配置
var options_one = {
    title: {
        text: "餐饮细分业态客流&消费对比图",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["平均客流", "平均消费"],
        x: "center",
        y: "bottom",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["餐饮其它", "地方风味", "快速餐厅", "时尚餐厅", "西饼甜点", "西餐"],
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        },
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "平均客流",
            type: "bar",
            data: [696.7797101, 939.7798319, 190.24375, 881.4642857, 243.5069444, 587.2857143],
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 95)"
                }
            }
        },
        {
            name: "平均消费",
            type: "bar",
            data: [89.765625, 75.57222222, 23.69863014, 98.05641026, 30.19485294, 76.02919708],
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 191)"
                }
            }
        }
    ],
    grid: {
        x2: 40,
        x: 40
    }
};
var options_two = {
    title: {
        text: "餐饮不同消费档次客流量对比图",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["客流量"],
        x: "center",
        y: "bottom",
        backgroundColor: "rgba(0, 0, 0, 0)",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["无数据", "小于50", "50-80", "80-120", "120-160", "大于160"],
            nameTextStyle: {
                fontSize: 12
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "客流量",
            type: "bar",
            data: [7341, 263787, 223595, 547162, 272132, 136105],
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 191)"
                }
            }
        }
    ],
    grid: {
        x: 60,
        x2: 40
    }
};

var options_four = {
    title: {
        text: "小区细分类型户数&价格对比图",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["平均户数", "平均房价"],
        x: "center",
        y: "bottom",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["普通公寓", "高端公寓", "普通小区", "高端小区", "豪华小区", "别墅区"],
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        },
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "平均户数",
            type: "bar",
            data: [232, 227, 225, 253, 280, 220],
            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 95)"
                }
            }
        },
        {
            name: "平均房价",
            type: "bar",
            data: [33265, 69590, 49308, 67601, 88886, 76809],
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 191)"
                }
            }
        }
    ],
    grid: {
        x: 40,
        x2: 60
    }
};
var options_five = {
    title: {
        text: "小区不同价格档次住户数对比图",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["住户数"],
        x: "center",
        y: "bottom",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["小于3万", "3-5万", "5-7万", "7-9万", "大于9万"],
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "住户数",
            type: "bar",
            data: [68508, 121165, 225044, 65442, 8378],
            itemStyle: {
                normal: {
                    color: "rgb(0, 191, 191)"
                }
            }
        }
    ],
    grid: {
        x: 60,
        x2: 40
    }
};

//声明使用
$one.setOption(options_one);
$two.setOption(options_two);

$four.setOption(options_four);
$five.setOption(options_five);
