<template>
  <div class="table-com">
    <div
      v-if="isSelect"
      class="table-com-header"
    >
      已选择
      <span class="table-com-header-text">{{ selectDataList.length }}</span> 项
      <el-link
        type="primary"
        class="ml10 table-com-header-empty"
        @click="clearSelectTable"
      >
        清空
      </el-link>
      <slot name="header"></slot>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      class="home-table"
      :cellClassName="cellClassName"
      :headerCellStyle="{background:'#f1f1f1',color:'#666',fontSize:'16px',borderBottom:'1px solid #e1e1e1'}"
      @sort-change="sortChange"
      @selection-change="selectChange"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="isSelect"
        :selectable="selectable"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <slot></slot>
    </el-table>
    <div
      v-if="isPage"
      class="table-com-page"
    >
      <PaginationCom
        :current_page.sync="currentPage"
        :pageSize.sync="pageSize"
        :total.sync="total"
        @changeCurrent="currentChange"
      ></PaginationCom>
    </div>
  </div>
</template>

<script>
import PaginationCom from '@/components/pagination/pagination'
export default {
  // name: 'tableCom',
  components: {
    PaginationCom
  },
  props: {
    tableData: {
      type: Array,
      default: () => { }
    },
    isPage: { // 分页器
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    isSelect: {
      type: Boolean,
      default: true
    },
    iSselectable: {
      type: Boolean,
      default: false
    },
    isToggleSelection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectDataList: []
    }
  },
  watch: {
    isToggleSelection () {
      if (this.isToggleSelection) {
        this.toggleSelection()
      }
    }
  },
  methods: {
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      if (this.iSselectable) {
        if (row.is_hidden && row.is_hidden === 1) {
          return 'table-cell-class-name'
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    selectable (row, index) {
      if (this.iSselectable) {
        if (row.is_hidden && row.is_hidden === 1) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    selectChange (data) { // 多选框 选中的项
      this.selectDataList = data
      this.$emit('selectChange', data)
    },
    clearSelectTable () { // 清空多选框
      this.$refs.multipleTable.clearSelection()
    },
    currentChange (currentPage) { // 分页器
      this.$emit('currentChange', currentPage)
    },
    toggleSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    sortChange (column, prop, order) { // 排序
      this.$emit('sortChange', column, prop, order)
    }
  }
}
</script>

<style lang="less" scoped>
.table-com {
  &-header {
    border: 1px solid #ebeef5;
    border-bottom: 0;
    height: 36px;
    line-height: 36px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-indent: 10px;
    background-color: #f5f7fa;
    &-text {
      color: #409eff;
    }
    &-empty {
      height: 26px;
      text-align: center;
    }
  }
  &-page {
    padding-top: 18px;
    text-align: right;
  }
  /deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f1f1f1;
  }
  /deep/.el-table td {
    border-bottom: 1px solid #e1e1e1;
  }
  /deep/.el-table--fit {
    border: 1px solid #e1e1e1;
    border-radius: 0 0 4px 4px;
  }
}
</style>
