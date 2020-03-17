import globalEvent from './globalEvent'
import toolUtil from './toolUtil'
import localconfig from './localconfig'
import store from '../store/index.js'

var timeid = 0;
var back = 0;
var socketOpen = false
var interid = 0;
var socketTask;
var socketMsgQueue
var connect = function (token) {
  if(token==null)
    return;
  if (socketTask && socketOpen) {
    console.log("socket没有断开连接，不用重连");
    return;
  }
  socketMsgQueue = [{
    cmd: 'login',
    body: {
      token: token
    }
  }]
  addListener();
  if (socketOpen == false) {
    console.log('WebSocket开始连接！'+localconfig.socketUrl );
    // if(socketTask){
    //   socketTask.close();
    //   socketTask=null;
    // }
	socketTask=null;
    socketTask =
      uni.connectSocket({
        // url: 'ws://192.168.0.202:8001'    //mac电脑
        url: localconfig.socketUrl //本机
      })
  }
}
var sendSocketMessage = function (msg) {
  if (socketOpen) {
    console.log("sendSocketMessage：发送的obj是",msg)
    uni.sendSocketMessage({
      data: JSON.stringify(msg)
    })
  } else {
    socketMsgQueue.push(msg)
  }
}
var addListener = function () {
  uni.onSocketOpen(function (res) {
    clearInterval(timeid);
    timeid=0;
    console.log('WebSocket连接已打开！')
    socketOpen = true
    for (var i = 0; i < socketMsgQueue.length; i++) {
      sendSocketMessage(socketMsgQueue[i])
    }
    socketMsgQueue = [];
    closeInterval();

  })
  // #ifdef MP-WEIXIN
	  uni.onAppShow(function (res) {
		console.log('sokectUtils已切换到前台');
		back = 0;
	  })
	  uni.onAppHide(function (res) {
		console.log('已切换到后台');
		back = 1;
	  })
  
  // #endif
  uni.onSocketClose(function (res) {
    console.log('WebSocket 已关闭！' + back);
    socketOpen = false;
    if (timeid == 0 && back == 0) {
      // clearInterval(timeid);
      // timeid = setInterval(function () {
      //   toolUtil.showToast("请检查网络", 3000);
      // }, 3500)
    }
    if (interid == 0)
      reconnect();
  })

  uni.onSocketError(function (res) {
    socketOpen = false;

    console.log('WebSocket连接打开失败，请检查！')
  })
  uni.onSocketMessage(function (res) {
    console.log('收到服务器内容：' + res.data);
    let cmd = JSON.parse(res.data).cmd;
    globalEvent.fire(cmd, res);
  })

}
var close = function () {
  uni.closeSocket();
}
var reconnect = function () {
  closeInterval();
  interid = setInterval(() => {
    console.log("开始重连");
    if(store.state.serverUserInfo.token)
      connect(store.state.serverUserInfo.token);
  }, 2000);
}
var closeInterval = function () {
  clearInterval(interid);
  interid = 0;
}
var send = function (msg) {
  console.log('发出消息：' + msg)

  uni.sendSocketMessage({
    data: JSON.stringify(msg)
  })
}

exports.connect = connect;
exports.sendSocketMessage= sendSocketMessage;