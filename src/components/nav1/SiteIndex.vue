<template>
  <div id="Open">
    <div>
      <el-card class="box-card">
        <div class="search-box">
          <el-select @change="getData()" style="width: 100%;" v-model="Value" filterable placeholder="请选择">
            <el-option label="已处理" :value="true"></el-option>
            <el-option label="未处理" :value="false"></el-option>
          </el-select>
        </div>
      </el-card>
    </div>
    <div class="main-box">
      <el-card class="box-card open-card" v-if="openList.length<=0">
        <div class="no-open">无开柜申请</div>
      </el-card>
      <el-card class="box-card open-card" v-for="(item,index) in openList" :key="index">
        <div class="order-box">
          <div class="order-body-box">
              <dl>
                <dd class="order-message"><span>手机:</span> {{item.consumerTel}}</dd>
              </dl>
              <dl>
                <dd class="order-message"><span>使用时间:</span> {{item.startTime}}</dd>
              </dl>
              <dl>
                <dd class="order-message"><span>规格:</span> {{item.count.typeName}}型柜子</dd>
              </dl>
              <dl>
                <dd class="order-message"><span>已使用时长:</span> {{item.count.settlingTime}}小时</dd>
              </dl>
              <dl>
                <dd class="order-message"><span>存放地点:</span> {{item.cabinetAddress}}</dd>
              </dl>
              <dl>
                <dd class="order-message"><span>备注:</span> {{item.forgetRemark}}</dd>
              </dl>
          </div>
        </div>
        <div class="button-footer-box">
          <div class="button-footer-left"></div>
          <div class="button-footer-right">
            <el-button :disabled="item.cabinetOut" @click="openCase(item)" size="mini" style="width: 100%;" type="primary">开柜</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <el-dialog
        title="确认开柜?"
        :visible.sync="dialogVisible1"
        width="90%"
        top="35vh">
        <div style="padding-top: 10px;">
          <div class="order-message"><span>单号:</span> {{orderNo}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button class="button-margin" type="primary" @click="openItem()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Value:false,
      openList:[],
      orderNo:"",
      dialogVisible1:false
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let port = 'cabinetRentEmploymentRecord/getCabinetRecordForgeList';
      let obj = {
        opid:sessionStorage.getItem('SiteId'),
        cabinetOut:this.Value
      };
      let upData = this.axios.upData(port,obj);
      upData.then(res => {
        if(res.data.status == 200){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            data[i].startTime = this.formatDate(new Date(data[i].startTime));
          };
          this.openList = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    openCase(data){
      this.orderNo = data.fkCabinetRecordNo;
      this.dialogVisible1 = true;
    },
    openItem(){
      let port = 'cabinetProcessing/handleForgettingAndOpenTheCabinet';
      let obj = {
        opid:sessionStorage.getItem('SiteId'),
        cabinetRecordNo:this.orderNo
      };
      let upData = this.axios.upData(port,obj);
      upData.then(res => {
        if(res.data.status == 200){
          this.$message.success(res.data.data);
          this.getData();
          this.dialogVisible1 = false;
        }else if(res.data.status == 588){
          this.checkLogin();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
#Open{

}
dl,dd{
  margin:0px;
}
.no-open{
  color: #47484dbe;
  font-size: 14px;
  padding: 5px 0px;
}
.order-box{
  padding: 5px 10px 10px;
}
.order-body-box{
  border: 1px solid rgb(226, 226, 226);
  font-size: 14px;
  padding: 5px;
  text-align: left;
}
.button-footer-box{
  display: flex;
  align-items: center;
}
.button-footer-left{
  width: 70%;
}
.button-footer-right{
  width: 30%;
}
.main-box{
  height: calc(100vh - 107px);
  overflow-y: scroll;
}
.order-message{
  color: #757575;
}
.order-message span{
 font-weight: bold;
 color: #5A5A5A;
}
.search-box{
  padding: 5px 7px;
}
</style>