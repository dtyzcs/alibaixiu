$(function() {
    //获取轮播图列表
    $.ajax({
        type: 'get',
        url: '/slides',
        success: function(result) {
            //渲染模板
            let html = template('tpl-slide', {data: result});
            //渲染页面
            $('#slideBox').html(html);
             //
            let swiper = Swipe(document.querySelector('.swipe'), {
                auto: 3000,
                transitionEnd: function (index) {
                // index++;
        
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
                }
            });
        
            // 上/下一张
            $('.swipe .arrow').on('click', function () {
                let _this = $(this);
        
                if (_this.is('.prev')) {
                swiper.prev();
                } else if (_this.is('.next')) {
                swiper.next();
                }
            })
        }
    });

    // 获取热门推荐内容
    $.ajax({
        type: 'get',
        url: '/posts/recommend',
        success: function(result) {
            // 渲染模板
            let html = template('tpl-hot', {data: result});
            // 渲染页面
            $('#hot').html(html);
        },
        error: err => {
            console.log(err);
            alert('请求失败！');
        }
    })

    // 获取最新发布内容
    $.ajax({
        type: 'get',
        url: '/posts/lasted',
        success: result => {
            // 渲染模板
            let html = template('tpl-new', {data: result});
            // 渲染页面
            $('#articleBox').html(html);
        },
        error: err => {
            console.log(err);
            alert('请求最新发布失败！');
        }
    });

    
});
