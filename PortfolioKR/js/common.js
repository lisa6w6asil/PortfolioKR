//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 1000) { // 上から400pxスクロールしたら
        $('#page-top').removeClass('DownMove'); // #page-topについているDownMoveというクラス名を除く
        $('#page-top').addClass('UpMove'); // #page-topについているUpMoveというクラス名を付与
    } else {
        if ($('#page-top').hasClass('UpMove')) { // すでに#page-topにUpMoveというクラス名がついていたら
            $('#page-top').removeClass('UpMove'); // UpMoveというクラス名を除き
            $('#page-top').addClass('DownMove'); // DownMoveというクラス名を#page-topに付与
        }
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0 // ページトップまでスクロール
    }, 500, function() {
        // アニメーション終了後にボタンを消す
        $('#page-top').removeClass('UpMove').addClass('DownMove');
    }); // ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false; // リンク自体の無効化
});

//カーソルについて

// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor');
var mouseX = 0;
var mouseY = 0;
var posX = 0;
var posY = 0;

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// アニメーションフレームを使用してスムーズに追従
function updateCursor() {
    posX += (mouseX - posX) * 0.5;
    posY += (mouseY - posY) * 0.5;
    cursor.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');
    });
}

// svg円アニメーション

$(window).on('load resize', function () {
    jQuery(function($) {
        function circle() {
            var css, rules, value;

            // styleタグを作成する
            css = document.createElement('style');
            css.media = 'screen';
            css.type = 'text/css';

            // サイズの設定
            var e_width = $('.js_piechart').width();
            var e_width_half = e_width / 2;
            var e_circle_width = e_width * Math.PI;

            $('.pie_chart').attr({
                width: e_width,
                height: e_width,
            });

            $('circle').attr({
                cx: e_width_half,
                cy: e_width_half,
                r: e_width_half - 1,
            });

            var i = 1;
            const list = document.querySelectorAll('.js_piechart');
            var arrayList = [].slice.call(list);

            arrayList.forEach(function(val, index) {
                // パーセントの計算
                var num = val.dataset.chartval * (e_circle_width / 100);
                value = '@keyframes circle' + i + '{' + [
                    '0% {stroke-dasharray: 0 ' + e_circle_width + '; stroke: #84B5C5}',
                    '100% {stroke-dasharray: ' + num + ' ' + e_circle_width + '; stroke: #84B5C5}'
                ].join(' ') + '}';

                // ルールをstyleタグに追加
                rules = document.createTextNode(value);
                css.appendChild(rules);
                i++;
            });

            // head内に作成したstyleを追加
            document.getElementsByTagName('head')[0].appendChild(css);

            // ホバー時にアニメーションを追加
            $('.js_piechart').hover(
                function() {
                    var index = $(this).index('.js_piechart') + 1;
                    $(this).addClass('hovered');
                    $(this).find('.pie_chart.fg circle').css('animation', 'circle' + index + ' 1s ease forwards');
                },
                function() {
                    $(this).removeClass('hovered');
                    $(this).find('.pie_chart.fg circle').css('animation', 'none'); // アニメーションをリセット
                }
            );
        }
        circle();
    });
});


//カーソルについて

// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor');
var mouseX = 0;
var mouseY = 0;
var posX = 0;
var posY = 0;

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// アニメーションフレームを使用してスムーズに追従
function updateCursor() {
    posX += (mouseX - posX) * 0.5;
    posY += (mouseY - posY) * 0.5;
    cursor.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
        cursor.classList.add('cursor--hover');
    });
    link[i].addEventListener('mouseout', function (e) {
        cursor.classList.remove('cursor--hover');
    });
}


//fadeUPについて

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

    // ふわっ
    $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
            var elemPos = $(this).offset().top+100;//要素より、50px上の
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight){
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
            }
        });

    $('.fadeInTrigger').each(function(){
        var elemPos = $(this).offset().top+100;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeIn');
        }
    });

}


  // 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function(){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述




// TOP PAGE

document.addEventListener("DOMContentLoaded", function() {
    const mainVisual = document.querySelector('.top__MV img');
    const logoSpans = document.querySelectorAll('.top__logo-text h1 span');
    const logoSubText = document.querySelector('.logo-sub-text');
    const navItems = document.querySelectorAll('.top__header-nav01 ul li');
    const scrollIllust = document.querySelectorAll('.scroll-illust');

    // メインビジュアルのアニメーション
    setTimeout(() => {
        mainVisual.classList.add('visible');
    }, 500); // 0.5秒後にメインビジュアルを表示

    // メインビジュアルが表示されてからロゴのアニメーションを開始
    setTimeout(() => {
        logoSpans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('visible');
            }, index * 80); // 各スパンを0.08秒間隔で表示
        });
    }, 1000); // メインビジュアルが表示されてから0.5秒後にロゴを表示

    // logo-sub-textのアニメーション（ロゴのアニメーション完了後）
    setTimeout(() => {
        logoSubText.classList.add('visible');
    }, 1000 + logoSpans.length * 80); // ロゴが表示完了してからすぐにlogo-sub-textを表示

    // ナビゲーションのアニメーション（logo-sub-textのアニメーション完了後）
    setTimeout(() => {
        navItems.forEach(item => {
            item.classList.add('visible');
        });
    }, 1000 + logoSpans.length * 80 + 500); // logo-sub-textが表示完了してからすぐにナビゲーションを表示

    // ナビゲーションのアニメーション（logo-sub-textのアニメーション完了後）
    setTimeout(() => {
        scrollIllust.forEach(item => {
            item.classList.add('visible');
        });
    }, 1000 + logoSpans.length * 80 + 500); // logo-sub-textが表示完了してからすぐにナビゲーションを表示
});


