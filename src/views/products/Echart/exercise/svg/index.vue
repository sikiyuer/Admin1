<template>
  <div style="text-align:center">
    <svg>
      <line x1="20" y1="20" x2="200" y2="200" stroke='purple' stroke-width="2"></line>
      <line x1="200" y1="20" x2="20" y2="200" stroke='purple'></line>
      <!-- 折线 -->
      <polyline points="300 300,50 100,120 400,660,66" fill-opacity="0" stroke='purple'></polyline>
      <!-- 矩形 -->
      <rect x="300" y="200" width="100" height="300" fill='purple'></rect>
      <!-- 圆形 -->
      <circle cx='70' cy='88' r='50' style="stroke:pink;fill:cyan"></circle>
      <!-- 椭圆 -->
      <ellipse cx='570' cy='88' rx='50' ry='20' style="stroke:pink;fill:yellow"></ellipse>
      <!-- 多边形 -->
      <polygon points="600 100,600 160,420 400,380,366" fill-opacity="1" stroke='purple'></polygon>
      <!-- 任意图像 -->
      <path fill='red'
      d="
        M 700 10
        L 800 20
        L 600 70
        L 500 60
        L 400 50
        L 200 10
        Z
      
      "    
      ></path>


    </svg>



  </div>
</template>

<script>
export default {
name:'canvas'
}
</script>

<style>
svg{
width:800px;
height:600px;
  border: 1px solid red;
}

</style>