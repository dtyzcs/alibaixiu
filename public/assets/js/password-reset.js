// 修改密码
$('#updatePassword').on('submit', function(e) {
    e.preventDefault();
    // 获取参数
    let params = $(this).serialize();
    // 发送修改密码请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: params,
        success: function(result) {
            location.href = '/admin/login.html';
        },
        error: function(err) {
            console.log(err);
            alert('修改失败!');
        }
    });
});