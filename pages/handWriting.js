// pages/handWriting.js

var hw = require('../util/handWriting');

Page({
  data: {
    id: 'handWriting'
  },
  mouseDown() {
    hw.mouseDown();
  },
  touchstart(e) {
    hw.touchstart(e);
  },
  touchmove(e) {
    hw.touchmove(e);
  },
  reDraw: function () {
    hw.reDraw();
  },

  touchend: function () {
    hw.touchend();
  },


  complete: function () {
    let that = this;
    hw.complete(that.data.id);
  },
  onLoad: function (options) {
    /**
     * 1、设置id和wxml中id一致
     * 2、引入handWriting，调用其drawBg或者init方法进行初始化
     * 3、绑定wxml中的mouseDown方法、touchstart方法、touchmove方法、touchend方法、reDraw方法、subCanvas方法
     */
    let that = this;
    console.log(that.id)
    //hw.drawBg()
    hw.init(that.data.id);
    hw.output();
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})