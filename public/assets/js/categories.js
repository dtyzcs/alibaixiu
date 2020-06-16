//添加分类目录
$('#categoryForm').on('submit', function (e) {
    // 获取表单数据
    let params = $(this).serialize();
    // 从服务器获取分类列表
    $.ajax({
        type: 'post',
        url: '/categories',
        data: params,
        success: function (result) {
            location.reload();
        },
        error: function (err) {
            //添加分类失败
            $('#error').show().find('strong').text(JSON.parse(err.responseText).message);
        }
    });
});

//从服务器获取分类目录
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        let html = template('tpl-categoryList', {
            data: result
        });
        $('#categoryListBox').html(html);
    },
    error: function (err) {
        alert('请求失败！');
        console.log(err);
    }
});

//编辑分类
$('#categoryListBox').on('click', '.edit', function () {
    //从服务器根据id获取分类信息
    $.ajax({
        type: 'get',
        url: `/categories/${$(this).attr('data-id')}`,
        success: function (result) {
            //渲染模板
            let html = template('tpl-update', result);
            // 渲染页面
            $('#formBox').html(html);
        }
    });
});

//修改分类事件
$('#formBox').on('submit', '#updateForm', function () {
    //获取id
    let id = $(this).attr('data-id');
    // 获取表单数据
    let params = $(this).serialize();
    // 向服务器发送修改请求
    $.ajax({
        type: 'put',
        url: `/categories/${id}`,
        data: params,
        success: function () {
            location.reload();
        },
        error: function (err) {
            alert('修改失败！');
            console.log(err);
        }
    })
    return false;
});

//删除分类事件
$('#categoryListBox').on('click', '.delete', function () {
    //获取删除分类的id
    let id = $(this).attr('data-id');
    if (confirm('您确定要删除此分类吗？')) {
        // 向服务器发送删除请求
        $.ajax({
            type: 'delete',
            url: `/categories/${id}`,
            success: function () {
                location.reload();
            },
            error: function (err) {
                console.log(err);
                alert('删除失败！');
            }
        });
    }
});

//全选与取消全选
$('#selectAll').on('click', function () {
    let state = $(this).prop('checked');
    $('#categoryListBox input[type = checkbox]').prop('checked', state);
    if (state) {
        //显示全部删除按钮
        $('#deleteAll').show();
    } else {
        //隐藏全部删除按钮
        $('#deleteAll').hide();
    }
});

//分类列表checkbox改变事件
$('#categoryListBox').on('change', 'input[type = checkbox]', function () {
    let inputs = $('#categoryListBox input[type = checkbox]');
    let selectInputs = inputs.filter(':checked');
    if (selectInputs.length > 0) {
        //显示全部删除按钮
        $('#deleteAll').show();
    } else {
        //隐藏全部删除按钮
        $('#deleteAll').hide();
    }
});

// 批量删除分类
$('#deleteAll').on('click', function () {
    let inputs = $('#categoryListBox input[type = checkbox]');
    let selectInputs = inputs.filter(':checked');
    let ids = [];
    //获取要删除分类的id
    selectInputs.each(function (index, domEle) {
        ids.push($(domEle).attr('data-id'));
    });
    //向服务器发送删除请求
    $.ajax({
        type: 'delete',
        url: `/categories/${ids.join('-')}`,
        success: function () {
            location.reload();
        },
        error: function (err) {
            alert('删除失败！');
            console.log(err);
        }
    });
});