!(function (n) {
  "use strict";
  n.GDCore.components.GDMalihuScrollBar = {
    _baseConfig: { scrollInertia: 150, theme: "minimal-dark" },
    _pageCollection: n(),
    init: function (e, i) {
      if (e && e.length) {
        var t = this;
        return (
          (i =
            i && n.isPlainObject(i)
              ? n.extend(!0, {}, i, this._baseConfig)
              : this._baseConfig),
          e.each(function (e, o) {
            var a,
              s,
              d = n(o),
              l = n.extend(!0, {}, i, d.data());
            d.mCustomScrollbar(l),
              (a = d.find(".mCSB_scrollTools")),
              (s = d.find(".mCSB_dragger_bar")),
              a.length &&
                d.data("scroll-classes") &&
                a.addClass(d.data("scroll-classes")),
              s.length &&
                d.data("scroll-thumb-classes") &&
                s.addClass(d.data("scroll-thumb-classes")),
              (t._pageCollection = t._pageCollection.add(d));
          })
        );
      }
    },
    destroy: function (e) {
      if (!e && !e.length) return n();
      var i = this;
      return e.each(function (e, t) {
        var o = n(t);
        o.mCustomScrollbar("destroy"),
          (i._pageCollection = i._pageCollection.not(o));
      });
    },
  };
})(jQuery),
  (function (n) {
    "use strict";
    n.GDCore.components.GDSideNav = {
      _baseConfig: {
        touchDevicesMode: "full",
        touchDevicesModeResolution: 992,
        closedClass: "side-nav-closed",
        hiddenClass: "side-nav-hidden",
        initializedClass: "side-nav-initialized",
        minifiedClass: "side-nav-minified",
        openedSubMenuClass: "side-nav-opened",
        hasSubMenuClass: "side-nav-has-menu",
        fullModeClass: "side-nav-full-mode",
        miniModeClass: "side-nav-mini-mode",
        transitionOnClass: "side-nav-transition-on",
        topLevelMenuClass: "side-nav-menu-top-level",
        secondLevelMenuClass: "side-nav-menu-second-level",
        thirdLevelMenuClass: "side-nav-menu-third-level",
        afterOpen: function () {},
        afterClose: function () {},
      },
      pageCollection: n(),
      init: function (e, i) {
        if (((this.collection = e && n(e).length ? n(e) : n()), n(e).length))
          return (
            (this.config =
              i && n.isPlainObject(i)
                ? n.extend({}, this._baseConfig, i)
                : this._baseConfig),
            (this.config.itemSelector = e),
            this.initSidebar(),
            this.pageCollection
          );
      },
      initSidebar: function () {
        var e = this,
          i = e.pageCollection,
          t = e.config;
        this.collection.each(function (o, a) {
          var s = n(a),
            d = s.data("mode"),
            l = s.data("target"),
            r = { openedItem: "" },
            u = {
              isSubMenuCollapsed: !1,
              isSidebarClosed: !1,
              isSidebarHidden: !0,
              isSidebarMinified: !1,
              isMenuHeadingsHide: !1,
              isTouchDevicesMode: !1,
              isMiniMode: !1,
              isFullMode: !1,
              isTransitionOn: !1,
            },
            c = {
              mainContainer: s.data("target-wrapper"),
              sidebar: l,
              menuHeadings: n(l).find(".sidebar-heading"),
              topLevelMenuItems: n(l).find(
                ".side-nav-menu-top-level > .side-nav-menu-item"
              ),
              menuInvoker: n(l).find(".side-nav-menu-link"),
            };
          switch (
            (e.pushOpenedItem(s, r, c),
            d && (t.touchDevicesMode = d),
            t.touchDevicesMode)
          ) {
            case "mini":
              e.miniMode(u, c);
              break;
            default:
              e.fullMode(u, c);
          }
          e.menuInvokerClickFunc(r, u, c),
            e.clickFunc(s, r, u, c),
            e.closeFunc(s, u, c),
            e.mouseEnterFunc(r, u, c),
            e.mouseLeaveFunc(r, u, c),
            e.documentOnClickCloseFunc(s, r, u, c),
            e.resizeFunc(r, u, c),
            (i = i.add(s));
        });
      },
      pushOpenedItem: function (e, i, t) {
        var o = this.config,
          a = i,
          s = t;
        e.each(function () {
          var e = n(this);
          (s.sidebar = e.data("target")),
            n(s.sidebar)
              .find("[data-target]")
              .each(function () {
                n(this)
                  .parent(s.topLevelMenuItems)
                  .hasClass(o.openedSubMenuClass) &&
                  (a.openedItem = n(this).data("target"));
              });
        });
      },
      clickFunc: function (e, i, t, o) {
        var a = this,
          s = a.config,
          d = t,
          l = i,
          r = o;
        e.stop().on("click", function (e) {
          e.preventDefault(),
            !0 === d.isTouchDevicesMode
              ? !0 === d.isSidebarHidden
                ? a.showSidebar(d, r)
                : a.hideSidebar(d, r)
              : !0 === d.isSidebarClosed
              ? (a.openTitles(!1, d, r),
                a.openSidebar(d, r),
                "" !== l.openedItem &&
                  n(r.sidebar).one(
                    "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                    function () {
                      a.openSubMenu(!1, l, d, r);
                    }
                  ),
                !1 === d.isTouchDevicesMode &&
                  (n(r.mainContainer).one().removeClass(s.minifiedClass),
                  (d.isSidebarMinified = !1)))
              : ("" !== l.openedItem
                  ? (a.closeTitles(!1, d, r),
                    a.closeSubMenu(
                      function () {
                        a.closeSidebar(d, r);
                      },
                      l,
                      d,
                      r
                    ))
                  : a.closeTitles(
                      function () {
                        a.closeSidebar(d, r);
                      },
                      d,
                      r
                    ),
                !1 === d.isTouchDevicesMode &&
                  n(r.sidebar).one(
                    "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                    function () {
                      n(r.mainContainer).one().addClass(s.minifiedClass),
                        (d.isSidebarMinified = !0);
                    }
                  ));
        });
      },
      closeFunc: function (e, i, t) {
        var o = this,
          a = i,
          s = t,
          d = e.data("close-invoker");
        n(d)
          .stop()
          .on("click", function (n) {
            n.preventDefault(), o.hideSidebar(a, s);
          });
      },
      documentOnClickCloseFunc: function (n, e, i, t) {
        this.config;
      },
      mouseEnterFunc: function (e, i, t) {
        var o = this,
          a = e,
          s = i,
          d = t;
        n(d.sidebar)
          .stop()
          .on("mouseenter", function () {
            ((!0 === s.isSidebarClosed && !0 === s.isSidebarMinified) ||
              (!0 === s.isMiniMode &&
                !0 === s.isSidebarClosed &&
                !0 === s.isTouchDevicesMode)) &&
              (o.openTitles(!1, s, d),
              o.openSidebar(s, d),
              "" !== a.openedItem &&
                n(d.sidebar).one(
                  "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                  function () {
                    o.openSubMenu(!1, a, s, d);
                  }
                ));
          });
      },
      mouseLeaveFunc: function (e, i, t) {
        var o = this,
          a = e,
          s = i,
          d = t;
        n(d.sidebar)
          .stop()
          .on("mouseleave", function () {
            ((!1 === s.isSidebarClosed && !0 === s.isSidebarMinified) ||
              (!0 === s.isMiniMode &&
                !1 === s.isSidebarClosed &&
                !0 === s.isTouchDevicesMode)) &&
              ("" !== a.openedItem
                ? (o.closeTitles(!1, s, d),
                  o.closeSubMenu(
                    function () {
                      o.closeSidebar(s, d);
                    },
                    a,
                    s,
                    d
                  ))
                : o.closeTitles(
                    function () {
                      o.closeSidebar(s, d);
                    },
                    s,
                    d
                  ));
          });
      },
      menuInvokerClickFunc: function (e, i, t) {
        var o = this.config,
          a = e,
          s = t.menuInvoker;
        n(s)
          .stop()
          .on("click", function (e) {
            var i = n(this),
              t = i.parent(),
              d = t.siblings(),
              l = i.data("target"),
              r = [];
            l && e.preventDefault(),
              d.children(s).each(function () {
                n(this).data("target") && r.push(n(this).data("target"));
              }),
              n(r.toString()).parents().removeClass(o.openedSubMenuClass),
              n(r.toString()).slideUp(400),
              n(t).hasClass(o.openedSubMenuClass)
                ? (n(t).removeClass(o.openedSubMenuClass),
                  n(l).slideUp(400, function () {
                    n(t).parent().hasClass(o.topLevelMenuClass) &&
                      (a.openedItem = "");
                  }))
                : (n(t).addClass(o.openedSubMenuClass),
                  n(l).slideDown(400, function () {
                    n(t).parent().hasClass(o.topLevelMenuClass) &&
                      (a.openedItem = l);
                  }));
          });
      },
      openTitles: function (e, i, t) {
        var o = i,
          a = t;
        n(a.sidebar).one(
          "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
          function () {
            n(a.sidebar)
              .find(a.menuHeadings)
              .slideDown(400, function () {
                (o.isMenuHeadingsHide = !1), e && e();
              });
          }
        );
      },
      closeTitles: function (e, i, t) {
        var o = i,
          a = t;
        n(a.sidebar)
          .find(a.menuHeadings)
          .slideUp(400, function () {
            (o.isMenuHeadingsHide = !0), e && e();
          });
      },
      openSubMenu: function (e, i, t, o) {
        var a = this.config,
          s = i,
          d = t,
          l = o;
        n(s.openedItem)
          .parent(l.topLevelMenuItems)
          .addClass(a.openedSubMenuClass),
          n(s.openedItem).slideDown(400, function () {
            (d.isSubMenuCollapsed = !1), e && e();
          });
      },
      closeSubMenu: function (e, i, t, o) {
        var a = this.config,
          s = i,
          d = t,
          l = o;
        n(s.openedItem).slideUp(400, function () {
          n(s.openedItem)
            .parent(l.topLevelMenuItems)
            .removeClass(a.openedSubMenuClass),
            (d.isSubMenuCollapsed = !0),
            e && e();
        });
      },
      openSidebar: function (e, i) {
        var t = this,
          o = t.config,
          a = e,
          s = i;
        n(s.mainContainer).stop().removeClass(o.closedClass),
          t.transitionOn(a, s),
          n(s.sidebar).one(
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
            function () {
              (a.isSidebarClosed = !1), t.transitionOff(a, s);
            }
          );
      },
      closeSidebar: function (e, i) {
        var t = this,
          o = t.config,
          a = e,
          s = i;
        n(s.mainContainer).stop().addClass(o.closedClass),
          t.transitionOn(a, s),
          n(s.sidebar).one(
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
            function () {
              (a.isSidebarClosed = !0),
                setTimeout(function () {
                  t.transitionOff(a, s);
                }, 200);
            }
          );
      },
      showSidebar: function (e, i) {
        var t = this,
          o = t.config,
          a = e,
          s = i;
        t.transitionOn(a, s),
          n(s.mainContainer).stop().removeClass(o.hiddenClass),
          n(s.sidebar).one(
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
            function () {
              t.transitionOff(a, s);
            }
          ),
          (a.isSidebarHidden = !1);
      },
      hideSidebar: function (e, i) {
        var t = this,
          o = t.config,
          a = e,
          s = i;
        t.transitionOn(a, s),
          n(s.mainContainer).stop().addClass(o.hiddenClass),
          n(s.sidebar).one(
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
            function () {
              t.transitionOff(a, s);
            }
          ),
          (a.isSidebarHidden = !0);
      },
      fullMode: function (e, i) {
        var t = this.config,
          o = e;
        n(i.mainContainer).addClass(t.fullModeClass), (o.isFullMode = !0);
      },
      miniMode: function (e, i) {
        var t = this.config,
          o = e;
        n(i.mainContainer).addClass(t.miniModeClass), (o.isMiniMode = !0);
      },
      transitionOn: function (e, i) {
        var t = this.config,
          o = e;
        n(i.mainContainer).addClass(t.transitionOnClass),
          (o.isTransitionOn = !0);
      },
      transitionOff: function (e, i) {
        var t = this.config,
          o = e;
        n(i.mainContainer).removeClass(t.transitionOnClass),
          (o.isTransitionOn = !1);
      },
      resizeFunc: function (e, i, t) {
        var o = this,
          a = o.config,
          s = e,
          d = i,
          l = t;
        n(window).on("resize", function () {
          var e = window.innerWidth;
          o.transitionOff(d, l),
            e <= a.touchDevicesModeResolution
              ? ("" !== s.openedItem
                  ? n(l.sidebar).one(
                      "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                      function () {
                        n(l.mainContainer).one().addClass(a.initializedClass);
                      }
                    )
                  : n(l.mainContainer).one().addClass(a.initializedClass),
                n(l.mainContainer).one().addClass(a.hiddenClass),
                !0 === d.isFullMode &&
                  (!0 === d.isSidebarClosed && o.openSubMenu(!1, s, d, l),
                  n(l.mainContainer).one().removeClass(a.closedClass),
                  (d.isSidebarMinified = !1)),
                !0 === d.isMiniMode &&
                  (n(l.mainContainer)
                    .one()
                    .addClass(a.closedClass + " " + a.minifiedClass),
                  o.closeTitles(!1, d, l),
                  o.closeSubMenu(!1, s, d, l),
                  (d.isSidebarClosed = !0),
                  (d.isSidebarMinified = !0)),
                (d.isTouchDevicesMode = !0))
              : (!0 === d.isFullMode &&
                  !0 === d.isSidebarClosed &&
                  (n(s.openedItem).hide(),
                  n(s.openedItem)
                    .parent(l.topLevelMenuItems)
                    .removeClass(a.openedSubMenuClass),
                  n(l.mainContainer).one().addClass(a.closedClass),
                  (d.isSidebarMinified = !0),
                  (d.isSubMenuCollapsed = !0)),
                n(l.mainContainer)
                  .one()
                  .removeClass(a.initializedClass + " " + a.hiddenClass),
                (d.isTouchDevicesMode = !1));
        }),
          n(window).trigger("resize");
      },
    };
  })(jQuery),
  (function (n) {
    "use strict";
    function e(e, i) {
      return (
        !!e.length &&
        ((this.element = e),
        (this.config = i),
        (this.target = n(this.element.data("unfold-target"))),
        (this.allInvokers = n(
          '[data-unfold-target="' + this.element.data("unfold-target") + '"]'
        )),
        (this.toggle = function () {
          return this.target.length
            ? (this.defaultState ? this.show() : this.hide(), this)
            : this;
        }),
        (this.smartPosition = function (e) {
          e.data("baseDirection") &&
            e.css(
              e.data("baseDirection").direction,
              e.data("baseDirection").value
            ),
            e.removeClass("unfold-reverse-y");
          var i = n(window),
            t = getComputedStyle(e.get(0)),
            o = Math.abs(parseInt(t.left, 10)) < 40 ? "left" : "right",
            a = e.offset();
          "right" === o
            ? (e.data("baseDirection") ||
                e.data("baseDirection", {
                  direction: "right",
                  value: parseInt(t.right, 10),
                }),
              a.left < 0 &&
                e.css(
                  "right",
                  -1 * (parseInt(e.css("right"), 10) - (a.left - 10))
                ))
            : (e.data("baseDirection") ||
                e.data("baseDirection", {
                  direction: "left",
                  value: parseInt(t.left, 10),
                }),
              a.left + e.outerWidth() > i.width() &&
                e.css(
                  "left",
                  parseInt(e.css("left"), 10) -
                    (a.left + e.outerWidth() + 10 - i.width())
                )),
            a.top + e.outerHeight() - i.scrollTop() > i.height() &&
              e.addClass("unfold-reverse-y");
        }),
        (this.getOption = function (n) {
          return this.config[n] ? this.config[n] : null;
        }),
        !0)
      );
    }
    function i(n, i) {
      e.call(this, n, i) &&
        (Object.defineProperty(this, "defaultState", {
          get: function () {
            return this.target.hasClass("unfold-hidden");
          },
        }),
        this.target.addClass("unfold-simple"),
        this.hide());
    }
    function t(n, i) {
      if (e.call(this, n, i)) {
        var t = this;
        this.target
          .addClass("unfold-css-animation unfold-hidden")
          .css("animation-duration", t.config.unfoldDuration + "ms"),
          Object.defineProperty(this, "defaultState", {
            get: function () {
              return this.target.hasClass("unfold-hidden");
            },
          }),
          this.target.length &&
            this.target.on(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function (n) {
                t.target.hasClass(t.config.unfoldAnimationOut) &&
                  (t.target
                    .removeClass(t.config.unfoldAnimationOut)
                    .addClass("unfold-hidden"),
                  t.allInvokers.length &&
                    t.allInvokers.attr("aria-expanded", "false"),
                  t.config.afterClose.call(t.target, t.element)),
                  t.target.hasClass(t.config.unfoldAnimationIn) &&
                    (t.allInvokers.length &&
                      t.allInvokers.attr("aria-expanded", "true"),
                    t.config.afterOpen.call(t.target, t.element)),
                  n.preventDefault(),
                  n.stopPropagation();
              }
            );
      }
    }
    function o(n, i) {
      e.call(this, n, i) &&
        (this.target.addClass("unfold-jquery-slide unfold-hidden").hide(),
        Object.defineProperty(this, "defaultState", {
          get: function () {
            return this.target.hasClass("unfold-hidden");
          },
        }));
    }
    (n.GDCore.components.GDUnfold = {
      _baseConfig: {
        unfoldEvent: "click",
        unfoldType: "simple",
        unfoldDuration: 300,
        unfoldEasing: "linear",
        unfoldAnimationIn: "fadeIn",
        unfoldAnimationOut: "fadeOut",
        unfoldHideOnScroll: !0,
        unfoldHideOnBlur: !1,
        unfoldDelay: 350,
        afterOpen: function (n) {},
        afterClose: function (n) {},
      },
      _pageCollection: n(),
      init: function (e, a) {
        var s;
        if (e && e.length) {
          var d;
          (s = this),
            e.each(function (e, l) {
              var r,
                u = n(l);
              if (!u.data("GDUnfold")) {
                switch (
                  (r =
                    a && n.isPlainObject(a)
                      ? n.extend(!0, {}, s._baseConfig, a, u.data())
                      : n.extend(!0, {}, s._baseConfig, u.data())).unfoldType
                ) {
                  case "css-animation":
                    u.data("GDUnfold", new t(u, r));
                    break;
                  case "jquery-slide":
                    u.data("GDUnfold", new o(u, r));
                    break;
                  default:
                    u.data("GDUnfold", new i(u, r));
                }
                (s._pageCollection = s._pageCollection.add(u)),
                  s._bindEvents(u, r.unfoldEvent, r.unfoldDelay);
                var c = n(l).data("GDUnfold");
                d = n(c.target).find("input, textarea").length;
              }
            });
          var l,
            r = 0;
          return (
            n(document).on("keydown.GDUnfold", function (e) {
              e.keyCode &&
                27 === e.keyCode &&
                s._pageCollection.each(function (e, i) {
                  var t = n(window).width(),
                    o = Boolean(n(i).data("is-mobile-only"));
                  (l = n(n(n(i).data("unfold-target")).children())),
                    o
                      ? o && t < 769 && n(i).data("GDUnfold").hide()
                      : n(i).data("GDUnfold").hide();
                }),
                s._pageCollection.each(function (e, i) {
                  n(n(i).data("unfold-target")).hasClass("unfold-hidden") ||
                    (l = n(n(n(i).data("unfold-target")).children()));
                }),
                ((e.keyCode && 38 === e.keyCode) ||
                  (e.keyCode && 40 === e.keyCode)) &&
                  e.preventDefault(),
                e.keyCode && 38 === e.keyCode && r > 0 && r--,
                e.keyCode && 40 === e.keyCode && r < l.length - 1 && r++,
                r < 0 && (r = 0),
                ((e.keyCode && 38 === e.keyCode) ||
                  (e.keyCode && 40 === e.keyCode)) &&
                  n(l[r]).focus();
            }),
            n(window).on("click", function (e) {
              s._pageCollection.each(function (e, i) {
                var t = n(window).width(),
                  o = Boolean(n(i).data("is-mobile-only"));
                o
                  ? o && t < 769 && n(i).data("GDUnfold").hide()
                  : n(i).data("GDUnfold").hide();
              });
            }),
            s._pageCollection.each(function (e, i) {
              var t = n(i).data("GDUnfold").config.unfoldTarget;
              n(t).on("click", function (n) {
                n.stopPropagation();
              });
            }),
            n(window).on("scroll.GDUnfold", function (e) {
              s._pageCollection.each(function (e, i) {
                var t = n(i).data("GDUnfold");
                t.getOption("unfoldHideOnScroll") && 0 === d
                  ? t.hide()
                  : t.getOption("unfoldHideOnScroll") &&
                    !/iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                    t.hide();
              });
            }),
            n(window).on("resize.GDUnfold", function (e) {
              s._resizeTimeOutId && clearTimeout(s._resizeTimeOutId),
                (s._resizeTimeOutId = setTimeout(function () {
                  s._pageCollection.each(function (e, i) {
                    var t = n(i).data("GDUnfold");
                    t.smartPosition(t.target);
                  });
                }, 50));
            }),
            e
          );
        }
      },
      _bindEvents: function (e, i, t) {
        var o = n(e.data("unfold-target"));
        "hover" !== i || "ontouchstart" in window
          ? e.on("click.GDUnfold", function (e) {
              var i = n(this);
              i.data("GDUnfold") &&
                (n("[data-unfold-target].active").length &&
                  n("[data-unfold-target].active").data("GDUnfold").toggle(),
                i.data("GDUnfold").toggle(),
                n(n(i.data("unfold-target")).children()[0]).trigger("focus"),
                e.stopPropagation(),
                e.preventDefault());
            })
          : (e
              .on("mouseenter.GDUnfold", function (e) {
                var i = n(this).data("GDUnfold");
                i &&
                  (i.unfoldTimeOut && clearTimeout(i.unfoldTimeOut), i.show());
              })
              .on("mouseleave.GDUnfold", function (e) {
                var i = n(this).data("GDUnfold");
                i &&
                  (i.unfoldTimeOut = setTimeout(function () {
                    i.hide();
                  }, t));
              }),
            o.length &&
              o
                .on("mouseenter.GDUnfold", function (n) {
                  var i = e.data("GDUnfold");
                  i.unfoldTimeOut && clearTimeout(i.unfoldTimeOut), i.show();
                })
                .on("mouseleave.GDUnfold", function (n) {
                  var i = e.data("GDUnfold");
                  i.unfoldTimeOut = setTimeout(function () {
                    i.hide();
                  }, t);
                }));
      },
    }),
      (i.prototype.show = function () {
        var e = n(this)[0].config.unfoldTarget;
        return (
          n('[data-unfold-target="' + e + '"]').addClass("active"),
          this.smartPosition(this.target),
          this.target.removeClass("unfold-hidden"),
          this.allInvokers.length &&
            this.allInvokers.attr("aria-expanded", "true"),
          this.config.afterOpen.call(this.target, this.element),
          this
        );
      }),
      (i.prototype.hide = function () {
        var e = n(this)[0].config.unfoldTarget;
        return (
          n('[data-unfold-target="' + e + '"]').removeClass("active"),
          this.target.addClass("unfold-hidden"),
          this.allInvokers.length &&
            this.allInvokers.attr("aria-expanded", "false"),
          this.config.afterClose.call(this.target, this.element),
          this
        );
      }),
      (t.prototype.show = function () {
        var e = n(this)[0].config.unfoldTarget;
        n('[data-unfold-target="' + e + '"]').addClass("active"),
          this.smartPosition(this.target),
          this.target
            .removeClass("unfold-hidden")
            .removeClass(this.config.unfoldAnimationOut)
            .addClass(this.config.unfoldAnimationIn);
      }),
      (t.prototype.hide = function () {
        var e = n(this)[0].config.unfoldTarget;
        n('[data-unfold-target="' + e + '"]').removeClass("active"),
          this.target
            .removeClass(this.config.unfoldAnimationIn)
            .addClass(this.config.unfoldAnimationOut);
      }),
      (o.prototype.show = function () {
        var e = this,
          i = n(this)[0].config.unfoldTarget;
        n('[data-unfold-target="' + i + '"]').addClass("active"),
          this.smartPosition(this.target),
          this.target
            .removeClass("unfold-hidden")
            .stop()
            .slideDown({
              duration: e.config.unfoldDuration,
              easing: e.config.unfoldEasing,
              complete: function () {
                e.config.afterOpen.call(e.target, e.element);
              },
            });
      }),
      (o.prototype.hide = function () {
        var e = this,
          i = n(this)[0].config.unfoldTarget;
        n('[data-unfold-target="' + i + '"]').removeClass("active"),
          this.target.stop().slideUp({
            duration: e.config.unfoldDuration,
            easing: e.config.unfoldEasing,
            complete: function () {
              e.config.afterClose.call(e.target, e.element),
                e.target.addClass("unfold-hidden");
            },
          });
      });
  })(jQuery),
  $(window).on("load", function () {
    $.GDCore.components.GDMalihuScrollBar.init($(".js-custom-scroll")),
      $.GDCore.components.GDSideNav.init(".js-side-nav"),
      $.GDCore.components.GDUnfold.init($("[data-unfold-target]"));
  });
