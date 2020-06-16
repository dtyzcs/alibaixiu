//图片预览
$('#slide').on('change', function() {
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
			$('#image').val(response[0].avatar)
		}
	})
});

//添加轮播图片提交事件
$('#slideForm').on('submit', function() {
    // 获取表单参数
    let params = $(this).serialize();
    //发送添加轮播图片请求
    $.ajax({
        type: 'post',
        url: '/slides',
        data: params,
        success: function(result) {
            location.reload();
        },
        error: function(err) {
            console.log(err);
            alert('添加失败！');
        }
    });
    return false;
});

//获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(result) {
        //渲染模板
        let html = template('tpl-slide', {data: result});
        // 渲染页面
        $('#slideBox').html(html);
    },
    error: function(err) {
        console.log(err);
        alert('请求失败！');
    }
})

//根据id删除轮播图
$('#slideBox').on('click', '.delete', function() {
    let id = $(this).attr('data-id');
    //向服务器发送删除轮播图请求
    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function() {
            location.reload();
        },
        error: function(err) {
            console.log(err);
            alert('删除失败！');
        }
    });
});