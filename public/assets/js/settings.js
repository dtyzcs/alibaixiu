//获取网站设置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(result) {
        //初始化设置
        // 渲染模板
        let html = template('tpl-set', {data: result});
        //渲染页面
        $('#setForm').html(html);
    },
    error: function(err) {
        console.log(err);
        alert('请求失败！');
    }
});

// 图片预览
$('#setForm').on('change', '#file', function() {
    // 用户选择到的文件
	// this.files[0]
	let formData = new FormData();
	formData.append('avatar', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			// 实现头像预览功能
			$('#preview').attr('src', response[0].avatar).show();
			$('#logo').val(response[0].avatar)
		}
	})
});

//保存设置事件
$('#setForm').on('submit', function() {
    //获取表单参数
    let params = {
        title: $('#title').val(),
        comment: $('#comment').prop('checked'),
        review: $('#review').prop('checked'),
        logo: $('#logo').val()
    };
    //先服务器发送保存设置请求
    $.ajax({
        type: 'post',
        url: '/settings',
        data: params,
        success: function(result) {
            location.reload();
        },
        error: function(err) {
            console.log(err);
            alert('设置失败！');
        }
    });
    return false;
})