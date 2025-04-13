$(function(){

  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $('.hamburger').on('click', function() {
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });
  // メニューのリンクをクリックした時
  $('#navi a').on('click', function() {
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });

  /*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  $('a[href^="#"]').click(function(){
    // リンクを取得
    let href= $(this).attr("href");
    // ジャンプ先のid名をセット
    let target = $(href == "#" || href == "" ? 'html' : href);
    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    $("html, body").animate({scrollTop:position}, 600, "swing");
    return false;
  });

  /*=================================================
  フェード表示
  ===================================================*/
  $(".inview").on("inview", function (event, isInView) {
    if (isInView) {
      // 要素（inviewクラス）が表示されたらshowクラスを追加する
      $(this).stop().addClass("show");
    }
  });

  /*=================================================
  スクロール時のイベント
  ===================================================*/
  $(window).scroll(function() {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();

    /*=================================================
    メインビジュアルの拡大・縮小
    ===================================================*/
    mv_scale(scroll);

    /*=================================================
    ロゴ、ハンバーガーメニューの表示
    ===================================================*/
    // スクロール位置が520pxを超えた場合
    if (scroll > 520) {
      // ロゴとハンバーガ―メニュをfadeInで表示する
      $('.logo').fadeIn(500);
      $('.hamburger').fadeIn(500);
    // スクロール位置が520px未満の場合
    } else {
      // ロゴとハンバーガ―メニュをfadeOutで非表示にする
      $('.logo').fadeOut(500);
      $('.hamburger').fadeOut(500);
    }

    /*=================================================
    サイドボタンを表示
    ===================================================*/
    // 画面下から#galleryまでの距離を取得
    let gallery_position = $('#gallery').offset().top - $(window).height();
    // 画面下から#accessまでの距離を取得
    let access_position = $('#access').offset().top - $(window).height();

    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
    if (window.innerWidth > 900) {
      // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
      if(scroll > gallery_position){
        // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
        if(scroll < access_position){
          $('#side-btn').css({
            'transform': 'rotate(-90deg) translateY(0)'
          });
        // #accessが表示されたら、#side-btnをスライドさせて非表示にする
        } else {
          $('#side-btn').css({
            'transform': 'rotate(-90deg) translateY(60px)'
          });
        }
      // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
      } else {
        $('#side-btn').css({
          'transform': 'rotate(-90deg) translateY(60px)'
        });
      }
    }

    /*=================================================
    Accessの背景画像を表示
    ===================================================*/
    // 画面下から#contactまでの距離を取得
    let contact_position = $('#contact').offset().top - $(window).height();

    // #accessが表示された場合
    if(scroll > access_position){
      // #contactが表示されるまでの間は、背景画像をfadeInで表示する
      if(scroll < contact_position){
        $('.bg').fadeIn(500);
      } else {
        $('.bg').fadeOut(500);
      }
    // #accessが表示される前の場合
    } else {
      // 背景画像を表示しない
      $('.bg').fadeOut(500);
    }
  });

  /*=================================================
  画面読み込み時と画面幅変更時のイベント
  ===================================================*/
  $(window).on('load resize', function() {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();

    /*=================================================
    メインビジュアルの拡大・縮小
    ===================================================*/
    mv_scale(scroll);
  });
});

/*=================================================
ハンバーガ―メニュー（共通処理）
===================================================*/
// ハンバーガーメニューをクリックした時とメニュー内のリンクをクリックした時の
// 処理が同じなので処理を共通化する
function hamburger() {
  // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
  // 存在しない場合を追加する処理を自動で行ってくれる
  $('.hamburger').toggleClass('active');

  if ($('.hamburger').hasClass('active')) {
    // hamburgerクラスにactiveクラスが存在する場合は、naviにもactiveクラスを追加する
    $('#navi').addClass('active');
  } else {
    // hamburgerクラスにactiveクラスが存在しない場合は、naviからactiveクラスを削除する
    $('#navi').removeClass('active');
  }
}
$(function(){
  /*=================================================
  画像切り替え
  ===================================================*/
  // サムネイルの画像をホバーした際の処理
  $('#thumbnail img').on('mouseover', function(){

    // ホバーされた画像のパスを取得
    // $(this)はイベントが発生した要素を指すため、1つ目のサムネイルがホバーされた際は1つ目のsrcを、
    // 2つ目のサムネイルがホバーされた際は2つ目のsrcを取得する
    let img_src = $(this).attr("src");

    // メイン画像と同じサムネイルがホバーされた際は画像切り替えを実行しない
    // （メイン画像のsrcとホバーされた画像のsrcが異なる場合のみ実行）
    if($('#mainvisual img').attr("src") != img_src) {

      // メイン画像を0.5秒かけてフェードアウトし、フェードアウトが完了したら
      // メイン画像のsrcをホバーされたサムネイルのsrcに変更して
      // メイン画像を0.5秒かけてフェードインする
      // ※「フェードアウトが完了した後に実行」のように、何かの処理が終わったあとに実行させたい場合は、
      // 今回のようのコールバック関数を使用します。詳しくは「コールバック関数」で調べてみてください
      $('#mainvisual img').fadeOut(500, function() {
        $("#mainvisual img").attr({src:img_src});
        $("#mainvisual img").fadeIn(500);
      })
    }
  });
});
$(function(){
  /*=================================================
  画像切り替え
  ===================================================*/
document.getElementById('#mainvisual img').addEventListener('mouseover', function() {
  let details = this.querySelector(".details");
  details.innerHTML = "これは動的に追加された詳細情報です！";
});
});
