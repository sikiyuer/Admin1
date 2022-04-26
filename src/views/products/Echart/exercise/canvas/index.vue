<template>
  <div style="text-align: center">
    <!-- <canvas width="600px" height="600px" ref="can"></canvas> -->
    <canvas width="800px" height="480px" ref="can2"></canvas>
  </div>
</template>

<script>
export default {
  name: "Mycanvas",
  mounted() {
    //     this.MyCanvas();
    this.MyCanvas2();
  },
  methods: {
    MyCanvas() {
      // 获取canvas的画笔
      let pen = this.$refs.can.getContext("2d");
      console.log(pen);
      // 绘制起点
      pen.moveTo(100, 100);
      // 绘制其他的点
      pen.lineTo(100, 200);
      pen.lineTo(250, 250);
      //设置闭合起点与终点
      pen.closePath();
      // 设置填充颜色
      pen.fillStyle = "yellow";
      // 设置边框颜色
      pen.strokeStyle = "purple";
      //设置边框宽度
      pen.lineWidth = "20";
      // 渲染颜色
      pen.fill();

      // 绘制矩形
      pen.strokeRect(300, 300, 100, 150); // 参数为xy坐标和宽高  //只能绘制描边
      pen.fillStyle = "red";
      pen.fill();

      pen.fillRect(500, 300, 100, 150); // 参数为xy坐标和宽高   // 可以绘制填颜色的矩形

      // 绘制圆形
      pen.beginPath();
      pen.arc(350, 150, 50, 0, 0.6 * Math.PI, true); // x, y 半径 ，开始角度(弧度)，结束角度(弧度)，是否逆时针
      // 渲染图像
      pen.stroke();
      //清除画布
      // pen.clearRect(0,0,600,600)
      // 绘制文字
      pen.font = "20px 微软雅黑";
      pen.fillText("绘制文字", 100, 30);
    },
    MyCanvas2() {
      // 获取canvas的画笔
      let pen2 = this.$refs.can2.getContext("2d");

      // 绘制文字
      pen2.font = "16px 微软雅黑";
      pen2.fillText("数据可视化", 50, 80);
      pen2.moveTo(100, 100);
      pen2.lineTo(100, 400);
      pen2.lineTo(700, 400);
      pen2.stroke();
      // 水平虚线
      pen2.moveTo(100, 100);
      pen2.lineTo(700, 100);
         pen2.fillText("150", 70, 110);
      pen2.moveTo(100, 160);
      pen2.lineTo(700, 160);
         pen2.fillText("120", 70, 170);

      pen2.moveTo(100, 220);
      pen2.lineTo(700, 220);
         pen2.fillText("90", 70, 230);

      pen2.moveTo(100, 280);
      pen2.lineTo(700, 280);
         pen2.fillText("60", 70, 290);

      pen2.moveTo(100, 340);
      pen2.lineTo(700, 340);
         pen2.fillText("30", 70, 350);
         pen2.fillText("0", 75, 410);

      pen2.stroke();
      //绘制水平底部
      pen2.moveTo(250, 400);
      pen2.lineTo(250, 410);
      pen2.fillText("食品", 165, 420);

      pen2.moveTo(400, 400);
      pen2.lineTo(400, 410);
      pen2.fillText("数码", 315, 420);

      pen2.moveTo(550, 400);
      pen2.lineTo(550, 410);
      pen2.fillText("服饰", 465, 420);
      pen2.fillText("箱包", 605, 420);

      pen2.stroke();

      // 渲染图像

      // 绘制矩形
      pen2.fillStyle='red'
      pen2.fillRect(125,200,100,200)
    },
  },
};
</script>

<style>
canvas {
  border: 2px purple solid;
}
</style>