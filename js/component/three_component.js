/**
 * Created by work on 2017/1/6.
 */

define(['threeDisplay'], function (threeDisplay) {
    Vue.component('three', {
        props: ['mesh', 'view'],
        template: '<div id="threeDiv"><canvas style="width: 100%;height: 100%">{{fresh(mesh,view)}}</canvas></div>',
        mounted:function () {
            console.log('created');
            var output=$('#threeDiv canvas');
            threeDisplay.init(output);
        },
        methods: {
            fresh: function (m, v) {
                this.changeMesh(m);
                this.changeView(v);
            },
            //todo:threeDisplay会修改dom元素，dom元素一经修改就会重新触发changeMesh(mesh),导致死循环
            changeMesh: function (m) {
                if (!m)return;
                if (this.lastMesh == m) {
                    return;
                } else {
                    this.lastMesh = m;
                }
                if (!this.init) {
                    //todo:如何获取当前dom
                    this.init = true;
                }
                threeDisplay.showMesh(m);
            },
            changeView: function (v) {
                if (!v)return;
                if (this.lastView == v) {
                    return;
                } else {
                    this.lastView = v;
                }

                threeDisplay.changeView(v);
            }
        },
        data: function () {
            return {
                init: false,
                lastMesh: null,
                lastView: null,
            }
        },
        destroyed:function () {

        }
    });
});
