var STOCK_UPDATED = 'julia-tool-stock:updated';
var STOCK_AMOUNT = 'julia-tool-stock:amount';
var SALES_SOLD = 'julia-tool-sales:sold';

var semiFinished = { bfen: 0, bfan: 0, yn: 0 };
var usedSemiFinished = { bfen: 0, bfan: 0, yn: 0 };

var nameMap = { bfen: '冰粉', bfan: '冰饭', yn: '芋泥' };
var priceMap = { bfen: 10, bfan: 12, yn: 18 };

var superadditionNameMap = { mg: '芒果', xg: '西瓜', yy: '芋圆', yg: '椰果', sxc: '烧仙草', lbg: '老冰棍', yj: '椰奶' };
var superadditionPriceMap = { mg: 2, xg: 2, yy: 1, yg: 1, sxc: 1, lbg: 0, yj: 4 };

var today = new Date();

var sold = [];

function normalizeNumber(val) {
  var num = val * 1;

  return isNaN(num) ? 0 : num;
}

function prependZero(num) {
  return num < 10 ? ('0' + num) : num;
}

function getYearMonthDate(date, withTime) {
  if (!date) {
    date = today;
  }

  var datePart = [date.getFullYear(), prependZero(date.getMonth() + 1), prependZero(date.getDate())].join('-');

  if (!withTime) {
    return datePart;
  }

  var timePart = [prependZero(date.getHours()), prependZero(date.getMinutes()), prependZero(date.getSeconds())].join(':');

  return [datePart, timePart].join(' ');
}

function setReceivable() {
  var sf = $('#semiFinished').val();

  var receivable = (sf === '' ? 0 : priceMap[sf]);

  if (sf === 'bfen') {
    $('#superaddition :checked').each(function() {
      receivable += superadditionPriceMap[$(this).val()];
    });
  } else if (sf === 'bfan') {
    receivable += superadditionPriceMap[$('#taste :checked').val()];
  }

  receivable = receivable * normalizeNumber($('[name="amount"]').val());

  $('#receivable input').val(receivable);
  $('#receivable .form-control-static').text(receivable);

  $('[name="received"]').attr('placeholder', sf ? receivable : '若无特惠就不填，默认为应收');
}

