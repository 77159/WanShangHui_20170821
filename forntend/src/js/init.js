/**
 * [实现页面中按钮界面]
 * @param  {[type]} ) {}          [description]
 * @return {[type]}   [description]
 */

var dataUrl = "../",
	wandaServer = 'http://192.168.1.128';
var curMile = 3; //3：3公里，5:5公里，10:10公里，15:15公里
var curBannerIndex = -1,
	preBannerIndex = -1;
var id;
$(document).ready(function() {
	qiu.init('cesiumContainer', {
		server: wandaServer
	}); //添加球
	//添加广场列表
	//initAreaList();
	//重新添加菜单
	initMenus();
	bindMilesButtonEvent();
	initCity();
});

//动态获取左右两边的menus
function initMenus() {
	var fileName = 'menu_1.json';
	var url = 'data/3/' + fileName;
	$.getJSON(url, function(result) {
		initBannerHtml(result.leftBanner, $('#leftBanner .ui.cards'));
		initBannerHtml(result.rightBanner, $('#rightBanner .ui.cards'));
		bindBannerCardEvent();
	});
}

//获取area_list.json数据
function initCity() {
	var fileName = 'area_list.json';
	var url = 'data/' + fileName;
	$.getJSON(url, function(result) {
		clickCity(result);
	})
}

function initTable(id, parentDiv, type) {
	var fileName = 'detail_' + (id - 1) + '.json';
	var url = 'data/' + curMile + '/' + fileName;
	var index = 0;
	$.getJSON(url, function(result) {
		if (type === 'left') {
			initTableOneHtml(result, $('#one_table'));
			initTableTwoHtml(result, $('#two_table'));
			initTableThreeHtml(result, $('#three_table'));
			clickOneTable(result, $('#detail_left .one_table button'), $('#three_table'), id);
			inputEvent(result, $('#detail_left .three_table input'), $('#three_table'), index, id);
			//点击表格每行事件
			clickThreeTable($('#detail_left .three_table .content .threeTableClass'), getThreeTableItems(result, index), id);
		} else {
			initTableOneHtmlRight(result, $('#right_one_table'));
			initTableTwoHtmlRight(result, $('#right_two_table'));
			initTableThreeHtmlRight(result, $('#right_three_table'));
			clickOneTable(result, $('#detail_right .one_table button'), $('#right_three_table'), id);
			inputEvent(result, $('#detail_right .three_table input'), $('#right_three_table'), index, id);
			clickThreeTable($('#detail_right .three_table .content .threeTableClass'), getThreeTableItems(result, index), id);
		}

		addMarkers((id - 1), result.one_table[index].list); //添加marker;
	});
}

function getThreeTableItems(result, index) {
	if (result && result.one_table && result.one_table[index] && result.one_table[index].list)
		return result.one_table[index].list;
	else return [];
}


function initBannerHtml(data, parentDiv) {
	var templ = getBannerTempl();
	Mustache.parse(templ); // optional, speeds up future uses
	var leftBannerHTML = Mustache.render(templ, {
		list: data
	});
	parentDiv.empty().append(leftBannerHTML);
}


