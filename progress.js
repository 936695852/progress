//图片预加载
(function () {
  function ProLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    this.opts = $.extend({}, ProLoad.DEDAULTS, options);

    if (this.opts.order === 'ordered') {
      this._ordered();
    } else{
      this._unordered();
    }
  }
  ProLoad.DEDAULTS = {
    order: 'unordered', //無序預加載
    each: null,   //每一张图片加载完毕后执行
    all: null     //所有图片加载完毕后执行
  };
  ProLoad.prototype._ordered = function () {
    var opts  = this.opts,
        imgs  = this.imgs,
        len   = imgs.length,
        count = 0;

    load();
    function load() {
        var imgObj = new Image();
        $(imgObj).on('load error', function () {
          if (count >= len) {
            //所有图片加载完毕
          }else{
            load()
          }
          count++;
        });
        imgObj.src = imgs[count];
    }
  };
  ProLoad.prototype._unordered = function () { //无序加载
    var imgs  = this.imgs,
        opts  = this.opts,
        count = 0,
        len   = imgs.length;

    $.each(imgs, function (i, src) {
      if (typeof src != 'string') return;
       var imgObj = new Image();
       $(imgObj).on('load error', function () {
           opts.each && opts.each(count);
         if (count >= len - 1) {
           opts.all && opts.all();
         }
         count++;
       })
       imgObj.src = src;
   })
  };
  $.extend({
    preload: function (imgs, opts) {
      new ProLoad(imgs,opts);
    }
  })
})(jQuery);
