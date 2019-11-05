<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #EEEEEE;
}
.el-card__body{
  padding: 0px !important;
}
.el-button{
  padding: 10px 20px !important;
}
.el-button--mini{
  padding: 9px 7px !important;
}
.mini-button{
  padding: 0px !important;
}
.text-button{
  padding: 5px 0px !important;
}
.el-button+.el-button{
  margin-left: 0px;
}
.button-margin{
  margin-left: 10px !important;
}
.el-message{
  min-width: 220px !important;
  width: 90% !important;
  padding: 10px 15px;
}
.ql-editor img{
  max-width: 100% !important;
}
.el-dialog__body{
  padding: 10px 20px !important;
}
.el-input__inner{
  height: 32px !important;
  line-height: 32px !important;
}
.el-table{
  font-size: 13px;
}
.el-table td, .el-table th{
  padding: 5px 0px !important;
}
.el-table .cell{
  padding-left: 5px !important;
  padding-right: 5px !important;
}
.box-card{
  width: 97%;
  margin: 7px auto 0px;
}
.box-card:last-of-type{
  margin-bottom: 7px;
}
.el-form-item{
  margin-bottom: 20px !important;
}
.el-form-item__content{
  line-height: 32px !important;
}
.el-from-login{
  margin-bottom: 0px !important;
}
.el-input__icon{
  line-height: 32px !important;
}
.el-picker-panel__content{
  margin: 0px !important;
}
.el-date-picker{
  width: 300px !important;
  position: absolute !important;
  left: 3% !important;
}
.el-dialog__header{
  padding: 20px 20px 0px;
}
.el-dialog__title{
  font-size: 16px;
}
.el-dialog__body{
  padding: 0px 20px !important;
}
.el-dialog__footer{
  padding: 10px 20px !important;
}
.el-popover{
  min-width: 0px !important;
}
.el-dropdown-menu{
  padding: 5px 0px;
}
.open-card{
  margin: 0px auto 7px;
}
.open-card:last-of-type{
  margin: 0px auto;
}
.address-input textarea{
  min-height: 0px !important;
  height: 33px !important;
}
.el-form-item__label{
  font-size: 13px;
  line-height: 13px;
  padding-bottom: 5px;
}
</style>
