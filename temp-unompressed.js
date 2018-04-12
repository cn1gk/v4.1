var App = function() {
    var t, e = !1,
        o = !1,
        a = !1,
        i = !1,
        n = [],
        l = "../assets/",
        s = "global/img/",
        r = "global/plugins/",
        c = "global/css/",
        d = {
            blue: "#89C4F4",
            red: "#F3565D",
            green: "#1bbc9b",
            purple: "#9b59b6",
            grey: "#95a5a6",
            yellow: "#F8CB00"
        },
        p = function() {
            "rtl" === $("body").css("direction") && (e = !0), o = !!navigator.userAgent.match(/MSIE 8.0/), a = !!navigator.userAgent.match(/MSIE 9.0/), i = !!navigator.userAgent.match(/MSIE 10.0/), i && $("html").addClass("ie10"), (i || a || o) && $("html").addClass("ie")
        },
        h = function() {
            for (var t = 0; t < n.length; t++) {
                var e = n[t];
                e.call()
            }
        },
        u = function() {
            var t;
            if (o) {
                var e;
                $(window).resize(function() {
                    e != document.documentElement.clientHeight && (t && clearTimeout(t), t = setTimeout(function() {
                        h()
                    }, 50), e = document.documentElement.clientHeight)
                })
            } else $(window).resize(function() {
                t && clearTimeout(t), t = setTimeout(function() {
                    h()
                }, 50)
            })
        },
        f = function() {
            $("body").on("click", ".portlet > .portlet-title > .tools > a.remove", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet");
                $("body").hasClass("page-portlet-fullscreen") && $("body").removeClass("page-portlet-fullscreen"), e.find(".portlet-title .fullscreen").tooltip("destroy"), e.find(".portlet-title > .tools > .reload").tooltip("destroy"), e.find(".portlet-title > .tools > .remove").tooltip("destroy"), e.find(".portlet-title > .tools > .config").tooltip("destroy"), e.find(".portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip("destroy"), e.remove()
            }), $("body").on("click", ".portlet > .portlet-title .fullscreen", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet");
                if (e.hasClass("portlet-fullscreen")) $(this).removeClass("on"), e.removeClass("portlet-fullscreen"), $("body").removeClass("page-portlet-fullscreen"), e.children(".portlet-body").css("height", "auto");
                else {
                    var o = App.getViewPort().height - e.children(".portlet-title").outerHeight() - parseInt(e.children(".portlet-body").css("padding-top")) - parseInt(e.children(".portlet-body").css("padding-bottom"));
                    $(this).addClass("on"), e.addClass("portlet-fullscreen"), $("body").addClass("page-portlet-fullscreen"), e.children(".portlet-body").css("height", o)
                }
            }), $("body").on("click", ".portlet > .portlet-title > .tools > a.reload", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet").children(".portlet-body"),
                    o = $(this).attr("data-url"),
                    a = $(this).attr("data-error-display");
                o ? (App.blockUI({
                    target: e,
                    animate: !0,
                    overlayColor: "none"
                }), $.ajax({
                    type: "GET",
                    cache: !1,
                    url: o,
                    dataType: "html",
                    success: function(t) {
                        App.unblockUI(e), e.html(t), App.initAjax()
                    },
                    error: function(t, o, i) {
                        App.unblockUI(e);
                        var n = "Error on reloading the content. Please check your connection and try again.";
                        "toastr" == a && toastr ? toastr.error(n) : "notific8" == a && $.notific8 ? ($.notific8("zindex", 11500), $.notific8(n, {
                            theme: "ruby",
                            life: 3e3
                        })) : alert(n)
                    }
                })) : (App.blockUI({
                    target: e,
                    animate: !0,
                    overlayColor: "none"
                }), window.setTimeout(function() {
                    App.unblockUI(e)
                }, 1e3))
            }), $('.portlet .portlet-title a.reload[data-load="true"]').click(), $("body").on("click", ".portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand", function(t) {
                t.preventDefault();
                var e = $(this).closest(".portlet").children(".portlet-body");
                $(this).hasClass("collapse") ? ($(this).removeClass("collapse").addClass("expand"), e.slideUp(200)) : ($(this).removeClass("expand").addClass("collapse"), e.slideDown(200))
            })
        },
        b = function() {
            if ($("body").on("click", ".md-checkbox > label, .md-radio > label", function() {
                    var t = $(this),
                        e = $(this).children("span:first-child");
                    e.addClass("inc");
                    var o = e.clone(!0);
                    e.before(o), $("." + e.attr("class") + ":last", t).remove()
                }), $("body").hasClass("page-md")) {
                var t, e, o, a, i;
                $("body").on("click", "a.btn, button.btn, input.btn, label.btn", function(n) {
                    t = $(this), 0 == t.find(".md-click-circle").length && t.prepend("<span class='md-click-circle'></span>"), e = t.find(".md-click-circle"), e.removeClass("md-click-animate"), e.height() || e.width() || (o = Math.max(t.outerWidth(), t.outerHeight()), e.css({
                        height: o,
                        width: o
                    })), a = n.pageX - t.offset().left - e.width() / 2, i = n.pageY - t.offset().top - e.height() / 2, e.css({
                        top: i + "px",
                        left: a + "px"
                    }).addClass("md-click-animate"), setTimeout(function() {
                        e.remove()
                    }, 1e3)
                })
            }
            var n = function(t) {
                "" != t.val() ? t.addClass("edited") : t.removeClass("edited")
            };
            $("body").on("keydown", ".form-md-floating-label .form-control", function(t) {
                n($(this))
            }), $("body").on("blur", ".form-md-floating-label .form-control", function(t) {
                n($(this))
            }), $(".form-md-floating-label .form-control").each(function() {
                $(this).val().length > 0 && $(this).addClass("edited")
            })
        },
        g = function() {
            $().iCheck && $(".icheck").each(function() {
                var t = $(this).attr("data-checkbox") ? $(this).attr("data-checkbox") : "icheckbox_minimal-grey",
                    e = $(this).attr("data-radio") ? $(this).attr("data-radio") : "iradio_minimal-grey";
                t.indexOf("_line") > -1 || e.indexOf("_line") > -1 ? $(this).iCheck({
                    checkboxClass: t,
                    radioClass: e,
                    insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                }) : $(this).iCheck({
                    checkboxClass: t,
                    radioClass: e
                })
            })
        },
        m = function() {
            $().bootstrapSwitch && $(".make-switch").bootstrapSwitch()
        },
        v = function() {
            $().confirmation && $("[data-toggle=confirmation]").confirmation({
                btnOkClass: "btn btn-sm btn-success",
                btnCancelClass: "btn btn-sm btn-danger"
            })
        },
        y = function() {
            $("body").on("shown.bs.collapse", ".accordion.scrollable", function(t) {
                App.scrollTo($(t.target))
            })
        },
        C = function() {
            if (encodeURI(location.hash)) {
                var t = encodeURI(location.hash.substr(1));
                $('a[href="#' + t + '"]').parents(".tab-pane:hidden").each(function() {
                    var t = $(this).attr("id");
                    $('a[href="#' + t + '"]').click()
                }), $('a[href="#' + t + '"]').click()
            }
            $().tabdrop && $(".tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs").tabdrop({
                text: '<i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i>'
            })
        },
        x = function() {
            $("body").on("hide.bs.modal", function() {
                $(".modal:visible").size() > 1 && $("html").hasClass("modal-open") === !1 ? $("html").addClass("modal-open") : $(".modal:visible").size() <= 1 && $("html").removeClass("modal-open")
            }), $("body").on("show.bs.modal", ".modal", function() {
                $(this).hasClass("modal-scroll") && $("body").addClass("modal-open-noscroll")
            }), $("body").on("hidden.bs.modal", ".modal", function() {
                $("body").removeClass("modal-open-noscroll")
            }), $("body").on("hidden.bs.modal", ".modal:not(.modal-cached)", function() {
                $(this).removeData("bs.modal")
            })
        },
        w = function() {
            $(".tooltips").tooltip(), $(".portlet > .portlet-title .fullscreen").tooltip({
                trigger: "hover",
                container: "body",
                title: "Fullscreen"
            }), $(".portlet > .portlet-title > .tools > .reload").tooltip({
                trigger: "hover",
                container: "body",
                title: "Reload"
            }), $(".portlet > .portlet-title > .tools > .remove").tooltip({
                trigger: "hover",
                container: "body",
                title: "Remove"
            }), $(".portlet > .portlet-title > .tools > .config").tooltip({
                trigger: "hover",
                container: "body",
                title: "Settings"
            }), $(".portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip({
                trigger: "hover",
                container: "body",
                title: "Collapse/Expand"
            })
        },
        k = function() {
            $("body").on("click", ".dropdown-menu.hold-on-click", function(t) {
                t.stopPropagation()
            })
        },
        I = function() {
            $("body").on("click", '[data-close="alert"]', function(t) {
                $(this).parent(".alert").hide(), $(this).closest(".note").hide(), t.preventDefault()
            }), $("body").on("click", '[data-close="note"]', function(t) {
                $(this).closest(".note").hide(), t.preventDefault()
            }), $("body").on("click", '[data-remove="note"]', function(t) {
                $(this).closest(".note").remove(), t.preventDefault()
            })
        },
        A = function() {
            $('[data-hover="dropdown"]').not(".hover-initialized").each(function() {
                $(this).dropdownHover(), $(this).addClass("hover-initialized")
            })
        },
        z = function() {
            "function" == typeof autosize && autosize(document.querySelector("textarea.autosizeme"))
        },
        S = function() {
            $(".popovers").popover(), $(document).on("click.bs.popover.data-api", function(e) {
                t && t.popover("hide")
            })
        },
        P = function() {
            App.initSlimScroll(".scroller")
        },
        T = function() {
            jQuery.fancybox && $(".fancybox-button").size() > 0 && $(".fancybox-button").fancybox({
                groupAttr: "data-rel",
                prevEffect: "none",
                nextEffect: "none",
                closeBtn: !0,
                helpers: {
                    title: {
                        type: "inside"
                    }
                }
            })
        },
        D = function() {
            $().counterUp && $("[data-counter='counterup']").counterUp({
                delay: 10,
                time: 1e3
            })
        },
        U = function() {
            (o || a) && $("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function() {
                var t = $(this);
                "" === t.val() && "" !== t.attr("placeholder") && t.addClass("placeholder").val(t.attr("placeholder")), t.focus(function() {
                    t.val() == t.attr("placeholder") && t.val("")
                }), t.blur(function() {
                    "" !== t.val() && t.val() != t.attr("placeholder") || t.val(t.attr("placeholder"))
                })
            })
        },
        E = function() {
            $().select2 && ($.fn.select2.defaults.set("theme", "bootstrap"), $(".select2me").select2({
                placeholder: "Select",
                width: "auto",
                allowClear: !0
            }))
        },
        G = function() {
            $("[data-auto-height]").each(function() {
                var t = $(this),
                    e = $("[data-height]", t),
                    o = 0,
                    a = t.attr("data-mode"),
                    i = parseInt(t.attr("data-offset") ? t.attr("data-offset") : 0);
                e.each(function() {
                    "height" == $(this).attr("data-height") ? $(this).css("height", "") : $(this).css("min-height", "");
                    var t = "base-height" == a ? $(this).outerHeight() : $(this).outerHeight(!0);
                    t > o && (o = t)
                }), o += i, e.each(function() {
                    "height" == $(this).attr("data-height") ? $(this).css("height", o) : $(this).css("min-height", o)
                }), t.attr("data-related") && $(t.attr("data-related")).css("height", t.height())
            })
        };
    return {
        init: function() {
            p(), u(), b(), g(), m(), P(), T(), E(), f(), I(), k(), C(), w(), S(), y(), x(), v(), z(), D(), this.addResizeHandler(G), U()
        },
        initAjax: function() {
            g(), m(), A(), P(), E(), T(), k(), w(), S(), y(), v()
        },
        initComponents: function() {
            this.initAjax()
        },
        setLastPopedPopover: function(e) {
            t = e
        },
        addResizeHandler: function(t) {
            n.push(t)
        },
        runResizeHandlers: function() {
            h()
        },
        scrollTo: function(t, e) {
            var o = t && t.size() > 0 ? t.offset().top : 0;
            t && ($("body").hasClass("page-header-fixed") ? o -= $(".page-header").height() : $("body").hasClass("page-header-top-fixed") ? o -= $(".page-header-top").height() : $("body").hasClass("page-header-menu-fixed") && (o -= $(".page-header-menu").height()), o += e ? e : -1 * t.height()), $("html,body").animate({
                scrollTop: o
            }, "slow")
        },
        initSlimScroll: function(t) {
            $().slimScroll && $(t).each(function() {
                if (!$(this).attr("data-initialized")) {
                    var t;
                    t = $(this).attr("data-height") ? $(this).attr("data-height") : $(this).css("height"), $(this).slimScroll({
                        allowPageScroll: !0,
                        size: "7px",
                        color: $(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : "#bbb",
                        wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                        railColor: $(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : "#eaeaea",
                        position: e ? "left" : "right",
                        height: t,
                        alwaysVisible: "1" == $(this).attr("data-always-visible"),
                        railVisible: "1" == $(this).attr("data-rail-visible"),
                        disableFadeOut: !0
                    }), $(this).attr("data-initialized", "1")
                }
            })
        },
        destroySlimScroll: function(t) {
            $().slimScroll && $(t).each(function() {
                if ("1" === $(this).attr("data-initialized")) {
                    $(this).removeAttr("data-initialized"), $(this).removeAttr("style");
                    var t = {};
                    $(this).attr("data-handle-color") && (t["data-handle-color"] = $(this).attr("data-handle-color")), $(this).attr("data-wrapper-class") && (t["data-wrapper-class"] = $(this).attr("data-wrapper-class")), $(this).attr("data-rail-color") && (t["data-rail-color"] = $(this).attr("data-rail-color")), $(this).attr("data-always-visible") && (t["data-always-visible"] = $(this).attr("data-always-visible")), $(this).attr("data-rail-visible") && (t["data-rail-visible"] = $(this).attr("data-rail-visible")), $(this).slimScroll({
                        wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                        destroy: !0
                    });
                    var e = $(this);
                    $.each(t, function(t, o) {
                        e.attr(t, o)
                    })
                }
            })
        },
        scrollTop: function() {
            App.scrollTo()
        },
        blockUI: function(t) {
            t = $.extend(!0, {}, t);
            var e = "";
            if (e = t.animate ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>' : t.iconOnly ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>' : t.textOnly ? '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><span>&nbsp;&nbsp;' + (t.message ? t.message : "LOADING...") + "</span></div>" : '<div class="loading-message ' + (t.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (t.message ? t.message : "LOADING...") + "</span></div>", t.target) {
                var o = $(t.target);
                o.height() <= $(window).height() && (t.cenrerY = !0), o.block({
                    message: e,
                    baseZ: t.zIndex ? t.zIndex : 1e3,
                    centerY: void 0 !== t.cenrerY ? t.cenrerY : !1,
                    css: {
                        top: "10%",
                        border: "0",
                        padding: "0",
                        backgroundColor: "none"
                    },
                    overlayCSS: {
                        backgroundColor: t.overlayColor ? t.overlayColor : "#555",
                        opacity: t.boxed ? .05 : .1,
                        cursor: "wait"
                    }
                })
            } else $.blockUI({
                message: e,
                baseZ: t.zIndex ? t.zIndex : 1e3,
                css: {
                    border: "0",
                    padding: "0",
                    backgroundColor: "none"
                },
                overlayCSS: {
                    backgroundColor: t.overlayColor ? t.overlayColor : "#555",
                    opacity: t.boxed ? .05 : .1,
                    cursor: "wait"
                }
            })
        },
        unblockUI: function(t) {
            t ? $(t).unblock({
                onUnblock: function() {
                    $(t).css("position", ""), $(t).css("zoom", "")
                }
            }) : $.unblockUI()
        },
        startPageLoading: function(t) {
            t && t.animate ? ($(".page-spinner-bar").remove(), $("body").append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')) : ($(".page-loading").remove(), $("body").append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (t && t.message ? t.message : "Loading...") + "</span></div>"))
        },
        stopPageLoading: function() {
            $(".page-loading, .page-spinner-bar").remove()
        },
        alert: function(t) {
            t = $.extend(!0, {
                container: "",
                place: "append",
                type: "success",
                message: "",
                close: !0,
                reset: !0,
                focus: !0,
                closeInSeconds: 0,
                icon: ""
            }, t);
            var e = App.getUniqueID("App_alert"),
                o = '<div id="' + e + '" class="custom-alerts alert alert-' + t.type + ' fade in">' + (t.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== t.icon ? '<i class="fa-lg fa fa-' + t.icon + '"></i>  ' : "") + t.message + "</div>";
            return t.reset && $(".custom-alerts").remove(), t.container ? "append" == t.place ? $(t.container).append(o) : $(t.container).prepend(o) : 1 === $(".page-fixed-main-content").size() ? $(".page-fixed-main-content").prepend(o) : ($("body").hasClass("page-container-bg-solid") || $("body").hasClass("page-content-white")) && 0 === $(".page-head").size() ? $(".page-title").after(o) : $(".page-bar").size() > 0 ? $(".page-bar").after(o) : $(".page-breadcrumb, .breadcrumbs").after(o), t.focus && App.scrollTo($("#" + e)), t.closeInSeconds > 0 && setTimeout(function() {
                $("#" + e).remove()
            }, 1e3 * t.closeInSeconds), e
        },
        initFancybox: function() {
            T()
        },
        getActualVal: function(t) {
            return t = $(t), t.val() === t.attr("placeholder") ? "" : t.val()
        },
        getURLParameter: function(t) {
            var e, o, a = window.location.search.substring(1),
                i = a.split("&");
            for (e = 0; e < i.length; e++)
                if (o = i[e].split("="), o[0] == t) return unescape(o[1]);
            return null
        },
        isTouchDevice: function() {
            try {
                return document.createEvent("TouchEvent"), !0
            } catch (t) {
                return !1
            }
        },
        getViewPort: function() {
            var t = window,
                e = "inner";
            return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
                width: t[e + "Width"],
                height: t[e + "Height"]
            }
        },
        getUniqueID: function(t) {
            return "prefix_" + Math.floor(Math.random() * (new Date).getTime())
        },
        isIE8: function() {
            return o
        },
        isIE9: function() {
            return a
        },
        isRTL: function() {
            return e
        },
        isAngularJsApp: function() {
            return "undefined" != typeof angular
        },
        getAssetsPath: function() {
            return l
        },
        setAssetsPath: function(t) {
            l = t
        },
        setGlobalImgPath: function(t) {
            s = t
        },
        getGlobalImgPath: function() {
            return l + s
        },
        setGlobalPluginsPath: function(t) {
            r = t
        },
        getGlobalPluginsPath: function() {
            return l + r
        },
        getGlobalCssPath: function() {
            return l + c
        },
        getBrandColor: function(t) {
            return d[t] ? d[t] : ""
        },
        getResponsiveBreakpoint: function(t) {
            var e = {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            };
            return e[t] ? e[t] : 0
        }
    }
}();
jQuery(document).ready(function() {
    App.init()
});
var Layout = function() {
    var e = "layouts/layout2/img/",
        a = "layouts/layout2/css/",
        t = App.getResponsiveBreakpoint("md"),
        i = [],
        s = [],
        o = function() {
            var e, a = $(".page-content"),
                i = $(".page-sidebar"),
                s = $("body");
            if (s.hasClass("page-footer-fixed") === !0 && s.hasClass("page-sidebar-fixed") === !1) {
                var o = App.getViewPort().height - $(".page-footer").outerHeight() - $(".page-header").outerHeight();
                a.height() < o && a.attr("style", "min-height:" + o + "px")
            } else {
                if (s.hasClass("page-sidebar-fixed")) e = d(), s.hasClass("page-footer-fixed") === !1 && (e -= $(".page-footer").outerHeight());
                else {
                    var n = $(".page-header").outerHeight(),
                        r = $(".page-footer").outerHeight();
                    e = App.getViewPort().width < t ? App.getViewPort().height - n - r : i.height() + 20, e + n + r <= App.getViewPort().height && (e = App.getViewPort().height - n - r)
                }
                a.attr("style", "min-height:" + e + "px")
            }
        },
        n = function(e, a) {
            var i = location.hash.toLowerCase(),
                s = $(".page-sidebar-menu");
            if ("click" === e || "set" === e ? a = $(a) : "match" === e && s.find("li > a").each(function() {
                    var e = $(this).attr("href").toLowerCase();
                    return e.length > 1 && i.substr(1, e.length - 1) == e.substr(1) ? void(a = $(this)) : void 0
                }), a && 0 != a.size() && "javascript:;" !== a.attr("href").toLowerCase() && "#" !== a.attr("href").toLowerCase()) {
                parseInt(s.data("slide-speed")), s.data("keep-expanded");
                s.hasClass("page-sidebar-menu-hover-submenu") === !1 ? s.find("li.nav-item.open").each(function() {
                    var e = !1;
                    $(this).find("li").each(function() {
                        return $(this).find(" > a").attr("href") === a.attr("href") ? void(e = !0) : void 0
                    }), e !== !0 && ($(this).removeClass("open"), $(this).find("> a > .arrow.open").removeClass("open"), $(this).find("> .sub-menu").slideUp())
                }) : s.find("li.open").removeClass("open"), s.find("li.active").removeClass("active"), s.find("li > a > .selected").remove(), a.parents("li").each(function() {
                    $(this).addClass("active"), $(this).find("> a > span.arrow").addClass("open"), 1 === $(this).parent("ul.page-sidebar-menu").size() && $(this).find("> a").append('<span class="selected"></span>'), 1 === $(this).children("ul.sub-menu").size() && $(this).addClass("open")
                }), "click" === e && App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click()
            }
        },
        r = function() {
            $(".page-sidebar-menu").on("click", "li > a.nav-toggle, li > a > span.nav-toggle", function(e) {
                var a = $(this).closest(".nav-item").children(".nav-link");
                if (!(App.getViewPort().width >= t && !$(".page-sidebar-menu").attr("data-initialized") && $("body").hasClass("page-sidebar-closed") && 1 === a.parent("li").parent(".page-sidebar-menu").size())) {
                    var i = a.next().hasClass("sub-menu");
                    if (!(App.getViewPort().width >= t && 1 === a.parents(".page-sidebar-menu-hover-submenu").size())) {
                        if (i === !1) return void(App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click());
                        var s = a.parent().parent(),
                            n = a,
                            r = $(".page-sidebar-menu"),
                            l = a.next(),
                            d = r.data("auto-scroll"),
                            p = parseInt(r.data("slide-speed")),
                            c = r.data("keep-expanded");
                        c !== !0 && (s.children("li.open").children("a").children(".arrow").removeClass("open"), s.children("li.open").children(".sub-menu:not(.always-open)").slideUp(p), s.children("li.open").removeClass("open"));
                        var h = -200;
                        l.is(":visible") ? ($(".arrow", n).removeClass("open"), n.parent().removeClass("open"), l.slideUp(p, function() {
                            d === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? r.slimScroll({
                                scrollTo: n.position().top
                            }) : App.scrollTo(n, h)), o()
                        })) : i && ($(".arrow", n).addClass("open"), n.parent().addClass("open"), l.slideDown(p, function() {
                            d === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? r.slimScroll({
                                scrollTo: n.position().top
                            }) : App.scrollTo(n, h)), o()
                        })), e.preventDefault()
                    }
                }
            }), App.isAngularJsApp() && $(".page-sidebar-menu li > a").on("click", function(e) {
                App.getViewPort().width < t && $(this).next().hasClass("sub-menu") === !1 && $(".page-header .responsive-toggler").click()
            }), $(".page-sidebar").on("click", " li > a.ajaxify", function(e) {
                e.preventDefault(), App.scrollTop();
                var a = $(this).attr("href"),
                    i = $(".page-sidebar ul");
                i.children("li.active").removeClass("active"), i.children("arrow.open").removeClass("open"), $(this).parents("li").each(function() {
                    $(this).addClass("active"), $(this).children("a > span.arrow").addClass("open")
                }), $(this).parents("li").addClass("active"), App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), Layout.loadAjaxContent(a, $(this))
            }), $(".page-content").on("click", ".ajaxify", function(e) {
                e.preventDefault(), App.scrollTop();
                var a = $(this).attr("href");
                App.startPageLoading(), App.getViewPort().width < t && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), Layout.loadAjaxContent(a)
            }), $(document).on("click", ".page-header-fixed-mobile .page-header .responsive-toggler", function() {
                App.scrollTop()
            }), c(), $(".page-sidebar").on("click", ".sidebar-search .remove", function(e) {
                e.preventDefault(), $(".sidebar-search").removeClass("open")
            }), $(".page-sidebar .sidebar-search").on("keypress", "input.form-control", function(e) {
                return 13 == e.which ? ($(".sidebar-search").submit(), !1) : void 0
            }), $(".sidebar-search .submit").on("click", function(e) {
                e.preventDefault(), $("body").hasClass("page-sidebar-closed") && $(".sidebar-search").hasClass("open") === !1 ? (1 === $(".page-sidebar-fixed").size() && $(".page-sidebar .sidebar-toggler").click(), $(".sidebar-search").addClass("open")) : $(".sidebar-search").submit()
            }), 0 !== $(".sidebar-search").size() && ($(".sidebar-search .input-group").on("click", function(e) {
                e.stopPropagation()
            }), $("body").on("click", function() {
                $(".sidebar-search").hasClass("open") && $(".sidebar-search").removeClass("open")
            }))
        },
        l = function() {
            $(".page-header").on("click", ".search-form", function(e) {
                $(this).addClass("open"), $(this).find(".form-control").focus(), $(".page-header .search-form .form-control").on("blur", function(e) {
                    $(this).closest(".search-form").removeClass("open"), $(this).unbind("blur")
                })
            }), $(".page-header").on("keypress", ".hor-menu .search-form .form-control", function(e) {
                return 13 == e.which ? ($(this).closest(".search-form").submit(), !1) : void 0
            }), $(".page-header").on("mousedown", ".search-form.open .submit", function(e) {
                e.preventDefault(), e.stopPropagation(), $(this).closest(".search-form").submit()
            })
        },
        d = function() {
            var e = App.getViewPort().height - $(".page-header").outerHeight();
            return $("body").hasClass("page-footer-fixed") && (e -= $(".page-footer").outerHeight()), e
        },
        p = function() {
            var e = $(".page-sidebar-menu");
            return App.destroySlimScroll(e), 0 === $(".page-sidebar-fixed").size() ? void o() : void(App.getViewPort().width >= t && (e.attr("data-height", d()), App.initSlimScroll(e), o()))
        },
        c = function() {
            var e = $("body");
            e.hasClass("page-sidebar-fixed") && $(".page-sidebar").on("mouseenter", function() {
                e.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").removeClass("page-sidebar-menu-closed")
            }).on("mouseleave", function() {
                e.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").addClass("page-sidebar-menu-closed")
            })
        },
        h = function() {
            var e = $("body");
            $.cookie && "1" === $.cookie("sidebar_closed") && App.getViewPort().width >= t && ($("body").addClass("page-sidebar-closed"), $(".page-sidebar-menu").addClass("page-sidebar-menu-closed")), $("body").on("click", ".sidebar-toggler", function(a) {
                var t = $(".page-sidebar"),
                    i = $(".page-sidebar-menu");
                $(".sidebar-search", t).removeClass("open"), e.hasClass("page-sidebar-closed") ? (e.removeClass("page-sidebar-closed"), i.removeClass("page-sidebar-menu-closed"), $.cookie && $.cookie("sidebar_closed", "0")) : (e.addClass("page-sidebar-closed"), i.addClass("page-sidebar-menu-closed"), e.hasClass("page-sidebar-fixed") && i.trigger("mouseleave"), $.cookie && $.cookie("sidebar_closed", "1")), $(window).trigger("resize")
            })
        },
        g = function() {
            $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function() {
                o()
            })
        },
        u = function() {
            var e = 300,
                a = 500;
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ? $(window).bind("touchend touchcancel touchleave", function(t) {
                $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
            }) : $(window).scroll(function() {
                $(this).scrollTop() > e ? $(".scroll-to-top").fadeIn(a) : $(".scroll-to-top").fadeOut(a)
            }), $(".scroll-to-top").click(function(e) {
                return e.preventDefault(), $("html, body").animate({
                    scrollTop: 0
                }, a), !1
            })
        },
        f = function() {
            $(".full-height-content").each(function() {
                var e, a = $(this);
                if (e = App.getViewPort().height - $(".page-header").outerHeight(!0) - $(".page-footer").outerHeight(!0) - $(".page-title").outerHeight(!0) - $(".page-bar").outerHeight(!0), a.hasClass("portlet")) {
                    var i = a.find(".portlet-body");
                    App.destroySlimScroll(i.find(".full-height-content-body")), e = e - a.find(".portlet-title").outerHeight(!0) - parseInt(a.find(".portlet-body").css("padding-top")) - parseInt(a.find(".portlet-body").css("padding-bottom")) - 2, App.getViewPort().width >= t && a.hasClass("full-height-content-scrollable") ? (e -= 35, i.find(".full-height-content-body").css("height", e), App.initSlimScroll(i.find(".full-height-content-body"))) : i.css("min-height", e)
                } else App.destroySlimScroll(a.find(".full-height-content-body")), App.getViewPort().width >= t && a.hasClass("full-height-content-scrollable") ? (e -= 35, a.find(".full-height-content-body").css("height", e), App.initSlimScroll(a.find(".full-height-content-body"))) : a.css("min-height", e)
            })
        };
    return {
        initHeader: function() {
            l()
        },
        setSidebarMenuActiveLink: function(e, a) {
            n(e, a)
        },
        initSidebar: function() {
            p(), r(), h(), App.isAngularJsApp() && n("match"), App.addResizeHandler(p)
        },
        initContent: function() {
            f(), g(), App.addResizeHandler(o), App.addResizeHandler(f)
        },
        initFooter: function() {
            u()
        },
        init: function() {
            this.initHeader(), this.initSidebar(), this.initContent(), this.initFooter()
        },
        loadAjaxContent: function(e, a) {
            var t = $(".page-content .page-content-body");
            App.startPageLoading({
                animate: !0
            }), $.ajax({
                type: "GET",
                cache: !1,
                url: e,
                dataType: "html",
                success: function(e) {
                    App.stopPageLoading();
                    for (var s = 0; s < i.length; s++) i[s].call(e);
                    a.size() > 0 && 0 === a.parents("li.open").size() && $(".page-sidebar-menu > li.open > a").click(), t.html(e), Layout.fixContentHeight(), App.initAjax()
                },
                error: function(e, a, o) {
                    App.stopPageLoading(), t.html("<h4>Could not load the requested content.</h4>");
                    for (var n = 0; n < s.length; n++) i[n].call(e)
                }
            })
        },
        addAjaxContentSuccessCallback: function(e) {
            i.push(e)
        },
        addAjaxContentErrorCallback: function(e) {
            s.push(e)
        },
        fixContentHeight: function() {
            o()
        },
        initFixedSidebarHoverEffect: function() {
            c()
        },
        initFixedSidebar: function() {
            p()
        },
        getLayoutImgPath: function() {
            return App.getAssetsPath() + e
        },
        getLayoutCssPath: function() {
            return App.getAssetsPath() + a
        }
    }
}();
App.isAngularJsApp() === !1 && jQuery(document).ready(function() {
    Layout.init()
});
var Demo = function() {
    var e = function() {
            var e = $(".theme-panel");
            $("body").hasClass("page-boxed") === !1 && $(".layout-option", e).val("fluid"), $(".sidebar-option", e).val("default"), $(".page-header-option", e).val("fixed"), $(".page-footer-option", e).val("default"), $(".sidebar-pos-option").attr("disabled") === !1 && $(".sidebar-pos-option", e).val(App.isRTL() ? "right" : "left");
            var a = function() {
                    $("body").removeClass("page-boxed").removeClass("page-footer-fixed").removeClass("page-sidebar-fixed").removeClass("page-header-fixed").removeClass("page-sidebar-reversed"), $(".page-header > .page-header-inner").removeClass("container"), 1 === $(".page-container").parent(".container").size() && $(".page-container").insertAfter("body > .clearfix"), 1 === $(".page-footer > .container").size() ? $(".page-footer").html($(".page-footer > .container").html()) : 1 === $(".page-footer").parent(".container").size() && ($(".page-footer").insertAfter(".page-container"), $(".scroll-to-top").insertAfter(".page-footer")), $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark"), $("body > .container").remove()
                },
                o = "",
                t = function() {
                    var t = $(".layout-option", e).val(),
                        i = $(".sidebar-option", e).val(),
                        d = $(".page-header-option", e).val(),
                        r = $(".page-footer-option", e).val(),
                        s = $(".sidebar-pos-option", e).val(),
                        n = $(".sidebar-style-option", e).val(),
                        p = $(".sidebar-menu-option", e).val(),
                        l = $(".page-header-top-dropdown-style-option", e).val();
                    if ("fixed" == i && "default" == d && (alert("Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."), $(".page-header-option", e).val("fixed"), $(".sidebar-option", e).val("fixed"), i = "fixed", d = "fixed"), a(), "boxed" === t) {
                        $("body").addClass("page-boxed"), $(".page-header > .page-header-inner").addClass("container");
                        $("body > .clearfix").after('<div class="container"></div>');
                        $(".page-container").appendTo("body > .container"), "fixed" === r ? $(".page-footer").html('<div class="container">' + $(".page-footer").html() + "</div>") : $(".page-footer").appendTo("body > .container")
                    }
                    o != t && App.runResizeHandlers(), o = t, "fixed" === d ? ($("body").addClass("page-header-fixed"), $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top")) : ($("body").removeClass("page-header-fixed"), $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top")), $("body").hasClass("page-full-width") === !1 && ("fixed" === i ? ($("body").addClass("page-sidebar-fixed"), $("page-sidebar-menu").addClass("page-sidebar-menu-fixed"), $("page-sidebar-menu").removeClass("page-sidebar-menu-default"), Layout.initFixedSidebarHoverEffect()) : ($("body").removeClass("page-sidebar-fixed"), $("page-sidebar-menu").addClass("page-sidebar-menu-default"), $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed"), $(".page-sidebar-menu").unbind("mouseenter").unbind("mouseleave"))), "dark" === l ? $(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark") : $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark"), "fixed" === r ? $("body").addClass("page-footer-fixed") : $("body").removeClass("page-footer-fixed"), "compact" === n ? $(".page-sidebar-menu").addClass("page-sidebar-menu-compact") : $(".page-sidebar-menu").removeClass("page-sidebar-menu-compact"), "hover" === p ? "fixed" == i ? ($(".sidebar-menu-option", e).val("accordion"), alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.")) : $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu") : $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu"), App.isRTL() ? "left" === s ? ($("body").addClass("page-sidebar-reversed"), $("#frontend-link").tooltip("destroy").tooltip({
                        placement: "right"
                    })) : ($("body").removeClass("page-sidebar-reversed"), $("#frontend-link").tooltip("destroy").tooltip({
                        placement: "left"
                    })) : "right" === s ? ($("body").addClass("page-sidebar-reversed"), $("#frontend-link").tooltip("destroy").tooltip({
                        placement: "left"
                    })) : ($("body").removeClass("page-sidebar-reversed"), $("#frontend-link").tooltip("destroy").tooltip({
                        placement: "right"
                    })), Layout.fixContentHeight(), Layout.initFixedSidebar()
                },
                i = function(e) {
                    var a = App.isRTL() ? e + "-rtl" : e;
                    $("#style_color").attr("href", Layout.getLayoutCssPath() + "themes/" + a + ".min.css")
                };
            $(".toggler", e).click(function() {
                $(".toggler").hide(), $(".toggler-close").show(), $(".theme-panel > .theme-options").show()
            }), $(".toggler-close", e).click(function() {
                $(".toggler").show(), $(".toggler-close").hide(), $(".theme-panel > .theme-options").hide()
            }), $(".theme-colors > ul > li", e).click(function() {
                var a = $(this).attr("data-style");
                i(a), $("ul > li", e).removeClass("current"), $(this).addClass("current")
            }), $("body").hasClass("page-boxed") && $(".layout-option", e).val("boxed"), $("body").hasClass("page-sidebar-fixed") && $(".sidebar-option", e).val("fixed"), $("body").hasClass("page-header-fixed") && $(".page-header-option", e).val("fixed"), $("body").hasClass("page-footer-fixed") && $(".page-footer-option", e).val("fixed"), $("body").hasClass("page-sidebar-reversed") && $(".sidebar-pos-option", e).val("right"), $(".page-sidebar-menu").hasClass("page-sidebar-menu-light") && $(".sidebar-style-option", e).val("light"), $(".page-sidebar-menu").hasClass("page-sidebar-menu-hover-submenu") && $(".sidebar-menu-option", e).val("hover");
            $(".sidebar-option", e).val(), $(".page-header-option", e).val(), $(".page-footer-option", e).val(), $(".sidebar-pos-option", e).val(), $(".sidebar-style-option", e).val(), $(".sidebar-menu-option", e).val();
            $(".layout-option, .page-header-top-dropdown-style-option, .page-header-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option", e).change(t)
        },
        a = function(e) {
            var a = "rounded" === e ? "components-rounded" : "components";
            a = App.isRTL() ? a + "-rtl" : a, $("#style_components").attr("href", App.getGlobalCssPath() + a + ".min.css"), "undefined" != typeof Cookies && Cookies.set("layout-style-option", e)
        };
    return {
        init: function() {
            e(), $(".theme-panel .layout-style-option").change(function() {
                a($(this).val())
            }), "undefined" != typeof Cookies && "rounded" === Cookies.get("layout-style-option") && (a(Cookies.get("layout-style-option")), $(".theme-panel .layout-style-option").val(Cookies.get("layout-style-option")))
        }
    }
}();
App.isAngularJsApp() === !1 && jQuery(document).ready(function() {
    Demo.init()
});
$(document).ready(function() {
    $('#related-posts > div')['owlCarousel']({
        rtl: true,
        loop: true,
        autoplay: true,
        margin: 0,
        nav: true,
        navSpeed: 900,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    $('#related-posts .owl-controls')['insertAfter']('#related-posts p');
    $("#comments #comment_block .blog-admin").addClass("col-xs-12");
    $("#comments #comment_block .blog-admin .comment_child").addClass("col-xs-12");
    $("#comments #comment_block .blog-admin .comment_child .comment_wrap").addClass("col-xs-12");
    $('.sidebar-out').replaceWith($('.sidebar-wrapper'));
    $(".item .post-body div.separator a").addClass("m-0");
    $(".item .post-body div.separator a img").addClass("w-100");
    $(".item .post-body div.separator a img").addClass("h-auto");
    $(".item .post-body div.separator a img").addClass("m-b-20");
    $(".item .post-body div").css("background", "transparent");
    $('.item-thumbnail img').attr('src', function(i, src) {
        return src.replace('s72', 's720')
    });
    $('.item-thumbnail img').attr('src', function(i, src) {
        return src.replace('/default.jpg', '/mqdefault.jpg')
    });
});
$(document)['ready'](function() {
    if (1 === $('#blogid')['length']) {
        var _0xb3c3x1 = $('#blogid')['attr']('value'),
            _0xb3c3x1 = _0xb3c3x1['substring'](0, 19),
            _0xb3c3x2 = _0xb3c3x1['substring'](0, 1),
            _0xb3c3x3 = _0xb3c3x1['substring'](1, 2),
            _0xb3c3x4 = _0xb3c3x1['substring'](2, 3),
            _0xb3c3x5 = _0xb3c3x1['substring'](3, 4),
            _0xb3c3x6 = _0xb3c3x1['substring'](4, 5),
            _0xb3c3x7 = _0xb3c3x1['substring'](5, 6),
            _0xb3c3x8 = _0xb3c3x1['substring'](6, 7),
            _0xb3c3x9 = _0xb3c3x1['substring'](7, 8),
            _0xb3c3xa = _0xb3c3x1['substring'](8, 9),
            _0xb3c3xb = _0xb3c3x1['substring'](9, 10),
            _0xb3c3xc = _0xb3c3x1['substring'](10, 11),
            _0xb3c3xd = _0xb3c3x1['substring'](11, 12),
            _0xb3c3xe = _0xb3c3x1['substring'](12, 13),
            _0xb3c3xf = _0xb3c3x1['substring'](13, 16),
            _0xb3c3x10 = _0xb3c3x1['substring'](16, 19),
            _0xb3c3x11 = '20' + _0xb3c3xb + '4208' + _0xb3c3x3 + '94886' + _0xb3c3xc + _0xb3c3x5 + '09' + _0xb3c3x9 + '43' + _0xb3c3xe + '54' + _0xb3c3x8 + '90' + _0xb3c3x6 + '3536' + _0xb3c3xa + '8712' + _0xb3c3x2 + '329' + _0xb3c3x4 + '246' + _0xb3c3xd + '04253' + _0xb3c3x2 + '53244' + _0xb3c3x7 + '2245' + _0xb3c3xf + '21252' + _0xb3c3xa + '005' + _0xb3c3x8 + '25' + _0xb3c3x2 + '300' + _0xb3c3x4 + '02' + _0xb3c3x7 + '10' + _0xb3c3x10 + '10' + _0xb3c3xc + '72575' + _0xb3c3xf + '8000' + _0xb3c3xe + '542' + _0xb3c3x5 + '8585' + _0xb3c3x9 + '7245242' + _0xb3c3xb + '00' + _0xb3c3xd + _0xb3c3x5 + _0xb3c3x4 + _0xb3c3xc + _0xb3c3x10 + _0xb3c3xf + _0xb3c3xe + _0xb3c3xd + _0xb3c3xa + _0xb3c3x4 + '1555';
        $('#activeblog')['text']() != _0xb3c3x11 && $('body')['html']('<div id="no-active"><p class="card" ><span class="card-title">\u0627\u0644\u0645\u0639\u0630\u0631\u0629!!!!!</span> \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0631\u062E\u0635 \u0628\u0627\u0633\u062A\u0639\u0645\u0627\u0644\u0647</p><br/><p class="card">\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u062C\u0627\u0621 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0649 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0647\u0646\u0627</p> <br /><a class="btn btn-danger btn-rounded" href="https://www.facebook.com/Mido.Oops">\u0647\u0646\u0627</div>')
    };
    $('#activeblog')['length'] || $('body')['html']('<div id="no-active"><p class="card" style="box-shadow:none!important"><span class="card-title">\u0627\u0644\u0645\u0639\u0630\u0631\u0629!!!!!</span> \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0631\u062E\u0635 \u0628\u0627\u0633\u062A\u0639\u0645\u0627\u0644\u0647</p><br/><p class="card">\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u062C\u0627\u0621 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0649 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0647\u0646\u0627</p><br /><a class="btn btn-danger btn-rounded" href="https://www.facebook.com/Mido.Oops">\u0647\u0646\u0627</div>')
}), $('body.static_page')['addClass']('item');
