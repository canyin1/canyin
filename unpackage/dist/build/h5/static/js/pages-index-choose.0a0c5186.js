(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-choose"],{"0058":function(t,e,n){"use strict";n.r(e);var i=n("8201"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"0435":function(t,e,n){"use strict";var i=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a481"),n("ac6a");var a=i(n("cebc"));n("c5f6");var o={name:"uniTransition",props:{show:{type:Boolean,default:!1},modeClass:{type:Array,default:function(){return[]}},duration:{type:Number,default:300},styles:{type:Object,default:function(){return{}}}},data:function(){return{isShow:!1,transform:"",ani:{in:"",active:""}}},watch:{show:{handler:function(t){t?this.open():this.close()},immediate:!0}},computed:{stylesObject:function(){var t=(0,a.default)({},this.styles,{"transition-duration":this.duration/1e3+"s"}),e="";for(var n in t){var i=this.toLine(n);e+=i+":"+t[n]+";"}return e}},created:function(){},methods:{change:function(){this.$emit("click",{detail:this.isShow})},open:function(){var t=this;for(var e in clearTimeout(this.timer),this.isShow=!0,this.transform="",this.ani.in="",this.getTranfrom(!1))"opacity"===e?this.ani.in="fade-in":this.transform+="".concat(this.getTranfrom(!1)[e]," ");this.$nextTick(function(){setTimeout(function(){t._animation(!0)},50)})},close:function(t){clearTimeout(this.timer),this._animation(!1)},_animation:function(t){var e=this,n=this.getTranfrom(t);for(var i in this.transform="",n)"opacity"===i?this.ani.in="fade-".concat(t?"out":"in"):this.transform+="".concat(n[i]," ");this.timer=setTimeout(function(){t||(e.isShow=!1),e.$emit("change",{detail:e.isShow})},this.duration)},getTranfrom:function(t){var e={transform:""};return this.modeClass.forEach(function(n){switch(n){case"fade":e.opacity=t?1:0;break;case"slide-top":e.transform+="translateY(".concat(t?"0":"-100%",") ");break;case"slide-right":e.transform+="translateX(".concat(t?"0":"100%",") ");break;case"slide-bottom":e.transform+="translateY(".concat(t?"0":"100%",") ");break;case"slide-left":e.transform+="translateX(".concat(t?"0":"-100%",") ");break;case"zoom-in":e.transform+="scale(".concat(t?1:.8,") ");break;case"zoom-out":e.transform+="scale(".concat(t?1:1.2,") ");break}}),e},_modeClassArr:function(t){var e=this.modeClass;if("string"!==typeof e){var n="";return e.forEach(function(e){n+=e+"-"+t+","}),n.substr(0,n.length-1)}return e+"-"+t},toLine:function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}};e.default=o},1063:function(t,e,n){"use strict";n.r(e);var i=n("6d89"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},1162:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isShow?n("v-uni-view",{ref:"ani",staticClass:"uni-transition",class:[t.ani.in],style:"transform:"+t.transform+";"+t.stylesObject,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"16f2":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".uni-transition[data-v-9cc4aa00]{-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.fade-in[data-v-9cc4aa00]{opacity:0}.fade-active[data-v-9cc4aa00]{opacity:1}.slide-top-in[data-v-9cc4aa00]{\n\t/* transition-property: transform, opacity; */-webkit-transform:translateY(-100%);transform:translateY(-100%)}.slide-top-active[data-v-9cc4aa00]{-webkit-transform:translateY(0);transform:translateY(0)\n\t/* opacity: 1; */}.slide-right-in[data-v-9cc4aa00]{-webkit-transform:translateX(100%);transform:translateX(100%)}.slide-right-active[data-v-9cc4aa00]{-webkit-transform:translateX(0);transform:translateX(0)}.slide-bottom-in[data-v-9cc4aa00]{-webkit-transform:translateY(100%);transform:translateY(100%)}.slide-bottom-active[data-v-9cc4aa00]{-webkit-transform:translateY(0);transform:translateY(0)}.slide-left-in[data-v-9cc4aa00]{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.slide-left-active[data-v-9cc4aa00]{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}.zoom-in-in[data-v-9cc4aa00]{-webkit-transform:scale(.8);transform:scale(.8)}.zoom-out-active[data-v-9cc4aa00]{-webkit-transform:scale(1);transform:scale(1)}.zoom-out-in[data-v-9cc4aa00]{-webkit-transform:scale(1.2);transform:scale(1.2)}",""])},2902:function(t,e,n){var i=n("3af1");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("17a73e03",i,!0,{sourceMap:!1,shadowMode:!1})},"2b9e":function(t,e,n){"use strict";n.r(e);var i=n("39f3"),a=n("0058");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("8e46");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"3dc8759e",null,!1,i["a"],s);e["default"]=r.exports},"39f3":function(t,e,n){"use strict";var i={navbar:n("fdb0").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page"},[n("navbar",{attrs:{title:"000",backcolorType:2,whiteback:2,showKongPanel:!0,downType:!0,dateType:!0},on:{weeks:function(e){arguments[0]=e=t.$handleEvent(e),t.tPickerClick.apply(void 0,arguments)},foods:function(e){arguments[0]=e=t.$handleEvent(e),t.foodTypeClick.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"scroll",style:{height:t.scrollHeight+"px"}},[n("v-uni-scroll-view",{staticClass:"scrollY",style:{height:t.scrollHeight+"px"},attrs:{"scroll-y":"true"}},t._l(t.week,function(e,i){return n("v-uni-view",{key:i,staticClass:"scroll1",class:i==t.indexs1?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.indexClick1(i)}}},[t._v(t._s(e.week))])}),1),n("v-uni-view",{staticClass:"scrollX_view"},[n("v-uni-view",{staticClass:"tab_view"},[n("v-uni-view",{staticClass:"tab",class:{active1:t.typeAll.zongheType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClick("zongheType")}}},[t._v("综合"),t.typeAll.zongheType?n("span",{staticClass:"iconfont icon-jiantou1",class:{"icon-jiantou2":2==t.typeAll.zongheType}}):t._e()]),n("v-uni-view",{staticClass:"tab",class:{active1:t.typeAll.monthType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClick("monthType")}}},[t._v("月售"),t.typeAll.monthType?n("span",{staticClass:"iconfont icon-jiantou1",class:{"icon-jiantou2":2==t.typeAll.monthType}}):t._e()]),n("v-uni-view",{staticClass:"tab",class:{active1:t.typeAll.cashType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClick("cashType")}}},[t._v("价格"),t.typeAll.cashType?n("span",{staticClass:"iconfont icon-jiantou1",class:{"icon-jiantou2":2==t.typeAll.cashType}}):t._e()]),n("v-uni-view",{staticClass:"tab",class:{active1:t.typeAll.levelType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClick("levelType")}}},[t._v("评分"),t.typeAll.levelType?n("span",{staticClass:"iconfont icon-jiantou1",class:{"icon-jiantou2":2==t.typeAll.levelType}}):t._e()]),n("v-uni-view",{staticClass:"tab",class:{active1:t.typeAll.newType},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tabClick("newType")}}},[t._v("新菜"),t.typeAll.newType?n("span",{staticClass:"iconfont icon-jiantou1",class:{"icon-jiantou2":2==t.typeAll.newType}}):t._e()])],1),n("v-uni-scroll-view",{staticClass:"scrollX",style:{height:t.scrollHeight1+"px"},attrs:{"scroll-y":"true"}},t._l(t.foods,function(e,i){return n("v-uni-view",{key:i,staticClass:"scroll2",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.foodClick.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"foods_left"},[n("v-uni-view",{staticClass:"foods_img_view"},[n("v-uni-image",{staticClass:"foods_img",attrs:{src:"/static/微信图片_20200318092008.jpg"}})],1),n("v-uni-view",{staticClass:"foods_name_view"},[n("v-uni-view",{staticClass:"foods_name"},[t._v(t._s(e.name))]),n("v-uni-view",{staticClass:"foods_num"},[t._v("月售10")]),n("v-uni-view",{staticClass:"foods_cash"},[t._v("￥10")])],1)],1),n("v-uni-view",{staticClass:"add_view"},[n("v-uni-view",[e.num>0?n("span",{staticClass:"iconfont icon-jianhao",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.reduceClick(e.id)}}}):t._e(),e.num>0?n("v-uni-text",[t._v(t._s(e.num))]):t._e(),n("span",{staticClass:"iconfont icon-jiahao",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.addClick(e.id)}}})],1)],1)],1)}),1)],1)],1),n("v-uni-view",{staticClass:"bottom_view"},[n("v-uni-view",{staticClass:"money_view",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.shoppingCarClick.apply(void 0,arguments)}}},[n("span",{staticClass:"iconfont icon-gouwuche"}),n("v-uni-view",{staticClass:"money"},[t._v("￥100.00")])],1),n("v-uni-view",{staticClass:"buy_btn"},[t._v("去结算")])],1)],1)},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"3a3b":function(t,e,n){"use strict";n.r(e);var i=n("0435"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"3af1":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t/* 自定义导航 上*/.fontwhite[data-v-29b072af]{color:#fff}.fontblack[data-v-29b072af]{color:#000}.whitebackgroud[data-v-29b072af]{background-color:#fff}.graybackgroud[data-v-29b072af]{background-color:#ffba59}.status_bar[data-v-29b072af]{height:32px;line-height:32px;padding-top:0;padding-bottom:5px;position:fixed;top:0;left:0;z-index:997;\n\t\t/* \t\tbackground-color: #F5F5F5;\n */width:100%;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;text-align:center;font-weight:Medium;font-size:%?36?%}.back1[data-v-29b072af]{width:25px;height:25px}.customtitlediv[data-v-29b072af]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:200px;margin-left:calc(50% - 100px);position:absolute;font-size:18px;text-align:center;font-family:PingFang-SC-Medium}.navback1[data-v-29b072af]{margin-left:%?20?%;font-size:13px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:1;color:#fff}.icon-jiantou1[data-v-29b072af]{font-size:%?28?%;color:#fff;padding-left:%?10?%}.date_view[data-v-29b072af]{font-size:%?25?%;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding-right:%?10?%}\n\t/* 自定义导航 下*/",""])},"40c7":function(t,e,n){"use strict";n.r(e);var i=n("42c6"),a=n("5ffc");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("b090");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"a680ca68",null,!1,i["a"],s);e["default"]=r.exports},"42c6":function(t,e,n){"use strict";var i={"uni-transition":n("83b2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.showPopup?n("v-uni-view",{staticClass:"uni-popup",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[n("uni-transition",{attrs:{"mode-class":["fade"],styles:t.maskClass,duration:t.duration,show:t.showTrans},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onTap.apply(void 0,arguments)}}}),n("uni-transition",{attrs:{"mode-class":t.ani,styles:t.transClass,duration:t.duration,show:t.showTrans},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onTap.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1):t._e()},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},5573:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".active[data-v-3dc8759e]{background:#ffba59!important}.active1[data-v-3dc8759e]{color:#ffba59!important}.scroll[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;border-top:%?10?% solid #f5f5f5}.scrollY[data-v-3dc8759e]{width:23%}.scroll1[data-v-3dc8759e]{height:%?100?%;line-height:%?100?%;text-align:center;background:#f1f1f1;font-size:%?28?%}.scrollX_view[data-v-3dc8759e]{width:77%}.tab_view[data-v-3dc8759e]{width:100%;height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tab[data-v-3dc8759e]{width:20%;line-height:%?80?%;text-align:center;font-size:%?26?%;color:#333}.icon-jiantou1[data-v-3dc8759e]{font-size:%?24?%;color:#ffba59}.icon-jiantou2[data-v-3dc8759e]{display:inline-block;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.scrollX[data-v-3dc8759e]{width:100%;background:#f5f5f5;border-top:%?10?% solid #f5f5f5}.scroll2[data-v-3dc8759e]{width:100%;background-color:#fff;height:%?200?%;border-bottom:%?10?% solid #f5f5f5;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?24?%;box-sizing:border-box}.scroll2[data-v-3dc8759e]:last-of-type{border:none}.bottom_view[data-v-3dc8759e]{background:#f1f1f1;height:%?100?%;width:100%;position:fixed;left:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 %?12?%;box-sizing:border-box;box-shadow:0 %?-10?% %?20?% rgba(0,0,0,.1)}.money_view[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#ffba59}.icon-gouwuche[data-v-3dc8759e]{font-size:%?60?%}.money[data-v-3dc8759e]{font-size:%?32?%;padding-left:%?10?%}.buy_btn[data-v-3dc8759e]{width:%?148?%;height:%?68?%;color:#333;font-size:%?26?%;line-height:%?68?%;background:#ffba59;border-radius:%?44?%;text-align:center}\n/* 食品 */.foods_left[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%;color:#333}.foods_img_view[data-v-3dc8759e]{font-size:0}.foods_img[data-v-3dc8759e]{width:%?160?%;height:%?160?%;border-radius:%?10?%}.foods_name_view[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?160?%;box-sizing:border-box;padding:%?10?% 0;padding-left:%?20?%}.add_view[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;height:%?160?%;color:#ffba59;display:flex;font-size:%?28?%}.add_view uni-view[data-v-3dc8759e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.add_view uni-text[data-v-3dc8759e]{color:#333;line-height:1;padding:0 %?14?%}.icon-jianhao[data-v-3dc8759e]{color:#999}",""])},"5ffc":function(t,e,n){"use strict";n.r(e);var i=n("a968"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"6d89":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("28a5"),n("c5f6");var i={data:function(){return{showBack:!0,pddTitleHeight:32,pddTitleTop:25,kongHeight:68,foodType:["早餐","午餐","晚餐","夜宵"],food:"早餐",range:[],ranges:"1",date:"请选择日期",index:1}},props:{title:{type:String,default:""},whiteback:{type:Number,default:0},downType:{type:[Boolean,String],default:!1},dateType:{type:[Boolean,String],default:!1},backcolorType:{type:Number,default:0},bgcw:{type:[Boolean,String],default:!1},showKongPanel:{type:[Boolean,String],default:!1}},name:"navbar",created:function(t){var e=getCurrentPages(),n=e.length>1;this.showBack=!!n,this.pddTitleTop=this.$store.state.pddTitleTop,this.pddTitleHeight=this.$store.state.pddTitleHeight,this.kongHeight=this.$store.state.kongHeight},methods:{cancelClick:function(t){console.log(555,t)},pickerClick:function(t){console.log(t);var e="日一二三四五六".split("");this.weeks=e[new Date(t.detail.value).getDay()],console.log(this.weeks),this.date=t.detail.value+" 周"+this.weeks,this.$emit("weeks",this.date)},chooseClick:function(){if(0==this.downType)return!1;var t=this;uni.showActionSheet({itemList:this.foodType,success:function(e){t.food=t.foodType[e.tapIndex],t.$emit("foods",t.food)}})},refreshPddTitleTop:function(){this.pddTitleTop=this.$store.state.pddTitleTop,this.pddTitleHeight=this.$store.state.pddTitleHeight,this.kongHeight=this.$store.state.kongHeight},navBack:function(t){var e=getCurrentPages();e[0];e.length>1?uni.navigateBack():uni.switchTab({url:"/pages/tabbar/index"})}}};e.default=i},8201:function(t,e,n){"use strict";var i=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("28a5");var a=i(n("fdb0")),o=i(n("40c7")),s={components:{navbar:a.default,popup:o.default},onReady:function(){var t=this,e=uni.createSelectorQuery().in(this);e.select(".scroll").boundingClientRect(function(e){console.log("1111",e),uni.getSystemInfo({success:function(n){console.log(n),t.scrollHeight=n.windowHeight-e.top-55,t.scrollHeight1=n.windowHeight-e.top-100}})}).exec()},data:function(){return{week:[{week:"周日",date:"8"},{week:"周一",date:"9"},{week:"周二",date:"10"},{week:"周三",date:"11"},{week:"周四",date:"12"},{week:"周五",date:"13"},{week:"周六",date:"14"}],startDate:"",endDate:"",scrollHeight:0,scrollHeight1:0,indexs1:"",indexs2:"",date:"请选择日期",typeAll:{zongheType:0,levelType:0,newType:0,monthType:0,cashType:0},foods:[{name:"炒粉",id:1,num:0},{name:"炒粉",id:2,num:0},{name:"炒粉",id:3,num:0},{name:"炒粉",id:4,num:0},{name:"炒粉",id:5,num:0}]}},methods:{reduceClick:function(t){for(var e=0;e<this.foods.length;e++)this.foods[e].id==t&&this.foods[e].num--},addClick:function(t){for(var e=0;e<this.foods.length;e++)this.foods[e].id==t&&this.foods[e].num++},shoppingCarClick:function(){uni.navigateTo({url:"shoppingCart"})},foodTypeClick:function(t){this.foods=t},tPickerClick:function(t){this.date=t.split(" ")[0]},indexClick:function(t){this.indexs=t},indexClick1:function(t){this.indexs1=t},foodClick:function(){uni.navigateTo({url:"foodDetail"})},tabClick:function(t){0!=this.typeAll[t]?1==this.typeAll[t]?this.typeAll[t]=2:this.typeAll[t]=1:(this.typeAll={zongheType:0,levelType:0,newType:0,monthType:0,cashType:0},this.typeAll[t]=1),console.log(this.typeAll)}}};e.default=s},"83b2":function(t,e,n){"use strict";n.r(e);var i=n("1162"),a=n("3a3b");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("f754");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"9cc4aa00",null,!1,i["a"],s);e["default"]=r.exports},"87cc":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticStyle:{"z-index":"997"}},[n("v-uni-view",{staticClass:"status_bar",class:{alpabackgroud:0==t.backcolorType,whitebackgroud:1==t.backcolorType,graybackgroud:2==t.backcolorType},style:{"padding-top":t.pddTitleTop+"px",height:t.pddTitleHeight+"px"}},[n("v-uni-view",{staticClass:"customtitlediv",class:{fontwhite:2==t.whiteback,fontblack:2!=t.whiteback},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseClick.apply(void 0,arguments)}}},[t._v(t._s("000"==t.title?t.food:t.title)),t.downType?n("span",{staticClass:"iconfont icon-jiantou1"}):t._e()]),t.showBack?n("v-uni-view",{staticClass:"navback1",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navBack.apply(void 0,arguments)}}},[1==t.whiteback?n("v-uni-image",{staticClass:"back1",attrs:{src:"/static/back.png",mode:"aspectFit"}}):n("v-uni-image",{staticClass:"back1",attrs:{src:"/static/back1.png",mode:"aspectFit"}})],1):t._e(),t.dateType?n("v-uni-view",{staticClass:"date_view"},[n("v-uni-picker",{attrs:{mode:"date"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.pickerClick.apply(void 0,arguments)},cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.cancelClick.apply(void 0,arguments)}}},[n("v-uni-view",[t._v(t._s(t.date))])],1),n("span",{staticClass:"iconfont icon-jiantou1"})],1):t._e()],1),t.showKongPanel?n("v-uni-view",{staticClass:"KongPanel",style:{height:t.kongHeight+"px"}}):t._e()],1)},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"8e46":function(t,e,n){"use strict";var i=n("db4f"),a=n.n(i);a.a},"943f":function(t,e,n){var i=n("a9cf");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("69779b86",i,!0,{sourceMap:!1,shadowMode:!1})},a25e:function(t,e,n){"use strict";var i=n("2902"),a=n.n(i);a.a},a968:function(t,e,n){"use strict";var i=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("83b2")),o={name:"UniPopup",components:{uniTransition:a.default},props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0}}},watch:{type:{handler:function(t){switch(this.type){case"top":this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0};break;case"bottom":this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0};break;case"center":this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"};break}},immediate:!0}},created:function(){this.animation?this.duration=300:this.duration=0},methods:{clear:function(t){t.stopPropagation()},open:function(){var t=this;this.showPopup=!0,this.$nextTick(function(){clearTimeout(t.timer),t.timer=setTimeout(function(){t.showTrans=!0},50)}),this.$emit("change",{show:!0})},close:function(t){var e=this;this.showTrans=!1,this.$nextTick(function(){clearTimeout(e.timer),e.timer=setTimeout(function(){e.$emit("change",{show:!1}),e.showPopup=!1},300)})},onTap:function(){this.maskClick&&this.close()}}};e.default=o},a9cf:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".uni-popup[data-v-a680ca68]{position:fixed;\n\t\ttop:var(--window-top);\n\t\t\n\t\tbottom:0;left:0;right:0;\n\t\tz-index:99\n\t\t}.uni-popup__mask[data-v-a680ca68]{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);opacity:0}.mask-ani[data-v-a680ca68]{-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-mask[data-v-a680ca68]{opacity:1}.uni-bottom-mask[data-v-a680ca68]{opacity:1}.uni-center-mask[data-v-a680ca68]{opacity:1}.uni-popup__wrapper[data-v-a680ca68]{\n\t\tdisplay:block;\n\t\tposition:absolute}.top[data-v-a680ca68]{top:0;left:0;right:0;-webkit-transform:translateY(-500px);transform:translateY(-500px)}.bottom[data-v-a680ca68]{bottom:0;left:0;right:0;-webkit-transform:translateY(500px);transform:translateY(500px)}.center[data-v-a680ca68]{\n\t\tdisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\n\t\tbottom:0;left:0;right:0;top:0;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-a680ca68]{\n\t\tdisplay:block;\n\t\tposition:relative}.content-ani[data-v-a680ca68]{\n\t\t/* transition: transform 0.3s;\n */-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transition-duration:.2s;transition-duration:.2s}.uni-top-content[data-v-a680ca68]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-bottom-content[data-v-a680ca68]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-center-content[data-v-a680ca68]{-webkit-transform:scale(1);transform:scale(1);opacity:1}",""])},b090:function(t,e,n){"use strict";var i=n("943f"),a=n.n(i);a.a},cbb5:function(t,e,n){var i=n("16f2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("37fb037f",i,!0,{sourceMap:!1,shadowMode:!1})},db4f:function(t,e,n){var i=n("5573");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4c96bc78",i,!0,{sourceMap:!1,shadowMode:!1})},f754:function(t,e,n){"use strict";var i=n("cbb5"),a=n.n(i);a.a},fdb0:function(t,e,n){"use strict";n.r(e);var i=n("87cc"),a=n("1063");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("a25e");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"29b072af",null,!1,i["a"],s);e["default"]=r.exports}}]);