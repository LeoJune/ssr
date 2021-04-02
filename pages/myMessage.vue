<template>
  <div class="nav-wrap">
    <user-nav :nowUserNav="nowUserNav"></user-nav>
    <div class="myMessage">
      <div class="myMessage-top">
        <div class="left">
          <div class="myMessage-top-title">在线反馈</div>
          <!-- <div class="myMessage-top-read-no">未读{{info.unread}}</div>
          <div class="myMessage-top-read">已读{{info.read}}</div>-->
        </div>
        <div class="right">
          <input
            v-model="listQuery.keyword"
            type="text"
            placeholder="请输入留言关键字"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch">
            <img
              src="@/assets/images/header-search.png"
              alt
            />搜索
          </button>
          <button
            class="myMessage-top-send"
            @click="toSendMyMessage"
          >
            我要留言
          </button>
        </div>
      </div>
      <div class="myMessage-line"></div>
      <TableCom
        v-loading="loading"
        :tableData.sync="msgList"
        :isPage="true"
        :isSelect="false"
        :total="total"
        :currentPage="page"
        :pageSize="page_size"
        @currentChange="currentChange"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          label="我的留言"
          prop="content"
          align="center"
          width="350"
          showOverflowTooltip
        ></el-table-column>
        <el-table-column
          label="提交时间"
          prop="createTime"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatTime(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="回复时间"
          prop="createTime"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatTime(scope.row.replyTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          width="70"
        >
          <template slot-scope="scope">
            <el-link
              style="cursor:initial"
              :underline="false"
              :type="scope.row.replyStatus==0 ? 'primary' : ''"
            >
              {{ scope.row.replyStatus == 0 ? ' 未回复': scope.row.replyStatus == 1 ? ' 已回复' : '' }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-link
                :underline="false"
                @click="detailBtn(scope.row.id)"
              >
                查看详情
              </el-link>
            </div>
          </template>
        </el-table-column>
      </TableCom>
    </div>
  </div>
</template>

<script>
// import { searchMessage } from '@/api/message'
import userNav from '@/components/user-nav/userNav'
import TableCom from '@/components/table/table'
import { formatDate } from '@/utils/date'
export default {
  // name: 'myMessage',
  components: {
    userNav,
    TableCom
  },
  data () {
    return {
      loading: false,
      nowUserNav: '在线反馈',
      total: 12,
      page: 1,
      page_size: 10,
      msgList: [],
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      this.$api.searchMessage(this.listQuery).then(res => {
        this.loading = false
        this.msgList = res.data.records
        this.total = res.data.total
      }).catch(() => {
        this.loading = false
      })
    },
    handleSearch () {
      this.getList()
    },
    toSendMyMessage () {
      this.$router.push('/sendMyMessage')
    },
    currentChange (value) {
      this.listQuery.pageNum = value
      this.getList()
    },
    detailBtn (id) {
      this.$router.push({ path: '/myMessageDetail', query: { id } })
    },
    formatTime (time) {
      if (!time) {
        return
      }
      const mytime = new Date(time)
      return formatDate(mytime, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
.nav-wrap {
  padding: 10px 0 30px;
  display: flex;
  justify-content: space-between;
  .myMessage {
    width: 960px;
    .myMessage-top {
      width: 100%;
      height: 58px;
      border: 1px solid #e1e1e1;
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .myMessage-top-title {
          margin: 10px 0;
          width: 120px;
          line-height: 38px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #343434;
          border-right: 1px solid #e1e1e1;
        }
        .myMessage-top-read,
        .myMessage-top-read-no {
          font-size: 16px;
          color: #666;
          padding: 0 10px;
          line-height: 58px;
        }
        .myMessage-top-read-no {
          color: #1488d6;
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
        .myMessage-top-send {
          width: 144px;
          text-align: center;
          border-radius: 4px;
          margin-left: 20px;
          margin-right: 18px;
        }
      }
    }
    .myMessage-line {
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
