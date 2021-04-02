<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="websiteLetter">
      <div class="websiteLetter-top">
        <div class="left">
          <div class="websiteLetter-top-title">站内信息</div>
          <div
            class="websiteLetter-top-read"
            :class="listQuery.readStatus === 0 ? 'active' : ''"
            @click="checkoutReadStatus(0)"
          >
            未读{{ unReadCount }}
          </div>
          <div
            class="websiteLetter-top-read"
            :class="listQuery.readStatus === 1 ? 'active' : ''"
            @click="checkoutReadStatus(1)"
          >
            已读{{ readCount }}
          </div>
        </div>
        <div class="right">
          <input
            v-model="listQuery.keyword"
            type="text"
            placeholder="请输入站内信关键字"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch">
            <img
              src="@/assets/images/header-search.png"
              alt
            />搜索
          </button>
          <button
            class="websiteLetter-top-send"
            @click="toSendMessage"
          >
            联系客服 ( 发信 )
          </button>
        </div>
      </div>
      <div class="websiteLetter-line"></div>
      <table-com
        :tableData.sync="letterList"
        :isPage="true"
        :isSelect="false"
        :total="total"
        :currentPage="listQuery.pageNum"
        :pageSize="listQuery.pageSize"
        @currentChange="currentChange"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          label="站内信"
          prop="title"
          align="center"
          width="500"
          showOverflowTooltip
        ></el-table-column>
        <el-table-column
          label="收信时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatTime(scope.row.receiveTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          width="70"
        >
          <template slot-scope="scope">
            <el-link
              style="cursor: initial"
              :underline="false"
              :type="scope.row.readStatus == 0 ? 'primary' : ''"
            >
              {{
              scope.row.readStatus == 0
              ? " 未读"
              : scope.row.readStatus == 1
              ? " 已读"
              : ""
              }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-link
                :underline="false"
                :style="{ marginRight: '10px' }"
                @click="detailBtn(scope.row.id)"
              >
                详情
              </el-link>
              <el-link
                :underline="false"
                @click="deleteBtn(scope.row.id)"
              >
                删除
              </el-link>
            </div>
          </template>
        </el-table-column>
      </table-com>
    </div>
  </div>
</template>

<script>
import userNav from '@/components/user-nav/userNav'
import TableCom from '@/components/table/table'
// import { searchLetter, deleteLetter } from '@/api/websiteLetter'
import { formatDate } from '@/utils/date'
export default {
  // name: 'websiteLetter',
  components: {
    userNav,
    TableCom
  },
  data () {
    return {
      loading: false,
      nowUserNav: '站内信息',
      total: 12,
      letterList: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        readStatus: 0 // 0未读1已读
      },
      readCount: null,
      unReadCount: null
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$api.searchLetter(this.listQuery).then(res => {
        this.loading = false
        this.letterList = res.data.records
        this.total = res.data.total
        this.readCount = res.data.readCount
        this.unReadCount = res.data.unReadCount
      }).catch(() => {
        this.loading = false
      })
    },
    currentChange (value) {
      this.listQuery.pageNum = value
      this.getList()
    },
    detailBtn (id) {
      this.$router.push({ path: '/websiteLetterDetail', query: { id } })
    },
    toSendMessage () {
      this.$router.push('/sendMyMessage')
    },
    deleteBtn (id) {
      this.$api.deleteLetter(id).then(res => {
        this.$message({
          tyoe: 'success',
          duration: 1000,
          message: '删除成功'
        })
        this.getList()
      })
    },
    handleSearch () {
      this.$api.searchLetter(this.listQuery).then(res => {
        this.letterList = res.data.records
        this.total = res.data.total
      })
    },
    formatTime (time) {
      const mytime = new Date(time)
      return formatDate(mytime, 'yyyy-MM-dd hh:mm:ss')
    },
    checkoutReadStatus (num) {
      if (num === this.listQuery.readStatus) {
        return
      }
      this.listQuery.readStatus = num
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .websiteLetter {
    width: 960px;
    .websiteLetter-top {
      width: 100%;
      height: 58px;
      border: 1px solid #e1e1e1;
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .websiteLetter-top-title {
          margin: 10px 0;
          width: 120px;
          line-height: 38px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #343434;
          border-right: 1px solid #e1e1e1;
        }
        .websiteLetter-top-read {
          cursor: pointer;
          font-size: 16px;
          color: #666;
          padding: 0 10px;
          line-height: 58px;
          &.active {
            color: #1488d6;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        /deep/input {
          display: block;
          width: 327px;
          height: 44px;
          line-height: 44px;
          border: #1487d5 solid 1px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 14px;
          color: #9a9a9a;
        }
        input::-webkit-input-placeholder {
          color: #9a9a9a;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #9a9a9a;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #9a9a9a;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #9a9a9a;
        }
        button {
          display: block;
          width: 100px;
          height: 44px;
          background-color: #1487d5;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(254, 254, 254, 1);
          cursor: pointer;
          img {
            width: 16px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        .websiteLetter-top-send {
          width: 144px;
          text-align: center;
          border-radius: 4px;
          margin-left: 20px;
          margin-right: 18px;
        }
      }
    }
    .websiteLetter-line {
      width: 100%;
      height: 10px;
      border-left: 1px solid #e1e1e1;
      border-right: 1px solid #e1e1e1;
      box-sizing: border-box;
    }
    /deep/.list-pagination[data-v-440179cf] {
      margin-top: 23px;
    }
  }
}
</style>
