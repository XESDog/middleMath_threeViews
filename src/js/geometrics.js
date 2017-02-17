/**
 * Created by work on 2016/12/19.
 */
/**
 * 几何体
 */
define(function () {
    var _arr = [], _g, _baseSize = 6, _baseHeight = 10, _circleSegment = 36,
        _images = [];

    //三棱柱
    _g = new THREE.CylinderGeometry(_baseSize, _baseSize, _baseHeight, 3);
    _arr.push(_g);
    //立方体
    _g = new THREE.CubeGeometry(_baseHeight, _baseHeight, _baseHeight);
    _arr.push(_g);
    //四棱柱
    _g = new THREE.CylinderGeometry(_baseSize / 1.5, _baseSize / 1.5, _baseHeight, 4);
    _arr.push(_g);
    //圆柱
    _g = new THREE.CylinderGeometry(_baseSize, _baseSize, _baseHeight, _circleSegment);
    _arr.push(_g);
    //四面体
    _g = new THREE.CylinderGeometry(0, _baseSize, _baseHeight, 3);
    _arr.push(_g);
    //五面体
    _g = new THREE.CylinderGeometry(0, _baseSize, _baseHeight, 4);
    _arr.push(_g);
    //圆锥
    _g = new THREE.CylinderGeometry(0, _baseSize, 10, _circleSegment);
    _arr.push(_g);
    //四棱梯形柱
    _g = new THREE.CylinderGeometry(_baseSize - 3, _baseSize, _baseHeight, 4);
    _arr.push(_g);
    //梯形柱
    _g = new THREE.CylinderGeometry(_baseSize - 3, _baseSize, _baseHeight, _circleSegment);
    _arr.push(_g);


    //生成3D显示对象的截图
    var _canvas = document.createElement('canvas');
    _canvas.style.cssText = 'width:100px;height:100px';
    var _renderer = new THREE.CanvasRenderer({
        canvas: _canvas,
        preserveDrawingBuffer: true,
    })
    _renderer.setSize(100, 100);
    _renderer.setPixelRatio(window.devicePixelRatio);
    _renderer.setClearColor(0x081842)
    var _camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
    var _scene = new THREE.Scene();
    var _mesh;

    _camera.position.x = 10;
    _camera.position.y = 10;
    _camera.position.z = 10;
    _camera.lookAt(new THREE.Vector3(0, 0, 0));
    _arr.forEach(function (geo) {
        if (_mesh != undefined || _mesh != null) _scene.remove(_mesh);
        _mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
        _scene.add(_mesh);
        _renderer.render(_scene, _camera);
        _images.push(_canvas.toDataURL());
    });
    _canvas=_renderer=_camera=null;

    return {
        getGeometry: function (num) {
            return _arr[num];
        },
        length: _arr.length,
        baseHeight: _baseHeight,
        images:_images,
    };
})
