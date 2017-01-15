/**
 * Created by work on 2016/12/28.
 */


/**
 * 页面跳转信息
 */
define(function () {
    var Page = function (p) {
        this.page = p;
    };

    Page.OPTION = 'option';
    Page.CUSTOM = 'custom';
    Page.PHOTOGRAPH = 'photograph';

    Page.prototype.page = '';

    Page.option = new Page(Page.OPTION);
    Page.custom = new Page(Page.CUSTOM);
    Page.photograph = new Page(Page.PHOTOGRAPH);


    return Page;
})
