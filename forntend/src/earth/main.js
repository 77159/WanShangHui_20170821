(function(exports) {

    var viewer, scene;

    function init(container) {
        // create a cesium viewer
        viewer = new Cesium.Viewer('cesiumContainer', {
            shadows: false,
            //是否创建动画小器件，左下角仪表 
            animation: false,
            //是否显示图层选择器 
            baseLayerPicker: false,
            //是否显示全屏按钮 
            fullscreenButton: false,
            //是否显示geocoder小器件，右上角查询按钮 
            geocoder: false,
            //是否显示Home按钮 
            homeButton: false,
            //是否显示信息框 
            infoBox: false,
            //是否显示3D/2D选择器 
            sceneModePicker: false,
            //是否显示选取指示器组件 
            selectionIndicator: false,
            //是否显示时间轴 
            timeline: false,
            //是否显示右上角的帮助按钮 
            navigationHelpButton: false,
            //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源 
            scene3DOnly: true,
            navigationInstructionsInitiallyVisible: false,
            showRenderLoopErrors: false,
            //瓦片数据服务器地址 
            imageryProvider: new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiZWFzeWZyb2ciLCJhIjoiY2o2cDNpMnllMGJwNjJ4b2Y1MWJnZm0yNSJ9.AOczcpclkzwLAeceTpma-A'
            })
        });

        // set time
        viewer.clock.currentTime = new Cesium.JulianDate(2457523, 43440.449272789105);

        scene = viewer.scene;

        window.viewer = viewer;

        //
        // load all tiles
        //
        var t_index = -1;
        var _id = setInterval(function() {

            t_index++;

            t_index = getNextTileIndex(t_index);

            var _url = tiles[t_index];

            if (t_index >= tiles.length) {
                clearInterval(_id);
            } else {
                load3DTiles(tiles[t_index]);
            }

        }, 100);


        // fly to shanghai
        setTimeout(function() {
            flyTo(qiu.coords.shanghai, function() {

                addPickEvent();

                //
                // 调用初始化
                //
                if (qiu.start) {
                    qiu.start();
                }
            });

        }, 3000)

        // load baoshan
        // var entity = loadModel('baoshan', 158);
        var entity = loadModel('wujiao', -115);

    }

    function getNextTileIndex(index) {
        var _url = tiles[index];

        if (tilesLoaded.indexOf(_url) > -1) {
            index++;
            return getNextTileIndex(index);
        }

        return index;
    }

    function addPickEvent() {
        viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {


            // Pick a new feature
            var pickedFeature = viewer.scene.pick(movement.position);

            if (!pickedFeature) {
                return;
            }

            // invoke picked event
            if (pickedFeature.id.picked) {
                pickedFeature.id.picked(pickedFeature.id);
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    var tilesLoaded = [];

    /**
     * 载入 3D 瓦片
     */
    function load3DTiles(url) {

        tilesLoaded.push(url);

        var tileset = new Cesium.Cesium3DTileset({
            url: url
        });

        tileset.readyPromise.then(function() {
            tileset._geometricError = 1000;

        });

        scene.primitives.add(tileset);
    }

    /**
     * 载入 外部模型
     */
    function loadModel(name, heading) {

        var pos = Cesium.Cartesian3.fromDegrees(qiu.models[name].coord.lng, qiu.models[name].coord.lat, 0);

        var heading = Cesium.Math.toRadians(heading || 0);
        var pitch = 0;
        var roll = 0;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

        var ori = Cesium.Transforms.headingPitchRollQuaternion(pos, hpr);

        var entity = viewer.entities.add({
            name: name,
            position: pos,
            orientation: ori,
            model: {
                uri: qiu.models[name].url,
                // minimumPixelSize : 128,
                // maximumScale : 20000
            }
        });

        return entity;
    }

    /**
     * fly to a coord
     */
    function flyTo(lng, lat, heading, pitch, height) {
        var cb = null;
        if (typeof lat === 'function') {
            cb = lat;
        }

        if (typeof lng === 'object') {
            lat = lng.lat;
            heading = lng.heading || 20;
            height = lng.height || 1600;
            pitch = lng.pitch || -35;
            lng = lng.lng;
        }

        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
            orientation: {
                heading: Cesium.Math.toRadians(heading),
                pitch: Cesium.Math.toRadians(pitch),
                roll: 0.0
            },
            complete: function() {
                if (cb) {
                    cb();
                }
            }
        });
    }

    /**
     * 添加Marker
     *     config: {
     *         url,                     // 图片路径 
     *         scale,                   // 缩放比例
     *         height,                  // 高度
     *         markerWidth,
     *         markerHeight,
     *         coord: { lng:, lat: }    // 经纬度坐标
     *     }
     */
    function addMarker(config) {
        var billboard = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(config.coord.lng, config.coord.lat, config.height || 60),
            billboard: {
                image: config.url,
                show: true,
                // pixelOffset : new Cesium.Cartesian2(0, -50), // default: (0, 0)
                // eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                // horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                scale: config.scale || 1, // default: 1.0
                color: config.color, // default: WHITE
                // rotation : Cesium.Math.PI_OVER_FOUR, // default: 0.0
                // alignedAxis : Cesium.Cartesian3.ZERO, // default
                width: config.markerWidth || 32, // default: undefined
                height: config.markerHeight || 32 // default: undefined
            }
        });

        billboard.name = config.name || 'marker';
        billboard.picked = config.picked;

        return billboard;
    }

    function removeMarker(marker) {
        viewer.entities.remove(marker);
    }

    //
    // add circle
    //      config: {
    //          radius:,
    //          coord:,
    //      }
    //
    function addCircle(config) {
        var circle = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(config.coord.lng, config.coord.lat, config.height || 10),
            name: 'circle',
            ellipse: {
                semiMinorAxis: config.radius,
                semiMajorAxis: config.radius,
                height: 10.0,
                material: Cesium.Color[(config.color ? config.color.toUpperCase() : "GREEN")].withAlpha(.08),
                outline: true,
                outlineWidth: 10
            }
        });

        return circle;
    }

    exports.init = init;
    exports.flyTo = flyTo;
    exports.addCircle = addCircle;
    exports.addMarker = addMarker;
    exports.removeMarker = removeMarker;

})((this.qiu = this.qiu || {}));