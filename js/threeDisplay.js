/**
 * Created by work on 2016/12/14.
 */

define(['view', 'lib/OrbitControls', 'lib/OBJLoader', 'lib/CanvasRenderer', 'lib/Projector'], function (view) {

    var _fresh = true;
    var _w = 0;
    var _h = 0;
    var _cameraPosition = 80;
    var _camera, _controls, _scene, _renderer, _container;

    function _updateWH(c) {
        _w = c.parent().innerWidth();
        _h = c.parent().innerHeight();
    }

    function _initControl() {
        _controls = new THREE.OrbitControls(_camera, _container[0]);
        _controls.addEventListener('change', _render);
    }

    function _initRenderer(preserveDrawingBuffer) {
        _renderer = new THREE.CanvasRenderer({canvas: _container[0], preserveDrawingBuffer: preserveDrawingBuffer});
        _renderer.setClearColor(0x081842);
        _renderer.setPixelRatio(window.devicePixelRatio);
        _renderer.setSize(_w, _h);
    }

    function _initCamera() {
        var cw = parseInt(_w / 20);
        var ch = parseInt(_h / 20);
        _camera = new THREE.OrthographicCamera(-cw, cw, ch, -ch, -500, 1000);
        _camera.position.y = _cameraPosition;
        _camera.position.z = _cameraPosition;
        _camera.position.x = -_cameraPosition / 10;

        _camera.lookAt(new THREE.Vector3());
    }

    function _onWindowResize() {
        _updateWH(_container);
        var cw = _w / 20;
        var ch = _h / 20;
        _camera.left = -cw;
        _camera.right = cw;
        _camera.top = ch;
        _camera.bottom = -ch;
        _camera.updateProjectionMatrix();

        _renderer.setSize(_w, _h);
        // _controls.handleResize();
        _render();
    }


    function _leftView() {
        _controls.reset();
        _camera.position.y = 0;
        _camera.position.z = 0;
        _camera.position.x = -_cameraPosition;
        _camera.lookAt(new THREE.Vector3(0, 0, 0));

        _render();
    }

    function _topView() {
        _controls.reset();
        _camera.position.y = _cameraPosition;
        _camera.position.z = 0;
        _camera.position.x = 0;
        _camera.lookAt(new THREE.Vector3(0, 0, 0));

        _render();
    }

    function _primaryView() {
        _controls.reset();
        _camera.position.y = 0;
        _camera.position.z = _cameraPosition;
        _camera.position.x = 0;
        _camera.lookAt(new THREE.Vector3(0, 0, 0));

        _render();
    }


    function _render() {
        _renderer.render(_scene, _camera);
    }

    function _removeMesh() {
        _scene.traverse(function (child) {
            _scene.remove(child)
        });
    }

    function _animate() {
        if (_fresh) requestAnimationFrame(_animate);
        _controls.update();
    }

    function showMesh(m) {
        _removeMesh();
        _scene.add(m);
        _render();
    }

    /**
     *
     * @param canvas      webGL容器
     * @param m         mesh
     * @param drawing   是否需要截图
     */
    function init(canvas, m, drawing = false) {
        _container = canvas;
        _scene = new THREE.Scene();

        _updateWH(_container);
        _initCamera();
        _initControl();
        _initRenderer(drawing);
        if(m)showMesh(m);

        _fresh = true;
        window.addEventListener('resize', _onWindowResize, false);

        _animate();
    }

    function uninit() {
        _fresh = false;
        _container.children().remove();
    }

    /**
     * 使用视图
     * @param viewDirection
     */
    function changeView(viewDirection) {
        switch (viewDirection) {
            case view.PRIMARY:
                _primaryView();
                break;
            case view.LEFT:
                _leftView();
                break;
            case view.TOP:
                _topView();
                break;
        }
    }

    return {
        init: init,
        showMesh: showMesh,
        uninit: uninit,
        changeView: changeView,
    };
});

