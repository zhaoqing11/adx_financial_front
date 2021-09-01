<template>
  <el-dialog
    class="preview-image"
    title="图片预览"
    :visible.sync="dialogVisible"
    width="500"
  >
  <span class="box _left" @click="clickPreview('left')"></span>
    <div
      class="image"
      :style="backImageStyle"
    />
  <span class="box _right" @click="clickPreview('right')"></span>
  </el-dialog>
</template>

<script>

  import { getToken } from '@/utils/auth';

  export default {
    name: 'PreviewImage',
    data() {
      return {
        dialogVisible: false,
        fileId: null,
        fileList: [],
        currentIndex: 0
      };
    },
    computed: {
      backImageStyle() {
        if (String.isEmpty(this.fileId)) {
          return {};
        }
        // const imageUrl = 'http://ai-jymq.com/' + this.fileId
        const imageUrl = process.env.VUE_APP_BASE_API + '/file/get/' + this.fileId + '?AccessToken=' + getToken();        
        return {
          backgroundImage: `url(${imageUrl})`,
        };
      },
    },
    methods: {
      clickPreview(type) {
        if (type === 'left') {
          this.currentIndex = this.currentIndex < 1 ? 0 : this.currentIndex - 1;
        } else {
          this.currentIndex = this.currentIndex >= this.fileList.length - 1 ? this.fileList.length - 1 : this.currentIndex + 1;
        }
        this.fileId = this.fileList[this.currentIndex].fileId
        this.selectShow(this.fileId)
      },
      selectShow(fileId) {
        if (String.isEmpty(fileId)) {
          return;
        }
        this.fileId = fileId;
        this.dialogVisible = true;
      },
      show(fileList, index) {
        if (String.isEmpty(fileList)) {
          return;
        }
        this.fileList = fileList;
        this.fileId = fileList[index].fileId;
        this.currentIndex = index;
        this.dialogVisible = true;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .preview-image {
    .image {
      position: relative;
      height: 400px;
      width: 100%;
      // background: url("../assets/images/common/preload-img.gif") center no-repeat;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .box {
    display: inline-block;
    position: absolute;
    top: 200px;
    z-index: 999999;
    width: 60px;
    height: 60px;
    opacity: 0.6;
  }
  // ._left {
  //   width: 60px;
  //   height: 60px;
  //   background: url("../assets/images/left.png") center no-repeat;
  //   background-size: contain;
  // }
  // ._right {
  //   width: 60px;
  //   height: 60px;
  //   background: url("../assets/images/right.png") center no-repeat;
  //   background-size: contain;
  //   right: 40px;
  // }
</style>
