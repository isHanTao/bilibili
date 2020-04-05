import {Toast} from 'vant'

document.addEventListener('plusready', function () {
  var webview = plus.webview.currentWebview();
  let first = null;
  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      let url = window.location.hash;
      if (url === '#/' || url === '#/channel' || url === '#/news' || url === '#/mine') {
        if (!first){
          first = new Date().getTime();
          console.log('再次点击退出应用');
          Toast('再次点击退出应用');
          setTimeout(function () {
            //1s中后清除
            first = null;
          }, 1000);
        }else {
          if (new Date().getTime() - first < 1000) {
            //如果两次按下的时间小于1s，
            console.log('退出');
            webview.close(); //那么就退出app
          }
        }
      } else {
        if (e.canBack) {
          webview.back(-1); //返回上一页
        }
      }
    })
  });
})
