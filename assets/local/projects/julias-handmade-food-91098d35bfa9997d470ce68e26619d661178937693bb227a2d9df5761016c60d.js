function normalizeNumber(e){var t=1*e;return isNaN(t)?0:t}function prependZero(e){return 10>e?"0"+e:e}function getYearMonthDate(e,t){e||(e=today);var a=[e.getFullYear(),prependZero(e.getMonth()+1),prependZero(e.getDate())].join("-");if(!t)return a;var o=[prependZero(e.getHours()),prependZero(e.getMinutes()),prependZero(e.getSeconds())].join(":");return[a,o].join(" ")}function setReceivable(){var e=$("#semiFinished").val(),t=""===e?0:priceMap[e];"bfen"===e?$("#superaddition :checked").each(function(){t+=superadditionPriceMap[$(this).val()]}):"bfan"===e&&(t+=superadditionPriceMap[$("#taste :checked").val()]),t*=normalizeNumber($('[name="amount"]').val()),$("#receivable input").val(t),$("#receivable .form-control-static").text(t),$('[name="received"]').attr("placeholder",e?t:"\u82e5\u65e0\u7279\u60e0\u5c31\u4e0d\u586b\uff0c\u9ed8\u8ba4\u4e3a\u5e94\u6536")}var STOCK_UPDATED="julia-tool-stock:updated",STOCK_AMOUNT="julia-tool-stock:amount",SALES_SOLD="julia-tool-sales:sold",semiFinished={bfen:0,bfan:0,yn:0},usedSemiFinished={bfen:0,bfan:0,yn:0},nameMap={bfen:"\u51b0\u7c89",bfan:"\u51b0\u996d",yn:"\u828b\u6ce5"},priceMap={bfen:10,bfan:12,yn:18},superadditionNameMap={mg:"\u8292\u679c",xg:"\u897f\u74dc",yy:"\u828b\u5706",yg:"\u6930\u679c",sxc:"\u70e7\u4ed9\u8349",lbg:"\u8001\u51b0\u68cd",yj:"\u6930\u5976"},superadditionPriceMap={mg:2,xg:2,yy:1,yg:1,sxc:1,lbg:0,yj:4},today=new Date,sold=[];$(document).ready(function(){var e=$("#stockTable"),t=[],a=[],o=[];$.each(nameMap,function(e,n){t.push('<tr id="'+e+'"><td>'+n+'</td><td><input class="form-control" type="number" placeholder="\u8bf7\u8f93\u5165\u4efd\u6570"></td></tr>'),a.push('<li data-product="'+e+'">'+n+"\uff1a<span></span></li>"),o.push('<option value="'+e+'">'+n+"</option>")}),$("tbody",e).append(t.join("")),$("#stockList").append(a.join("")),$("#semiFinished").append(o.join(""));var n=$(".form-control",e),i=$("#stockTotal");n.on("change",function(){var e=$(this),t=e.closest("tr").attr("id");semiFinished[t]=normalizeNumber(e.val()),$('#stockList [data-product="'+t+'"] span').text(e.val());var a=0;n.each(function(){a+=normalizeNumber($(this).val())}),i.text(a)}),$("#semiFinished").on("change",function(){var e=$(this).val();"bfen"===e?$("#superaddition").show():($("#superaddition").hide(),$("#superaddition :checked").prop("checked",!1)),"bfan"===e?$("#taste").show():($("#taste").hide(),$('#taste :radio[value="lbg"]').prop("checked",!0)),$('[name="amount"]').val(1),setReceivable()}),$('#superaddition :checkbox, #taste :radio, [name="amount"]').on("change",function(){setReceivable()}),$("#saveStock").on("click",function(){var e=[];n.each(function(){e.push([$(this).closest("tr").attr("id"),normalizeNumber($(this).val())].join("/"))}),localStorage.setItem(STOCK_AMOUNT,e.join(":")),localStorage.setItem(STOCK_UPDATED,getYearMonthDate()),alert("\u4fdd\u5b58\u6210\u529f"),$("#todayStatus").text("\u795d\u5927\u5356\uff01"),$("#soldActionBar").show()}),$("#addSold").on("click",function(){$("#soldForm").submit()}),$("#soldForm").on("submit",function(e){e.preventDefault();var t={};$.each($(this).serializeArray(),function(e,a){"superaddition"===a.name&&t[a.name]?t[a.name]=[].concat(t[a.name],a.value):t[a.name]=a.value});var a={g:t.semiFinished,a:t.amount,p:t.received||t.receivable,t:Date.now(),r:t.remark},o="",n="";if("bfen"===a.g){var i=t.superaddition||[];o=i.join(",");var d=[];$.each(i,function(e,t){d.push(superadditionNameMap[t])}),n=d.join("\u3001")}else"bfan"===a.g&&(o=t.taste,n=superadditionNameMap[t.taste]);o&&(a.g=[a.g,o].join("|")),sold.push(a),usedSemiFinished[t.semiFinished]+=normalizeNumber(a.a);var s=n?nameMap[t.semiFinished]+'<div style="font-size: 12px;">+ '+n+"</div>":nameMap[t.semiFinished];$("#soldTable tbody").append("<tr><td>"+($("#soldTable tbody tr").size()+1)+"</td><td>"+s+"</td><td>"+a.a+"</td><td>"+a.p+"</td><td>"+a.r+"</td><td>"+getYearMonthDate(new Date(a.t),!0)+"</td></tr>");var r=0;$.each(sold,function(e,t){r+=normalizeNumber(t.p)}),$("#soldTable tfoot td:last").text(r+" \u5143"),$("#semiFinished").val("").trigger("change"),$("#soldModal").modal("hide")}),$("#saveSold").on("click",function(){localStorage.setItem(SALES_SOLD,JSON.stringify(sold)),alert("\u4fdd\u5b58\u6210\u529f"),$("#unlockedStock").hide(),$("#lockedStock").show(),$("#stockList [data-product]").each(function(){var e=$(this).data("product");$("span",$(this)).text(semiFinished[e]-usedSemiFinished[e])})});var d=localStorage.getItem(STOCK_UPDATED),s="\u4e0d\u6446\u644a\u3002";if(d===getYearMonthDate()){if(sold=JSON.parse(localStorage.getItem(SALES_SOLD))||[],sold.length>0){$("#lockedStock").show();var r=[],l=0;$.each(sold,function(e,t){var a=t.g.split("|"),o=a[0],n=a[1],i="";if(usedSemiFinished[o]+=normalizeNumber(t.a),n){var d=[];$.each(n.split(","),function(e,t){d.push(superadditionNameMap[t])}),i=d.join("\u3001")}var s=i?nameMap[o]+'<div style="font-size: 12px;">+ '+i+"</div>":nameMap[o];r.push("<tr><td>"+(e+1)+"</td><td>"+s+"</td><td>"+t.a+"</td><td>"+t.p+"</td><td>"+t.r+"</td><td>"+getYearMonthDate(new Date(t.t),!0)+"</td></tr>"),l+=normalizeNumber(t.p)}),$("#soldTable tbody").append(r.join("")),$("#soldTable tfoot td:last").text(l+" \u5143")}else $("#unlockedStock").show();var c=localStorage.getItem(STOCK_AMOUNT);if(c){s="\u795d\u5927\u5356\uff01";var u=c.split(":"),l=0;$.each(u,function(e,t){var a=t.split("/"),o=a[0],n=normalizeNumber(a[1]);l+=n,semiFinished[o]=n,$("#"+o+" .form-control").val(n),$('#stockList [data-product="'+o+'"] span').text(n-usedSemiFinished[o])}),i.text(l)}$("#soldActionBar").show()}else $("#unlockedStock").show();$("#todayDate").text(" "+today.getFullYear()+" \u5e74 "+(today.getMonth()+1)+" \u6708 "+today.getDate()+" \u65e5"),$("#todayStatus").text(s)});