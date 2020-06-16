let {category, state, currentPage} = getUrlParams();
//初始化分类和状态为所有分类和所有状态
category = category ? category : 99;
state = state ? state : 99;
currentPage = currentPage ? currentPage : 1;
//初始化状态选择
$('#state').val(state);
//查询文章列表
getPage(currentPage);

// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        let html = template('tpl-category', {
            data: result,
            category: category
        });
        $('#categoryBox').html(html);
    },
    error: function (err) {
        alert('获取分类失败！');
        console.log(err);
    }
});

//筛选提交事件
$('#filterForm').on('submit', function () {
    category = $('#categoryBox').val();
    state = $('#state').val();
    getPage(1);
    return false;
})

// 根据id删除文章
$('#articleBox').on('click', '.delete', function () {
    //获取要删除文章的id
    let id = $(this).attr('data-id');
    // 获取当前页码
    let page = $(this).attr('data-page');
    if (confirm('您确定要删除这篇文章吗？')) {
        $.ajax({
            type: 'delete',
            url: `/posts/${id}`,
            success: function () {
                getPage(page);
                alert('删除成功！');
            },
            error: function (err) {
                alert('删除文章失败！');
                console.log(err);
            }
        })
    }
});

//全选与取消全选
$('#selectAll').on('change', function () {
    let state = $(this).prop('checked');
    let inputs = $('#articleBox input[type=checkbox]');
    inputs.prop('checked', state);
    if (state) {
        //全选按钮为选中状态，显示批量删除按钮
        $('#deleteAll').show();
    } else {
        //全选按钮为选中状态，隐藏批量删除按钮
        $('#deleteAll').hide();
    }
});

// 文章列表复选框改变事件
$('#articleBox').on('change', 'input[type=checkbox]', function () {
    let inputs = $('#articleBox input[type=checkbox]');
    let selectInputs = inputs.filter(':checked');
    if (selectInputs.length > 0) {
        //全选按钮为选中状态，显示批量删除按钮
        $('#deleteAll').show();
    } else {
        //全选按钮为选中状态，隐藏批量删除按钮
        $('#deleteAll').hide();
    }
    if (inputs.length == selectInputs.length) {
        //选中复选框的数量等于所有复选框的数量，全选复选框改为选中状态
        $('#selectAll').prop('checked', true);
    } else {
        //选中复选框的数量等于所有复选框的数量，全选复选框改为选中状态
        $('#selectAll').prop('checked', false);
    }
});

// 修改文章
$('#articleBox').on('click', '.edit', function() {
    let id = $(this).attr('data-id');
    let params = `id=${id}&category=${category}&state=${state}&currentPage=${currentPage}`;
    //跳转到文章修改页面
    location.href = '/admin/post-add.html?' + params;
})

/**
 * 根据页码查询数据
 * page - 要查询数据的页码
 */
function getPage(page) {
    currentPage = page;
    let params = `page=${page}` + (state == 99 ? '' : `&state=${state}`) + (category == 99 ? '' : `&category=${category}`);
    // 查询文章列表
    $.ajax({
        type: 'get',
        url: '/posts',
        data: params,
        success: function (result) {
            // 渲染模板
            let html = template('tpl-article', {
                data: result
            });
            let pageHtml = template('tpl-page', {
                data: result
            });
            // 渲染页面
            $('#articleBox').html(html);
            $('#pageBox').html(pageHtml);
        },
        error: function (err) {
            console.log(err);
            alert('请求失败！');
        }
    });
}