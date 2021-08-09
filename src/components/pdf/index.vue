<template>
  <div class="pdf" v-show="fileType === 'pdf'">
    <p class="arrow">
    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>
    {{currentPage}} / {{pageCount}}
    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>
    </p>
    <!-- 
        src需要展示的PDF地址 
        currentPage当前展示的PDF页码
        pageCountPDF文件总页码
        currentPage一开始加载的页面
        loadPdfHandler加载事件
    -->
    <pdf
      :src="src"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
    name: 'PDF',
    props: {
      currentPage: {  // pdf文件页码
        required: true,
        type: Number,
        default: 0
      },
      pageCount: { // pdf文件总页数
        required: true,
        type: Number,
        default: 0
      },
      fileType: { // 文件类型
        type: String,
        default: 'pdf'
      },
      src: { // pdf文件地址
        type: String
      }
    },
    computed: {
      pageCounts: {
        get() {
            return this.pageCount;
        },
        set(val) {
            this.$emit('pageCount', val);
        }
      }
    },
    components: {
      pdf
    },
    data: {
        Preview: '上一页',
        Next: '下一页'
    },
    created() {
        // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
　　　　this.src = pdf.createLoadingTask(this.src)
    },
    methods: {
      // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      changePdfPage (val) {
          if (val === 0 && this.currentPage > 1) {
            this.currentPage--
          }
          if (val === 1 && this.currentPage < this.pageCount) {
            this.currentPage++
          }
      },
      // pdf加载时
      loadPdfHandler (e) {
          this.currentPage = 1 // 加载的时候先加载第一页
      }
    }
}
</script>