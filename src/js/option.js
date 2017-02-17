/**
 * Created by work on 2016/12/14.
 */
define(['module', 'util', 'text!../html/option.html', 'geometrics', 'page'], function (module, util, html, g, Page) {
    var _content, _controlList, _config;

    function init() {
        _config = module.config();
        _content = _config.getContent();
        _content.append(html);


        //todo:如何销毁？
        _controlList = new Vue({
            el: '#option',
            data: {
                list: [0, 1, 2, 3],
                current: 0,
                point: 0,
                step: 4,//每次翻页跳四个
                images:g.images,
                mesh: null,
            },
            methods: {
                left: function () {
                    var value = this.point - this.step < 0 ? 0 : this.point - this.step;
                    this.point = value;
                    this.list = this.list.map(function (item, index) {
                        return index + value;
                    })
                },
                right: function () {
                    var scope = g.length - this.step;
                    var value = this.point + this.step > scope ? scope : this.point + this.step;
                    this.point = value;
                    this.list = this.list.map(function (item, index) {
                        return index + value;
                    })
                },
                click: function (item) {
                    this.current = item;
                    this.createMesh(item);
                },
                gotoPhotograph: function () {
                    var p = Page.photograph;
                    p.mesh = this.mesh;
                    p.from = 'option';
                    $(document).trigger($.Event('goto'), p);
                },
                gotoCustom: function () {
                    var p = Page.custom;
                    $(document).trigger($.Event('goto'), p);
                },
                createMesh: function (item) {
                    var material = new THREE.MeshNormalMaterial();
                    var wireframeMaterial = new THREE.MeshBasicMaterial({
                        wireframe: true, color: '#aaaaaa', opacity: 0.5
                    });
                    var wireframeMaterial2 = new THREE.MeshBasicMaterial({
                        wireframe: true,
                        color: '#aaaaaa',
                        opacity: 0.5,
                        side: 2
                    });
                    var plane = new THREE.SceneUtils.createMultiMaterialObject(
                        util.createPlaneGroup(9, 9, 9, 2), [wireframeMaterial2]
                    );
                    plane.position.y = -g.baseHeight / 2 - 4;
                    var obj = new THREE.SceneUtils.createMultiMaterialObject(g.getGeometry(this.current), [material, wireframeMaterial]);
                    //todo:特殊处理，某些mesh需要旋转
                    if (item == 2 || item == 5 || item == 7) {
                        obj.rotation.y = Math.PI / 4;
                    }
                    this.mesh = new THREE.Mesh();
                    this.mesh.add(obj);
                    this.mesh.add(plane);
                }
            },
            mounted: function () {
                this.createMesh();
            }
        })
    }

    function uninit() {
        $('.content').children().remove();
    }

    return {
        init: init,
        uninit: uninit,
    };
})
