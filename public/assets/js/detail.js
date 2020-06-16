// 获取热门推荐内容
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (result) {
        // 渲染模板
        let html = template('tpl-hot', {
            data: result
        });
        // 渲染页面
        $('#hot').html(html);
    },
    error: err => {
        console.log(err);
        alert('请求失败！');
    }
})

// 根据文章id获取文章内容
let {
    id
} = getUrlParams();
if (id) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: result => {
            // 渲染模板
            let html = template('tpl-content', {
                data: result
            });
            // 渲染页面
            $('#articleBox').html(html);
        },
        error: err => {
            console.log(err);
            alert('查询文章失败');
            location.href = '/index.html';
        }
    });
} else {
    location.href = '/index.html';
}

// 获取网站配置
let setting = null;
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (result) {
        setting = result;
        //若网站未开启评论功能则隐藏评论模块
        if (setting.comment) {
            let html = template('tpl-comment');
            $('#commentBox').html(html);
        }
    },
    error: function (err) {
        console.log(err);
        alert('获取网站配置失败！');
    }
});

// 提交评论
$('#commentBox').on('submit', 'form', function (e) {
    //获取用户评论信息
    let content = $(this).find('textarea').val().trim();
    if (content && content.length > 0) {
        //向服务器发送添加评论内容
        $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                content: content,
                post: id,
                state: setting.review == true ? 0 : 1
            },
            success: () => {
                alert('评价成功！');
                location.reload();
            },
            error: err => {
                let message = JSON.parse(err.responseText).message;
                alert(`评论失败，${message}!`);
                if(message == '请登录') {
                    location.href = '/admin/login.html';
                }    
            }
        });
    } else {
        alert('评论失败，评论内容不能为空！');
    }
    return false;
});