// タブの切り替え（spが出ない問題を解決させる）

// すべてのエリアを非表示にする関数
function showArea(areaId) {
    document.getElementById('pc').style.display = 'none';
    document.getElementById('sp').style.display = 'none';

    // 選択したエリアを表示
    document.getElementById(areaId).style.display = 'block';

    // SPエリアが表示されたときだけスライダーを再初期化
    if (areaId === 'sp') {
        initSlickSlider();
    }
}


// スライダーの初期化関数
function initSlickSlider() {
    // もしすでに初期化されている場合は破棄
    if ($('.sp-scroll').hasClass('slick-initialized')) {
        $('.sp-scroll').slick('unslick');
    }

    // SPスクロールエリアにスライダーを適用
    $('.sp-scroll').slick({
        arrows: false,
        dots: false, // 必要に応じてオプションを指定
    });
}

// ページが読み込まれたとき、PCのスライダーを初期化
$(document).ready(function() {
    $('.pc-scroll').slick({
        arrows: false,
        dots: false,
    });
});


// 手動矢印pc
document.querySelector('.left-arrow').addEventListener('click', function() {
    $('.pc-scroll').slick('slickPrev'); // slick slider の前のスライドに移動
});

document.querySelector('.right-arrow').addEventListener('click', function() {
    $('.pc-scroll').slick('slickNext'); // slick slider の次のスライドに移動
});


    // 初期状態で1つ目のドットをアクティブにする
$('.custom-dots .dot').first().addClass('active');

// ドットナビゲーションのクリックイベント
$('.custom-dots .dot').click(function(){
    var slideIndex = $(this).data('slide');
    $('.pc-scroll').slick('slickGoTo', slideIndex);
});

// 左矢印クリックイベント（前のスライドに移動）
$('.left-arrow').click(function(){
    $('.pc-scroll').slick('slickPrev');
    updateActiveDot();
});

// 右矢印クリックイベント（次のスライドに移動）
$('.right-arrow').click(function(){
    $('.pc-scroll').slick('slickNext');
    updateActiveDot();
});

// スライドが切り替わった時にドットのアクティブ状態を更新
$('.pc-scroll').on('afterChange', function(event, slick, currentSlide){
    updateActiveDot(currentSlide);
});

// ドットのアクティブ状態を更新する関数
function updateActiveDot(currentSlide) {
    var currentIndex = currentSlide !== undefined ? currentSlide : $('.pc-scroll').slick('slickCurrentSlide');
    $('.custom-dots .dot').removeClass('active');
    $('.custom-dots .dot[data-slide="' + currentIndex + '"]').addClass('active');
}




// 手動矢印sp

document.querySelector('.left-arrow-sp').addEventListener('click', function() {
    $('.sp-scroll').slick('slickPrev'); // slick slider の前のスライドに移動
});

document.querySelector('.right-arrow-sp').addEventListener('click', function() {
    $('.sp-scroll').slick('slickNext'); // slick slider の次のスライドに移動
});

// 手動ドットsp

// 初期状態で1つ目のドットをアクティブにする
$('.custom-dots-sp .dot-sp').first().addClass('active');

// ドットナビゲーションのクリックイベント
$('.custom-dots-sp .dot-sp').click(function(){
    var slideIndex = $(this).data('slide');
    $('.sp-scroll').slick('slickGoTo', slideIndex);
});

// 左矢印クリックイベント（前のスライドに移動）
$('.left-arrow-sp').click(function(){
    $('.sp-scroll').slick('slickPrev');
    updateActiveDotSp();
});

// 右矢印クリックイベント（次のスライドに移動）
$('.right-arrow-sp').click(function(){
    $('.sp-scroll').slick('slickNext');
    updateActiveDotSp();
});

// スライドが切り替わった時にドットのアクティブ状態を更新
$('.sp-scroll').on('afterChange', function(event, slick, currentSlide){
    updateActiveDotSp(currentSlide);
});

// ドットのアクティブ状態を更新する関数
function updateActiveDotSp(currentSlide) {
    var currentIndex = currentSlide !== undefined ? currentSlide : $('.sp-scroll').slick('slickCurrentSlide');
    $('.custom-dots-sp .dot-sp').removeClass('active');
    $('.custom-dots-sp .dot-sp[data-slide="' + currentIndex + '"]').addClass('active');
}


function switchTab(element) {
    // すべてのタブのアクティブクラスを削除
    var tabs = document.querySelectorAll('.tab a');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    // クリックされたタブにアクティブクラスを追加
    element.classList.add('active');
}