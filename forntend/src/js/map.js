var defaultMarkers = []; //默认marker数据

var curHighLightMarkers = {
	"left": [],
	"right": []
}; //当前显示的marker
var circleMarker = null; //存储圈圈对象的marker

var highlightMarker = null; //高亮marker

/**
 * [addMarkers 添加marker]
 * @param {[type]} type  [类型，餐饮/儿童...]
 * @param {[type]} items [餐饮内的细分类【东南亚风味，快餐等】数据]
 */
function addMarkers(type, items) {
	if (type <= 0) return; //从1-14 类别
	if (type == 0) {
		removeMarkers('left');
		removeMarkers('right');
	} else if (type < 6)
		removeMarkers("left");
	else
		removeMarkers("right");

	for (var i = 0, ilen = items.length; i < ilen; i++) {
		if (items[i].lon == 0 || items[i].lat == 0) continue;
		var info = {},
			lon = parseFloat(items[i].lon),
			lat = parseFloat(items[i].lat);
		var marker = qiu.addMarker({
			name: items[i].name,
			url: getMarkerIcon(type),
			coord: getMarkerCoord(lon, lat), // 坐标文件在 ./js/data.js 中定义
			height: 120, // marker 的高度
			markerWidth: 20,
			markerHeight: 20,
			picked: function(marker) { // 点击Marker的回调方法
				//qiu.removeMarker(marker);// 删除 marker
				//console.log('点击了: ', marker.name, ' 并删除了它.');
			}
		});

		info.marker = marker;
		info.data = items[i];

		var dirType = type < 6 ? 'left' : 'right';

		curHighLightMarkers[dirType].push(info);
	}
}


//移除某类marker
function removeMarkers(type) {
	//移除高亮菜单	
	removeHighLightMarker();

	var markers = [];

	if (!curHighLightMarkers[type]) return;
	else markers = curHighLightMarkers[type];

	for (var j = 0, jlen = markers.length; j < jlen; j++) {
		qiu.removeMarker(markers[j].marker); // 删除 marker
	}

	curHighLightMarkers[type] = [];

	//qiu.removeMarker(highlightMarker.marker); // 删除 marker
}

/**
 * [getMarkerIcon 获取marker图标]
 * @param  {[type]} type [共14种，没类一种，内部一样]
 * @return {[type]}      [description]
 */
function getMarkerIcon(type) {
	return 'images/marker/' + type + '.png';
}

/**
 * [getMarkerCoord 获取marker坐标]
 * @param  {[type]} lon [description]
 * @param  {[type]} lat [description]
 * @return {[type]}     [description]
 */
function getMarkerCoord(lon, lat) {
	return {
		lng: lon,
		lat: lat,
		heading: 210.5,
		pitch: -23.3,
		height: 1000
	};
}

//飞到中心点
function flyToPoint(lon, lat) {
	if (lon == 0 || lat == 0) return;
	qiu.flyTo(getMarkerCoord(0.01 + lon, 0.014 + lat));
}

//聚焦到江桥
function flyToJiangQiao() {
	qiu.flyTo(qiu.coords.jiangqiao);
}

//添加圆圈
function addCircle(rad) {
	//先清除之前的marker
	if (circleMarker != null) qiu.removeMarker(circleMarker);

	circleMarker = new qiu.addCircle({
		radius: rad * 1000,
		coord: qiu.models.wujiao.coord,
		color: 'green'
	});
}

//高亮marker
function highlightOneMarker(item) {
	if (!highlightMarker || !highlightMarker.marker) highlightMarker = {};
	else {
		qiu.removeMarker(highlightMarker.marker); // 删除 marker
		highlightMarker = {};
	}

	var info = {},
		lon = parseFloat(item.lon),
		lat = parseFloat(item.lat);
	var marker = qiu.addMarker({
		name: item.name,
		url: 'images/marker/pop.png',
		coord: getMarkerCoord(lon, lat), // 坐标文件在 ./js/data.js 中定义
		height: 135, // marker 的高度
		markerWidth: 36,
		markerHeight: 36,
		picked: function(marker) { // 点击Marker的回调方法
			showInfoWin(highlightMarker.data);
		}
	});

	info.marker = marker;
	info.data = item;
	highlightMarker = info;
}

//移除标注
function removeHighLightMarker() {
	if (highlightMarker && highlightMarker.marker) {
		qiu.removeMarker(highlightMarker.marker); // 删除 marker
		highlightMarker = {};
	}
}