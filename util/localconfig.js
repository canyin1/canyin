var httpurl;
var urlQianzhui;
var uploadVedio;
var uploadImg;
var uploadVoice;
var uploadQRCode;
var socketUrl;
var asset;
var urlIndex;

var version = '1.0.0'

function setUrl() {
	let isDevelop = true;
	// #ifdef MP-WEIXIN
	var envVersion = __wxConfig.envVersion;
	isDevelop = (envVersion != 'release');
	// #endif
	//isDevelop=false;

	this.httpurl = 'http://food-edu.net/';

	// this.urlIndex = "https://static.ktx0753.com/wxlogin.php"
	// this.socketUrl = 'wss://group.ktx0753.com:7070'
	// this.httpurl = 'https://group.ktx0753.com/';
	// this.fileUrl = 'https://file.ktx0753.com';
	// this.uploadPath = "https://daoyin-qa-1252569296.cos.ap-guangzhou.myqcloud.com/";
	// this.asset = "https://static.ktx0753.com/asset/"
	// this.share = "https://static.ktx0753.com/"

	// this.uploadImageCDNPath = "https://daoyin-qa-1252569296.image.myqcloud.com/"
	// this.uploadVideoCDNPath = "https://daoyin-qa-1252569296.file.myqcloud.com/"

	// this.uploadImg = "https://file.ktx0753.com/api/resource/upload_img"
	// this.uploadVoice = "https://file.ktx0753.com/api/resource/upload_voice"
	// this.uploadQRCode = "https://file.ktx0753.com/api/resource/gen_wxacode"
}

module.exports = {
	httpurl
}
