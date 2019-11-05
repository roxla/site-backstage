<template>
  <div id="MONCOUNT">
    <el-card class="box-card">
      <div class="item-header">
        <div class="item-header-time">
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月份"
            style="width: 100%;"
            :editable="false"
            :clearable="false"
            value-format="yyyy-MM"
            :picker-options="pickerOptions"
            @change="getMonthData">
          </el-date-picker>
        </div>
      </div>
      <div class="item-main">
        <div class="item-main-box">
          <div>总收入</div>
          <div class="item-count">{{(caseMoney+coupon).toFixed(2)}}</div>
        </div>
        <div class="item-main-box">
          <div>时长/小时</div>
          <div class="item-count">{{caseTime}}</div>
        </div>
        <div class="item-main-box">
          <div>柜门收入</div>
          <div class="item-count">{{caseMoney.toFixed(2)}}</div>
        </div>
        <div class="item-main-box">
          <div>分成</div>
          <div class="item-count">{{(caseMoney*proportion).toFixed(2)}}</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="item-header case-header">
        <div class="item-header-case">
          <input v-model="S_name" type="text" placeholder="请输入柜子名称">
        </div>
        <div class="item-header-button">
          <el-button @click="getData(endDay)" type="text" class="text-button">搜索</el-button>
        </div>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="calc(100vh - 190px)"
          @row-click="showInfo">
          <el-table-column
            prop="nameLocker"
            label="柜子名称"
            width="80"
            align="center"
            fit="true"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="时长"
            min-width="75"
            align="center"
            fit="true">
            <template slot-scope="scope">
              <div>{{scope.row.totalHoursOfUse}}小时</div>
            </template>
          </el-table-column>
          <el-table-column
            label="总收入"
            width="70"
            align="center"
            fit="true"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>{{scope.row.allPayMoney.toFixed(2)}}元</div>
            </template>
          </el-table-column>
          <el-table-column
            label="柜子收入"
            min-width="65"
            align="center"
            fit="true">
            <template slot-scope="scope">
              <div>{{scope.row.totalPayMoney.toFixed(2)}}元</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible1"
      width="90%"
      top="30vh">
      <div style="text-align: left;padding: 10px 0px;">
        <div style="padding: 0px 0px 5px;">柜子编号: {{pkNo}}</div>
        <div style="padding: 0px 0px 5px;">柜子名称: {{name}}</div>
        <div style="padding: 0px 0px 5px;">时长/小时: {{time}}小时</div>
        <div style="padding: 0px 0px 5px;">总收入: {{money.toFixed(2)}}元</div>
        <div style="padding: 0px 0px 5px;">柜子收入: {{payMoney.toFixed(2)}}元</div>
        <div style="padding: 0px 0px 5px;">代金券: {{coupon.toFixed(2)}}元</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      month:"",
      proportion:0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      coupon:0,
      endDay:"",
      caseMoney:0,
      caseTime:0,
      tableData: [],
      S_name:"",
      // 详情
      dialogVisible1:false,
      pkNo:"",
      payMoney:0,
      time:0,
      money:0,
      coupon:0,
      name:""
    }
  },
  created(){
    this.getDefTime();
    this.proportion = parseFloat(sessionStorage.getItem('proportion'))/100;
  },
  methods: {
    getDefTime(){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      };
      this.month = year + "-" + month;
      this.getMonthData(this.month);
    },
    getMonthData(data){
      let date;
      let endDay;
      if(!!data){
        date = data;
      }else{
        date = this.month;
      };
      if(date.split('-')[1]=='04'||date.split('-')[1]=='06'||date.split('-')[1]=='09'||date.split('-')[1]=='11'){
        endDay = '30';
      }else if(date.split('-')[1] == '02'){
        let year = date.split('-')[0];
        if(year%4==0&&year%100!=0||year%400==0){
          endDay = '29';
        }else{
          endDay = '28';
        }
      }else{
        endDay = '31';
      };
      this.endDay = endDay;
      this.getCount(endDay);
      this.getCoupon(endDay);
      this.getData(endDay)
    },
    getCoupon(date){
      let port = 'merchantCashCoupon/statistics';
      let obj = {
        opid:sessionStorage.getItem('SiteId'),
        startTime:this.month + '-01',
        endTime:this.month + '-' + date + " 23:59:59"
      };
      let upData = this.axios.upData(port,obj);
      upData.then(res => {
        if(res.data.status == 200){
          this.coupon = parseFloat(res.data.data.statisticsCoupon);
        }else if(res.data.status == 588){
          this.checkLogin();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getCount(date){
      let port = 'cabinetRentEmploymentRecord/statistics';
      let obj = {
        opid:sessionStorage.getItem('SiteId'),
        isPay:true,
        fkCabinetRecordStatusNo:'1001',
        startTime:this.month + '-01',
        endTime:this.month + '-' + date + " 23:59:59"
      };
      let upData = this.axios.upData(port,obj);
      upData.then(res => {
        if(res.data.status == 200){
          this.caseMoney = parseFloat(res.data.data.totalCabinetMoney);
          this.caseTime = parseInt(res.data.data.totalHours);
        }else if(res.data.status == 588){
          this.checkLogin();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getData(date){
      let port = 'cabinetManage/statistics';
      let obj = {
        opid:sessionStorage.getItem('SiteId'),
        nameLocker:this.S_name,
        startTime:this.month + '-01',
        endTime:this.month + '-' + date + " 23:59:59"
      };
      let upData = this.axios.upData(port,obj);
      upData.then(res => {
        if(res.data.status == 200){
          let data = res.data.data;
          this.tableData = [];
          for(let i=0;i<data.length;i++){
            data[i].totalHoursOfUse = parseInt(data[i].totalHoursOfUse);
            data[i].totalPayMoney = parseFloat(data[i].totalPayMoney);
            data[i].allPayMoney = parseFloat(data[i].totalPayMoney) + parseFloat(data[i].totalCashCouponMoney);
          };
          this.tableData = data;
        }else if(res.data.status == 588){
          this.checkLogin();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    showInfo(row){
      this.pkNo = row.pkNo;
      this.payMoney = parseFloat(row.totalPayMoney);
      this.time = parseInt(row.totalHoursOfUse);
      this.money = parseFloat(row.allPayMoney);
      this.coupon = parseFloat(row.totalCashCouponMoney);
      this.name = row.nameLocker;
      this.dialogVisible1 = true;
    }
  },
}
</script>

<style scoped>
#MONCOUNT{
  font-size: 0.8em;
}
.item-header,.item-footer{
  display: flex;
  align-items: center;
  justify-content: center;
}
.case-header{
  border-bottom: 1px solid #EEEEEE;
}
.item-header-time{
  margin: 2%;
  width: 100%;
}
.item-header-case{
  width: 80%;
  margin: 2px 0px 2px 2%;
}
.item-header-case input{
  width: 100%;
  border: 0px;
  height: 22px;
  color: #73767D;
  line-height: 22px;
}
.item-header-button{
  margin-right: 2%;
}
.item-main{
  display: flex;
  align-items: center;
  margin-bottom: 2%;
}
.item-main-box{
  width: calc(100%/4);
  margin-left: 2%;
  border: 1px solid #EEEEEE;
  border-radius: 5px;
  padding: 1% 0px;
  color: #909399;
}
.item-main-box:last-of-type{
  margin-right: 2%;
}
.item-footer-box{
  width: 50%;
  border-top: 1px solid #EEEEEE;
  padding: 1% 0px;
  color: #909399;
}
.item-footer-box:last-of-type{
  border-left: 1px solid #EEEEEE;
}
.item-footer-box span,.item-count{
  font-weight: bold;
  color: red;
  font-size: 1.2em;
}
</style>