/**
 * Created by work on 2017/1/6.
 */

define(function () {
    function createPlaneGroup(row, col, height, size) {
        var r = Math.PI * 0.5;
        var group = new THREE.Geometry();
        //俯视图能看到的面板
        group.merge(new THREE.PlaneGeometry(size * col, size * row, col, row), getMatrix(0, 0, 0, -r));
        //左视图能看到的面板
        group.merge(new THREE.PlaneGeometry(size * row, size * height, row, height), getMatrix(size * col / 2, size * height / 2, 0, undefined, -r));
        //主视图能看到的面板
        group.merge(new THREE.PlaneGeometry(size * col, size * height, col, height), getMatrix(0, size * height / 2, -size * row / 2));
        return group;
    }
    function getMatrix(x, y, z, rx, ry, rz) {
        var m = new THREE.Matrix4();
        var m1 = new THREE.Matrix4();
        var m2 = new THREE.Matrix4();
        var m3 = new THREE.Matrix4();
        var m4 = new THREE.Matrix4();

        m1.makeTranslation(x, y, z);
        if (rx != undefined) m2.makeRotationX(rx);
        if (ry != undefined) m3.makeRotationY(ry);
        if (rz != undefined) m4.makeRotationZ(rz);
        return m.multiply(m1).multiply(m2).multiply(m3).multiply(m4);
    }

    return {
        createPlaneGroup: createPlaneGroup,
        getMatrix:getMatrix,
    }
})
