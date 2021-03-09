<template>
  <div class="list-pagination">
    <button class="list-pagination-indexBtn" @click="goIndex">首页</button>
    <!-- ui图没有需求修改一页的条数page_size，最外层的页面给个死值 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      layout=" prev, pager, next"
      :total="total"
    ></el-pagination>
    <button class="list-pagination-footeBtn" @click="goFoote">尾页</button>
  </div>
</template>

<script>
export default {
  props: {
    current_page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    // 分页器
    handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`);
      this.$emit('changeCurrent', val)
    },
    // 点击首页
    goIndex () {
      this.currentPage = 1
      this.$emit('changeCurrent', this.currentPage)
    },
    // 点击尾页
    goFoote () {
      this.currentPage = Math.ceil(this.total / this.pageSize)
      this.$emit('changeCurrent', this.currentPage)
    }
  }
}
</script>

<style lang="less" scoped>
.list-pagination {
  display: flex;
  justify-content: center;
  margin-top: 53px;
  /deep/.el-pagination {
    padding: 0;
  }
  /deep/.el-pager li {
    width: 45px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #d9d9d9;
    border-left: none;
    color: #666;
    font-weight: 400;
  }
  /deep/.el-pager li:first-child {
    border: 1px solid #d9d9d9;
  }
  /deep/.el-pager li:hover {
    background-color: #0193e6;
    color: #fff;
  }
  /deep/.el-pager li.active {
    background-color: #0193e6;
    color: #fff;
  }
  /deep/.el-pagination .btn-next .el-icon,
  /deep/.el-pagination .btn-prev .el-icon {
    width: 66px;
    height: 33px;
    border: 1px solid #d9d9d9;
    line-height: 35px;
    text-align: center;
  }
  /deep/.el-pagination .btn-prev .el-icon {
    border-right: none;
  }
  /deep/.el-pagination .btn-next .el-icon {
    border-left: none;
  }
  /deep/.el-icon-arrow-left:before {
    content: "上一页";
    color: #666;
    font-weight: 400;
  }
  /deep/.el-icon-arrow-right:before {
    content: "下一页";
    color: #666;
    font-weight: 400;
  }
  /deep/.el-pagination .btn-prev,
  /deep/.el-pagination .btn-next {
    padding: 0;
  }
  .list-pagination-indexBtn {
    width: 66px;
    height: 35px;
    border: 1px solid #d9d9d9;
    border-radius: 4px 0 0 4px;
    border-right: none;
    color: #666;
    box-sizing: border-box;
    cursor: pointer;
  }
  .list-pagination-footeBtn {
    width: 66px;
    height: 35px;
    border: 1px solid #d9d9d9;
    border-radius: 0 4px 4px 0;
    border-left: none;
    color: #666;
    box-sizing: border-box;
    cursor: pointer;
  }
}
</style>
