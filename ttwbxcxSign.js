/*

 @𝐗𝐢𝐝𝐍 𝐃𝐃    感谢红鲤鱼大佬
//++++++++++++++++++++++++++++++++-

打开支付宝搜索，体验机蜜天天挖矿-每日领现金抽大奖小程序
需要获取两次cookie,进入天天矿一次，点击签到一次，一共两次。

***************************
Quantumult X远程脚本配置：
***************************
[rewrite_local]
^https:\/\/operation-api\.jimistore\.com\/* url script-request-body https://raw.githubusercontent.com/smiles-seaside/Quantumult-X/main/ttwbxcxSign.js

[task_loacl]
0 10 0 * * * https://raw.githubusercontent.com/smiles-seaside/Quantumult-X/main/ttwbxcxSign.js, tag=天天挖矿小程序, enabled=true

[MITM]
hostname= operation-api.jimistore.com

*/

const $XidN = XidN();

const logs=0;//设置0关闭日志,1开启日志



//++++++++++++++++++++++++++++++++-
var dd="天天挖矿小程序";
//++++++++++++++++++++++++++++++++

function main() {
    XidN_degin();
}

async function XidN_degin() {
    let a0 = await XidN_Sign();
    log(dd, "", a0);
}

function XidN_Sign() {
    return new Promise((resolve, reject) => {
        var result1 = "";
        var result2 = "";
        var createSignurl = $XidN.read("createSignurlname");
        var createSignhd = $XidN.read("createSignhdname");
        var createSignbd = $XidN.read("createSignbdname");
        const createSign = {
            url: createSignurl,
            headers: JSON.parse(createSignhd),
            body: createSignbd,
            timeout: 60000
        };
        $XidN.post(createSign, function(error, response, data) {
            if (logs == 1) console.log(data)
            var obj = JSON.parse(data);
            if (obj.data.success == "true")
                result2 = "【签到成功✅】" + "奖励💸现金";
            else
            if (obj.data.success == "false")
                result2 = "【签到失败⚠️】重复签到";
            else
                result2 = "签到失败获取cookie";

            var miningurl = $XidN.read("miningurlname");
            var createSignhd = $XidN.read("createSignhdname");
            const mining = {
                url: miningurl,
                headers: JSON.parse(createSignhd),
                timeout: 60000
            };
            $XidN.post(mining, function(error, response, data) {
                if (logs == 1) console.log(data)
                var obj = JSON.parse(data);
                if (obj.code == "200")
                    result2 += "【当前账户信息】" + ",连续签" + obj.data.cumulativeSignCount + "天," + obj.data.currentWing + "元宝";
             
                result2 = "" + result1 + "" + result2 + "\n";
                console.log(result2);
                resolve(result2);
            })
        })
    })
}


function XidN_RecordAdd() {
    if ($request.headers) {
        var urlval = $request.url;
        var md_hd = $request.headers;
        var md_bd = $request.body;
        if (urlval.indexOf("api/mining/v1/sign/createSign") >= 0) {
            var so = $XidN.write(md_bd, "createSignbdname");
            var ao = $XidN.write(urlval, "createSignurlname");
            var bo = $XidN.write(JSON.stringify(md_hd), "createSignhdname");
            if (ao == true && bo == true && so == true)
                log(dd, "[获取签到数据]", "✅成功");
        } else
        if (urlval.indexOf("api/mining/v1/sign/showSignInfo") >= 0) {
            var so = $XidN.write(urlval, "miningurlname");
            if (so == true)
                log(dd, "[获取签到奖励数据]", "✅成功");
        }
    }
}

function log(x, y, z) {
    $XidN.notify(x, y, z);
}

function getRandom(start, end, fixed = 0) {
    let differ = end - start
    let random = Math.random()
    return (start + differ * random).toFixed(fixed)
}

if ($XidN.isRequest) {
    XidN_RecordAdd()
    $XidN.end()
} else {
    main();
    $XidN.end()
}

function XidN() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options
            }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = {
                url: options
            }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return {
        isRequest,
        isQuanX,
        isSurge,
        notify,
        write,
        read,
        get,
        post,
        end
    }
};
