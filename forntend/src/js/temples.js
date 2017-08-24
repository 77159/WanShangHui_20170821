//左右两边的banner的模板
function getBannerTempl() {
	var card = '{{#list}}<div class="card transition {{visible}}" data-id="{{id}}" data-direction="{{direction}}" ><div class="content color-{{bgcolor}}">' + '<img class="left floated mini ui image" src="{{icon}}">' + '<div class="header">{{title}}<h3 class="right floated">{{number}}</h3></div>' + '<div class="ui fitted divider"></div>' + '<div class="description center aligned">{{desp}}&nbsp;&nbsp;{{despNo}}</div></div>' + '</div>{{/list}}';
	return card;
}

//点击左边banner出现的各个表格
/*表格一*/
function getTableOne() {
	var tableOne = '{{#one_table}}<button class="large ui button button{{id}}">' + '<span>{{number}}</span>' + '<span>/{{percentage}}%</span>' + '<p>{{class}}</p>' + '</button>{{/one_table}}';
	return tableOne;
}
/*表格二*/
function getTableTwo() {
	var tableTwo = '{{#two_table}}<div>' + '<span>数量合计</span>' + '<span>{{total}}</span>' + '</div>' + '<div>' + '<span>平均消费</span>' + '<span>{{price}}</span>' + '</div>{{/two_table}}'
	return tableTwo;
}
/*表格三*/
function getTableThree() {
	var tableThree = '{{#list}}<div class="threeTableClass">' + '<span>{{name}}</span>' + '<span>{{class}}</span>' + '</div>{{/list}}';
	return tableThree;
}

/*城市列表表格*/
function getAreaTable() {
	var tableArea = '{{#list}}<div class="list-tr" data-lon={{lon}} data-lat={{lat}}>' + '<span>{{name}}</span>' + '<span><u>室内地图</u></span>' + '</div>{{/list}}';
	return tableArea;
}
/*'<div>' + '<span>名称</span>' + '<span>操作</span>' + '</div>' +*/
//点击右边banner出现的各个表格
/*表格一*/
function getTableOneRight() {
	var tableOneRight = '{{#one_table}}<button class="large ui button button{{id}}">' + '<span>{{number}}</span>' + '<span>/{{percentage}}%</span>' + '<p>{{class}}</p>' + '</button>{{/one_table}}';
	return tableOneRight;
}
/*表格二*/
function getTableTwoRight() {
	var tableTwoRight = '{{#two_table}}<div>' + '<span>数量合计</span>' + '<span>{{total}}</span>' + '</div>' + '<div>' + '<span>平均消费</span>' + '<span>{{price}}</span>' + '</div>{{/two_table}}'
	return tableTwoRight;
}
/*表格三*/
function getTableThreeRight() {
	var tableThreeRight = '{{#list}}<div class="threeTableClass">' + '<span>{{name}}</span>' + '<span>{{class}}</span>' + '</div>{{/list}}';
	return tableThreeRight;
}
