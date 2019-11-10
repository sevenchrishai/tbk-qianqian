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
                <el-button class="copy"
                           type="info"
                           plain
                           data-clipboard-target="#otherTkl"
                           icon="el-icon-document-copy"
                           @click="copyTxt()"
                           title="复制"
                           alt="复制"
                           circle></el-button>
            </el-form-item>
            <el-form-item label="商品推广文案">
                <el-input type="textarea"
                          :rows="4"
                          placeholder="填写自己的商品推广文案，会根据上述文案自动剔除链接和淘口令"
                          id="selfText"
                          v-model="selfText"></el-input>
            </el-form-item>
            <el-form-item label="自己的淘口令：">
                <el-input type="textarea"
                          :rows="4"
                          id="selfTkl"
                          placeholder="自己的淘口令"
                          v-model="selfTkl"></el-input>
                <el-button class="copy"
                           type="info"
                           plain
                           data-clipboard-target="#selfTkl"
                           icon="el-icon-document-copy"
                           @click="copyTxt()"
                           title="复制"
                           alt="复制"
                           circle></el-button>
            </el-form-item>
            <div class="tips">* 先点击【解析别人的淘口令】，弹出成功提示，再点击【生成自己的淘口令】</div>
            <el-form-item>
                <el-button type="primary" plain @click="onConvertSc">解析别人的淘口令</el-button>
                <el-button type="danger" plain @click="onCreateSc">生成自己的淘口令</el-button>
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
                    adzone_id: ''   //三段式第三段：推广位id
                },
                otherTkl: '',
                selfTkl: '',
                selfText: '',
                shortUrl: '',
                loading: false,
                result: null,
                timeout: null,
                timer: null,
            }
        },
        created(){
            this.ifPidExist();
        },
        watch: {
            otherTkl(curVal, oldVal){
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.changeSelfText(curVal);
                }, 300);
            }
        },
        methods: {
            onConvertSc() {
                console.log('解析&转链淘口令!');
                let _this = this;
                let pidObj = _this.storage.get('qianqian_tkl_pid_json');
                if (pidObj
                    && _this.sessionKey.trim()!=''
                    && _this.otherTkl.trim()!=''){
                    let params = {}
                    params.password_content = _this.otherTkl;
                    params.adzone_id = pidObj.adzone_id;
                    params.site_id = pidObj.site_id;
                    params.session = _this.sessionKey;
                    _this.loading = true;
                    http().getTpwdConvertSc(params).then(res => {
                        _this.result = res.data;
                        if (res.code) {
                            _this.$message.error(res.sub_msg);
                        } else {
                            let obj = {};
                            let tmpObj = {};
                            tmpObj.url = _this.result.click_url;
                            obj.requests = [];
                            obj.requests.push(tmpObj)
                            clearTimeout(_this.timer);
                            _this.timer = setTimeout(() => {
                                http().getSpreadGet(obj).then(res => {
                                    _this.loading = false;
                                    _this.$message({
                                        message: '获取转链成功',
                                        type: 'success',
                                        center: true,
                                    });
                                    if (res.code) {
                                        _this.$message.error(res.sub_msg);
                                    } else {
                                        _this.shortUrl = res.results.tbk_spread[0].content;
                                    }
                                }).catch((err)=>{
                                    _this.loading = false;
                                    console.log(err)
                                })
                            }, 1200);

                        }
                    }).catch((err)=>{
                        _this.loading = false;
                        console.log(err)
                    })
                } else {
                    _this.$message.error('有参数为空');
                }
            },
            onCreateSc() {
                console.log('生成淘口令!');
                let _this = this;
                let pidObj = _this.storage.get('qianqian_tkl_pid_json');
                if(_this.result && _this.selfText.trim() !=''){
                    let params = {};
                    params.text = _this.selfText;
                    params.url = _this.result.click_url;
                    params.user_id = pidObj.user_id;
                    _this.loading = true;
                    http().getTpwdCreate(params).then(res => {
                        _this.loading = false;
                        if (res.code) {
                            _this.$message.error(res.sub_msg);
                        } else {
                            _this.selfTkl = _this.selfText+ '\n'+
                                    '链接 '+_this.shortUrl+ '\n'+
                                    '口令 '+res.data.model;
                            _this.$message({
                                message: '生成淘口令成功',
                                type: 'success',
                                center: true,
                            });
                        }
                    }).catch((err)=>{
                        _this.loading = false;
                        console.log(err)
                    })
                }
            },
            copyTxt(){
                let clipboard = new this.clipboard(".copy");
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
                let tmpTxt = val.replace(new RegExp(regTkl), '');
                tmpTxt = tmpTxt.replace(new RegExp(regUrl), '');
                tmpTxt = tmpTxt.replace("链接", '');
                tmpTxt = tmpTxt.replace("口令", '');
                this.selfText = tmpTxt.trim();
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
            .copy{
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
            .tips{
                font-size: 12px;
                color: #E46365;
                margin-bottom: 10px;
            }
            button{
                margin-bottom: 30px;
            }

        }
    }
</style>
