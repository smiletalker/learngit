define(["jquery"],function(require){
	return commonObj = {
		loadCanvas:function(){
		 var imglength = $("#productul").find("canvas").length;
            if (imglength > 0) {
                $("#productul").find("canvas").each(function () {
                    var imgSrc = $(this).data("src");
                    var imageObj = new Image();
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc;
                    }
                })
            }
		},
        addnums:function(){
            var number=parseInt($(this).prev().val());
            if(!isNaN(number)){
                if(number<1){
                    number=1;
                }else{
                  number+=1; 
                }
            }else{
                number=1

            }
           $(this).prev().val(number);
        },
        reducenums:function(){
            var number=parseInt($(this).next().val());
            if(!isNaN(number)){
                if(number<2){
                    number=1;
                }else{
                    number-=1;
                }
            }else{
                number=1
            }
            $(this).next().val(number);
        },
        addcatAnimate:function(e){
            e.stopPropagation();
            var number=Number($("#cartnumbers").val());
            var productimg=$("#productimg"),//通过定义一个链式结构获取元素
               imgsrc=$("#productimg").children("img").attr("src"),
                x = productimg.offset().left + 30,//offset() 方法返回或设置匹配元素相对于文档的偏移（位置）。
                y = productimg.offset().top -10,
                X = $("#n_1").offset().left+30,
                Y = $("#n_1").offset().top;
                if ($('#flydiv').length <= 0) {
                    $('body').append('<div id="flydiv"><img src="'+imgsrc+'" width="50" height="50" /></div');
                };
                var $obj=$('#flydiv');
                if(!$obj.is(':animated')){
                    $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
                        $obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
                            $obj.fadeOut(300,function(){
                                $obj.remove();  
                                var num=Number($(".cartnums").text());
                                $(".cartnums").text(num+number);
                                $(".cartnums").show();
                            });
                        });
                    }); 
                };

        },
        set_address:function(){
            var addr_id = $("input[name='address_options']:checked").val();
            if(addr_id == 0)
            {

                $('#address_form').show();
            }
            else
            {
                $('#address_form').hide();

            }
        },
        address_huitian:function () {
            var name=$(this).parents("li").find(".name").text();
            var phone=$(this).parents("li").find(".phone").text();
            var allAddress=$(this).parents("li").find(".all-address").html();
            var addressArray=allAddress.split("&nbsp;");
            var s1=addressArray[0];
            var s2=addressArray[1];
            var s3=addressArray[2];
            var addressinfo=addressArray[3];
            $("#consignee").val(name);
            $("#s1").val(s1);
            $("#s1").trigger("change");
            $("#s2").val(s2);
            $("#s2").trigger("change");
            $("#s3").val(s3);
            $("#address").val(addressinfo);
            $("#phone_mob").val(phone);
        },
        
        addAddresslist:function () {
            var name=$("#consignee").val();
            var phone=$("#phone_mob").val();
            var s1=$("#s1").val();
            var s2=$("#s2").val();
            var s3=$("#s3").val();
            var address=$("#address").val();
            var addressliHtml='<li>'+          //定义一个变量来装用户输入的字段，并设置格式。
                '<p><em class="name">'+name+'</em>(<em class="phone">'+phone+'</em>)</p>'+
                ' <p class="all-address">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+'&nbsp;'+address+'</p>'+
                '<p class="new_line"><br></p>'+
                '<p class="address_action">'+
                '<span class="edit"><a href="#"><i class="edit_icon"></i>编辑</a></span>'+
                '<span><a href="#" class="delete float_none"><i class="delete_icon"></i>删除</a></span>'+
                '</p>'+
                '</li>';
            if($.trim(name)!="" && $.trim(phone)!="" && $.trim(s1)!="" && $.trim(address)!=""){//判断所填位置是否为空
                $("#addresslist").append(addressliHtml);
                    commonObj.clearAddress();//清除文本框内容,并把获取的内容放到指定位置。
            }
        },
        clearAddress:function(){
            $("#consignee").val("");
            $("#phone_mob").val("");
            $("#s1").val("");
            $("#s2").val("");
            $("#s3").val("");
            $("#address").val("");
        },

        loginin:function () {
            var name=$("#login_userName").val();
            var password=$("#login_Password").val();
            var flag=true;
            if($.trim(name)!=""){
                var reg=/^1[3|4|5|7|8]\d{9}$/;
                if(reg.test(name)){
                    $("#login_userName").next("s").hide();

                }else{
                    $("#login_userName").next("s").css({"display":"inline-block"});
                    flag=false;
                    return false;
                }
            }else{
                $("#login_userName").next("s").css({"display":"inline-block"});
                flag=false;
                return false;
            }

            if($.trim(password)==""){
                $("#login_Password").next("s").css({"display":"inline-block"});
                flag=false;
                return false;
            }else{
                $("#login_Password").next("s").hide();
            }

            if(flag){
                alert("ajax提交登陆!");

            }

        }
    }
})