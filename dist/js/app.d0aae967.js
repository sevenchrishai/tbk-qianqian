(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-db3e5572":"2bcfe56f"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(e);var l=new Error;o=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var p=l;o.push([1,"chunk-vendors"]),n()})({0:function(e,t){},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},1:function(e,t,n){e.exports=n("56d7")},2:function(e,t){},"2ecb":function(e,t,n){},3:function(e,t){},"4b30":function(e,t,n){"use strict";var r=n("2ecb"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("div",{staticClass:"pid"},[n("strong",[e._v("PID:")]),n("el-input",{attrs:{type:"text",placeholder:"填写自己的pid"},model:{value:e.pid,callback:function(t){e.pid=t},expression:"pid"}}),n("span",[e._v("*示例:mm_123_123_123")]),n("a",{attrs:{href:"https://oauth.taobao.com/authorize?response_type=token&client_id=23196777&state=1212&view=web",target:"_blank"}},[e._v("点击获取授权session")]),n("span",[e._v("*一般有效期为30天")]),n("br"),n("strong",[e._v("SESSION:")]),n("el-input",{attrs:{type:"text",placeholder:"填写账户授权后得到的session"},model:{value:e.sessionKey,callback:function(t){e.sessionKey=t},expression:"sessionKey"}}),n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.save}},[e._v("保存")]),n("span",[e._v("*保存至浏览器缓存，方便下次访问")])],1),n("el-form",{staticClass:"formD"},[n("el-form-item",{attrs:{label:"别人的淘口令："}},[n("el-input",{attrs:{type:"textarea",rows:4,placeholder:"填写别人的淘口令",id:"otherTkl"},model:{value:e.otherTkl,callback:function(t){e.otherTkl=t},expression:"otherTkl"}}),n("el-button",{staticClass:"clear",attrs:{type:"info",plain:"",icon:"el-icon-delete",title:"清除",alt:"清除",circle:""},on:{click:e.clearTxt}})],1),n("el-form-item",{attrs:{label:"生成的自己的淘口令："}},[n("el-input",{attrs:{type:"textarea",rows:4,id:"selfTkl",placeholder:"生成的自己的淘口令之后，自动替换链接和淘口令"},model:{value:e.selfTkl,callback:function(t){e.selfTkl=t},expression:"selfTkl"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return t.preventDefault(),e.onConvertSc(t)}}},[e._v("一键生成淘口令")]),n("el-button",{staticClass:"copy",attrs:{type:"warning","data-clipboard-action":"copy","data-clipboard-target":"#selfTkl"},on:{click:e.copyTxt}},[e._v("一键复制淘口令")])],1),n("el-form-item",[n("div",{staticClass:"upAndExport"},[n("a",{staticClass:"templateDownload",attrs:{target:"_blank",href:"/static/template.xlsx",download:"template.xlsx"}},[e._v("模板下载")]),n("div",{staticClass:"upload"},[n("el-upload",{staticClass:"upload-demo",attrs:{action:"","on-change":e.handleChange,"show-file-list":!0,"on-remove":e.handleRemove,"file-list":e.fileListUpload,limit:e.limitUpload,accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel","befor-upload":e.handleBeforeUpload,"auto-upload":!1}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("批量上传")]),n("span",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("注：只能上传Excel文件")])],1)],1),n("div",{staticClass:"export"},[n("el-button",{staticClass:"muchSc",attrs:{type:"primary"},on:{click:e.onMuchSc}},[e._v("批量生成淘口令")]),n("el-button",{staticClass:"exportEX",attrs:{type:"primary",loading:e.downloadLoading,icon:"el-icon-document"},nativeOn:{click:function(t){return e.exportEX(t)}}},[e._v("导出Excel")])],1)]),n("div",{staticClass:"table"},[n("el-table",{attrs:{data:e.tableData2,"default-sort":{prop:"tb_otherTkl",order:"descending"},stripe:""}},[n("el-table-column",{attrs:{prop:"tb_selfTkl",label:"生成的自己的淘口令"}}),n("el-table-column",{attrs:{prop:"tb_otherTkl",label:"别人的淘口令"}})],1)],1)])],1)],1)},s=[],c=(n("99af"),n("caad"),n("baa5"),n("d81d"),n("ace4"),n("b0c0"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("498a"),n("5cc6"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a9"),n("72f7"),n("284c")),l=(n("96cf"),n("89ba")),u=(n("0d03"),n("bc3a")),p=n.n(u),d={testUrl:"/",tpwdCreate:"/tpwdCreate",tpwdConvertSc:"/tpwdConvertSc",spreadGet:"/spreadGet",privilegeGet:"/privilegeGet"},f=d,m="/api",h=m,b=n("5c96"),g=n.n(b),v=0,_=null,y=function(){_||0!==v||(_=b["Loading"].service({target:"el-form",text:"拼命加载中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})),v++},w=function(){v<=0||(v--,_&&0===v&&(_.close(),_=null))},x=p.a.create({baseURL:h,timeout:3e4});x.interceptors.request.use((function(e){return e.headers={requestTime:(new Date).getTime(),"Content-Type":"application/json; charset=utf-8"},y(),e}),(function(e){return Promise.reject(e)})),x.interceptors.response.use((function(e){return e["Content-Type"]="application/json;charset=UTF-8",setTimeout((function(){w()}),1500),e}),(function(e){return setTimeout((function(){w()}),1500),Promise.reject(e)}));var k=function(e,t){var n=new Error(t.message);return n.code=e,n},T=function(e){var t=e.status,n=e.data;if(200===t)return n;throw k(t)},C=function(){return{getTpwdConvertSc:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=T,e.next=3,x.post(f.tpwdConvertSc,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),getTpwdCreate:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=T,e.next=3,x.post(f.tpwdCreate,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),getSpreadGet:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=T,e.next=3,x.post(f.spreadGet,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),getPrivilegeGet:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=T,e.next=3,x.post(f.privilegeGet,t);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}},j={name:"HelloWorld",data:function(){return{pid:"",sessionKey:"",otherTkl:"",selfTkl:"",shortUrl:"",downloadLoading:!1,timer:null,fileListUpload:[],limitUpload:1e3,tableData2:[],fileTemp:null,reqFlag:!0,reqCount:0,copyBtn:null}},created:function(){this.ifPidExist()},mounted:function(){this.copyBtn=new this.clipboard(".copy")},computed:{pidObj:{get:function(){var e=this;if(""!==e.pid.trim()){var t=e.pid.split("_"),n=t.length;if(n>2)return{site_id:t[n-2],adzone_id:t[n-1],user_id:t[n-3]}}return null},set:function(){}}},methods:{onConvertSc:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("解析&转链淘口令!"),t=this,!(t.pidObj&&t.sessionKey.trim()&&t.otherTkl.trim())){e.next=29;break}return n={},n.password_content=t.otherTkl,n.adzone_id=t.pidObj.adzone_id,n.site_id=t.pidObj.site_id,n.session=t.sessionKey,e.prev=8,e.next=11,t.reqGetTpwdConvertSc(n);case 11:return r=e.sent,e.next=14,t.reqGetPrivilegeGet(r);case 14:return a=e.sent,e.next=17,t.reqGetSpreadGet(a);case 17:return o=e.sent,e.next=20,t.reqGetTpwdCreate(o);case 20:i=e.sent,t.selfTkl=t.changeSelfText(t.otherTkl,i.url,i.tkl),e.next=27;break;case 24:e.prev=24,e.t0=e["catch"](8),console.log(e.t0);case 27:e.next=30;break;case 29:t.$message.error("有参数为空");case 30:case"end":return e.stop()}}),e,this,[[8,24]])})));function t(){return e.apply(this,arguments)}return t}(),onBatchConvertSc:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,o,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("批量解析&转链淘口令!"),n=this,!(n.pidObj&&n.sessionKey&&t)){e.next=29;break}return r={},r.password_content=t,r.adzone_id=n.pidObj.adzone_id,r.site_id=n.pidObj.site_id,r.session=n.sessionKey,e.prev=8,e.next=11,n.reqGetTpwdConvertSc(r);case 11:return a=e.sent,e.next=14,n.reqGetPrivilegeGet(a);case 14:return o=e.sent,e.next=17,n.reqGetSpreadGet(o);case 17:return i=e.sent,e.next=20,n.reqGetTpwdCreate(i);case 20:return s=e.sent,e.abrupt("return",n.changeSelfText(t,s.url,s.tkl));case 24:e.prev=24,e.t0=e["catch"](8),console.log(e.t0);case 27:e.next=30;break;case 29:n.$message.error("有参数为空");case 30:case"end":return e.stop()}}),e,this,[[8,24]])})));function t(t){return e.apply(this,arguments)}return t}(),reqGetTpwdConvertSc:function(e){var t=this;return new Promise((function(n,r){C().getTpwdConvertSc(e).then((function(r){r.code?t.$message.error(r.sub_msg):n(Object.assign({},e,{item_id:r.data.num_iid}))})).catch((function(e){console.log(e)}))}))},reqGetPrivilegeGet:function(e){var t=this;return new Promise((function(n,r){C().getPrivilegeGet(e).then((function(e){if(e.code)t.$message.error(e.sub_msg);else{var r={url:e.result.data.coupon_click_url};n({requests:[r]})}})).catch((function(e){console.log(e)}))}))},reqGetSpreadGet:function(e){var t=this;return new Promise((function(n,r){clearTimeout(t.timer),t.timer=setTimeout((function(){C().getSpreadGet(e).then((function(e){e.code?t.$message.error(e.sub_msg):"OK"!==e.results.tbk_spread[0].err_msg?t.$message.error(e.results.tbk_spread[0].err_msg):(t.shortUrl=e.results.tbk_spread[0].content,t.otherTkl.trim()?n({text:t.otherTkl,url:t.shortUrl,user_id:t.pidObj.user_id}):t.$message.error("文案为空"))})).catch((function(e){console.log(e)}))}),1e3)}))},reqGetTpwdCreate:function(e){var t=this;return new Promise((function(n,r){clearTimeout(t.timer),t.timer=setTimeout((function(){C().getTpwdCreate(e).then((function(e){e.code?t.$message.error(e.sub_msg):(n({url:t.shortUrl,tkl:e.data.model}),t.$message({message:"生成淘口令成功",type:"success",center:!0}))})).catch((function(e){console.log(e)}))}),1e3)}))},clearTxt:function(){this.otherTkl=""},copyTxt:function(){var e=this,t=e.copyBtn;t.on("success",(function(){e.$message({message:"复制成功！",type:"success"}),e.copyBtn.destroy(),e.copyBtn=new e.clipboard(".copy")})),t.on("error",(function(){e.$message.error("复制失败，请手动复制"),e.copyBtn.destroy(),e.copyBtn=new e.clipboard(".copy")}))},save:function(){var e=this;if(""!==e.pid.trim()&&""!==e.sessionKey.trim()){var t=e.pid.split("_"),n=t.length;n>2&&(e.pidObj.site_id=t[n-2],e.pidObj.adzone_id=t[n-1],e.pidObj.user_id=t[n-3],e.storage.set("qianqian_tkl_pid",e.pid),e.storage.set("qianqian_tkl_session",e.sessionKey),e.storage.set("qianqian_tkl_pid_json",e.pidObj))}},ifPidExist:function(){var e=this.storage.get("qianqian_tkl_pid"),t=this.storage.get("qianqian_tkl_session");e&&t&&(this.pid=e,this.sessionKey=t),this.pidObj=this.storage.get("qianqian_tkl_pid_json")},changeSelfText:function(e,t,n){var r="[^一-龥]\\w{11}[^一-龥]",a="[a-zA-z]+://[^\\s]*";return e=e.replace(new RegExp(a),t).replace(new RegExp(r),n),e.trim()},handleBeforeUpload:function(e){var t=this,n=["xls","xlsx"],r=e.name,a=r.substr(r.lastIndexOf(".")+1),o=n.includes(a);return o||t.$message({type:"warning",message:"附件格式错误，请重新上传！"}),o},handleChange:function(e,t){var n=this;n.fileTemp=e.raw,n.importfxx(n.fileTemp)},handleRemove:function(e,t){this.fileTemp=null},importfxx:function(e){var t=this;t.file=e;var r=new FileReader;FileReader.prototype.readAsBinaryString=function(e){var r="",a=null,o=null,i=new FileReader;i.onload=function(e){for(var s=new Uint8Array(i.result),l=0,u=s.byteLength;l<u;l++)r+=String.fromCharCode(s[l]);var p=n("1146");a=p.read(r,{type:"binary"}),o=p.utils.sheet_to_json(a.Sheets[a.SheetNames[0]]);var d=Object(c["a"])(o),f=[];d.map((function(e){var t={tb_selfTkl:e["生成的自己的淘口令"]?e["生成的自己的淘口令"]:"",tb_otherTkl:e["别人的淘口令"]?e["别人的淘口令"]:""};f.push(t)})),t.tableData2=t.tableData2.concat(f)},i.readAsArrayBuffer(e)};try{r.readAsBinaryString(t.file)}catch(a){console.log(a)}},exportEX:function(){var e=this;console.log("导出！");var t=this.tableData2;t.length>0&&(this.downloadLoading=!0,n.e("chunk-db3e5572").then(n.bind(null,"4bf8")).then((function(n){var r=["生成的自己的淘口令","别人的淘口令"],a=["tb_selfTkl","tb_otherTkl"],o=e.formatJson(a,t);n.export_json_to_excel({titleName:"DataTable",header:r,data:o,autoWidth:e.autoWidth}),e.downloadLoading=!1})))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},onMuchSc:function(){console.log("批量生成！");var e=this;if(e.tableData2.length>0){if(e.reqCount===e.tableData2.length)return;var t=e.onBatchConvertSc(e.tableData2[e.reqCount].tb_otherTkl);t.then((function(t){t&&(e.tableData2[e.reqCount].tb_selfTkl=t,clearTimeout(e.timer),e.timer=setTimeout((function(){e.reqCount++,e.onMuchSc()}),1e3))}))}}},beforeDestroy:function(){clearTimeout(this.timer)}},S=j,O=(n("4b30"),n("2877")),q=Object(O["a"])(S,i,s,!1,null,"29dd58f8",null),G=q.exports,P={name:"app",components:{HelloWorld:G}},R=P,E=(n("034f"),Object(O["a"])(R,a,o,!1,null,null,null)),D=E.exports;n("c69f");r["default"].use(g.a);var $=n("b311"),B=n.n($),U={set:function(e,t){localStorage.setItem(e,JSON.stringify(t))},get:function(e){return JSON.parse(localStorage.getItem(e))},remove:function(){localStorage.removeItem(key)}},K=U;r["default"].config.productionTip=!1,r["default"].prototype.clipboard=B.a,r["default"].prototype.storage=K,new r["default"]({render:function(e){return e(D)}}).$mount("#app")},"85ec":function(e,t,n){},c69f:function(e,t,n){}});
//# sourceMappingURL=app.d0aae967.js.map