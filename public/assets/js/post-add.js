//获取修改url属性值
let {id, category, state, currentPage} = getUrlParams();
console.log(category);
if(id) {
    //根据id获取文章
    $.ajax({
        type: 'get',
        url: `/posts/${id}`,
        success: function(article) {
            //获取分类列表
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categoryList) {
                    // 渲染模板
                    let html = template('tpl-update', {data: article, categoryList: categoryList});
                    // 渲染页面
                    $('#formBox').html(html);
                },
                error: function(err) {
                    alert('获取分类失败！');
                    console.log(err);
                }
            });
        },
        error: function(err) {
            alert('请求失败！');
            console.log(err);
        }
    });
} else {
    //获取分类列表
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function(result) {
            // 渲染模板
            let html = template('tpl-category', {data: result});
            // 渲染页面
            $('#category').html(html);
        },
        error: function(err) {
            alert('获取分类失败！');
            console.log(err);
        }
    });
}

//封面预览,封面上传
$('#formBox').on('change', '#feature', function() {
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
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});

//文章发布
$('#articleForm').on('submit', function() {
    // 获取参数
    let params = $(this).serialize();
    // 向服务器发送文章发布请求
    $.ajax({
        type: 'post',
        url: '/posts',
        data: params,
        success: function(result) {
            alert('发布成功！');
            location.reload();
        },
        error: function (err) {
            // 发布失败
            alert('发布失败');
            console.log(err);
        }
    });
    return false;
});

// 修改文章
$('#formBox').on('submit', '#updateForm', function() {
    //获取id
    let id = $(this).attr('data-id');
    //获取参数
    let params = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: params,
        success: function(result) {
            let tempParams = `category=${category}&state=${state}&currentPage=${currentPage}`;
            //重定向导文章列表显示页
            location.href = '/admin/posts.html?' + tempParams;
        },
        error: function(err) {
            alert('修改失败！');
            console.log(err);
        }
    });
    return false;
});