function initTableOneHtml(data, parentDiv) {
	var templ = getTableOne();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableOneHTML = Mustache.render(templ, data);
	parentDiv.empty().append(tableOneHTML);
	$('#detail_left .one_table .button1').addClass('active'); //默认第一个选中
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

function initTableOneHtmlRight(data, parentDiv) {
	var templ = getTableOneRight();
	Mustache.parse(templ); // optional, speeds up future uses
	var tableOneHTMLRight = Mustache.render(templ, data);
	parentDiv.empty().append(tableOneHTMLRight);
	$('#detail_right .one_table .button1').addClass('active'); //默认第一个选中
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



//绑定每个card的点击事件
function bindBannerCardEvent() {
	//绑定总的列表事件
	$('.ui.cards .card').on('click', function() {
		var index = $('.ui.cards .card[data-direction=' + $(this).data('direction') + ']').index($(this));

		//移除掉该方向的其他card的class = active的属性
		if ((index == 0) && ($(this).data('direction') == 'left')) {} else {
			$('.ui.cards .card[data-direction=' + $(this).data('direction') + ']').not(':eq(' + index + ')').removeClass('active');
		}

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}

		pausePanel($('#info'), 'fade'); //隐藏详细列表面板

		if ((index == 0) && ($(this).data('direction') == 'left')) {
			//移除现有图标
			removeMarkers("left");
			removeMarkers("right");

			fadePanel($('#detail_left'), 'fade'); //隐藏详细列表面板
			fadePanel($('#detail_right'), 'fade'); //隐藏详细列表面板
			$('.ui.cards .card:not(:eq(0))').removeClass('active');

			//第一次添加列表，其他显示或隐藏
			if (!$('.ui.cards .card:not(:eq(0))').hasClass('visible'))
				initAreaList();
			$('#list_left').transition('slide right');
		} else {
			var id = $(this).data('id'),
				direction = $(this).data('direction');
			clickSwitch(id);
			removeMarkers(direction);
			showDetailsPanel(id, direction);
		}
		preBannerIndex = curBannerIndex;
		curBannerIndex = index;
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
	if ($('.ui.cards .card[data-id="' + id + '"]').hasClass('active'))
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

function pausePanel(panel, animate) {
	if (panel.css('display') != 'none')
		panel.transition(animate); //隐藏统计列表面板
}

//公里按钮切换样式
function bindMilesButtonEvent() {
	$('.search-center .ui.buttons .button').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');

		var mileIndex = parseInt($(this).data('mile'));

		addCircle(mileIndex);
		if (mileIndex > 5) return;

		curMile = parseInt($(this).data('mile')); //切换当前默认公里


		//清空当前界面中的marker及详情页面
		if ($('#detail_left').hasClass('visible')) {
			$('#detail_left').transition('horizontal flip');
		}

		if ($('#detail_right').hasClass('visible')) {
			$('#detail_right').transition('horizontal flip');
		}

		$('.ui.cards .card:not(:eq(0))').removeClass('active');
		//移除现有图标
		removeMarkers("left");
		removeMarkers("right");
		pausePanel($('#info'), 'fade'); //隐藏详细列表面板
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
		clickCity(result);
	});
}

//绑定城市列表每行的点击事件
function bindAreaTrEvent() {
	$('#list_left .content .list-tr').on('click', function() {
		var index = $('#list_left .content .list-tr').index($(this));
		if (!$(this).hasClass('active')) {
			$(this).addClass('active').siblings().removeClass('active');
		} else
			$('#list_left .content .list-tr').removeClass('active');

		if (index == 0) {
			//initMenus();
			//各个块块依次消失，显示的效果
			if (!$('.ui.cards .card:not(:eq(0))').hasClass('visible'))
				$('.ui.cards .card:not(:eq(0))').transition({
					animation: 'scale',
					reverse: 'auto', // default setting
					interval: 200
				});

			//$('#list_left').transition('slide right');

			var lon = $(this).data('lon'),
				lat = $(this).data('lat');
			flyToPoint(parseFloat(lon), parseFloat(lat));

			addCircle(curMile);
		} else if (index == 1) {
			flyToJiangQiao();
			// var lon = $(this).data('lon'),
			// 	lat = $(this).data('lat');
			//flyToPoint(parseFloat(lon), parseFloat(lat));
		}
	});
	//进入室内地图按钮
	$('#list_left .content .list-tr u').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		var mapid = $(this).data('mapid'),
			mapname = $(this).data('mapname');
		if (!mapid) return;

		window.open(wandaServer + '/reserve/reserveMap.html?plazaid=' + mapid + '&plazaname=' + mapname);
	});
}


//监测键盘输入内容时搜素
function inputEvent(result, $eles, $ele, index, id) {
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

		clickThreeTable($ele.find('.threeTableClass'), filterData, id);
	});
}


