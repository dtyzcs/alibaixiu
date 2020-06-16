$(function () {

    // 获取用户列表
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (result) {
            //渲染用户列表面板
            let html = template('tpl-users', {
                users: result
            });
            // 数据渲染
            $('#userList').html(html);
        },
        error: function (err) {
            console.log(err);
        }
    })

    //添加用户
    $('#userForm').on('submit', function (e) {
        e.preventDefault();
        let formDate = $(this).serialize();
        //向服务器发送添加用户请求
        $.ajax({
            type: 'post',
            url: '/users',
            data: formDate,
            success: function (result) {
                location.reload();
            },
            error: function (err) {
                // 添加用户失败
                $('#error').show().find('strong').text(JSON.parse(err.responseText).message);
            }
        });
    });

    //头像上传
    $('#updateBox ').on('change', '#avatar', function () {
        let formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //不解析请求参数
            processData: false,
            // 不设置请求参数类型
            contentType: false,
            success: function (result) {
                $('#previes').prop('src', result[0].avatar);
                $('input[name=avatar]').val(result[0].avatar);
            },
            error: function (err) {
                alert('文件上传失败');
                console.log(err);
            }
        });
    });

    // 修改用户-点击修改事件
    $('#userList').on('click', '.edit', function () {
        //获取修改用户的id
        let id = $(this).attr('data-id');
        // 根据id查询用户信息
        $.ajax({
            type: 'get',
            url: `/users/${id}`,
            success: function (result) {
                // 渲染修改用户信息模板
                let html = template('tpl-updateUser', result);
                //渲染用户信息修改页面
                $('#updateBox').html(html);
            },
            error: function (err) {
                //修改用户失败
                $('#error').show().find('strong').text(JSON.parse(err.responseText).message);
            }
        })
    });

    //删除用户
    $('#userList').on('click', '.delete', function () {
        let id = $(this).attr('data-id');
        if (confirm('您确定要删除此用户吗？')) {
            //管理员确定删除此用户，发送删除用户请求到服务器
            $.ajax({
                type: 'delete',
                url: `/users/${id}`,
                success: function (result) {
                    location.reload();
                },
                error: function (err) {
                    console.log(err);
                    alert('删除失败！');
                }

            });
        }
    });

    //修改用户提交事件
    $('#updateBox').on('submit', '#updateForm', function (e) {
        e.preventDefault();
        let id = $(this).attr('data-id');
        let formDate = $(this).serialize();
        //发送更新用户信息请求
        $.ajax({
            type: 'put',
            url: `/users/${id}`,
            data: formDate,
            success: function (result) {
                // 修改用户信息成功，重新加载页面
                location.reload();
            },
            error: function (err) {
                alert('修改失败');
                console.log(err);
            }
        });
    });

    //用户列表全选与取消全选
    $('#selectAll').on('change', function () {
        $('#userList input[type = checkbox]').prop('checked', $(this).prop('checked'));
        if ($(this).prop('checked')) {
            // 显示全选按钮
            $('#deleteMany').show();
        } else {
            // 隐藏全选按钮
            $('#deleteMany').hide();
        }
    });

    //用户信息复选框选中与未选中事件
    $('#userList').on('change', 'input[type = checkbox]', function () {
        //若用户信息选中的复选框的数量等于所有复选框的数量则表示已经全部选中，全选复选框改为选中状态
        // 否则说明不是全部选中状态，全选复选框改为未选中状态
        let inputs = $('#userList input[type = checkbox]');
        let selectInputs = inputs.filter(':checked');
        if (inputs.length == selectInputs.length) {
            $('#selectAll').prop('checked', true);
        } else {
            $('#selectAll').prop('checked', false);
        }
        if (selectInputs.length > 0) {
            // 显示全选按钮
            $('#deleteMany').show();
        } else {
            // 隐藏全选按钮
            $('#deleteMany').hide();
        }
    });

    //批量删除操作
    $('#deleteMany').on('click', function () {
        let ids = [];
        let inputs = $('#userList input[type = checkbox]');
        let selectInputs = inputs.filter(':checked');
        //获取所有选中复选框的data-id
        selectInputs.each(function (idex, domEle) {
            ids.push($(domEle).attr('data-id'));
        })
        if (confirm('您确定要删除这几个用户吗？')) {
            //向服务器发送删除多个用户请求
            $.ajax({
                type: 'delete',
                url: `/users/${ids.join('-')}`,
                success: function () {
                    //重新加载页面
                    location.reload();
                },
                error: function (err) {
                    alert('删除失败！');
                    console.log(err);
                }
            });
        }
    });
});