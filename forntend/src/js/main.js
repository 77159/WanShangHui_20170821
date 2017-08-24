(function(exports) {

    var viewer, scene;

    // 所有坐标
    var coords = {
        shanghai: {
            lng: 121.4852019790,
            lat: 31.2137804908
        },
        baoshan: {
            lng: 121.4852019790,
            lat: 31.2137804908
        },
    }

    function init(container) {
        // create a cesium viewer
        viewer = new Cesium.Viewer('cesiumContainer', {
            shadows: false,
            timeline: false,
            fullscreenButton: false,
            homeButton: false,
            animation: false,
            projectionPicker: true
        });

        // set time
        // viewer.clock.currentTime = new Cesium.JulianDate(2457522.154792);
        viewer.clock.currentTime = new Cesium.JulianDate(2457523, 43440.449272789105);

        scene = viewer.scene;

        window.viewer = viewer;

        //
        // load all tiles
        //
        var t_index = -1;
        var _id = setInterval(function() {

            t_index++;

            if (t_index == tiles.length) {
                clearInterval(_id);
            } else {
                load3DTiles(tiles[t_index]);
            }

        }, 100);


        // fly to shanghai
        setTimeout(function() {
            flyTo(coords.shanghai);
        }, 6000);
    }


    function load3DTiles(url) {
        var tileset = new Cesium.Cesium3DTileset({
            url: url
        });

        scene.primitives.add(tileset);
    }

    /**
     * fly to a coord
     */
    function flyTo(lng, lat) {
        if (typeof lng === 'object') {
            lat = lng.lat;
            lng = lng.lng;
        }

        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lng, lat, 1600.0),
            orientation: {
                heading: Cesium.Math.toRadians(20.0),
                pitch: Cesium.Math.toRadians(-35.0),
                roll: 0.0
            }
        });
    }

    exports.init = init;
    exports.flyTo = flyTo;
    exports.coords = coords;

})((this.qiu = this.qiu || {}));