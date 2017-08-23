/**
 * [实现页面中按钮界面]
 * @param  {[type]} ) {}          [description]
 * @return {[type]}   [description]
 */

var dataUrl = "../",
	wandaServer = 'http://192.168.1.85:8001';
var curMile = 3; //3：3公里，5:5公里，10:10公里，15:15公里
$(document).ready(function() {
	qiu.init('cesiumContainer'); //添加球
	//添加广场列表
	//initAreaList();
	//重新添加菜单
	initMenus();
	bindMilesButtonEvent();
});

//动态获取左右两边的menus
function initMenus() {
	var fileName = 'menu_1.json';
	var url = 'data/' + curMile + '/' + fileName;
	$.getJSON(url, function(result) {
		initBannerHtml(result.leftBanner, $('#leftBanner .ui.cards'));
		initBannerHtml(result.rightBanner, $('#rightBanner .ui.cards'));
		bindBannerCardEvent();
	});
}

/******************************** todo **************************************/
function initTable(id, parentDiv, type) {
	var fileName = 'detail_' + (id - 1) + '.json';
	var url = 'data/' + curMile + '/' + fileName;
	var index = 0;
	$.getJSON(url, function(result) {
		if(type === 'left'){
            initTableOneHtml(result, $('#one_table'));
            initTableTwoHtml(result, $('#two_table'));
            initTableThreeHtml(result, $('#three_table'));
            clickOneTable(result, $('#detail_left .one_table button'), $('#three_table'));
            inputEvent(result, $('#detail_left .three_table input'), $('#three_table'), index);
		}else {
            initTableOneHtmlRight(result, $('#right_one_table'));
            initTableTwoHtmlRight(result, $('#right_two_table'));
            initTableThreeHtmlRight(result, $('#right_three_table'));
            clickOneTable(result, $('#detail_right .one_table button'), $('#right_three_table'));
            inputEvent(result, $('#detail_right .three_table input'), $('#right_three_table'), index);
		}
	});
}
/******************************** todo **************************************/


function initBannerHtml(data, parentDiv) {
	var templ = getBannerTempl();
	Mustache.parse(templ); // optional, speeds up future uses
	var leftBannerHTML = Mustache.render(templ, {
		list: data
	});
	parentDiv.empty().append(leftBannerHTML);
}


/******************************** todo **************************************/
function initTableOneHtml(data, parentDiv) {
	var templ = getTableOne();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableOneHTML = Mustache.render(templ, data);
	parentDiv.empty().append(tableOneHTML);
    $('#detail_left .one_table .button1').addClass('active');//默认第一个选中
}

function initTableTwoHtml(data, parentDiv) {
	var templ = getTableTwo();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableTwoHTML = Mustache.render(templ, data);
	parentDiv.empty().append(tableTwoHTML);
}

function initTableThreeHtml(data, parentDiv) {
	var templ = getTableThree();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableThreeHTML = Mustache.render(templ, data.one_table[0]);
	parentDiv.empty().append(tableThreeHTML);
}
/***** todo ******/
function initTableOneHtmlRight(data, parentDiv) {
	var templ = getTableOneRight();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableOneHTMLRight = Mustache.render(templ, data);
	parentDiv.empty().append(tableOneHTMLRight);
    $('#detail_right .one_table .button1').addClass('active');//默认第一个选中
}

function initTableTwoHtmlRight(data, parentDiv) {
	var templ = getTableTwoRight();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableTwoHTMLRight = Mustache.render(templ, data);
	parentDiv.empty().append(tableTwoHTMLRight);
}

function initTableThreeHtmlRight(data, parentDiv) {
	var templ = getTableThreeRight();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableThreeHTMLRight = Mustache.render(templ, data.one_table[0]);
	parentDiv.empty().append(tableThreeHTMLRight);
}
/******************************** todo **************************************/



//绑定每个card的点击事件
function bindBannerCardEvent() {
	//绑定总的列表事件
	$('.ui.cards .card').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}

		var index = $('.ui.cards .card').index($(this));
		if (index == 0) {
			fadePanel($('#detail_left'), 'fade'); //隐藏详细列表面板
			fadePanel($('#detail_right'), 'fade'); //隐藏详细列表面板

			initAreaList();
			$('#list_left').transition('slide right');
		} else {
			var id = $(this).data('id'),
				direction = $(this).data('direction');
			showDetailsPanel(id, direction);
		}
	});
}

/**
 * [showDetailsPanel 显示详细信息面板]
 * @param  {[string]} id   [当前点击的分类的id]
 * @param  {[string]} type ['left'/'right',当前面板所在的方向，左侧或右侧]
 * @return {[void]}      [实现打开左侧或右侧的面板，并填充对应的详细信息]
 */
