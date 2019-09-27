var handWriting = {
    ctx: null,
    lastLoc: { x: 0, y: 0 },
    isOnMoveDown: false,
    lastTimestamp: 0,
    lastLineWidth: -1,
    strokeStyle: 'black',
    lineCap: 'round',
    lineJoin: 'round',

    // 根据id初始化微信绘图context
    init: function (id) {
        this.ctx = wx.createCanvasContext(id);
        console.log(this.ctx);
    },
    //绘制背景
    drawBg: function (id) {
        var that = this
        wx.getImageInfo({
            src: '/image/qian.png',
            success: function (res) {
                var ctx = wx.createCanvasContext(id);
                ctx.drawImage('/image/qian.png', 0, 0, res.width, res.height)
                ctx.save()
                ctx.draw(true)
                this.ctx = ctx;
            }
        })
    },
    //鼠标停止
    mouseDown() {
        this.isOnMoveDown = true;
    },
    // 开始绘制
    touchstart(e) {
        // console.log(e)
        let [touch0, touch1] = e.touches
        var curLoc = {
            x: touch0.x,
            y: touch0.y
        }
        this.lastLoc = curLoc;
        this.lastTimestamp = new Date().getTime();
        this.isOnMoveDown = true;
        this.lastLineWidth = -1;
    },
    // 移动中
    touchmove(e) {
        // console.log(e)
        let [touch0, touch1] = e.changedTouches
        //draw 
        var isOnMoveDown = this.isOnMoveDown;
        if (isOnMoveDown) {
            var ctx = this.ctx;

            var curLoc = touch0;
            var lastLoc = this.lastLoc;
            var currTimestamp = new Date().getTime()
            var s = this.calcDistance(curLoc, lastLoc)
            var t = currTimestamp - this.lastTimestamp;
            var lineWidth = this.calcLineWidth(t, s)
            ctx.beginPath()
            ctx.moveTo(lastLoc.x, lastLoc.y)
            ctx.lineTo(curLoc.x, curLoc.y)
            ctx.setStrokeStyle(this.strokeStyle)
            ctx.setLineCap(this.lineCap)
            ctx.setLineJoin(this.lineJoin)
            ctx.setLineWidth(lineWidth)
            ctx.stroke()
            ctx.draw(true)
            //console.log(touch0, touch1);

            this.lastLoc = curLoc;
            this.lastTimestamp = currTimestamp;
            this.lastLineWidth = lineWidth;
        }
    },
    // 计算线条宽度
    calcLineWidth: function (t, s) {
        var v = s / t
        var retLineWidth = 1;
        if (v <= 0.1) {
            retLineWidth = 10
        } else if (v >= 10) {
            retLineWidth = 1
        } else {
            retLineWidth = 10 - (v - 0.1) / (10 - 0.1) * (10 - 1)
        }

        if (this.lastLineWidth == -1)
            return retLineWidth

        return this.lastLineWidth * 9 / 10 + retLineWidth * 1 / 10
    },
    // 计算距离
    calcDistance: function (loc1, loc2) {
        return Math.sqrt((loc1.x - loc2.y) * (loc1.x - loc2.y) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
    },
    // 结束移动
    touchend: function () {
        this.lastLineWidth = -1;
        this.lastTimestamp = new Date().getTime();
    },
    // 重新签名
    reDraw: function () {
        this.ctx.clearRect(0, 0, 700, 730)
        this.ctx.draw()
        //this.data.ctx.restore()
        //this.drawBg()
    },
    // 签名结束
    complete: function (id) {
        var that = this
        console.log('complete')
        wx.canvasToTempFilePath({
            canvasId: id,
            success: function (res) {
                console.log(res.tempFilePath)
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {
                console.log(res)
            }
        })
    },
    output: function () {
        console.log("handWriting output begin ...");
        console.log(this.ctx);
        console.log("handWriting output end ...");
    }
}

module.exports = handWriting;