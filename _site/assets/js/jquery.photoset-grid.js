/**
 * photoset-grid - v1.0.1
 * 2014-04-08
 * jQuery plugin to arrange images into a flexible grid
 * http://stylehatch.github.com/photoset-grid/
 *
 * Copyright 2014 Jonathan Moore - Style Hatch
 */

 /*jshint browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true, devel: true */
;(function ( $, window, document, undefined ) {

  'use strict';

  // 插件名称和默认设置
  var pluginName = "photosetGrid",
    defaults = {
      // 必要
      // 设置容器的宽度
      width         : '100%',
      // 行/列之间的空间
      gutter        : '0px',

      // 可选的
      // 将图像包装在vs. div中并链接到数据高分辨率图像
      highresLinks  : false,
      // 低分辨率图像的阈值，如果容器大于交换数据高分辨率
      lowresWidth   : 500,
      // 关系属性应用于灯箱使用的链接
      rel           : '',

      // 为每个图像添加边框
      borderActive: false,
      // 设置边框宽度
      borderWidth: '5px',
      // 设置边框颜色
      borderColor: '#000000',
      // 设置边界半径
      borderRadius: '0',
      // 如果为true，将删除“双”边框
      borderRemoveDouble: false,

      // 回调事件
      onInit        : function(){},
      onComplete    : function(){}
    };

    // 插件构造器
    function Plugin( element, options ) {
      this.element = element;
      this.options = $.extend( {}, defaults, options );

      this._defaults = defaults;
      this._name = pluginName;

      this.init();
    }

    Plugin.prototype = {

      init: function() {
        // 调用插件时，调用可选的onInit事件集
        this.options.onInit();

        this._setupRows(this.element, this.options);
        this._setupColumns(this.element, this.options);

      },

      _callback: function(elem){
        // 插件完成后，调用可选的onComplete事件
        this.options.onComplete(elem);
      },

      _setupRows: function(  elem, options ){
        // 将布局字符串转换为数组以构建DOM结构
        if(options.layout) {
          // 检查插件调用中定义的布局
          this.layout = options.layout;
        } else if($(elem).attr('data-layout')) {
          // 如果未在选项中定义，请检查数据布局属性
          this.layout = $(elem).attr('data-layout');
        } else {
          // 否则，给它一个堆叠的布局（没有网格适合您）
          // 根据图像数量生成所有布局字符串
          var stackedLayout = "";
          var defaultColumns = 1;
          for (var imgs=0; imgs<$(elem).find('img').length; imgs++ ) {
            stackedLayout = stackedLayout + defaultColumns.toString();
          }
          this.layout = stackedLayout;
        }

        // 将布局转储到行数组中
        // 将数组转换为所有数字 vs. 字符串
        this.rows = this.layout.split('');
        for (var i in this.rows ) {
          this.rows[i] = parseInt(this.rows[i], 10);
        }

        var $images = $(elem).find('img');
        var imageIndex = 0;

        $.each(this.rows, function(i, val){
          var rowStart = imageIndex;
          var rowEnd = imageIndex + val;

          // 将每组图像连续包装到容器div中
          $images.slice(rowStart, rowEnd).wrapAll('<div class="photoset-row cols-' + val + '"></div>');

          imageIndex = rowEnd;
        });

        $(elem).find('.photoset-row:not(:last-child)').css({
          'margin-bottom': options.gutter
        });
      },

      _setupColumns: function(  elem, options ){

        // 引用此插件
        var $this = this;

        var setupStyles = function(waitForImagesLoaded){
          var $rows = $(elem).find('.photoset-row');
          var $images = $(elem).find('img');

          // 将图像包装到高分辨率或常规图像的链接中
          // 否则包装在div.photoset-cell中
          if(options.highresLinks){
            $images.each(function(){
              var title;
              // 如果图像有标题，请继续传递
              if($(this).attr('title')){
                  title = ' title="' + $(this).attr('title') + '"';
              } else {
                  title = '';
              }
              var highres;
              // 如果存在高分辨率图像，请将其链接！
              if($(this).attr('data-highres')){
                  highres = $(this).attr('data-highres');
              } else {
                  highres = $(this).attr('src');
              }
              $(this).wrapAll('<a href="' + highres + '"' + title + ' class="photoset-cell highres-link" />');
              if(options.borderActive){
                $(this).wrapAll('<span class="photoset-content-border" />');
              }
            });

            // 应用可选的rel
            if(options.rel){
              $images.parent().attr('rel', options.rel);
            }

          } else {
            $images.each(function(){
              if(options.borderActive){
                $(this).wrapAll('<div class="photoset-cell photoset-cell--border" />');
                $(this).wrapAll('<div class="photoset-content-border" />');
              } else {
                $(this).wrapAll('<div class="photoset-cell" />');
              }
            });
          }

          var $cells = $(elem).find('.photoset-cell');
          var $cols1 = $(elem).find('.cols-1 .photoset-cell');
          var $cols2 = $(elem).find('.cols-2 .photoset-cell');
          var $cols3 = $(elem).find('.cols-3 .photoset-cell');
          var $cols4 = $(elem).find('.cols-4 .photoset-cell');
          var $cols5 = $(elem).find('.cols-5 .photoset-cell');
          var $cellBorder = $(elem).find('.photoset-content-border');

          // 将样式的初始结构样式应用于网格
          $(elem).css({
            'width': options.width
          });
          $rows.css({
            'clear': 'left',
            'display': 'block',
            'overflow': 'hidden'
          });
          $cells.css({
            'float': 'left',
            'display': 'block',
            'line-height': '0',
            '-webkit-box-sizing': 'border-box',
            '-moz-box-sizing': 'border-box',
            'box-sizing': 'border-box'
          });
          $images.css({
            'width': '100%',
            'height': 'auto'
          });
          if(options.borderActive){
            $cellBorder.css({
              'display': 'block',
              'border': options.borderWidth + ' solid ' + options.borderColor,
              'border-radius': options.borderRadius,
              'overflow': 'hidden',
              '-webkit-box-sizing': 'border-box',
              '-moz-box-sizing': 'border-box',
              'box-sizing': 'border-box'
            });
          }

          // 如果图像没有设置高度/宽度属性
          if (waitForImagesLoaded) {
            $images.each(function(){
              $(this).attr('height', $(this).height());
              $(this).attr('width', $(this).width());
            });
          }

          // 根据行中的列数设置单元格的宽度
          $cols1.css({ 'width': '100%' });
          $cols2.css({ 'width': '50%' });
          $cols3.css({ 'width': '33.3%' });
          $cols4.css({ 'width': '25%' });
          $cols5.css({ 'width': '20%' });


          var gutterVal = parseInt(options.gutter, 10);
          // 向左右施加50％的装订线
          // 这为相等的装订线提供了很高的价值
          $(elem).find('.photoset-cell:not(:last-child)').css({
            'padding-right': (gutterVal / 2) + 'px'
          });
          $(elem).find('.photoset-cell:not(:first-child)').css({
            'padding-left': (gutterVal / 2) + 'px'
          });

          // 如果'borderRemoveDouble'为true，让我们删除多余的装订线边框
          if(options.borderRemoveDouble){
            $(elem).find('.photoset-row').not(':eq(0)').find('.photoset-content-border').css({'border-top': 'none'});
            $(elem).find('.photoset-row').not('.cols-1').find('.photoset-content-border').not(":eq(0)").css({'border-left': 'none'});
          }

          function resizePhotosetGrid(){

            // 为这些值设置底线以防止失火
            var w = $(elem).width().toString();

            if( w !== $(elem).attr('data-width') ) {
              $rows.each(function(){
                var $shortestImg = $(this).find('img:eq(0)');

                $(this).find('img').each(function(){
                  var $img = $(this);
                  if( parseInt($img.attr('height'), 10) < parseInt($shortestImg.attr('height'),10) ){
                      $shortestImg = $(this);
                  }

                  if(parseInt($img.css('width'), 10) > options.lowresWidth && $img.attr('data-highres')){
                      $img.attr('src', $img.attr('data-highres'));
                  }
                });

                // 从最短图像的计算/实际高度/宽度获取行高
                var rowHeight = ( $shortestImg.attr('height') * parseInt($shortestImg.css('width'), 10) ) / $shortestImg.attr('width');
                // 添加缓冲区以减少几个像素的高度
                var bufferHeight = Math.floor(rowHeight * 0.025);
                $(this).height( rowHeight - bufferHeight );

                // 如果border设置为true，则将父行高度添加到每个.photoset-content-border
                if(options.borderActive){
                  $(this).find('.photoset-content-border').each(function(){
                    $(this).css({'height': rowHeight - bufferHeight});
                  });
                }

                $(this).find('img').each(function(){
                  // 从计算的/实际的高度/宽度获取图像高度
                  var imageHeight = ( $(this).attr('height') * parseInt($(this).css('width'), 10) ) / $(this).attr('width');
                  var marginOffset = Math.floor( (rowHeight - imageHeight) * 0.5 ) + 'px';
                  $(this).css({
                    'margin-top' : marginOffset
                  });
                });

              });
              $(elem).attr('data-width', w );
            }

          }
          resizePhotosetGrid();

          $(window).on("resize", function() {
            resizePhotosetGrid();
          });

        };

        // 默认情况下，插件将等待所有图像加载完成以设置样式
        var waitForImagesLoaded = true;
        var hasDimensions = true;

        // 循环浏览照片集中的所有图像
        // 如果所有图像都存在高度和宽度，则将waitForImagesLoaded设置为false
        $(elem).find('img').each(function(){
          hasDimensions = hasDimensions & ( !!$(this).attr('height') & !!$(this).attr('width') );
        });

        waitForImagesLoaded = !hasDimensions;

        // 如果waitForImagesLoaded仅使用imagesLoaded（）
        if(waitForImagesLoaded) {
          $(elem).imagesLoaded(function(){
            setupStyles(waitForImagesLoaded);
            $this._callback(elem);
          });
        } else {
          setupStyles(waitForImagesLoaded);
          $this._callback(elem);
        }


      }

    };

    // 构造函数周围的插件包装
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
        }
      });
    };

    /*!
     * jQuery imagesLoaded plugin v2.1.1
     * http://github.com/desandro/imagesloaded
     *
     * MIT License. by Paul Irish et al.
     */

    /*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
    /*global jQuery: false */

    // blank image data-uri bypasses webkit log warning (thx doug jones)
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    $.fn.imagesLoaded = function( callback ) {
      var $this = this,
        deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
        hasNotify = $.isFunction(deferred.notify),
        $images = $this.find('img').add( $this.filter('img') ),
        loaded = [],
        proper = [],
        broken = [];

      // Register deferred callbacks
      if ($.isPlainObject(callback)) {
        $.each(callback, function (key, value) {
          if (key === 'callback') {
            callback = value;
          } else if (deferred) {
            deferred[key](value);
          }
        });
      }

      function doneLoading() {
        var $proper = $(proper),
          $broken = $(broken);

        if ( deferred ) {
          if ( broken.length ) {
            deferred.reject( $images, $proper, $broken );
          } else {
            deferred.resolve( $images );
          }
        }

        if ( $.isFunction( callback ) ) {
          callback.call( $this, $images, $proper, $broken );
        }
      }

      function imgLoadedHandler( event ) {
        imgLoaded( event.target, event.type === 'error' );
      }

      function imgLoaded( img, isBroken ) {
        // don't proceed if BLANK image, or image is already loaded
        if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
          return;
        }

        // store element in loaded images array
        loaded.push( img );

        // keep track of broken and properly loaded images
        if ( isBroken ) {
          broken.push( img );
        } else {
          proper.push( img );
        }

        // cache image and its state for future calls
        $.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

        // trigger deferred progress method if present
        if ( hasNotify ) {
          deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
        }

        // call doneLoading and clean listeners if all images are loaded
        if ( $images.length === loaded.length ) {
          setTimeout( doneLoading );
          $images.unbind( '.imagesLoaded', imgLoadedHandler );
        }
      }

      // if no images, trigger immediately
      if ( !$images.length ) {
        doneLoading();
      } else {
        $images.bind( 'load.imagesLoaded error.imagesLoaded', imgLoadedHandler )
        .each( function( i, el ) {
          var src = el.src;

          // find out if this image has been already checked for status
          // if it was, and src has not changed, call imgLoaded on it
          var cached = $.data( el, 'imagesLoaded' );
          if ( cached && cached.src === src ) {
            imgLoaded( el, cached.isBroken );
            return;
          }

          // if complete is true and browser supports natural sizes, try
          // to check for image status manually
          if ( el.complete && el.naturalWidth !== undefined ) {
            imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
            return;
          }

          // cached images don't fire load sometimes, so we reset src, but only when
          // dealing with IE, or image is complete (loaded) and failed manual check
          // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
          if ( el.readyState || el.complete ) {
            el.src = BLANK;
            el.src = src;
          }
        });
      }

      return deferred ? deferred.promise( $this ) : $this;
    };

    /*
     * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
     *
     * latest version and complete README available on Github:
     * https://github.com/louisremi/jquery-smartresize
     *
     * Copyright 2012 @louis_remi
     * Licensed under the MIT license.
     *
     * This saved you an hour of work?
     * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
     */

    var $event = $.event,
      $special,
      dummy = {_:0},
      frame = 0,
      wasResized, animRunning;

    $special = $event.special.throttledresize = {
      setup: function() {
        $( this ).on( "resize", $special.handler );
      },
      teardown: function() {
        $( this ).off( "resize", $special.handler );
      },
      handler: function( event, execAsap ) {
        // Save the context
        var context = this,
          args = arguments;

        wasResized = true;

        if ( !animRunning ) {
          setInterval(function(){
            frame++;

            if ( frame > $special.threshold && wasResized || execAsap ) {
              // set correct event type
              event.type = "throttledresize";
              $event.dispatch.apply( context, args );
              wasResized = false;
              frame = 0;
            }
            if ( frame > 9 ) {
              $(dummy).stop();
              animRunning = false;
              frame = 0;
            }
          }, 30);
          animRunning = true;
        }
      },
      threshold: 0
    };


})( jQuery, window, document );

