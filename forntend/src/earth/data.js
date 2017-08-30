(function(exports) {
	//
	// models 坐标 点
	//
	var models = {
		baoshan: {
			url: 'earth/models/building.glb',
			coord: {
				lng: 121.4420929900,
				lat: 31.3262383400
			}
		},
		land: {
			url: 'earth/models/land.glb',
			coord: {
				lng: 121.4420929900,
				lat: 31.3262383400
			}
		},
		wujiao: {
			url: 'earth/models/building.glb',
			coord: {
				lng: 121.5100100389,
				lat: 31.3036060454
			},
			mapID: '1000343',
			mapName: '上海宝山万达广场'
		},
		jiangqiao: {
			url: 'earth/models/jiangqiao.glb',
			coord: {
				lng: 121.3190839300,
				lat: 31.2414593200
			},
			mapID: '1000108',
			mapName: '上海江桥万达广场'
		}
	}

	//
	// 所有 相机 坐标位置
	//
	var coords = {
		shanghai: {
			lng: 121.4852019790,
			lat: 31.2137804908,
			heading: 20,
			height: 1600
		},
		baoshan: {
			lng: 121.4374642138,
			lat: 31.3282874398,
			heading: 123.194,
			pitch: -26,
			height: 300
		},
		land: {
			lng: 121.4374642138,
			lat: 31.3282874398,
			heading: 123.194,
			pitch: -26,
			height: 300
		},
		wujiao: {
			lng: 121.5124076582,
			lat: 31.3076905716,
			heading: 210.5,
			pitch: -23.3,
			height: 280
		},
		jiangqiao: {
			lng: 121.3245330885,
			lat: 31.2435573948,
			heading: 240.34588077827377,
			pitch: -22.957776649566572,
			height: 200
		}
	}

	exports.models = models;
	exports.coords = coords;

})((this.qiu = this.qiu || {}))