//点击第一个表格分类事件
function clickOneTable(result, $eles, $ele, id) {
	$eles.click(function() {
		pausePanel($('#info'), 'fade'); //隐藏详细列表面板
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		//重新渲染
		var template = getTableThree();
		Mustache.parse(template);
		var tableThreeHTML = Mustache.render(template, result.one_table[index]);
		$ele.empty().append(tableThreeHTML);
		//调用方法
		clickThreeTable($('#detail_left .three_table .content .threeTableClass'), getThreeTableItems(result, index), id);
		clickThreeTable($('#detail_right .three_table .content .threeTableClass'), getThreeTableItems(result, index), id);

		inputEvent(result, $('#detail_left .three_table input'), $('#three_table'), index);
		inputEvent(result, $('#detail_right .three_table input'), $('#right_three_table'), index);

		//移除上次的marker
		//removeMarkers(curBannerIndex);
		addMarkers((id - 1), result.one_table[index].list); //添加本次的marker
	});
}

//点击第三个表格分类每行事件
function clickThreeTable(ele, result, id) {
	ele.click(function() {

		$(this).addClass('active').siblings().removeClass('active');

		var index1 = $(this).index(),
			lon = parseFloat(result[index1].lon),
			lat = parseFloat(result[index1].lat);
		highlightOneMarker(result[index1]);
		flyToPoint(lon, lat);
		showInfoWin(result[index1]);
		clickSwitch(id);
	});
}

//显示信息框
function showInfoWin(data) {
	//信息框的信息展示
	if (!$('#info').hasClass('false'))
		$('#info').transition('pulse');
	$($("#info .content").children('p').get(0)).html(data.name);
	$($("#info .content").children('p').get(1)).html(data.class);
	$("#info .content p:eq(3) span").eq(1).html(data.consume);
	$("#info .content p:eq(2) span:eq(1)").html(data.flow);
}


//点击切换信息框表头字段
function clickSwitch(id) {
	if (id === 7) {
		$("#info .content p:eq(2) span:eq(0)").html('户数：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(2) span:eq(2)").html('户');
		$("#info .content p:eq(3) span:eq(0)").html('单价：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(3) span:eq(2)").html('/元/平方米');
	} else if (id === 8) {
		$("#info .content p:eq(2) span:eq(0)").html('日租金：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(2) span:eq(2)").html('/元/天');
		$("#info .content p:eq(3) span:eq(0)").html('月租金：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(3) span:eq(2)").html('/元/月');
	} else if (id === 9) {
		$("#info .content p:eq(2) span:eq(0)").html('平均学员：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(2) span:eq(2)").html('人');
		$("#info .content p:eq(3) span:eq(0)").html('学员流量：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(3) span:eq(2)").html('/天');
	} else if (id === 13) {
		$("#info .content p:eq(2) span:eq(0)").html('交通人流：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(2) span:eq(2)").html('人');
		$("#info .content p:eq(3) span:eq(0)").html('总人流：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(3) span:eq(2)").html('人');
	} else {
		$("#info .content p:eq(2) span:eq(0)").html('日均流量：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(2) span:eq(2)").html('人/天');
		$("#info .content p:eq(3) span:eq(0)").html('人均消费：&nbsp;&nbsp;&nbsp;');
		$("#info .content p:eq(3) span:eq(2)").html('/人/次');
	}
}

//点击不同广场切换数据
function clickCity(result) {
	$('#list_left .content .list-tr').on('click', function() {
		var index = $('#list_left .content .list-tr').index($(this));
		$($('#city #city_one .content_txt')).html(result.list[index].address);
		$($('#city #city_two .content_txt')).html(result.list[index].content);
		$($('#city #city_three .content_txt')).html(result.list[index].shoppings);
		/*$('#city #city_four .content_detail div:eq(0) span:eq(1)').html(result.list[index].info[0].canyin);
		$('#city #city_four .content_detail div:eq(1) span:eq(1)').html(result.list[index].info[0].fuzhuang);
		$('#city #city_four .content_detail div:eq(2) span:eq(1)').html(result.list[index].info[0].shenghuo);
		$('#city #city_four .content_detail div:eq(3) span:eq(1)').html(result.list[index].info[0].tiyan);
		$('#city #city_four .content_detail div:eq(4) span:eq(1)').html(result.list[index].info[0].ertong);*/
		$('#city #city_five .content_detail div span:eq(1)').html(result.list[index].remains);
	});
}

function scrollIntoView(element, container) {
	container.scrollTop(
		element.offset().top - container.offset().top + container.scrollTop()
	);
}