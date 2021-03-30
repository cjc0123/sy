<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input
        v-model="query.value"
        clearable
        placeholder="输入搜索内容"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />
      <el-select
        v-model="query.type"
        clearable
        placeholder="搜索类型"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in queryTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="cateId"
        clearable
        placeholder="商品分类"
        class="filter-item"
        filterable
        :filter-method="dataFilter"
        style="width: 130px"
      >
        <el-option
          v-for="item in optionsMetaShow"
          :disabled="item.disabled === 0"
          :value="item.value"
          :key="item.id"
          :label="item.label"
        ></el-option>
      </el-select>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
        >搜索</el-button
      >
      <!-- 新增 -->
      <div style="display: inline-block; margin: 0px 2px">
        <el-button
          type="danger"
          class="filter-item"
          size="mini"
          icon="el-icon-refresh"
          @click="toQuery"
          >刷新</el-button
        >
      </div>
      <div style="display: inline-block; margin: 0px 2px">
        <el-button type="primary" class="filter-item" size="mini" @click="rkqd"
          >出库清单</el-button
        >
      </div>
    </div>
    <!--表单组件-->
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%">
      <el-table-column prop="id" label="商品id" />
      <el-table-column ref="table" prop="image" label="商品图片">
        <template slot-scope="scope">
          <a :href="scope.row.image" style="color: #42b983" target="_blank"
            ><img :src="scope.row.image" alt="点击打开" class="el-avatar"
          /></a>
        </template>
      </el-table-column>
      <el-table-column prop="storeName" label="商品名称" />
      <el-table-column prop="storeCategory.cateName" label="分类名称" />
      <el-table-column prop="price" label="商品价格" />
      <el-table-column prop="sales" label="销量" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div @click="onSale(scope.row.id, scope.row.isShow)">
            <el-tag
              v-if="scope.row.isShow === 1"
              style="cursor: pointer"
              :type="''"
              >已上架</el-tag
            >
            <el-tag v-else style="cursor: pointer" :type="'info'"
              >已下架</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="265px" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="inPro(scope.row)"
          >
            出库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showIn"
      width="300px"
      :title="diaTitle"
    >
      <div class="gg">
        <div>
          <el-radio-group v-model="ksGg">
            <el-radio
              v-for="(item, index) in productItems"
              :key="index"
              style="margin: 10px"
              :label="item.label"
              border
            ></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div>
        <el-input-number v-model="num" :min="1"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showIn = false">取 消</el-button>
        <el-button type="primary" @click="confirmPro">出库</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showQd"
      width="40%"
      title="出库清单"
    >
      <el-table :data="qdData" style="width: 100%">
        <el-table-column prop="prop" label="商品图片">
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
        <el-table-column prop="storeName" label="商品名称"> </el-table-column>
        <el-table-column prop="productSpecsVal" label="规格"> </el-table-column>
        <el-table-column prop="count" label="数量">
          <template slot-scope="scope">
            <div>
              <el-input-number
                v-model="scope.row.count"
                :min="1"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showQd = false">取 消</el-button>
        <el-button type="primary" @click="confirmPro_on">出库</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/crud";
