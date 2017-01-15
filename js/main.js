/**
 * Created by work on 2016/12/8.
 */

$(document).ready(function () {
    var _project = 'middle_math';
    var _localPath = '../../../xes/';
    var _remotePath = 'http://kjds2.speiyou.com/courseware/xes/';
    var getContent = function () {
        return $('.content')
    };
    var _cf = {
        paths: {
            localJS: _localPath + _project + '/js',
            localCSS: _localPath + _project + '/css',
            localCommonJS: _localPath + '/common/js',
            localCommonCSS: _localPath + '/common/css',
            remoteJS: _remotePath + _project + '/js',
            remoteCSS: _remotePath + _project + '/css',
            remoteCommonJS: _remotePath + '/common/js',
            remoteCommonCSS: _remotePath + '/common/css',

            css: 'lib/require-css',
            text: 'lib/text',
        },
        shim: {},
        config: {
            option: {
                //todo:这里直接设置为$('.content')无法获取，原因待查
                getContent: getContent
            },
            custom: {
                getContent: getContent
            },
            photograph: {
                getContent: getContent
            },
        }
    };
    wrapShim('local', _project);
    wrapShim('remote', _project);
    function wrapShim(pre, project) {
        _cf.shim[pre + 'JS/' + project] = {deps: [pre + 'CommonJS/preload.min']};
        _cf.shim['css!' + pre + 'CSS/' + project] = {deps: ['css!' + pre + 'CommonCSS/preload.min']};
    }

    require.config(_cf);

    //先加载本地，本地报错则加载网络
    require(['localJS/flag'], load('local'), load('remote'));


    function load(pre) {
        return function () {
            require(['component/three_component', pre + 'JS/' + _project, 'css!' + pre + 'CSS/' + _project],
                function () {
                    //跳转页面
                    require(['option', 'custom', 'photograph', 'page'], function (option, custom, photograph, Page) {
                        var currentView;
                        $(document).on('goto', goto);
                        goto(null, Page.option);

                        function goto(e, page) {
                            if (currentView != undefined) currentView.uninit();
                            switch (page.page) {
                                case Page.OPTION:
                                    currentView = option;
                                    break;
                                case Page.CUSTOM:
                                    currentView = custom;
                                    break;
                                case Page.PHOTOGRAPH:
                                    currentView = photograph;
                                    break;
                            }
                            currentView.init(page);
                        }
                    })

                })
        }

    }
});


