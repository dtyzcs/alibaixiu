//获取评论列表
let currentPage = 1;
getPage(currentPage);

//批准与驳回
$('#commentBox').on('click', '.choice', function() {
    //获取修改评论id
    let id = $(this).attr('data-id');
    // 获取修改评论的状态
    let state = $(this).attr('data-state');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function() {
            getPage(currentPage);
        },
        error: function(err) {
            console.log(err);
            alert('修改失败！');
        }
    })
});

//删除评论
$('#commentBox').on('click', '.delete', function() {
    //获取删除评论的id
    let id = $(this).attr('data-id');
    if(confirm('您确定要删除此评论吗？')) {
        //发送删除评论请求
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                getPage(currentPage);
            },
            error: function(err) {
                console.log(err);
                alert('删除失败！');
            }
        });
    }
});

/**
 * 根据页码查询数据
 * page - 要查询数据的页码
 */
function getPage(page) {
    currentPage = page;
    // 查询文章列表
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (result) {
            // 渲染模板
            let html = template('tpl-comment', {
                data: result
            });
            let pageHtml = template('tpl-page', {
                data: result
            });
            // 渲染页面
            $('#commentBox').html(html);
            $('#pageBox').html(pageHtml);
        },
        error: function (err) {
            console.log(err);
            alert('请求失败！');
        }
    });
}