import { del, onsale, getInfo, isFormatAttr } from "@/api/yxStoreProduct";
import { addCache, getCache, addBatch } from "@/api/inOutProduction";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Treeselect from "@riophae/vue-treeselect";
export default {
  components: { Treeselect },
  mixins: [initData],
  data() {
    return {
      dropDownValue: "",
      optionsMetaShow: [],
      delLoading: false,
      visible: false,
      queryTypeOptions: [{ key: "storeName", display_name: "商品名称" }],
      isAttr: false,
      cateId: null,
      showIn: false,
      showQd: false,
      productItems: [],
      num: 1,
      diaTitle: "",
      totalNum: 0,
      rowData: {},
      ksGg: "",
      ksLen: 0,
      qdData: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.init().then(() => {
        this.optionsMetaShow = this.cateList;
      });
    });
  },
  methods: {
    //!完全出库
    confirmPro_on() {
      console.log(this.qdData);
      addBatch(this.qdData)
        .then((res) => {
          this.showQd = false;
          this.$message.success("出库成功!");
        })
        .catch((err) => {});
    },
    //!点击出库清单按钮
    rkqd() {
      this.showQd = true;
      getCache({ upsmUserId: this.$store.state.user.user.id, operaType: 1 })
        .then((res) => {
          this.qdData = res;
        })
        .catch((err) => {});
    },
    //!加入出库单
    confirmPro() {
      //
      console.log(this.productItems, "当前产品规格数据");
      console.log(this.rowData, "当前行数据");
      //   ?分割款式
      let ks = this.ksGg.split("-");
      //?查找款式对应的款式图片
      let data = [];
      data = this.productItems.filter((item) => {
        switch (this.ksLen) {
          case 0:
            return [];
          case 1:
            return item.value1 == ks[0];
          case 2:
            return item.value1 == ks[0] && item.value2 == ks[1];
          case 3:
            return (
              item.value1 == ks[0] &&
              item.value2 == ks[1] &&
              item.value3 == ks[2]
            );
          case 4:
            return (
              item.value1 == ks[0] &&
              item.value2 == ks[1] &&
              item.value3 == ks[2] &&
              item.value4 == ks[3]
            );
        }
      });
      let val = {
        count: this.num,
        productId: this.rowData.id,
        productImg: this.rowData.image,
        productSpecsImg: data.length > 0 ? data[0].pic : "",
        productSpecsVal: ks ? ks.join(",") : "",
        storeName: this.rowData.keyword,
        upmsUserId: this.$store.state.user.user.id,
        operaType: 1,
      };
      console.log(val, "val");
      addCache([val])
        .then((res) => {
          this.showIn = false;
          this.$message.success("加入出库清单成功!");
        })
        .catch((err) => {});
    },
    //!   点击入库按钮
    inPro(row) {
      console.log(row);
      this.rowData = row;
      this.diaTitle = row.storeName;
      this.showIn = true;
      getInfo(row.id)
        .then((res) => {
          let attrs = res.productInfo.items;
          isFormatAttr(row.id, { attrs: attrs })
            .then((res1) => {
              this.productItems = res1.value;
              //   ?确定有几个款式
              this.ksLen = res1.attr.length;
              //?动态拼接款式
              this.productItems = this.productItems.map((item) => {
                item.label = "";
                for (let i = 1; i <= this.ksLen; i++) {
                  switch (i) {
                    case 1:
                      item.label += item.value1 + "-";
                      break;
                    case 2:
                      item.label += item.value2 + "-";
                      break;
                    case 3:
                      item.label += item.value3 + "-";
                      break;
                    case 4:
                      item.label += item.value4 + "-";
                      break;
                  }
                }
                item.label = item.label.slice(0, -1);
                return item;
              });
              console.log(this.productItems, "转换后");
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
    dataFilter(val) {
      this.value = val;
      if (val) {
        this.optionsMetaShow = this.cateList.filter((item) => {
          if (
            !!~item.label.indexOf(val) ||
            !!~item.label.toUpperCase().indexOf(val.toUpperCase())
          ) {
            return true;
          }
        });
      } else {
        this.optionsMetaShow = this.cateList;
      }
    },
    checkPermission,
    beforeInit() {
      this.url = "mall/yxStoreProduct";
      const sort = "id,desc";
      this.params = {
        page: this.page,
        size: this.size,
        sort: sort,
        isShow: 1,
        isDel: 0,
        cateId: this.cateId,
      };
      const query = this.query;
      const type = query.type;
      const value = query.value;
      if (type && value) {
        this.params[type] = value;
      }
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then((res) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500,
          });
        })
        .catch((err) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    onSale(id, status) {
      this.$confirm(`确定进行[${status ? "下架" : "上架"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          onsale(id, { status: status }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.init();
              },
            });
          });
        })
        .catch(() => {});
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.getCates();
    },
    edit(data) {
      this.isAdd = false;
      const _this = this.$refs.form;
      _this.getCates();
      _this.form = {
        id: data.id,
        merId: data.merId,
        image: data.image,
        sliderImage: data.sliderImage,
        imageArr: data.image.split(","),
        sliderImageArr: data.sliderImage.split(","),
        storeName: data.storeName,
        storeInfo: data.storeInfo,
        keyword: data.keyword,
        barCode: data.barCode,
        storeCategory: data.storeCategory || { id: null },
        price: data.price,
        vipPrice: data.vipPrice,
        otPrice: data.otPrice,
        postage: data.postage,
        unitName: data.unitName,
        sort: data.sort,
        sales: data.sales,
        stock: data.stock,
        isShow: data.isShow,
        isHot: data.isHot,
        isBenefit: data.isBenefit,
        isBest: data.isBest,
        isNew: data.isNew,
        description: data.description,
        addTime: data.addTime,
        isPostage: data.isPostage,
        isDel: data.isDel,
        merUse: data.merUse,
        giveIntegral: data.giveIntegral,
        cost: data.cost,
        isSeckill: data.isSeckill,
        isBargain: data.isBargain,
        isGood: data.isGood,
        ficti: data.ficti,
        browse: data.browse,
        codePath: data.codePath,
        soureLink: data.soureLink,
      };
      _this.dialog = true;
    },
    attr(data) {
      console.log(3333);
      this.isAttr = false;
      const _this = this.$refs.form2;
      _this.form = {
        id: data.id,
        merId: data.merId,
        image: data.image,
        sliderImage: data.sliderImage,
        storeName: data.storeName,
        storeInfo: data.storeInfo,
        keyword: data.keyword,
        barCode: data.barCode,
        storeCategory: data.storeCategory,
        price: data.price,
        vipPrice: data.vipPrice,
        otPrice: data.otPrice,
        postage: data.postage,
        unitName: data.unitName,
        sort: data.sort,
        sales: data.sales,
        stock: data.stock,
        isShow: data.isShow,
        isHot: data.isHot,
        isBenefit: data.isBenefit,
        isBest: data.isBest,
        isNew: data.isNew,
        description: data.description,
        addTime: data.addTime,
        isPostage: data.isPostage,
        isDel: data.isDel,
        merUse: data.merUse,
        giveIntegral: data.giveIntegral,
        cost: data.cost,
        isSeckill: data.isSeckill,
        isBargain: data.isBargain,
        isGood: data.isGood,
        ficti: data.ficti,
        browse: data.browse,
        codePath: data.codePath,
        soureLink: data.soureLink,
      };
      _this.dialog = true;
      this.$refs.form2.getAttrs(data.id);
    },
  },
};
</script>

<style scoped>
.gg {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.item {
  margin-bottom: 10px;
  margin-right: 40px;
}
</style>
