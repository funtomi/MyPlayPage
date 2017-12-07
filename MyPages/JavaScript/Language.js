var dict = {};

$(function () {
    registerWords();
    setLanguage("en");

    $("#enBtn").bind("click", function () {
        setLanguage("en");
    });

    $("#zhBtn").bind("click", function () {
        setLanguage("zh");
    });

});

function setLanguage(lang) {
    setCookie("lang=" + lang + "; path=/;");
    translate();
}

function getCookieVal(name) {
    var items = document.cookie.split(";");
    for (var i in items) {
        var cookie = $.trim(items[i]);
        var eqIdx = cookie.indexOf("=");
        var key = cookie.substring(0, eqIdx);
        if (name == $.trim(key)) {
            return $.trim(cookie.substring(eqIdx + 1));
        }
    }
    return null;
}

function setCookie(cookie) {
    document.cookie = cookie;
}

function translate() {
    loadDict();

    $("[lang]").each(function () {
        switch (this.tagName.toLowerCase()) {
            case "input":
                $(this).val(__tr($(this).attr("lang")));
                break;
            default:
                $(this).text(__tr($(this).attr("lang")));
        }
    });
}

function __tr(src) {
    return (dict[src] || src);
}

function loadDict() {
    var lang = (getCookieVal("lang") || "en");
    $.getJSON(lang + ".json", function (data) {
        $.ajax({
            async: false,
            type: "GET",
            url: lang + ".json",
            dataType: "json",
            success: function (msg) {
                alert("success");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    });
    //    dict = eval("(" + msg + ")");
    //    alert("success");
    //});
    //$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", function (data) {
    //    alert("success");
    //    $.each(data.items, function (i, item) {
    //        $("<img/>").attr("src", item.media.m).appendTo("#images");
    //        if (i == 3) return false;
    //    });
//});
    //});
}

function registerWords() {
    $("[lang]").each(function () {
        switch (this.tagName.toLowerCase()) {
            case "input":
                $(this).attr("lang", $(this).val());
                break;
            default:
                $(this).attr("lang", $(this).text());
        }
    });
}