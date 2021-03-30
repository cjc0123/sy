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
      <!-- <el-select
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
      </el-select> -->
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
          >订购清单</el-button
        >
        <el-button
          type="info"
          class="filter-item"
          size="mini"
          @click="addressManage"
          >地址管理</el-button
        >
      </div>
    </div>
    <div v-if="!havePer" style="text-align:center;">请申请成为经销协商</div>
    <!-- 商品卡片图 -->
    <div class="product-box" v-loading="loading" v-if="havePer">
      <div class="product-wrap" v-for="(item, index) of data" :key="index">
        <div>
          <a target="_blank"
            ><img
              :src="item.image"
              style="width: 253px; height: 256px"
              alt="点击打开"
          /></a>
        </div>
        <div style="padding: 0 10px">
          <el-row :gutter="20" align="middle" type="flex">
            <el-col :span="17">
              <el-row style="font-size: 14px">
                <el-col :span="2" style="padding: 6px 0; color: #ff4400"
                  >￥</el-col
                >
                <el-col :span="12" style="padding: 6px 0">
                  <b style="color: #ff4400">{{ item.price }}</b>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <div @click="onSale(item.id, item.isShow)">
                <el-tag
                  v-if="item.isShow === 1"
                  style="cursor: pointer"
                  :type="''"
                  >已上架</el-tag
                >
                <el-tag v-else style="cursor: pointer" :type="'info'"
                  >已下架</el-tag
                >
              </div>
            </el-col>
          </el-row>
          <div class="product-text">
            <router-link to="">
              <span>{{ item.storeName }}</span>
            </router-link>
          </div>
          <div>
            <el-row :gutter="10" style="margin-top: 5px">
              <el-col :span="12">
                <span style="color: #ff4400">库存：</span>
                <span style="color: #a5a5a5">{{ item.stock }}</span>
              </el-col>
              <el-col :span="12">
                <span style="color: #ff4400">销量：</span>
                <span style="color: #a5a5a5">{{ item.sales }}</span>
              </el-col>
            </el-row>
            <div style="margin: 5px 0">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="inPro(item)"
              >
                订购
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--表单组件-->
    <!--表格渲染-->
    <!-- <el-table
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%"
      v-if="havePer"
    >
      <el-table-column prop="id" label="商品id" />
      <el-table-column ref="table" prop="image" label="商品图片"x`>
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
            订购
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <!--分页组件-->
    <!-- <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    /> -->
    <!-- 选择规格 -->
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
              :label="item"
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
        <el-button type="primary" @click="confirmPro" :disabled="ksGg === ''"
          >订购</el-button
        >
      </span>
    </el-dialog>
    <!-- 订购清单 -->
    <el-dialog
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="showQd"
      width="40%"
      title="订购清单"
    >
      <el-table
        :data="qdData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="prop" label="商品图片">
          <template slot-scope="scope">
            <a
              :href="scope.row.productInfo.attrInfo.image"
              style="color: #42b983"
              target="_blank"
              ><img
                :src="scope.row.productInfo.attrInfo.image"
                alt="点击打开"
                class="el-avatar"
            /></a>
          </template>
        </el-table-column>
        <el-table-column prop="productInfo.storeName" label="商品名称">
        </el-table-column>
        <el-table-column prop="productInfo.attrInfo.sku" label="规格">
        </el-table-column>
        <el-table-column prop="cartNum" label="数量">
          <template slot-scope="scope">
            <div>
              <el-input-number
                v-model="scope.row.cartNum"
                :min="1"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="showQd = false">取 消</el-button>
        <el-button type="primary" @click="confirmPro_on" :disabled="isSelected"
          >订购</el-button
        >
      </span>
    </el-dialog>
    <!-- 订单确认 -->
    <el-dialog
      width="40%"
      title="订单确认"
      :visible.sync="showOrder"
      append-to-body
      v-loading="loading"
    >
      <div>
        <div style="display: flex">
          <div>
            <el-button
              type="primary"
              @click="showAddressList = !showAddressList"
              >选择收货地址</el-button
            >
          </div>
          <p class="p-balance">
            账户余额：
            <span style="color: #ff4400">￥</span>
            <strong style="color: #ff4400">{{ userBalance }}</strong>
          </p>
        </div>
        <div v-show="isHasDefaultAddress" class="address-box">
          <div style="display: flex; justify-content: space-between">
            <p>
              {{ defaultAddress.realName }}&nbsp;|&nbsp;{{
                defaultAddress.phone
              }}
            </p>
            <div>
              <el-button type="info" size="mini" disabled>默认</el-button>
            </div>
          </div>
          <p>
            {{
              `${defaultAddress.province}${defaultAddress.district}${defaultAddress.detail}`
            }}&nbsp;&nbsp;
            {{ defaultAddress.postCode }}
          </p>
        </div>
        <div v-show="isSelectAddress" class="address-box">
          <div>
            <p>
              {{ finalAddress.realName }}&nbsp;|&nbsp;{{ finalAddress.phone }}
            </p>
          </div>
          <p>
            {{
              `${finalAddress.province}${finalAddress.district}${finalAddress.detail}`
            }}&nbsp;&nbsp;
            {{ finalAddress.postCode }}
          </p>
        </div>
      </div>
      <el-dialog
        width="30%"
        title="选择收货地址"
        :visible.sync="showAddressList"
        append-to-body
      >
        <el-table
          ref="singleTable"
          :data="addressArr"
          @current-change="handleRadioAddress"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column property="realName" label="姓名" width="80">
          </el-table-column>
          <el-table-column property="phone" label="电话" width="100">
          </el-table-column>
          <el-table-column property="detailMsg" label="详细地址" width="200">
            <template slot-scope="scope">
              <span class="row-detailMsg">{{ scope.row.detailMsg }}</span>
            </template>
          </el-table-column>
          <el-table-column property="postCode" label="邮编"> </el-table-column>
        </el-table>

        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="showAddressList = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddress()"
            >确认</el-button
          >
        </div> -->
      </el-dialog>

      <el-table :data="selectedData" style="width: 100%">
        <el-table-column prop="prop" label="商品图片">
          <template slot-scope="scope">
            <a
              style="color: #42b983"
              ><img
                :src="scope.row.productInfo.attrInfo.image"
                alt="点击打开"
                class="el-avatar"
            /></a>
          </template>
        </el-table-column>
        <el-table-column prop="productInfo.storeName" label="商品名称">
        </el-table-column>
        <el-table-column
          prop="productInfo.attrInfo.sku"
          label="规格"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="cartNum" label="数量"></el-table-column>
        <el-table-column prop="" label="小计">
          <template slot-scope="scope">
            <span>{{
              productTotal(scope.row.cartNum, scope.row.truePrice)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showOrder = false">取 消</el-button>
        <el-button type="primary" @click="GoodsOrder(productIds)"
          >下单</el-button
        >
      </div>
    </el-dialog>

    <!-- 地址管理 -->
    <el-dialog title="地址管理" :visible.sync="showAddressManage" fullscreen>
      <div>
        <el-table border :data="addressData" style="width: 100%">
          <el-table-column type="index" label="序"> </el-table-column>
          <el-table-column prop="realName" label="姓名">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.realName" size="small"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.phone" size="small"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ssq" label="省市区">
            <template slot-scope="scope">
              <div>
                <el-cascader
                  size="small"
                  :options="options"
                  v-model="scope.row.ssq"
                  :props="{ value: 'label' }"
                >
                </el-cascader>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="详细地址"
            ><template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.detail" size="small"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="postCode" label="邮编">
            <template slot-scope="scope">
              <div>
                <el-input v-model="scope.row.postCode" size="small"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isDefault" label="是否默认">
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.isDefault"
                  active-color="#13ce66"
                  inactive-color="#EAECF0"
                  active-text="是"
                  inactive-text="否"
                  @change="handleSwitchValue($event, scope.row)"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" @click="submitAddress(scope.row)"
                  >确定</el-button
                >
                <el-button type="danger" @click="delAddress(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button size="small" style="width: 100%" @click="addAddressRow"
          >+</el-button
        >
      </div>
      <div slot="footer">
        <el-button @click="showAddressManage = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/crudJxs";
import { del, onsale, getInfo, isFormatAttr } from "@/api/yxStoreProduct";
import {
  addCache,
  getCache,
  addBatch,
  detail,
  add,
  list,
  addList,
  editAddress,
  delAddress,
  setAddress,
  orderConfirm,
  calculateOrder,
  createOrder,
  getOrderDetail,
} from "@/api/inOutProduction";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Treeselect from "@riophae/vue-treeselect";
import { list1 } from "@/api/applyJxs";
import { getUserInfo } from "@/api/login";
import { regionData, CodeToText } from "element-china-area-data";
import { mapState } from "vuex";
import request from "@/utils/request";
export default {
  components: { Treeselect },
  mixins: [initData],
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      dropDownValue: "",
      optionsMetaShow: [],
      delLoading: false,
      showAddressManage: false,
      visible: false,
      queryTypeOptions: [{ key: "storeName", display_name: "商品名称" }],
      isAttr: false,
      cateId: null,
      showIn: false,
      showQd: false,
      showOrder: false,
      productItems: [],
      addressData: [],
      defaultAddressValue: "",
      num: 1,
      diaTitle: "",
      totalNum: 0,
      rowData: {},
      ksGg: "",
      ksLen: 0,
      qdData: [],
      selectedData: [],
      productItemVal: [],
      havePer: false,
      isSelected: true,
      checked: true,
      addressArr: [],
      showAddressList: false,
      userBalance: 0, //余额
      defaultAddress: "",
      finalAddress: "",
      isHasDefaultAddress: false,
      isSelectAddress: false, //有无选择地址
      productIds: [], //勾选的商品ID
    };
  },
  computed: {
    ...mapState(["user"]),
    //?从仓库获取当前登录人的id
    upmsUserId() {
      return this.$store.state.user.user.id;
    },
    //计算价格
    productTotal() {
      return function (num, price) {
        return num * price;
      };
    },
  },
  created() {
    this.$nextTick(() => {
      this.init(this.upmsUserId).then(() => {
        this.optionsMetaShow = this.cateList;
        // console.log(this.optionsMetaShow);
      });
    });
    this.ifPer();
  },
  methods: {
    //!判断是否有权限查看数据
    ifPer() {
      //?开始载入
      list1({ upmsUserId: this.$store.state.user.user.id })
        .then((res) => {
          if ((res.content.length > 0) & (res.content[0].status == 1)) {
            this.havePer = true;
          } else {
            this.havePer = false;
          }
        })
        .catch((err) => {});
    },
    //设置默认地址
    setDefaultAddress(obj) {
      setAddress(obj).then((res) => {
        if (res.status === 200) {
          this.$message.success("设置默认成功");
          this.addressManage(); //刷新地址表
        }
      });
    },

    //!删除地址
    delAddress(row) {
      console.log(row);
      // return;
      let val = {
        uid: this.$store.state.user.user.uid,
        id: row.id,
        userType: 1,
      };
      this.$confirm(`确认删除该地址?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAddress(val)
            .then((res) => {
              this.$message.success("删除成功!");
              this.addressManage();
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    //!添加地址行
    addAddressRow() {
      this.addressData.push({});
    },
    //监听订单选中
    selectionChange(row) {
      // console.log(row);

      if (row.length > 0) {
        this.isSelected = false;
        this.selectedData = row;
        console.log(this.selectedData);
      } else {
        this.isSelected = true;
      }
    },
    //判断是否存在选中的商品
    isHasSelectedProduct() {
      if (this.selectedData.length !== 0) {
        this.selectedData.forEach((item) => {
          this.productIds.push(item.id);
        });
        let filterCartId = Array.from(new Set(this.productIds)); //去重
        this.productIds = filterCartId;
        // console.log(this.productIds,'productIds');
      }
    },

    //监听设置地址是否为默认
    handleSwitchValue(val, row) {
      // console.log(row);
      if (row.id === undefined) {
        this.$message.error("操作失败，请先添加地址");
        row.isDefault = 0;
        return;
      }
      let obj = {
        uid: this.user.user.uid,
        id: row.id,
        userType: 1,
      };
      if (val) {
        console.log(row);
        this.setDefaultAddress(obj);
      }
    },
    //!点击地址管理按钮
    addressManage() {
      this.showAddressManage = true;
      addList({ userType: 1, uid: this.$store.state.user.user.uid })
        .then((res) => {
          // console.log(res.data,'222');
          this.addressData = res.data;
          //?处理省市区-数组化
          this.addressData = this.addressData.map((item) => {
            item.ssq = [];
            item.ssq[0] = item.province;
            item.ssq[1] = item.city;
            item.ssq[2] = item.district;

            return item;
          });

          console.log(this.addressData, "this.addressData");
        })
        .catch((err) => {});
    },
    //!提交地址管理
    submitAddress(val) {
      console.log(val);
      // return;
      let data = JSON.parse(JSON.stringify(val));
      data.address = {
        province: data.ssq[0],
        city: data.ssq[1],
        district: data.ssq[2],
      };
      data.userType = 1;
      data.is_default = data.isDefault;
      data.post_code = data.postCode;
      data.real_name = data.realName;
      data.uid = this.$store.state.user.user.uid;
      console.log(data);
      editAddress(data)
        .then((res) => {
          this.$message.success("success");
        })
        .catch((err) => {});
    },
    //点击选择地址按钮
    getUserBalance() {
      getUserInfo(this.user.user.uid)
        .then((res) => {
          console.log(res);
          this.userBalance = res.data.nowMoney;
        })
        .catch((err) => {});
    },

    //选择收货地址确定
    confirmAddress() {
      // this.defaultAddress = this.finalAddress;
    },
    //监听选择收货地址
    handleRadioAddress(currentRow) {
      console.log(currentRow, "currentRow");
      this.finalAddress = currentRow;

      if (this.defaultAddress !== "" || this.isSelectAddress) {
        this.$message.success("修改成功");
        this.isHasDefaultAddress = false;
      } else {
        this.$message.success("选择成功");
      }
      this.showAddressList = false;
      this.isSelectAddress = true;
    },
    //!完全订购
    confirmPro_on() {
      // console.log(this.qdData);
      this.showOrder = true;
      this.getUserBalance();
      if (this.addressArr.length === 0) {
        addList({ userType: 1, uid: this.$store.state.user.user.uid })
          .then((res) => {
            let address = res.data;
            let newAddress = JSON.parse(JSON.stringify(address));
            //地址格式化
            newAddress.forEach((item) => {
              let msg = `${item.province}${item.district}${item.detail}`;
              item["detailMsg"] = msg;
            });
            this.addressArr = newAddress;
            // console.log(this.addressArr,"this.addressArr");
            //如果存在是设置默认的地址，赋值
            newAddress.forEach((item) => {
              if (item.isDefault === 1) {
                this.defaultAddress = item;
                this.isHasDefaultAddress = true;
                // console.log(this.defaultAddress);
              }
            });
          })
          .catch((err) => {});
      }
      this.isHasSelectedProduct();
      // add(this.qdData)
      //   .then((res) => {
      //     this.showQd = false;
      //     this.$message.success("订购成功!");
      //   })
      //   .catch((err) => {});
    },
    //商品最终订购
    async GoodsOrder(cartIds) {
      if(this.defaultAddress==='' && this.finalAddress){
        this.$message.error('请选择收货地址');
        this.loading = false;
        return;
      }
      this.loading = true;
      let cartId = cartIds.join(",");


      let uid = this.user.user.uid;
      let data = { userType: 1, cartId, uid };
      let data1 = { userType: 1, uid };
      let data2 = { userType: 1, uid, shippingType: 1 };
      let data3 = {
        realName: "",
        phone: "",
        addressId: 41,
        useIntegral: 0,
        couponId: 0,
        payType: "yue",
        pinkId: 0,
        from: "routine",
        mark: "",
        shippingType: 1,
      };
      let orderParams = Object.assign(data1, data3); //json对象拼接
      // console.log(data);

      // 订单确认
      try {
        let res = await orderConfirm(data);
        let orderKey = res.data.orderKey;
        let res1 = await calculateOrder(data2, orderKey);
        console.log(res1, "res1");
        let res2 = await createOrder(orderParams, orderKey);
        console.log(res2, "res2");
        let orderId = res2.data.result.orderId;
        let res3 = await getOrderDetail(data1, orderId);
        // console.log(res3);
        if (res.status === 200) {
          this.loading = false;
          this.$message.success("订购成功");
          setTimeout(() => {
            this.showOrder = false;
          }, 1000);
        } 

        // console.log(res3);
      } catch (error) {
        this.$message.error('操作失败');
        this.loading = false;
      }
    },
    //!点击订购清单按钮
    rkqd() {
      this.showQd = true;
      list({ userType: 1, userId: this.$store.state.user.user.uid })
        .then((res) => {
          this.qdData = res.data.valid;
          console.log(this.qdData);
        })
        .catch((err) => {});
    },
    //!加入订购单
    confirmPro() {
      //
      console.log(this.productItems, "当前产品规格数据");
      //   console.log(this.rowData, "当前行数据");
      console.log(this.ksGg, "选中的规格");
      console.log(this.productItemVal[this.ksGg], "选中的规格--------");
      let uniqueId = this.productItemVal[this.ksGg].unique;
      let val = {
        cartNum: this.num,
        productId: this.rowData.id,
        userType: 1, //写死
        new: 0, //写死
        uniqueId: uniqueId,
        userId: this.$store.state.user.user.uid,
      };
      console.log(val, "val");
      console.log(this.$store.state.user, "this.$store.state.user");
      add(val)
        .then((res) => {
          this.showIn = false;
          this.$message.success("加入订购清单成功!");
        })
        .catch((err) => {});
    },
    //点击取消选择按钮
    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //!   点击订购按钮
    inPro(row) {
      console.log(row);
      this.rowData = row;
      this.diaTitle = row.storeName;
      this.showIn = true;
      detail({ id: row.id })
        .then((res) => {
          console.log(res, "2222222");
          this.productItems = Object.keys(res.data.productValue);
          this.productItemVal = res.data.productValue;
          console.log(this.productItems, " this.productItems");
        })
        .catch((err) => {});
      //   getInfo(row.id)
      //     .then((res) => {
      //       let attrs = res.productInfo.items;
      //       isFormatAttr(row.id, { attrs: attrs })
      //         .then((res1) => {
      //           this.productItems = res1.value;
      //           //   ?确定有几个款式
      //           this.ksLen = res1.attr.length;
      //           //?动态拼接款式
      //           this.productItems = this.productItems.map((item) => {
      //             item.label = "";
      //             for (let i = 1; i <= this.ksLen; i++) {
      //               switch (i) {
      //                 case 1:
      //                   item.label += item.value1 + "-";
      //                   break;
      //                 case 2:
      //                   item.label += item.value2 + "-";
      //                   break;
      //                 case 3:
      //                   item.label += item.value3 + "-";
      //                   break;
      //                 case 4:
      //                   item.label += item.value4 + "-";
      //                   break;
      //               }
      //             }
      //             item.label = item.label.slice(0, -1);
      //             return item;
      //           });
      //           console.log(this.productItems, "转换后");
      //         })
      //         .catch((err) => {});
      //     })
      //     .catch((err) => {});
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
.product-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: -20px;
}
.product-wrap {
  border: 1px solid #ededed;
  margin: 20px 20px 0 0;
}
.product-wrap:hover {
  border: 1px solid #ff4400;
}

.product-text {
  width: 232px;
  height: 44px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.product-text > a:hover {
  text-decoration: underline;
  color: #ff4400;
}
.row-detailMsg {
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}
.address-box {
  border: 2px solid #c8c9cc;
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
}
.p-balance {
  height: 30px;
  line-height: 30px;
  padding: 0 9px;
  margin-left: 10px;
}
</style>
