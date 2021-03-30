<template>
  <div class="app-container">
    <div class="head-container">
      <!-- 新增 -->
      <div style="display: inline-block; margin: 0px 2px">
        <el-button
          type="danger"
          class="filter-item"
          size="mini"
          icon="el-icon-refresh"
          @click="getTable"
          >刷新</el-button
        >
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      size="small"
      style="width: 100%"
    >
      <el-table-column ref="table" prop="productSpecsImg" label="规格图片">
        <template slot-scope="scope">
          <a
            :href="scope.row.productSpecsImg"
            style="color: #42b983"
            target="_blank"
            ><img
              :src="scope.row.productSpecsImg"
              alt="点击打开"
              class="el-avatar"
          /></a>
        </template>
      </el-table-column>
      <el-table-column prop="storeName" label="名称" />
      <el-table-column prop="productSpecs" label="属性" />
      <el-table-column prop="productSpecsVal" label="属性值" />
      <el-table-column prop="count" label="数量" />
      <el-table-column prop="batch" label="批次编码" />
      <el-table-column prop="operaTime" label="操作时间" />
    </el-table>
  </div>
</template>

<script>
import { find } from "@/api/inOutProduction";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  methods: {
    //!获取数据
    getTable() {
      this.loading = true;
      let val = {
        //? operaType:1出库,2入库
        operaType: 2,
        pageNumber: 1,
        pageSize: 1000,
      };
      find(val)
        .then((res) => {
          this.loading = false;
          console.log(res.content, "出入库数据");
          this.tableData = res.content;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
  },
};
</script>

<style scoped>
</style>