$(document).ready(function() {
  var $stb = $('#stockTable');

  var trHtml = [];
  var liHtml = [];
  var optHtml = [];

  $.each(nameMap, function(k, n) {
    trHtml.push('<tr id="' + k + '"><td>' + n + '</td><td><input class="form-control" type="number" placeholder="请输入份数"></td></tr>');
    liHtml.push('<li data-product="' + k + '">' + n + '：<span></span></li>');
    optHtml.push('<option value="' + k + '">' + n + '</option>');
  });

  $('tbody', $stb).append(trHtml.join(''));
  $('#stockList').append(liHtml.join(''));
  $('#semiFinished').append(optHtml.join(''));

  var $si = $('.form-control', $stb);
  var $stt = $('#stockTotal');

  $si.on('change', function() {
    var $el = $(this);
    var key = $el.closest('tr').attr('id');

    semiFinished[key] = normalizeNumber($el.val());

    $('#stockList [data-product="' + key + '"] span').text($el.val());

    var total = 0;

    $si.each(function() {
      total += normalizeNumber($(this).val());
    });

    $stt.text(total);
  });

  $('#semiFinished').on('change', function() {
    var opt = $(this).val();

    if (opt === 'bfen') {
      $('#superaddition').show();
    } else {
      $('#superaddition').hide();
      $('#superaddition :checked').prop('checked', false);
    }

    if (opt === 'bfan') {
      $('#taste').show();
    } else {
      $('#taste').hide();
      $('#taste :radio[value="lbg"]').prop('checked', true);
    }

    $('[name="amount"]').val(1);

    setReceivable();
  });

  $('#superaddition :checkbox, #taste :radio, [name="amount"]').on('change', function() {
    setReceivable();
  });

  $('#saveStock').on('click', function() {
    var stockAmount = [];

    $si.each(function() {
      stockAmount.push([$(this).closest('tr').attr('id'), normalizeNumber($(this).val())].join('/'));
    });

    localStorage.setItem(STOCK_AMOUNT, stockAmount.join(':'));
    localStorage.setItem(STOCK_UPDATED, getYearMonthDate());

    alert('保存成功');

    $('#todayStatus').text('祝大卖！');
    $('#soldActionBar').show();
  });

  $('#addSold').on('click', function() {
    $('#soldForm').submit();
  });

  $('#soldForm').on('submit', function(evt) {
    evt.preventDefault();

    var data = {};

    $.each($(this).serializeArray(), function(_, f) {
      if (f.name === 'superaddition' && data[f.name]) {
        data[f.name] = [].concat(data[f.name], f.value);
      } else {
        data[f.name] = f.value;
      }
    });

    var resolved = { g: data.semiFinished, a: data.amount, p: data.received || data.receivable, t: Date.now(), r: data.remark };

    var productSuffix = '';
    var superadditionText = '';

    if (resolved.g === 'bfen') {
      var superaddition = data.superaddition || [];

      productSuffix = superaddition.join(',');

      var superadditionTextArr = [];

      $.each(superaddition, function(_, k) {
        superadditionTextArr.push(superadditionNameMap[k]);
      });

      superadditionText = superadditionTextArr.join('、');
    } else if (resolved.g === 'bfan') {
      productSuffix = data.taste;
      superadditionText = superadditionNameMap[data.taste];
    }

    if (productSuffix) {
      resolved.g = [resolved.g, productSuffix].join('|');
    }

    sold.push(resolved);

    usedSemiFinished[data.semiFinished] += normalizeNumber(resolved.a);

    var finishedText = superadditionText ? (nameMap[data.semiFinished] + '<div style="font-size: 12px;">+ ' + superadditionText + '</div>') : nameMap[data.semiFinished];

    $('#soldTable tbody').append('<tr><td>' + ($('#soldTable tbody tr').size() + 1) + '</td><td>' + finishedText + '</td><td>' + resolved.a + '</td><td>' + resolved.p + '</td><td>' + resolved.r + '</td><td>' + getYearMonthDate(new Date(resolved.t), true) + '</td></tr>');

    var total = 0;

    $.each(sold, function(_, c) {
      total += normalizeNumber(c.p);
    });

    $('#soldTable tfoot td:last').text(total + ' 元');

    $('#semiFinished').val('').trigger('change');
    $('#soldModal').modal('hide');
  });

  $('#saveSold').on('click', function() {
    localStorage.setItem(SALES_SOLD, JSON.stringify(sold));

    alert('保存成功');

    $('#unlockedStock').hide();
    $('#lockedStock').show();

    $('#stockList [data-product]').each(function() {
      var product = $(this).data('product');

      $('span', $(this)).text(semiFinished[product] - usedSemiFinished[product]);
    });
  });

  var cachedStockUpdated = localStorage.getItem(STOCK_UPDATED);

  var statusText = '不摆摊。';

  if (cachedStockUpdated === getYearMonthDate()) {
    sold = JSON.parse(localStorage.getItem(SALES_SOLD)) || [];

    if (sold.length > 0) {
      $('#lockedStock').show();

      var itemHtml = [];

      var total = 0;

      $.each(sold, function(idx, finished) {
        var splitted = finished.g.split('|');
        var itemGoods = splitted[0];
        var itemSuperaddition = splitted[1];
        var superadditionText = '';

        usedSemiFinished[itemGoods] += normalizeNumber(finished.a);

        if (itemSuperaddition) {
          var textArr = [];

          $.each(itemSuperaddition.split(','), function(_, k) {
            textArr.push(superadditionNameMap[k]);
          });

          superadditionText = textArr.join('、');
        }

        var finishedText = superadditionText ? (nameMap[itemGoods] + '<div style="font-size: 12px;">+ ' + superadditionText + '</div>') : nameMap[itemGoods];

        itemHtml.push('<tr><td>' + (idx + 1) + '</td><td>' + finishedText + '</td><td>' + finished.a + '</td><td>' + finished.p + '</td><td>' + finished.r + '</td><td>' + getYearMonthDate(new Date(finished.t), true) + '</td></tr>');

        total += normalizeNumber(finished.p);
      });

      $('#soldTable tbody').append(itemHtml.join(''));
      $('#soldTable tfoot td:last').text(total + ' 元');
    } else {
      $('#unlockedStock').show();
    }

    var cachedStockAmount = localStorage.getItem(STOCK_AMOUNT);

    if (cachedStockAmount) {
      statusText = '祝大卖！';

      var amount = cachedStockAmount.split(':');

      var total = 0;

      $.each(amount, function(_, cached) {
        var splitted = cached.split('/');
        var product = splitted[0];
        var resolved = normalizeNumber(splitted[1]);

        total += resolved;
        semiFinished[product] = resolved;

        $('#' + product + ' .form-control').val(resolved);
        $('#stockList [data-product="' + product + '"] span').text(resolved - usedSemiFinished[product]);
      });

      $stt.text(total);
    }

    $('#soldActionBar').show();
  } else {
    $('#unlockedStock').show();
  }

  $('#todayDate').text(' ' + today.getFullYear() + ' 年 ' + (today.getMonth() + 1) + ' 月 ' + today.getDate() + ' 日');
  $('#todayStatus').text(statusText);
});
