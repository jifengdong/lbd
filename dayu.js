/*
Remove the WeChat public account bottom ad
by Choler
QX:
^https:\/\/ss\.lcjlnjyy\.com:11011\/system\/api\/video\/(ads\/6) url script-response-body dayu.js

Surge & QX MITM = https://ss.lcjlnjyy.com,
*/

var obj = JSON.parse($response.body);
obj.data = 0;


$done({body: JSON.stringify(obj)}); 
