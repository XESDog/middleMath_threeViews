/**
 * Created by work on 2016/12/21.
 */

define(['module', 'text!../html/photograph.html', 'util', 'geometrics', 'page', 'view'], function (module, html, util, g, Page, view) {
    var _content, _config;
    var _from = '';//从哪个页面跳过来
    var _mesh;

    function init(page) {
        _from = page.from;
        _mesh = page.mesh;

        _config = module.config();
        _content = _config.getContent();
        _content.append(html);

        var app = new Vue({
            el: "#photograph",
            data: {
                close: function () {
                    var p = new Page(_from);
                    $(document).trigger($.Event('goto'), p);
                    $(document).trigger($.Event('goto'), Page.option);
                },
                mesh: null,
                view: null,
            },
            methods: {
                screenshot: function (target) {
                    this.$nextTick(function () {
                        $(target)[0].innerText = "";
                        $(target).append('<img style="width: 100%" src="' + $('#threeDiv canvas')[0].toDataURL() + '">');
                    })
                },
                leftView: function (event) {
                    var target = event.currentTarget;
                    this.view = view.LEFT;
                    this.screenshot(target)
                },
                primaryView: function (event) {
                    var target = event.currentTarget;
                    this.view = view.PRIMARY;
                    this.screenshot(target)
                },
                topView: function (event) {
                    var target = event.currentTarget;
                    this.view = view.TOP;
                    this.screenshot(target)
                }
            },

            mounted: function () {
                this.mesh = _mesh;

            }
        })
    }

    function uninit() {
        _content.children().remove();

    }

    return {
        init: init,
        uninit: uninit,
    }
})
