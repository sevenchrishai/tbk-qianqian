(function(e){function t(t){for(var r,a,s=t[0],l=t[1],c=t[2],p=0,f=[];p<s.length;p++)a=s[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/tbk-qianqian/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("div",{staticClass:"pid"},[e._v(" PID: "),n("el-input",{attrs:{type:"text",placeholder:"填写自己的pid"},model:{value:e.pid,callback:function(t){e.pid=t},expression:"pid"}}),n("span",[e._v("*示例:mm_123_123_123")]),n("a",{attrs:{href:"https://oauth.taobao.com/authorize?response_type=token&client_id=23196777&state=1212&view=web",target:"_blank"}},[e._v("点击获取授权session")]),n("span",[e._v("*一般有效期为30天")]),n("br"),e._v(" SESSION: "),n("el-input",{attrs:{type:"text",placeholder:"填写账户授权后得到的session"},model:{value:e.sessionKey,callback:function(t){e.sessionKey=t},expression:"sessionKey"}}),n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.save}},[e._v("保存")]),n("span",[e._v("*保存至浏览器缓存，方便下次访问")])],1),n("el-form",{staticClass:"formD"},[n("el-form-item",{attrs:{label:"别人的淘口令："}},[n("el-input",{attrs:{type:"textarea",rows:4,placeholder:"填写别人的淘口令",id:"otherTkl"},model:{value:e.otherTkl,callback:function(t){e.otherTkl=t},expression:"otherTkl"}}),n("el-button",{staticClass:"copy",attrs:{type:"info",plain:"","data-clipboard-target":"#otherTkl",icon:"el-icon-document-copy",title:"复制",alt:"复制",circle:""},on:{click:function(t){return e.copyTxt()}}})],1),n("el-form-item",{attrs:{label:"商品推广文案"}},[n("el-input",{attrs:{type:"textarea",rows:4,placeholder:"填写自己的商品推广文案，会根据上述文案自动剔除淘口令",id:"selfText"},model:{value:e.selfText,callback:function(t){e.selfText=t},expression:"selfText"}})],1),n("el-form-item",{attrs:{label:"自己的淘口令："}},[n("el-input",{attrs:{type:"textarea",rows:4,id:"selfTkl",placeholder:"自己的淘口令"},model:{value:e.selfTkl,callback:function(t){e.selfTkl=t},expression:"selfTkl"}}),n("el-button",{staticClass:"copy",attrs:{type:"info",plain:"","data-clipboard-target":"#selfTkl",icon:"el-icon-document-copy",title:"复制",alt:"复制",circle:""},on:{click:function(t){return e.copyTxt()}}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.onConvertSc}},[e._v("解析别人的淘口令")]),n("el-button",{attrs:{type:"danger",plain:""},on:{click:e.onCreateSc}},[e._v("生成自己的淘口令")])],1)],1)],1)},s=[],l=(n("4d63"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("498a"),n("0d03"),n("d3b7"),n("96cf"),n("89ba")),c=n("2427"),u=n.n(c),p={testUrl:"/",tpwdCreate:"/tpwdCreate",tpwdConvertSc:"/tpwdConvertSc"},f=p,d="http://gateway.kouss.com/tbpub",m=d,h=u.a.create({baseURL:m,timeout:3e4});h.interceptors.request.use((function(e){return e.headers={requestTime:(new Date).getTime(),"Content-Type":"application/json; charset=utf-8"},e}),(function(e){return Promise.reject(e)})),h.interceptors.response.use((function(e){return e["Content-Type"]="application/json;charset=UTF-8",e}),(function(e){return Promise.reject(e)}));var v=function(e,t){var n=new Error(t.message);return n.code=e,n},b=function(e){var t=e.status,n=e.data;if(200===t)return n;throw v(t)},g=function(){return{getTpwdConvertSc:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=b,e.next=3,h.post(f.tpwdConvertSc,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),getTpwdCreate:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=b,e.next=3,h.post(f.tpwdCreate,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}},y={name:"HelloWorld",data:function(){return{pid:"",sessionKey:"",pidObj:{site_id:"",adzone_id:""},otherTkl:"",selfTkl:"",selfText:"",result:null,timeout:null}},created:function(){this.ifPidExist()},watch:{otherTkl:function(e,t){var n=this;clearTimeout(this.timeout),this.timeout=setTimeout((function(){n.changeSelfText(e)}),300)}},methods:{onConvertSc:function(){console.log("解析&转链淘口令!");var e=this,t=e.storage.get("qianqian_tkl_pid_json");if(t&&""!=e.sessionKey.trim()&&""!=e.otherTkl.trim()){var n={};n.password_content=e.otherTkl,n.adzone_id=t.adzone_id,n.site_id=t.site_id,n.session=e.sessionKey,g().getTpwdConvertSc(n).then((function(t){e.result=t.data,e.$message({message:"获取转链成功",type:"success",center:!0})}))}else e.$message.error("有参数为空")},onCreateSc:function(){console.log("生成淘口令!");var e=this,t=e.storage.get("qianqian_tkl_pid_json");if(e.result&&""!=e.selfText.trim()){var n={};n.text=e.selfText,n.url=e.result.click_url,n.user_id=t.user_id,g().getTpwdCreate(n).then((function(t){e.selfTkl=e.selfText+t.data.model,e.$message({message:"生成淘口令成功",type:"success",center:!0})}))}},copyTxt:function(){new this.clipboard(".copy")},save:function(){var e=this;if(""!=e.pid.trim()&&""!=e.sessionKey.trim()){var t=e.pid.split("_");console.log(t);var n=t.length;n>2&&(e.pidObj.site_id=t[n-2],e.pidObj.adzone_id=t[n-1],e.pidObj.user_id=t[n-3],e.storage.set("qianqian_tkl_pid",e.pid),e.storage.set("qianqian_tkl_session",e.sessionKey),e.storage.set("qianqian_tkl_pid_json",e.pidObj))}},ifPidExist:function(){var e=this.storage.get("qianqian_tkl_pid"),t=this.storage.get("qianqian_tkl_session");e&&t&&(this.pid=e,this.sessionKey=t)},changeSelfText:function(e){var t="[^一-龥]\\w{11}[^一-龥]";this.selfText=e.replace(new RegExp(t),"")}}},_=y,k=(n("700e"),n("2877")),T=Object(k["a"])(_,a,s,!1,null,"0cf09456",null),w=T.exports,x={name:"app",components:{HelloWorld:w}},j=x,S=(n("034f"),Object(k["a"])(j,o,i,!1,null,null,null)),O=S.exports,C=n("5c96"),q=n.n(C);n("c69f");r["default"].use(q.a);var P=n("7cbd"),K=n.n(P),E={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))},remove:function(){localStorage.removeItem(key)}},R=E;r["default"].config.productionTip=!1,r["default"].prototype.clipboard=K.a,r["default"].prototype.storage=R,new r["default"]({render:function(e){return e(O)}}).$mount("#app")},"700e":function(e,t,n){"use strict";var r=n("f459"),o=n.n(r);o.a},"85ec":function(e,t,n){},c69f:function(e,t,n){},f459:function(e,t,n){}});
//# sourceMappingURL=app.81f0c0f0.js.map