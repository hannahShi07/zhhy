function showtoast() {
    var toast = document.createElement("div");
    toast.classList="zh-pop zh-toast";
    toast.innerHTML = '<div class="trans-bc"></div>\n' +
        '    <div class="pop-inner">\n' +
        '        <span class="iconfont icon-duigou"></span>\n' +
        '        <p class="txt">已提交</p>\n' +
        '    </div>';
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.parentNode.removeChild(toast);
        toast = null;
    }, 1500);

    toast.addEventListener("tap",function () {
        toast.parentNode.removeChild(toast);
        toast = null;
    })
}

/***** 关注 *****/
function collect(obj) {
    if(obj.classList.contains("actived")){
        obj.classList.remove("actived");
        obj.getElementsByTagName("p")[0].innerText = "关注";
    }else{
        mui(".selectgroup ")[0].style.display = "block";
        mui("body")[0].style.overflow = "hidden";
        obj.classList.add("actived");
        obj.getElementsByTagName("p")[0].innerText = "已关注";
    }
}
/*分组弹框*/
function showgroupinput(obj) {
    var gInput = obj.parentNode.getElementsByClassName("newg-input")[0];
    obj.style.display = "none";
    gInput.style.display = "block";
}
function confirmg(obj) {
    var optbox = obj.parentNode.parentNode.getElementsByClassName("newg-opt")[0];
    var gInput = obj.parentNode;
    gInput.style.display = "none";
    optbox.style.display = "block";
}

(function ($) {
    var chevronLen =  $(".right-chevron-btn").length;
    for(var i=0;i<chevronLen;i++){
        $(".right-chevron-btn")[i].addEventListener("tap",function () {
            var box = this.parentNode.parentNode;
            var drawer = box.getElementsByClassName("zh-table-view-chevron")[0];
            if(this.classList.contains("actived")){
                drawer.style.display = "none";
                this.classList.remove("actived")
            }else{
                drawer.style.display = "block";
                this.classList.add("actived")
            }
        })
    }
})(mui);
mui("body").on("tap", ".pop-btn-block .btn", function () {
    this.parentNode.parentNode.parentNode.style.display = "none";
    mui("body")[0].style.overflow = "auto";
})
mui("body").on("tap", ".zh-pop .trans-bc", function () {
    this.parentNode.style.display = "none"
})
window.onload = function () {
    var aniShow = "pop-in";
    //a标签点击事件
    mui('body').on('tap', 'a', function() {
        if(this.classList.contains('mui-action-back')==false&&this.classList.contains('noLink')==false){
            var id = this.getAttribute("data-wid");
            if(!id) {
                id = this.getAttribute('href');
            }
            var href = this.getAttribute('href');

            //非plus环境，直接走href跳转
            if(!mui.os.plus){
                location.href = href;
                return;
            }

            var titleType = this.getAttribute("data-title-type");

            var webview_style = {
                popGesture: "close"
            }
            var extras = {};


            if(titleType == "native") {
                webview_style.statusbar = {
                    background: "#f7f7f7"
                }

                mui.openWindowWithTitle({
                    url:href,
                    id:id,
                    styles:webview_style,
                    show:{
                        event:"loaded",
                        extras:extras
                    },
                    waiting: {
                        autoShow: false
                    }
                },{
                    title:{
                        text:this.innerText.trim()
                    },
                    back:{
                        image:{
                            base64Data:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII="
                        }
                    }
                });
            } else if(href && ~href.indexOf('.html')) {
                var extras = {};
                if(titleType && titleType=="transparent_native") {
                    webview_style.titleNView = {
                        'backgroundColor': '#f7f7f7',
                        'titleText': this.innerHTML.trim(),
                        'titleColor': '#000000',
                        type: 'transparent',
                        autoBackButton: true,
                        splitLine: {
                            color: '#cccccc'
                        }
                    }
                }else {
                    webview_style.statusbar = {
                        background: "#f7f7f7"
                    }
                }

                var webview = plus.webview.create(this.href,id,webview_style,extras);
                webview.addEventListener("titleUpdate",function () {
                    setTimeout(function () {
                        webview.show(aniShow,150);
                    },100);
                });
            }
        }

    });

};


