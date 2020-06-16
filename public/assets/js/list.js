// 获取url请求参数
let {id, key} = getUrlParams();

// 判断id是否存在，若存在则显示分类内容
if (id) {
    //根据分类id查询分类数据
    $.ajax({
        type: 'get',
        url: '/posts/category/' + id,
        success: result => {
            // 渲染模板
            let html = template('tpl-article', {title: result[0].category.title, data: result});
            // 渲染页面
            $('#articleBox').html(html);
        },
        error: err => {
            console.log(err);
            alert('请求失败！');
        }
    });
}

//判断key是否存在，若存在则是展示搜索内容
if (key) {
    //从服务器获取搜索内容
    $.ajax({
        type: 'get',
        url: '/posts/search/' + key,
        success: function(result) {
            //渲染模板
            let html = template('tpl-article', {data: result, title: '搜索内容'});
            // 渲染页面
            $('#articleBox').html(html);
        },
        error: function(err) {
            console.log(err);
            alert('请求失败！');
        }
    });
}



