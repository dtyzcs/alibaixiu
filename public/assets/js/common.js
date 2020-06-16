$(function() {
    //退出功能
    $('#logout').on('click', function() {
      let state = confirm('您真的要退出吗？');
      if(state) {
        location.href = 'login.html';
      }
    });

    // 获取登录用户信息
    $.ajax({
      type: 'get',
      url: '/users/' + userId,
      success: result => {
        if(result.avatar) {
          $('.avatar').prop('src', result.avatar);
          $('.name').text(result.nickName);
        }

      },
      error: err => {
        console.log(err);
        alert('获取用户信息失败！');
      }
    });
});
/**
 * 获取url的参数
 * return - 一个保留请求参数的对象
 */
function getUrlParams() {
  let paramsArray = location.search.substr(1).split('&');
  let obj = {};
  paramsArray.forEach(value => {
      let tem = value.split('=');
      obj[tem[0]] = decodeURI(tem[1]);
  })
  return obj;
}