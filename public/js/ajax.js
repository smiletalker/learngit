/*xhr
* 回调函数-callback
* 提交地址-url
* 提交方法-method
* 同步异步-async
* 参数-param*/
var xhr=new XMLHttpRequest()||new ActiveXObject("Microsoft.XMLHTTP");
function myAjax(method,url,params,callback,async) {

    if(async==undefined){//true 异步  false-同步
        async==true
    };
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            callback();
        }
    };
    if(method=="get"){
        xhr.open(method,url+"?"+params,async);
        xhr.send(null);
    }else if(method=="post"){
        xhr.open(method,url,async);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(params)
    }
}
