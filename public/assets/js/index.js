//获取文章数量与草稿数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(result) {
        $('#postCount').text(result.postCount);
        $('#draftCount').text(result.draftCount);
    },
    error: function(err) {
        console.log(err);
        alert('请求失败！');
    }
})

//获取分类数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(result) {
        $('#categoryCount').text(result.categoryCount);
    },
    error: function(err) {
        console.log(err);
        alert('请求失败');
    }
});

// 获取评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(result) {
        $('#commentCount').text(result.commentCount);
    },
    error: function(err) {
        console.log(err);
        alert('请求失败！');
    }
});