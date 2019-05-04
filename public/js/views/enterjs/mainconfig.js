

require.config({  //配置模块加载位置，简单点说就是给模块起一个更短更好记的名字
	paths:{
		jquery:"../../libs/jquery",
		swiper:"../../libs/swiper.min",
        diqu:"../../libs/diqu2",
        commonObj:"../../libs/commonobj"

	}
})
require(['jquery','swiper','commonObj','diqu'],function($,swiper,commonObj,diqu){

    $(function(){
        var topSlider=new Swiper('#topSlider', {
            slidesPerView: 1,
            centeredSlides: true,
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: true
        });
        commonObj.loadCanvas();
        $(window).scroll(commonObj.scrollHandler);
        $("#productul").on("touchmove", commonObj.scrollHandler);
        $(".add").on("click",commonObj.addnums);
        $(".reduce").on("click",commonObj.reducenums);
        $(".addcart").on("click",commonObj.addcatAnimate);
        if($(".cartnums").val()<1){
            $(".cartnums").hide();
        }else{
           $(".cartnums").show();
        }


        $(".delbtn").on("click",function () {
            $(this).parents("li").remove();
            if($(".cartlist").children("li").length<1){
                $(".cartlist").hide();
                $(".onthebottom").hide();
                $(".null_shopping").show();
            }
        });

        $(".clearcart").on("click",function () {
            $(".cartlist").find("li").each(function () {
                $(this).remove();
            });
            $(".cartlist").hide();
            $(".onthebottom").hide();
            $(".null_shopping").show();
        })

        if($("select[name='sheng']").length>0){
            new PCAS("sheng","shi","qu","","","");
        }
        $('input[name=address_option]').change(function () {
            if($(this).val()==0){
                $('#address_form').show();
            }else{
                $('#address_form').hide();

            }
        });
        $(".ifvoicenot").on("click",function(){
            $(this).parent().next().toggle();
        });
        $(".address_item").on("click",function(){
            $(this).children().eq(0).children().eq(0).attr('checked','checked')
            commonObj.set_address();
        });

        $("#addresslist").on("click",".delete",function () {
            $(this).parents("li").remove();
        })
        $("#addresslist").on("click",".edit",commonObj.address_huitian);
        $(".submit_address").on("click",commonObj.addAddresslist);

        $(".order_action_cancel").on("click",function(){
             $(this).parents(".order_form").remove();
             if($(".null_order").length<1 ){
                 $(".null_order").show();
             }
        })

        $("#login_user").on("click",commonObj.loginin);

    })

})