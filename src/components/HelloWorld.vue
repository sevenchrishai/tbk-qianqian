<template>
    <div class="hello">
        <div class="pid">
            PID:
            <el-input type="text" v-model="pid" placeholder="填写自己的pid"></el-input>
            <span>*示例:mm_123_123_123</span>
            <a href="https://oauth.taobao.com/authorize?response_type=token&client_id=23196777&state=1212&view=web"
               target="_blank">点击获取授权session</a>
            <span>*一般有效期为30天</span><br/>
            SESSION:
            <el-input type="text" v-model="sessionKey" placeholder="填写账户授权后得到的session"></el-input>
            <el-button type="primary" plain @click="save">保存</el-button>
            <span>*保存至浏览器缓存，方便下次访问</span>
        </div>
        <el-form class="formD"
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0)">
            <el-form-item label="别人的淘口令：">
                <el-input type="textarea"
                          :rows="4"
                          placeholder="填写别人的淘口令"
                          id="otherTkl"
                          v-model="otherTkl"></el-input>
                <el-button class="clear"
                           type="info"
                           plain
                           icon="el-icon-delete"
                           @click="clearTxt"
                           title="清除"
                           alt="清除"
                           circle></el-button>
            </el-form-item>
            <el-form-item label="商品推广文案">
                <el-input type="textarea"
                          :rows="4"
                          placeholder="填写自己的商品推广文案，会根据上述文案自动剔除链接和淘口令"
                          id="selfText"
                          v-model="selfText"></el-input>
            </el-form-item>
            <el-form-item label="生成的自己的淘口令：">
                <el-input type="textarea"
                          :rows="4"
                          id="selfTkl"
                          placeholder="生成的自己的淘口令"
                          v-model="selfTkl"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click.prevent="onConvertSc">一键生成淘口令</el-button>
                <el-button class="copy"
                           type="warning"
                           data-clipboard-action="copy"
                           data-clipboard-target="#selfTkl"
                           @click="copyTxt">一键复制淘口令</el-button>
            </el-form-item>
            <!--<div class="tips">* 先点击【一键生成淘口令】，弹出成功提示，再点击【一键复制淘口令】</div>-->
            <el-form-item>
                <div class="upAndExport">
                    <div class="upload">
                        <el-upload
                                class="upload-demo"
                                action=""
                                :on-change="handleChange"
                                :show-file-list="false"
                                :on-remove="handleRemove"
                                :file-list="fileListUpload"
                                :limit="limitUpload"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                :auto-upload="false">
                            <el-button size="small" type="primary" >批量上传</el-button>
                            <div slot="tip" class="el-upload__tip">注：只能上传xlsx/xls文件，文件表头和下列表格表头必须一致</div>
                        </el-upload>
                    </div>
                    <div class="export">
                        <el-button class="muchSc" type="primary" @click="onMuchSc">批量生成淘口令</el-button>
                        <el-button class="exportEX" type="primary"
                                   :loading="downloadLoading"
                                   icon="el-icon-document"
                                   @click.native="exportEX">导出Excel</el-button>
                    </div>
                </div>
                <div class="table">
                    <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            :default-sort = "{prop: 'tb_otherTkl', order: 'descending'}"
                            @selection-change="handleSelectionChange"
                            stripe
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="tb_otherTkl" label="别人的淘口令"></el-table-column>
                        <el-table-column prop="tb_content" label="商品推广文案"></el-table-column>
                        <el-table-column prop="tb_selfTkl" label="生成的自己的淘口令"></el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import http from '@/api/api'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                //mm_669390059_989100147_109618950049
                pid: '',
                sessionKey: '',
                pidObj: {
                    site_id: '',    //三段式第二段：备案的网站id
                    adzone_id: '',   //三段式第三段：推广位id
                    user_id: ''
                },
                otherTkl: '',
                selfTkl: '',
                selfText: '',
                shortUrl: '',
                loading: false,
                downloadLoading: false,
                timeout: null,
                timer: null,
                fileListUpload:[],
                limitUpload:1000,
                tableData2: [],
                fileTemp: null,
                multipleSelection: [],
                coupon_info: '',
                reqFlag: true,
                reqCount: 0,
                copyBtn: null //存储初始化复制按钮事件
            }
        },
        created(){
            this.ifPidExist();
        },
        mounted(){
            this.copyBtn = new this.clipboard('.copy');
        },
        watch: {
            otherTkl(curVal, oldVal){
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.selfText = this.changeSelfText(curVal);
                    // this.tableData2 = this.changeSelfTableData(curVal);
                }, 300);
            },
        },
        methods: {
            async onConvertSc() {
                console.log('解析&转链淘口令!');
                let _this = this;
                _this.pidObj = _this.storage.get('qianqian_tkl_pid_json');
                if (_this.pidObj && _this.sessionKey.trim() && _this.otherTkl.trim()){
                    let params = {}
                    params.password_content = _this.otherTkl;
                    params.adzone_id = _this.pidObj.adzone_id;
                    params.site_id = _this.pidObj.site_id;
                    params.session = _this.sessionKey;
                    const tkl = await _this.reqGetTpwdConvertSc(params)
                    console.log(tkl)
                } else {
                    _this.$message.error('有参数为空');
                }
            },
            // 1.解析淘口令
            reqGetTpwdConvertSc(params) {
                let _this = this
                _this.loading = true;
                http().getTpwdConvertSc(params).then(res => {
                    _this.loading = false;
                    if (res.code) {
                        _this.$message.error(res.sub_msg);
                    } else {
                        return Object.assign({}, params, {item_id: res.data.num_iid})
                    }
                }).catch((err)=>{
                    _this.loading = false;
                    console.log(err)
                })
            },
            // 2.高佣转链
            reqGetPrivilegeGet(params) {
                let _this = this
                http().getPrivilegeGet(params).then(res => {
                    if (res.code) {
                        _this.$message.error(res.sub_msg);
                    } else {
                        _this.coupon_info = res.result.data.coupon_info;
                        let tmpObj = {
                            url: res.result.data.coupon_click_url
                        };
                        return {
                            requests: [tmpObj]
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 3.长链转短链接
            reqGetSpreadGet(params) {
                let _this = this
                http().getSpreadGet(params).then(res => {
                    if (res.code) {
                        _this.$message.error(res.sub_msg);
                    } else {
                        if(res.results.tbk_spread[0].err_msg !== 'OK'){
                            _this.$message.error(res.results.tbk_spread[0].err_msg);
                        }else {
                            _this.shortUrl = res.results.tbk_spread[0].content;
                            if(_this.selfText.trim()){
                                return {
                                    text: _this.selfText,
                                    url: _this.shortUrl,
                                    user_id: _this.pidObj.user_id
                                };
                            } else {
                                _this.$message.error('文案为空');
                            }
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 4.生成淘口令
            reqGetTpwdCreate(params) {
                let _this = this
                http().getTpwdCreate(params).then(res => {
                    if (res.code) {
                        _this.$message.error(res.sub_msg);
                    } else {
                        if (_this.coupon_info){
                            _this.selfTkl = `${_this.selfText}
                                优惠卷：${_this.coupon_info}
                                链接：${_this.shortUrl}
                                口令：${res.data.model}
                            `
                        } else {
                            _this.selfTkl = `${_this.selfText}
                                链接：${_this.shortUrl}
                                口令：${res.data.model}
                            `
                        }
                        _this.$message({
                            message: '生成淘口令成功',
                            type: 'success',
                            center: true,
                        });
                        // 自动复制到粘贴板
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            clearTxt(){
                this.otherTkl = '';
            },
            copyTxt(){
                let _this = this;
                let clipboard = _this.copyBtn;
                clipboard.on('success', function() {
                    _this.$message({
                        message: '复制成功！',
                        type: 'success'
                    });
                    _this.copyBtn.destroy() // 销毁
                    _this.copyBtn = new _this.clipboard('.copy') // 重新绑定
                });
                clipboard.on('error', function() {
                    _this.$message.error('复制失败，请手动复制');
                    _this.copyBtn.destroy() // 销毁
                    _this.copyBtn = new _this.clipboard('.copy') // 重新绑定
                });
            },
            save(){
                //mm_669390059_989100147_109618950049
                let _this = this;
                if (_this.pid.trim() != '' && _this.sessionKey.trim() != ''){
                    let pidArr = _this.pid.split('_');
                    console.log(pidArr)
                    let len = pidArr.length;
                    if (len>2){
                        _this.pidObj.site_id = pidArr[len-2];
                        _this.pidObj.adzone_id = pidArr[len-1];
                        _this.pidObj.user_id = pidArr[len-3];
                        _this.storage.set('qianqian_tkl_pid',_this.pid)
                        _this.storage.set('qianqian_tkl_session',_this.sessionKey)
                        _this.storage.set('qianqian_tkl_pid_json',_this.pidObj)
                    }
                }

            },
            ifPidExist(){
                let pid = this.storage.get('qianqian_tkl_pid');
                let s = this.storage.get('qianqian_tkl_session');
                if (pid && s){
                    this.pid = pid;
                    this.sessionKey = s;
                }
            },
            changeSelfText(val){
                // 淘口令正则匹配
                let regTkl = '[^\u4e00-\u9fa5]\\w{11}[^\u4e00-\u9fa5]';
                // url正则匹配
                let regUrl = '[a-zA-z]+://[^\\s]*';
                val = val.replace(new RegExp(regTkl), '');
                val = val.replace(new RegExp(regUrl), '');
                val = val.replace("链接", '');
                val = val.replace("口令", '');
                return val.trim();
            },
            changeSelfTableData(val){
                let _this = this;
                let tmpArr = val?val.split('?'):[]
                let tableData = []
                let tableObj = {}
                if (tmpArr.length>0){
                    for (let i=0;i<tmpArr.length-1;i++){
                        tableObj.tb_otherTkl = tmpArr[i]
                        tableObj.tb_content = _this.changeSelfText(tmpArr[i])
                        tableObj.tb_selfTkl = ''
                        tableData.push(tableObj)
                    }
                }
                return tableData;
            },
            // excel表上传
            handleChange(file, fileList){
                this.fileTemp = file.raw
                // 判断上传文件格式
                if(this.fileTemp){
                    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-vendor')){
                        this.importfxx(this.fileTemp)
                    } else {
                        this.$message({
                            type:'warning',
                            message:'附件格式错误，请删除后重新上传！'
                        })
                    }
                } else {
                    this.$message({
                        type:'warning',
                        message:'请上传附件！'
                    })
                }
            },
            // 移除excel表
            handleRemove(file,fileList){
                this.fileTemp = null
            },
            importfxx(obj) {
                let _this = this;
                // 通过DOM取文件数据
                this.file = obj
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是读取excel内容之后输出的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            obj.tb_otherTkl = v['别人的淘口令']
                            obj.tb_content = _this.changeSelfText(v['别人的淘口令'])
                            obj.tb_selfTkl = v['生成的自己的淘口令']
                            arr.push(obj)
                        })
                        //return arr
                        // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
                        _this.tableData2 = _this.tableData2.concat(arr)
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            exportEX(){ // 导出Excel表格
                console.log('导出！')
                let list = this.tableData2;
                if (list.length>0){
                    this.downloadLoading = true;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = ['别人的淘口令', '商品推广文案', '生成的自己的淘口令'];
                        const filterVal = ['tb_otherTkl', 'tb_content', 'tb_selfTkl'];
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel({
                            titleName: 'DataTable',
                            header: tHeader,
                            data,
                            filename: this.filename,
                            autoWidth: this.autoWidth
                        });
                        this.downloadLoading = false;
                    });
                }
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    return v[j];
                }))
            },
            onMuchSc(){
                console.log('批量生成！')
                if (this.tableData2.length > 0) {
                    //  * 尽量避免使用for循环请求，而要用递归的方式
                    this.reqCount = this.tableData2.length;
                    this.onMuchRequest();
                }
            },
            onMuchRequest(){
                if(this.reqCount > 0){  // 判断 1.是否请求成功 2.是否到达请求次数
                    console.log('批量解析&转链淘口令!');
                    let _this = this;
                    let pidObj = _this.storage.get('qianqian_tkl_pid_json');
                    if (pidObj && _this.sessionKey && _this.tableData2[_this.reqCount-1].tb_otherTkl){
                        let params = {}
                        params.password_content = _this.tableData2[_this.reqCount-1].tb_otherTkl;
                        params.adzone_id = pidObj.adzone_id;
                        params.site_id = pidObj.site_id;
                        params.session = _this.sessionKey;
                        // 解析淘口令
                        http().getTpwdConvertSc(params).then(res => {
                            _this.result = res.data;
                            if (res.code) {
                                clearTimeout(_this.timer);
                                _this.timer = setTimeout(()=>{
                                    _this.reqCount -- ;    //请求次数 - 1
                                    _this.onMuchRequest();
                                },1200);
                            } else {
                                _this.item_id = _this.result.num_iid;
                                let params = {};
                                params.adzone_id = pidObj.adzone_id;
                                params.site_id = pidObj.site_id;
                                params.session = _this.sessionKey;
                                params.item_id = _this.item_id;
                                clearTimeout(_this.timer);
                                _this.timer = setTimeout(()=>{
                                    // 高佣转链
                                    http().getPrivilegeGet(params).then(res => {
                                        if (res.code) {
                                            clearTimeout(_this.timer);
                                            _this.timer = setTimeout(()=>{
                                                _this.reqCount -- ;    //请求次数 - 1
                                                _this.onMuchRequest();
                                            },1200);
                                        } else {
                                            _this.coupon_url = res.result.data.coupon_click_url;
                                            _this.coupon_info = res.result.data.coupon_info;
                                            let obj = {};
                                            let tmpObj = {};
                                            tmpObj.url = _this.coupon_url;
                                            obj.requests = [];
                                            obj.requests.push(tmpObj)
                                            clearTimeout(_this.timer);
                                            _this.timer = setTimeout(() => {
                                                // 长链转短链接
                                                http().getSpreadGet(obj).then(res => {
                                                    if (res.code) {
                                                        clearTimeout(_this.timer);
                                                        _this.timer = setTimeout(()=>{
                                                            _this.reqCount -- ;    //请求次数 - 1
                                                            _this.onMuchRequest();
                                                        },1200);
                                                    } else {
                                                        if(res.results.tbk_spread[0].err_msg != 'OK'){
                                                            _this.$message.error(res.results.tbk_spread[0].err_msg);
                                                        }else {
                                                            _this.shortUrl = res.results.tbk_spread[0].content;
                                                            clearTimeout(_this.timer);
                                                            _this.timer = setTimeout(()=>{
                                                                if(_this.tableData2[_this.reqCount-1].tb_content){
                                                                    let params = {};
                                                                    params.text = _this.tableData2[_this.reqCount-1].tb_content;
                                                                    params.url = _this.shortUrl;
                                                                    params.user_id = pidObj.user_id;
                                                                    // 生成淘口令
                                                                    http().getTpwdCreate(params).then(res => {
                                                                        if (res.code) {
                                                                            clearTimeout(_this.timer);
                                                                            _this.timer = setTimeout(()=>{
                                                                                _this.reqCount -- ;    //请求次数 - 1
                                                                                _this.onMuchRequest();
                                                                            },1200);
                                                                        } else {
                                                                            if (_this.coupon_info){
                                                                                _this.tableData2[_this.reqCount-1].tb_selfTkl =
                                                                                    _this.tableData2[_this.reqCount-1].tb_content+ '\n'+
                                                                                    '优惠卷 '+_this.coupon_info+ '\n'+
                                                                                    '链接 '+_this.shortUrl+ '\n'+
                                                                                    '口令 '+res.data.model;
                                                                            } else {
                                                                                _this.tableData2[_this.reqCount-1].tb_selfTkl =
                                                                                    _this.tableData2[_this.reqCount-1].selfText+ '\n'+
                                                                                    '链接 '+_this.shortUrl+ '\n'+
                                                                                    '口令 '+res.data.model;
                                                                            }
                                                                            _this.$message({
                                                                                message: '生成淘口令成功',
                                                                                type: 'success',
                                                                                center: true,
                                                                            });
                                                                            clearTimeout(_this.timer);
                                                                            _this.timer = setTimeout(()=>{
                                                                                _this.reqCount -- ;    //请求次数 - 1
                                                                                _this.onMuchRequest();
                                                                            },1200);
                                                                        }
                                                                    }).catch((err)=>{
                                                                        _this.$message.error('加载数据失败');
                                                                        console.log(err)
                                                                    })
                                                                } else {
                                                                    _this.$message.error('文案为空');
                                                                }
                                                            },1200)
                                                        }
                                                    }
                                                }).catch((err)=>{
                                                    _this.$message.error('加载数据失败');
                                                    console.log(err)
                                                })
                                            }, 1200);
                                        }
                                    }).catch((err)=>{
                                        _this.$message.error('加载数据失败');
                                        console.log(err)
                                    })
                                }, 1200)
                            }
                        }).catch((err)=>{
                            _this.$message.error('加载数据失败');
                            console.log(err)
                        })
                    } else {
                        _this.$message.error('有参数为空');
                    }

                }
            }

        },
        beforeDestroy(){
            clearTimeout(this.timeout);
            clearTimeout(this.timer);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .hello{
        margin: 0 60px;
        .pid{
            text-align: left;
            a{
                color: #AB65F2;
                padding: 0 5px;
            }
            span{
                font-size: 12px;
                color: #E46365;
                margin-left: 5px;
                margin-right: 5px;
            }
            .el-input{
                width: 240px;
                margin-left: 10px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
        .formD {
            .el-textarea{
            }
            .el-form-item{
                margin-bottom: 10px !important;
            }
            .clear{
                position: absolute;
                top: 20px;
                right: 10px;
            }
            .copy{
            }
            .tips{
                font-size: 12px;
                color: #E46365;
                margin-bottom: 10px;
            }
            .upAndExport{
                display: flex;
                justify-content: space-between;
                .el-upload__tip{
                    color: #E46365;
                    line-height: 1;
                }

            }
            .table{
                margin-bottom: 30px;
            }
            .muchSc{
                margin-bottom: 30px;
            }
        }
    }
</style>
