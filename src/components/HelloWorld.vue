<template>
    <div class="hello">
        <div class="pid">
            <strong>PID:</strong>
            <el-input type="text" v-model="pid" placeholder="填写自己的pid"></el-input>
            <span>*示例:mm_123_123_123</span>
            <a href="https://oauth.taobao.com/authorize?response_type=token&client_id=23196777&state=1212&view=web"
               target="_blank">点击获取授权session</a>
            <span>*一般有效期为30天</span><br/>
            <strong>SESSION:</strong>
            <el-input type="text" v-model="sessionKey" placeholder="填写账户授权后得到的session"></el-input>
            <el-button type="primary" plain @click="save">保存</el-button>
            <span>*保存至浏览器缓存，方便下次访问</span>
        </div>
        <el-form class="formD">
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
            <el-form-item label="生成的自己的淘口令：">
                <el-input type="textarea"
                          :rows="4"
                          id="selfTkl"
                          placeholder="生成的自己的淘口令之后，自动替换链接和淘口令"
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
                    <a class="templateDownload" target="_blank"
                       href="/static/template.xlsx" download="template.xlsx">模板下载</a>
                    <div class="upload">
                        <el-upload
                                class="upload-demo"
                                action=""
                                :on-change="handleChange"
                                :show-file-list="true"
                                :on-remove="handleRemove"
                                :file-list="fileListUpload"
                                :limit="limitUpload"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                :befor-upload="handleBeforeUpload"
                                :auto-upload="false">
                            <el-button size="small" type="primary" >批量上传</el-button>
                            <span slot="tip" class="el-upload__tip">注：只能上传Excel文件</span>
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
                            :data="tableData2"
                            :default-sort = "{prop: 'tb_otherTkl', order: 'descending'}"
                            stripe
                    >
                        <el-table-column prop="tb_selfTkl" label="生成的自己的淘口令"></el-table-column>
                        <el-table-column prop="tb_otherTkl" label="别人的淘口令"></el-table-column>
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
                otherTkl: '',
                selfTkl: '',
                shortUrl: '',
                downloadLoading: false,
                timer: null,
                fileListUpload:[],
                limitUpload:1000,
                tableData2: [],
                fileTemp: null,
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
        computed: {
            pidObj: {
                get: function() {
                    let _this = this
                    if (_this.pid.trim() !== ''){
                        let pidArr = _this.pid.split('_');
                        let len = pidArr.length;
                        if (len>2){
                            return {
                                site_id: pidArr[len-2],
                                adzone_id: pidArr[len-1],
                                user_id: pidArr[len-3]
                            }
                        }
                    }
                    return null
                },
                set: function() {}
            }
        },
        methods: {
            async onConvertSc() {
                console.log('解析&转链淘口令!');
                let _this = this;
                if (_this.pidObj && _this.sessionKey.trim() && _this.otherTkl.trim()){
                    let params = {}
                    params.password_content = _this.otherTkl;
                    params.adzone_id = _this.pidObj.adzone_id;
                    params.site_id = _this.pidObj.site_id;
                    params.session = _this.sessionKey;
                    try {
                        const convertSc = await _this.reqGetTpwdConvertSc(params)
                        const privilegeGet = await _this.reqGetPrivilegeGet(convertSc)
                        const spreadGet = await _this.reqGetSpreadGet(privilegeGet)
                        const tpwdCreate = await _this.reqGetTpwdCreate(spreadGet)
                        _this.selfTkl = _this.changeSelfText(_this.otherTkl, tpwdCreate.url, tpwdCreate.tkl)
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    _this.$message.error('有参数为空');
                }
            },
            async onBatchConvertSc(otherTkl) {
                console.log('批量解析&转链淘口令!');
                let _this = this;
                if (_this.pidObj && _this.sessionKey && otherTkl){
                    let params = {}
                    params.password_content = otherTkl;
                    params.adzone_id = _this.pidObj.adzone_id;
                    params.site_id = _this.pidObj.site_id;
                    params.session = _this.sessionKey;
                    try {
                        const convertSc = await _this.reqGetTpwdConvertSc(params)
                        const privilegeGet = await _this.reqGetPrivilegeGet(convertSc)
                        const spreadGet = await _this.reqGetSpreadGet(privilegeGet)
                        const tpwdCreate = await _this.reqGetTpwdCreate(spreadGet)
                        return _this.changeSelfText(otherTkl, tpwdCreate.url, tpwdCreate.tkl)
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    _this.$message.error('有参数为空');
                }
            },
            // 1.解析淘口令
            reqGetTpwdConvertSc(params) {
                let _this = this
                return new Promise((resolve, reject) => {
                    http().getTpwdConvertSc(params).then(res => {
                        if (res.code) {
                            _this.$message.error(res.sub_msg);
                        } else {
                            resolve(Object.assign({}, params, {item_id: res.data.num_iid}))
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                })
            },
            // 2.高佣转链
            reqGetPrivilegeGet(params) {
                let _this = this
                return new Promise((resolve, reject) => {
                    http().getPrivilegeGet(params).then(res => {
                        if (res.code) {
                            _this.$message.error(res.sub_msg);
                        } else {
                            let tmpObj = {
                                url: res.result.data.coupon_click_url
                            };
                            resolve({requests: [tmpObj]})
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                })
            },
            // 3.长链转短链接
            reqGetSpreadGet(params) {
                let _this = this
                // 请求频率过快，请隔1s再试
                return new Promise((resolve, reject) => {
                    clearTimeout(_this.timer);
                    _this.timer = setTimeout(() => {
                        http().getSpreadGet(params).then(res => {
                            if (res.code) {
                                _this.$message.error(res.sub_msg);
                            } else {
                                if(res.results.tbk_spread[0].err_msg !== 'OK'){
                                    _this.$message.error(res.results.tbk_spread[0].err_msg);
                                }else {
                                    _this.shortUrl = res.results.tbk_spread[0].content;
                                    if(_this.otherTkl.trim()){
                                        resolve({
                                            text: _this.otherTkl,
                                            url: _this.shortUrl,
                                            user_id: _this.pidObj.user_id
                                        })
                                    } else {
                                        _this.$message.error('文案为空');
                                    }
                                }
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    },1000)
                })
            },
            // 4.生成淘口令
            reqGetTpwdCreate(params) {
                let _this = this
                return new Promise((resolve, reject) => {
                    clearTimeout(_this.timer);
                    _this.timer = setTimeout(() => {
                        http().getTpwdCreate(params).then(res => {
                            if (res.code) {
                                _this.$message.error(res.sub_msg);
                            } else {
                                resolve({
                                    url: _this.shortUrl,
                                    tkl: res.data.model
                                })
                                _this.$message({
                                    message: '生成淘口令成功',
                                    type: 'success',
                                    center: true,
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }, 1000)
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
                if (_this.pid.trim() !== '' && _this.sessionKey.trim() !== ''){
                    let pidArr = _this.pid.split('_');
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
                this.pidObj = this.storage.get('qianqian_tkl_pid_json');
            },
            changeSelfText(val, newUrl, newTkl){
                // 淘口令正则匹配
                let regTkl = '[^\u4e00-\u9fa5]\\w{11}[^\u4e00-\u9fa5]';
                // url正则匹配
                let regUrl = '[a-zA-z]+://[^\\s]*';
                val = val.replace(new RegExp(regUrl), newUrl)
                    .replace(new RegExp(regTkl), newTkl);
                return val.trim();
            },
            // 上传前对文件进行校验
            handleBeforeUpload(file) {
                let _this = this
                const typeList = ["xls", "xlsx"];
                const fileName = file.name;
                const extension = fileName.substr(fileName.lastIndexOf(".") + 1);
                const isRT = typeList.includes(extension);
                if (!isRT) {
                    _this.$message({
                        type:'warning',
                        message:'附件格式错误，请重新上传！'
                    })
                }
                return isRT;
            },
            // excel表上传
            handleChange(file, fileList){
                let _this = this
                _this.fileTemp = file.raw
                _this.importfxx(_this.fileTemp);
            },
            // 移除excel表
            handleRemove(file,fileList){
                this.fileTemp = null
            },
            importfxx(obj) {
                let _this = this;
                _this.file = obj
                const reader = new FileReader();
                FileReader.prototype.readAsBinaryString = function(file) {
                    let binary = "";
                    let wb = null; //读取完成的数据
                    let outdata = null;
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        let bytes = new Uint8Array(reader.result);
                        for(let i = 0,len = bytes.byteLength; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        const XLSX = require('xlsx');
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是读取excel内容之后输出的东西
                        let da = [...outdata]
                        let arr = []
                        da.map(v => {
                            let obj = {
                                tb_selfTkl: v['生成的自己的淘口令']?v['生成的自己的淘口令']:'',
                                tb_otherTkl: v['别人的淘口令']?v['别人的淘口令']:''
                            };
                            arr.push(obj)
                        })
                        // 把读取的excel表格中的内容放进tableData2中
                        _this.tableData2 = _this.tableData2.concat(arr)
                    }
                    reader.readAsArrayBuffer(file);
                }
                try {
                    reader.readAsBinaryString(_this.file)
                } catch (e) {
                    console.log(e)
                }
            },
            exportEX(){ // 导出Excel表格
                console.log('导出！')
                let list = this.tableData2;
                if (list.length>0){
                    this.downloadLoading = true;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = ['生成的自己的淘口令','别人的淘口令'];
                        const filterVal = ['tb_selfTkl','tb_otherTkl'];
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel({
                            titleName: 'DataTable',
                            header: tHeader,
                            data,
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
                let _this = this
                if (_this.tableData2.length > 0) { //* 尽量避免使用for循环请求，而要用递归的方式
                    if (_this.reqCount === _this.tableData2.length) {
                        return
                    }
                    let res = _this.onBatchConvertSc(_this.tableData2[_this.reqCount].tb_otherTkl)
                    res.then((data) => {
                        if (data) {
                            _this.tableData2[_this.reqCount].tb_selfTkl = data;
                            clearTimeout(_this.timer);
                            _this.timer = setTimeout(() => {
                                _this.reqCount++;
                                _this.onMuchSc()
                            }, 1000)
                        }
                    })
                }
            }
        },
        beforeDestroy(){
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
                justify-content: space-around;
                .templateDownload{
                    color: #E46365;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .el-upload__tip{
                    color: #E46365;
                    line-height: 1;
                    margin-left: 10px;
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