function showDetailsPanel(id, type) {
	//渲染表格数据
	initTable(parseInt(id), $('#detail_' + type), type);

	fadePanel($('.static_detail_left'), 'fade'); //隐藏统计列表面板
	fadePanel($('.static_detail_right'), 'fade'); //隐藏统计列表面板
	fadePanel($('#list_left'), 'fade'); //隐藏广场列表

	//动画
	var panelDirec = type == 'left' ? 'right' : 'left',
		openDetailId = $('#detail_' + type).data('id'),
		visible = $('#detail_' + type).hasClass("visible");
	if (!openDetailId && !visible) {
		$('#detail_' + type).transition('slide ' + panelDirec);
	} else if (openDetailId == id) {
		$('#detail_' + type).transition('slide ' + panelDirec);
	} else if (openDetailId != id && !visible) {
		$('#detail_' + type).transition('slide ' + panelDirec);
	} else if (openDetailId != id && visible) {
		$('#detail_' + type).transition('slide ' + panelDirec).transition('horizontal flip'); //先隐藏在翻转展开
	}

	$('#detail_' + type).data('id', id);
}

/**
 * [fadePanel 隐藏某个面板]
 * @param  {[type]} panel [description]
 * @return {[type]}       [description]
 */
function fadePanel(panel, animate) {
	if (panel.hasClass('visible'))
		panel.transition(animate); //隐藏统计列表面板
}

//公里按钮切换样式
function bindMilesButtonEvent() {
	$('.search-center .ui.buttons .button').on('click', function() {
		curMile = parseInt($(this).data('mile')); //切换当前默认公里
		$(this).addClass('active').siblings().removeClass('active');

		if ($('#detail_left').hasClass('visible')) {
			$('#detail_left').transition('horizontal flip');
		}

		if ($('#detail_right').hasClass('visible')) {
			$('#detail_right').transition('horizontal flip');
		}
		//重新添加菜单
		initMenus();
	});
}


//初始化广场列表
function initAreaList() {
	var fileName = 'area_list.json';
	var url = 'data/' + fileName;
	$.getJSON(url, function(result) {
		if (!result) return;
		var templ = getAreaTable();
		Mustache.parse(templ); // optional, speeds up future uses
		var tableThreeHTMLRight = Mustache.render(templ, result);
		$('#list_left .content').empty().append(tableThreeHTMLRight);
		bindAreaTrEvent();
	});
}

function bindAreaTrEvent() {
	$('#list_left .content .list-tr').on('click', function() {
		var index = $('#list_left .content .list-tr').index($(this));
		if (index == 0) {
			//initMenus();
			//各个块块依次消失，显示的效果
			$('.ui.cards .card:not(:eq(0))').transition({
				animation: 'scale',
				reverse: 'auto', // default setting
				interval: 200,
				onHide: function() {
					//$('.ui.cards').height(0);
				},
				onShow: function() {
					//$('.ui.cards').css("height", "auto");
				}
			});

			$('#list_left').transition('slide right');
		}
	});

	//进入室内地图按钮
	$('#list_left .content .list-tr u').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		window.open(wandaServer + '/reserve/reserveMap.html?plazaid=1000343&plazaname=上海宝山万达广场');
	});
}


/******************************** todo **************************************/
//监测键盘输入内容时搜素
function inputEvent(result, $eles, $ele, index) {
    $eles.on('keyup', function() {
        var value = $(this).val();
        var dataList = result.one_table[index].list;
        var filterData = [];
        if (value.trim() !== '') {
            filterData = _.filter(dataList, (item) => {
                for (var i in item) {
                    if ((i == 'name' || i == "class") && item[i].indexOf(value.trim()) >= 0) {
                        return true;
                    }
                }
            });
        } else {
            filterData = dataList;
        }
        var template = getTableThree();
        Mustache.parse(template);
        var tableThreeHTML = Mustache.render(template, {
            list: filterData
        });
        $ele.empty().append(tableThreeHTML);
    });
}
/******************************** todo **************************************/


/******************************** todo **************************************/
//点击第一个表格分类事件
function clickOneTable(result, $eles, $ele) {
	$eles.click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		//重新渲染
        var template = getTableThree();
        Mustache.parse(template);
        var tableThreeHTML = Mustache.render(template, result.one_table[index]);
        $ele.empty().append(tableThreeHTML);
        //调用方法
        clickThreeTable(result, index);
        inputEvent(result, $('#detail_left .three_table input'), $('#three_table'), index);
        inputEvent(result, $('#detail_right .three_table input'), $('#right_three_table'), index);
	});
}

//点击第三个表格分类事件
function clickThreeTable(result, index) {
	$(".show_detail .three_table .content .threeTableClass").click(function() {
		var index1 = $(this).index() - 1;
		console.log(result.one_table[index].list[index1].lon + '---' + result.one_table[index].list[index1].lat);
	});
}
/******************************** todo **************************************/