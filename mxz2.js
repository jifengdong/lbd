/*
密小助解锁VIP，恋爱话语
https://apic.yzhiyin.com/index.php/v4/new/search/search
*/

let obj = JSON.parse($response.body);

obj.data = {
     "category_id": 3,
      "sex_type": 1,
      "status": 1,
      "quiz_sex": 2,
      "ans_sex": 1,
      "ans_type": 1,
      "recommended": 0
}
$done({body: JSON.stringify(obj)});
