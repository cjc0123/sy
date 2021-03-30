<template>
  <div style="width: 1205px; margin: auto">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleTab"
      style="margin-top: 18px"
    >
      <el-tab-pane label="我的订单" name="first">
        <div style="width: 1205px; margin: 12px auto">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="24">
              <div style="text-align: right">
                <el-button type="primary" size="mini" @click="getBillInfo">
                  查看发票</el-button
                >
                <el-button type="primary" size="mini" @click="invoice">
                  开具发票</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-table
            :data="orderDetailDatas"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="loading"
          >
            <el-table-column
              type="selection"
              width="55"
              :selectable="handleSelection"
            >
            </el-table-column>
            <el-table-column label="订单ID" prop="orderId"> </el-table-column>
            <el-table-column label="下单时间" prop="createTime">
            </el-table-column>
            <el-table-column label="下单人" prop="realName"> </el-table-column>
            <el-table-column label="开票状态" prop="iskp">
              <template slot-scope="scope">
                <span :style="scope.row.iskp ? '' : 'color:red;'">{{
                  scope.row.iskp ? "已开票" : "未开票"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="小计" prop="totalPrice">
              <template slot-scope="scope">
                <p class="orderPrice">
                  <span>￥</span>
                  <strong>{{ scope.row.totalPrice }}</strong>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="370">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDetailView(scope.$index, scope.row)"
                  >详情</el-button
                >
                <el-button
                  size="mini"
                  @click="handleLogisticsView(scope.row, scope.$index)"
                  >查看物流</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="downloadContract(scope.row)"
                  >下载合同</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="订单详情"
            :visible.sync="showOrderDetail"
            width="50%"
            center
            append-to-body
          >
            <el-table :data="currentRowData" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="商品名称">
                      <span>{{ props.row.productInfo.storeName }}</span>
                    </el-form-item>
                    <el-form-item label="商品属性">
                      <span>{{ props.row.productInfo.attrInfo.sku }}</span>
                    </el-form-item>
                    <el-form-item label="地址">
                      <span>{{ currentRow.userAddress }}</span>
                    </el-form-item>
                    <el-form-item label="电话">
                      <span>{{ currentRow.userPhone }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="productId" label="商品ID">
              </el-table-column>
              <el-table-column prop="productInfo.storeName" label="商品名称">
              </el-table-column>
              <el-table-column prop="productInfo.image" label="商品图片">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.productInfo.image"
                    :alt="scope.row.productInfo.storeName"
                    style="width: 50px; height: 50px"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column prop="productInfo.attrInfo.sku" label="商品属性">
          </el-table-column> -->
              <el-table-column label="单价">
                <template slot-scope="scope">
                  <p class="orderPrice">
                    <span>￥</span>
                    <strong>{{ scope.row.productInfo.attrInfo.price }}</strong>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="cartNum" label="数量" width="180">
              </el-table-column>
              <el-table-column label="小计">
                <template slot-scope="scope">
                  <p class="orderPrice">
                    <span>￥</span>
                    <strong>{{ scope.row.truePrice }}</strong>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>

          <el-dialog
            title="开具发票"
            :visible.sync="showBill"
            width="50%"
            center
            append-to-body
          >
            <el-form
              :model="form"
              ref="form"
              :rules="rules"
              label-width="80px"
              :inline="false"
              size="normal"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="发票类型">
                    <el-input v-model="form.type"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发票内容">
                    <el-input v-model="form.current"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="抬头类型">
                    <el-input value="公司"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="抬头名称" prop="headName">
                    <el-input v-model="form.headName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="单位税号" prop="unitTax">
                    <el-input v-model="form.unitTax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册地址">
                    <el-input
                      v-model="form.registerAddress"
                      placeholder="选填"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="注册电话">
                    <el-input
                      v-model="form.registerPhone"
                      placeholder="选填"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开户银行">
                    <el-input v-model="form.bank" placeholder="选填"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="银行账号">
                    <el-input
                      v-model="form.bankAccount"
                      placeholder="选填"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="showBill = false">取 消</el-button>
              <el-button type="primary" @click="checkRequired"
                >提交申请</el-button
              >
            </span>
          </el-dialog>

          <el-dialog title="包裹信息" :visible.sync="showLogistics" width="58%">
            <div>
              <el-steps
                :active="orderStatus.size"
                align-center
                process-status="process"
                finish-status="success"
              >
                <el-step
                  title="用户下单"
                  :description="orderStatus.cacheKeyCreateOrder"
                ></el-step>
                <el-step
                  title="待发货"
                  :description="orderStatus.paySuccess"
                ></el-step>
                <el-step
                  title="待收货"
                  :description="orderStatus.deliveryGoods"
                ></el-step>
                <el-step
                  title="待评价"
                  :description="orderStatus.userTakeDelivery"
                ></el-step>
                <el-step
                  title="已完成"
                  :description="orderStatus.checkOrderOver"
                ></el-step>
              </el-steps>
              <!-- <el-steps v-else :active="order.refundStatus+1" align-center process-status="process" finish-status="success">
            <el-step title="用户下单" :description="orderStatus.cacheKeyCreateOrder"></el-step>
            <el-step title="用户申请退款" :description="orderStatus.applyRefund"></el-step>
            <el-step title="退款申请通过" :description="orderStatus.refundOrderSuccess"></el-step>
          </el-steps> -->
            </div>
            <div
              style="margin: 20px 0; text-align: center"
              v-if="this.logisticsList.length === 0"
            >
              <span>暂无物流信息</span>
            </div>
            <div v-else style="margin: 20px 0">
              <el-steps
                direction="vertical"
                :active="90"
                finish-status="success"
                space="50px"
                style="width: 92%; padding-left: 4%"
              >
                <el-step
                  v-for="item in logisticsList"
                  :key="item.acceptStation"
                  :title="item.acceptStation"
                  :description="item.acceptTime"
                ></el-step>
              </el-steps>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="下级订单" name="second" :lazy="true">
        <div class="block">
          <el-cascader
            ref="cascader"
            :options="subordinateList"
            @change="handleSubordinateOrders"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </div>
        <div style="width: 1095px; margin: 12px auto">
          <el-row>
            <el-col :span="12">
              <h3 style="font-size: 14px">下级订单信息</h3>
            </el-col>
          </el-row>
          <el-table
            :data="subordinateOrders"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column label="订单ID" prop="orderId"> </el-table-column>
            <el-table-column label="下单时间" prop="createTime">
            </el-table-column>
            <el-table-column label="下单人" prop="realName"> </el-table-column>
            <el-table-column label="开票状态" prop="iskp">
              <template slot-scope="scope">
                <span>{{ scope.row.iskp ? "已开票" : "未开票" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="小计" prop="totalPrice">
              <template slot-scope="scope">
                <p class="orderPrice">
                  <span>￥</span>
                  <strong>{{ scope.row.totalPrice }}</strong>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="270">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDetailView(scope.$index, scope.row)"
                  >详情</el-button
                >
                <el-button
                  size="mini"
                  @click="handleLogisticsView(scope.row, scope.$index)"
                  >查看物流</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="发票详情"
      :visible.sync="showInvoice"
      width="50%"
      :lock-scroll="true"
      append-to-body
    >
      <div>
        <div
          class="invoice-wrap"
          style=""
          v-for="(item, index) of invoiceInfo"
          :key="index"
        >
          <el-row>
            <el-col :span="12" style="font-size: 16px; padding: 0 16px">
              <i class="el-icon-circle-check"></i>
              <strong>已开票</strong>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <div style="padding: 0 16px">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="发票类型">
                <span>{{ item.type === 0 ? "普通发票" : "增值税发票" }}</span>
              </el-form-item>
              <el-form-item label="订单 ID">
                <span>{{ item.orderId }}</span>
              </el-form-item>
              <el-form-item label="发票抬头">
                <span>{{ item.headName }}</span>
              </el-form-item>
              <el-form-item label="发票内容">
                <span>{{ item.current }}</span>
              </el-form-item>
              <el-form-item label="税号">
                <span>{{ item.unitTax }}</span>
              </el-form-item>
              <el-form-item label="收票地址">
                <span>{{ item.address }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrderList,
  applyInvoice,
  getInvoice,
  subordinateOrderList,
  shoppingList,
} from "@/api/inOutProduction";
import { express, getOrderDetail, getNowOrderStatus } from "@/api/yxStoreOrder";
import { mapState } from "vuex";
import { list1 } from "@/api/applyJxs";
export default {
  data() {
    return {
      //已订购的商品数据
      orderDetailDatas: [],
      showOrderDetail: false,
      currentRowData: [],
      currentRow: {},
      showBill: false,
      billDatas: [], //需开票的数据
      showLogistics: false, //是否显示物流详情
      showInvoice: false,
      invoiceInfo: [], //已开票信息
      order: {},
      orderStatus: {},
      logisticsList: [],
      loading: false,
      activeName: "first",
      subordinateOrders: [], //下级订单数据
      subordinateList: [],
      form: {
        type: 0, //发票类型
        current: "", //发票内容
        headType: 0, //抬头类型
        headName: "", //抬头名字
        address: "", //联系地址
        phone: "", //联系电话
        unitTax: "", //税号
        registerAddress: "", //注册地址
        registerPhone: "", //注册电话
        bank: "", //开户银行
        bankAccount: "", //开户账号
      },
      rules: {
        headName: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur",
          },
        ],
        unitTax: [
          {
            required: true,
            message: "请输入税号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getUserOrderList();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    //获取已订购的订单
    getUserOrderList() {
      let uid = this.user.user.uid;
      let data = {
        userType: 1,
        uid,
      };
      getOrderList(data).then((res) => {
        // console.log(res);
        this.orderDetailDatas = res.data;
      });
    },
    //获取下级
    async getSubordinateOrder() {
      try {
        let list1Res = await list1({ upmsUserId: this.user.user.id });
        let id = list1Res.content[0].id; //当前经销商ID
        let data = { id };

        let res = await subordinateOrderList(data);
        this.subordinateList = res;
        this.recursion(this.subordinateList);
      } catch (error) {}
    },
    //级联递归
    recursion(arr) {
      arr.forEach((ele) => {
        ele.value = ele.uid;
        ele.label = ele.name;
        ele.children = ele.childerDisList;
        if (ele.children.length > 0 && ele.children.length !== undefined) {
          this.recursion(ele.children);
        }
      });
    },
    // 下载合同
    downloadContract(row) {
      console.log(row);
      this.loading = true;
      let data = { orderId: row.id };
      shoppingList(data).then((res) => {
        console.log(res);
        window.open(res);
        this.loading = false;
      }).catch(err=>{
        this.loading = false;
      });
    },
    //筛选下级列表
    handleSubordinateOrders() {
      let el = this.$refs["cascader"].getCheckedNodes();
      let uid = el[0].data.uid;
      let data = {
        uid,
        userType: 1,
      };
      // 获取下级订单
      getOrderList(data).then((res) => {
        console.log(res);
        this.subordinateOrders = res.data;
      });
    },
    //点击详情按钮
    handleDetailView(index, row) {
      this.showOrderDetail = true;
      this.currentRow = row;
      this.currentRowData = row.cartInfo;
    },
    //判断当前行是否可勾选
    handleSelection(row) {
      if (row.iskp === 1) {
        return false;
      } else {
        return true;
      }
    },
    //选项卡触发
    handleTab(e) {
      if (e.index === "1") {
        this.getSubordinateOrder();
      }
    },
    //勾选行
    handleSelectionChange(row) {
      console.log(row);
      this.billDatas = row;
    },
    //点击开票
    invoice() {
      if (this.billDatas.length === 0) {
        this.$message.error("请选择需要开票的订单");
        return;
      }
      this.showBill = true;
    },
    //确认提交开票申请
    confirmApplyInvoice() {
      let orderIDs = this.billDatas.map((item) => {
        return item.orderId;
      });
      let orderId = orderIDs.join(",");
      let uid = this.user.user.uid;
      let data = {
        userType: 1,
        uid,
        orderId,
      };

      let params = Object.assign(this.form, data);
      // console.log(params);
      applyInvoice(params).then((res) => {
        // console.log(res);
        if (res.data) {
          this.$message.success("提交申请成功");
          this.showBill = false;
          this.getUserOrderList();
        }
      });
    },
    //开票必填判断
    checkRequired() {
      if (
        !this.form.headName ||
        !this.form.address ||
        !this.form.phone ||
        !this.form.unitTax
      ) {
        this.$message.error("请输入必填项");
        return;
      } else {
        this.confirmApplyInvoice();
      }
    },
    //查看发票信息
    getBillInfo() {
      let uid = this.user.user.uid;
      let data = { uid, userType: 1 };
      getInvoice(data).then((res) => {
        this.invoiceInfo = res.data.content;
        this.showInvoice = true;
      });
    },

    // init(){
    //     let that = this;
    //     let id = that.$route.params.id || 0;
    //     this.getNowOrderStatus();
    //     getOrderDetail(id).then(response => {
    //       this.order = response;
    //       this.userDTO = this.order.userDTO;
    //     });
    //   },
    // express() {
    //     let params ={
    //       "orderCode": this.order.id,
    //       "shipperCode": this.order.deliverySn,
    //       "logisticCode": this.order.deliveryId
    //     }

    //     express(params).then(res=>{
    //       console.log(res,89888)
    //       this.expressInfo = res.Traces
    //       this.kuaidiDialogVisible=true;
    //       this.logisticsList = this.expressInfo
    //     }).catch(err => {
    //     })
    // },

    //获取物流
    async getLogistics(id) {
      try {
        //获取当前订单状态
        let res = await getNowOrderStatus(id);
        this.orderStatus = res;
        // console.log(res);
        //获取订单详情
        let res1 = await getOrderDetail(id);
        this.order = res1;
        let params = {
          orderCode: this.order.id,
          shipperCode: this.order.deliverySn,
          logisticCode: this.order.deliveryId,
        };
        console.log(params);
        let res2 = await express(params);
        this.logisticsList = res2.Traces;
        this.loading= false;
        this.showLogistics = true;
      } catch (error) {
        this.$message.error('暂无任何物流信息');
        this.loading=false;
      }
    },

    //点击查看物流
    handleLogisticsView(row) {
      // console.log(row);
      this.loading= true;
      let id = row.id;
      this.getLogistics(id);

      // getOrderDetail(id).then(res=>{
      //   // console.log(res);
      //   this.order = res;
      //   let params ={
      //     "orderCode": this.order.id,
      //     "shipperCode": this.order.deliverySn,
      //     "logisticCode": this.order.deliveryId
      //   }
      //   console.log(params);
      //   // express(params).then(res=>{
      //   //   console.log(res,'express');
      //   //   // this.expressInfo = res.Traces
      //     // this.showLogistics = true; //显示物流
      //   //   // this.logisticsList = this.expressInfo
      //   // }).catch(err => {
      //   // })
      // })
    }, //获取当前订单状态
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.orderPrice {
  color: #ff4400;
}
.invoice-wrap {
  border: 1px solid #eee;
  padding: 12px 16px;
  margin-bottom: 16px;
}
</style>