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
			}
		},
		jiangqiao: {
			url: 'earth/models/jiangqiao.glb',
			coord: {
				lng: 121.3190839300,
				lat: 31.2414593200
			}
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
			lng: 121.5116137243,
			lat: 31.3071222280,
			heading: 210.5,
			pitch: -23.3,
			height: 200
		},
		jiangqiao: {
			lng: 121.3231812552 + 0.008,
			lat: 31.2444013090 + 0.008,
			heading: 225.5,
			pitch: -24.3,
			height: 800
		}
	}

	exports.models = models;
	exports.coords = coords;

})((this.qiu = this.qiu || {}))