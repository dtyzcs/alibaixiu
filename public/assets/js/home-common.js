//获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        //渲染模板
        let html = template('tpl-Category', {data: result});
        //渲染页面
        $('.categoryBOx').html(html);
    },
    error: function(err) {
        console.log(err),
        alert('请求失败！');
    }
});

// 文章搜索
$('.search form').on('submit', function() {
    //获取搜索关键字
    let key = $(this).find('.keys').val().trim();
    if(key && key.length > 0) {
        // 跳转到文章列表页面
        location.href = '/list.html?key=' + key;
    }
    return false;
});

//文章点赞
$('#articleBox').on('click', '.like', function() {
    // 获取要点赞文章的id
    let id = $(this).attr('data-id');
    //发送点赞请求
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: result => {
            $(this).find('span').html(`赞(${result.meta.likes})`)
        },
        error: function(err) {
            console.log(err);
            alert('点赞失败！');
        }
    })
});

 // 获取随机推荐内容
 $.ajax({
    type: 'get',
    url: '/posts/random',
    success: result => {
        // 渲染模板
        let html = template('tpl-random', {data: result});
        // 渲染页面
        $('#random').html(html);
    },
    error: err => {
        console.log(err);
        alert('请求随机推荐内容失败！');
    }
})

// 获取最新评论内容
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: result => {
        // 渲染模板
        let html = template('tpl-newComments', {data: result});
        // 渲染页面
        $('#newComments').html(html);
    },
    error: err => {
        console.log(err);
        alert('请求最新评论失败');
    }
});


/**
 * 获取url的参数
 * return - 一个保留请求参数的对象
 */
function getUrlParams() {
    let paramsArray = location.search.substr(1).split('&');
    let obj = {};
    paramsArray.forEach(value => {
        let tem = value.split('=');
        obj[tem[0]] = decodeURI(tem[1]);
    })
    return obj;
  }
