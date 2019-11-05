import $axios from 'axios';
import qs from 'qs';
// let HTTP = 'http://192.168.1.120:9012/'
let HTTP = 'https://cabinet.fryxy.cn/testDeBug/'
// let HTTP = '/association/'

// 传图片
export async function addImg(File){
  let Data = new FormData();
	Data.append("file", File);
  let url = HTTP + ''
  return $axios.post(url,Data,{emulateJSON: true},{
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
}

// 默认
export async function transferData(port,obj){
  let url = HTTP + port
  if(!!qs.stringify(obj)){
    return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
      headers: {
        'Content-Type':'application/json;charset=UTF-8'
      }
    })
  }
}

// 头传参不加密
export async function upData(port,obj){
  let url = HTTP + port;
  if(!!qs.stringify(obj)){
    return $axios.post(url,qs.stringify(obj),{
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'token':obj.opid
      }
    })
  }
}

// 加密
export async function encodeData(port,obj){
  let url = HTTP + port
  let Data = new FormData();
  Data.append("data", Base64.encode(JSON.stringify(obj)));
  if(!!JSON.stringify(obj)){
    return $axios.post(url,Data,{emulateJSON: true},{
      headers: {
        'Content-Type':'application/json;charset=UTF-8'
      }
    })
  }
}

// 头传参加密
export async function headData(opid,port,obj){
  let url = HTTP + port
  let Data = new FormData();
  Data.append("data", Base64.encode(JSON.stringify(obj)));
  if(!!JSON.stringify(obj)){
    return $axios.post(url,Data,{emulateJSON: true},{
      headers: {
        'Content-Type':'application/json'
      }
    })
  }
}