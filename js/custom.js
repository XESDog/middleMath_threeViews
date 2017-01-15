/**
 * Created by work on 2016/12/19.
 */
define(['module', 'text!../html/custom.html', 'util', 'page'], function (module, html, util, Page) {
    var _content, _config, _app, _mesh, _size = 2;
    var _material = new THREE.MeshNormalMaterial();
    var _wireframeMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: "#aaaaaa", opacity: 0.2});

    function init() {
        _config = module.config();
        _content = _config.getContent();
        _content.append(html);


        _app = new Vue({
            el: "#custom",
            data: {
                keys: [],           //左侧按键
                currentKey: [],     //当前选择的按键
                tds: [],            //中间数字表格区域
                currentTd: [],      //当前数组表格
                map: [],            //数字表格中的数据
                status: 0,//0:自定义，1:展示
                keyRow: 5,          //按键行
                keyCol: 2,          //按键列
                tdRow: 6,           //数字表格行
                tdCol: 6,           //数字表格列
                tdHeight: 9,        //数字表格3D图的高
                mesh: null,
            },
            methods: {
                close: function () {
                    $(document).trigger($.Event('goto'), Page.option);
                },
                gotoDescribe: function () {
                    this.status = 1;
                    this.$nextTick(function () {
                        this.mesh = createThreeGeometry(this.map.concat(), this.tdRow, this.tdCol, this.tdHeight);
                    })

                },
                gotoGenerate: function () {
                    this.status = 0;
                },
                gotoPhotograph: function () {

                    var p = Page.photograph;
                    p.mesh = createThreeGeometry(this.map.concat(), this.tdRow, this.tdCol, this.tdHeight);
                    p.from = 'custom';
                    $(document).trigger($.Event('goto'), p);
                },
                cleanMap: function () {
                    this.map = [];
                },
                dragToSelf: function (e, i, j) {
                    var value = this.map[i * this.tdCol + j];
                    e.dataTransfer.setData('old', i * this.tdCol + j);
                    if (!value) {
                        this.currentKey = [];
                    } else {
                        this.currentKey = [parseInt(value / this.keyCol), value % this.keyCol]
                    }


                },
                drag: function (e, i, j) {
                    this.currentKey = [i, j];
                },
                dragOver: function (e) {
                    e.preventDefault();
                },
                drop: function (e, i, j) {
                    if (this.currentKey.length <= 0)return;
                    var old = e.dataTransfer.getData('old');

                    if (old != "") {
                        delete this.map[old];
                    }
                    var tdCol = this.tdCol;
                    var keyCol = this.keyCol;
                    this.currentTd = [i, j];
                    this.map[this.currentTd[0] * tdCol + this.currentTd[1]] = this.currentKey[0] * keyCol + this.currentKey[1];
                    this.map = this.map.concat();
                },
            },
            created: function () {

                var tdRow = this.tdRow;
                var tdCol = this.tdCol;
                var keyRow = this.keyRow;
                var keyCol = this.keyCol;

                //创建数据
                for (var i = 0; i < keyRow; i++) {
                    if (this.keys[i] == undefined) this.keys[i] = [];
                    this.keys[i].push(i * keyCol);
                    this.keys[i].push(i * keyCol + 1);
                }
                for (var j = 0; j < tdRow; j++) {
                    if (this.tds[j] == undefined) this.tds[j] = [];
                    for (k = 0; k < tdCol; k++) {
                        this.tds[j][k] = j * tdCol + k;
                    }

                }
            },
        });
    }

    function getCube(y) {
        return new THREE.CubeGeometry(_size, y * _size, _size, 1, y, 1);
    }

    function createGroup(map, tdRow, tdCol) {
        var x, y, z, group = new THREE.Geometry();
        //根据数据生成立方体
        map.forEach(function (item, index) {
            x = Math.floor(index / tdCol);
            y = item;
            z = index % tdCol;
            group.merge(getCube(y), util.getMatrix((z - tdCol / 2 + 0.5) * _size, y * 0.5 * _size, (x - tdRow / 2 + 0.5) * _size));
        });

        return group;
    }

    function createThreeGeometry(map, tdRow, tdCol) {
        var group = createGroup(map, tdRow, tdCol);
        _mesh = new THREE.SceneUtils.createMultiMaterialObject(group, [_material, _wireframeMaterial]);

        var planeGroup = util.createPlaneGroup(12, 12, 12, _size);
        var planeMesh = new THREE.SceneUtils.createMultiMaterialObject(planeGroup, [
            new THREE.MeshBasicMaterial({wireframe: true, color: '#aaaaaa', opacity: 0.5, side: 2})
        ]);
        planeMesh.position.y = -4;
        _mesh.add(planeMesh);
        _mesh.position.y = -4;

        return _mesh;
    }

    function uninit() {
        _content.children().remove();
    }

    return {
        init: init,
        uninit: uninit,
    }

});
