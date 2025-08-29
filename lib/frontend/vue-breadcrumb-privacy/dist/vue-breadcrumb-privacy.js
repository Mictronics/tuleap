import u from "vue";
import { createPopover as j } from "@tuleap/tlp-popovers";
import { getProjectPrivacyIcon as O } from "@tuleap/project-privacy-helper";
/**
  * vue-class-component v7.2.6
  * (c) 2015-present Evan You
  * @license MIT
  */
function f(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? f = function(e) {
    return typeof e;
  } : f = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, f(t);
}
function w(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function P(t) {
  return C(t) || M(t) || x();
}
function C(t) {
  if (Array.isArray(t)) {
    for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
    return r;
  }
}
function M(t) {
  if (Symbol.iterator in Object(t) || Object.prototype.toString.call(t) === "[object Arguments]") return Array.from(t);
}
function x() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function R() {
  return typeof Reflect < "u" && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function S(t, e) {
  d(t, e), Object.getOwnPropertyNames(e.prototype).forEach(function(r) {
    d(t.prototype, e.prototype, r);
  }), Object.getOwnPropertyNames(e).forEach(function(r) {
    d(t, e, r);
  });
}
function d(t, e, r) {
  var n = r ? Reflect.getOwnMetadataKeys(e, r) : Reflect.getOwnMetadataKeys(e);
  n.forEach(function(o) {
    var a = r ? Reflect.getOwnMetadata(o, e, r) : Reflect.getOwnMetadata(o, e);
    r ? Reflect.defineMetadata(o, a, t, r) : Reflect.defineMetadata(o, a, t);
  });
}
var A = {
  __proto__: []
}, E = A instanceof Array;
function D(t) {
  return function(e, r, n) {
    var o = typeof e == "function" ? e : e.constructor;
    o.__decorators__ || (o.__decorators__ = []), typeof n != "number" && (n = void 0), o.__decorators__.push(function(a) {
      return t(a, r, n);
    });
  };
}
function L(t) {
  var e = f(t);
  return t == null || e !== "object" && e !== "function";
}
function h(t) {
  typeof console < "u" && console.warn("[vue-class-component] " + t);
}
function I(t, e) {
  var r = e.prototype._init;
  e.prototype._init = function() {
    var a = this, s = Object.getOwnPropertyNames(t);
    if (t.$options.props)
      for (var i in t.$options.props)
        t.hasOwnProperty(i) || s.push(i);
    s.forEach(function(c) {
      Object.defineProperty(a, c, {
        get: function() {
          return t[c];
        },
        set: function(m) {
          t[c] = m;
        },
        configurable: !0
      });
    });
  };
  var n = new e();
  e.prototype._init = r;
  var o = {};
  return Object.keys(n).forEach(function(a) {
    n[a] !== void 0 && (o[a] = n[a]);
  }), process.env.NODE_ENV !== "production" && !(e.prototype instanceof u) && Object.keys(o).length > 0 && h("Component class must inherit Vue or its descendant class when class property is used."), o;
}
var v = [
  "data",
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeDestroy",
  "destroyed",
  "beforeUpdate",
  "updated",
  "activated",
  "deactivated",
  "render",
  "errorCaptured",
  "serverPrefetch"
  // 2.6
];
function g(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  e.name = e.name || t._componentTag || t.name;
  var r = t.prototype;
  Object.getOwnPropertyNames(r).forEach(function(i) {
    if (i !== "constructor") {
      if (v.indexOf(i) > -1) {
        e[i] = r[i];
        return;
      }
      var c = Object.getOwnPropertyDescriptor(r, i);
      c.value !== void 0 ? typeof c.value == "function" ? (e.methods || (e.methods = {}))[i] = c.value : (e.mixins || (e.mixins = [])).push({
        data: function() {
          return w({}, i, c.value);
        }
      }) : (c.get || c.set) && ((e.computed || (e.computed = {}))[i] = {
        get: c.get,
        set: c.set
      });
    }
  }), (e.mixins || (e.mixins = [])).push({
    data: function() {
      return I(this, t);
    }
  });
  var n = t.__decorators__;
  n && (n.forEach(function(i) {
    return i(e);
  }), delete t.__decorators__);
  var o = Object.getPrototypeOf(t.prototype), a = o instanceof u ? o.constructor : u, s = a.extend(e);
  return T(s, t, a), R() && S(s, t), s;
}
var N = [
  // Unique id
  "cid",
  // Super Vue constructor
  "super",
  // Component options that will be used by the component
  "options",
  "superOptions",
  "extendOptions",
  "sealedOptions",
  // Private assets
  "component",
  "directive",
  "filter"
], H = {
  prototype: !0,
  arguments: !0,
  callee: !0,
  caller: !0
};
function T(t, e, r) {
  Object.getOwnPropertyNames(e).forEach(function(n) {
    if (!H[n]) {
      var o = Object.getOwnPropertyDescriptor(t, n);
      if (!(o && !o.configurable)) {
        var a = Object.getOwnPropertyDescriptor(e, n);
        if (!E) {
          if (n === "cid")
            return;
          var s = Object.getOwnPropertyDescriptor(r, n);
          if (!L(a.value) && s && s.value === a.value)
            return;
        }
        process.env.NODE_ENV !== "production" && N.indexOf(n) >= 0 && h("Static property name '".concat(n, "' declared on class '").concat(e.name, "' ") + "conflicts with reserved property name of Vue internal. It may cause unexpected behavior of the component. Consider renaming the property."), Object.defineProperty(t, n, a);
      }
    }
  });
}
function b(t) {
  return typeof t == "function" ? g(t) : function(e) {
    return g(e, t);
  };
}
b.registerHooks = function(e) {
  v.push.apply(v, P(e));
};
var $ = typeof Reflect < "u" && typeof Reflect.getMetadata < "u";
function B(t, e, r) {
  if ($ && !Array.isArray(t) && typeof t != "function" && !t.hasOwnProperty("type") && typeof t.type > "u") {
    var n = Reflect.getMetadata("design:type", e, r);
    n !== Object && (t.type = n);
  }
}
function _(t) {
  return t === void 0 && (t = {}), function(e, r) {
    B(t, e, r), D(function(n, o) {
      (n.props || (n.props = {}))[o] = t;
    })(e, r);
  };
}
var V = Object.defineProperty, F = Object.getOwnPropertyDescriptor, l = (t, e, r, n) => {
  for (var o = n > 1 ? void 0 : n ? F(e, r) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (o = (n ? s(e, r, o) : s(o)) || o);
  return n && o && V(e, r, o), o;
};
let p = class extends u {
  project_flags;
  privacy;
  project_public_name;
  mounted() {
    const e = this.$refs.popover_icon;
    if (!(e instanceof HTMLElement))
      return;
    const r = this.$refs.popover_content;
    r instanceof HTMLElement && j(e, r, {
      anchor: e,
      placement: "bottom-start"
    });
  }
  get has_project_flags() {
    return this.project_flags.length > 0;
  }
  get project_privacy_icon() {
    return O(this.privacy);
  }
};
l([
  _({ required: !0 })
], p.prototype, "project_flags", 2);
l([
  _({ required: !0 })
], p.prototype, "privacy", 2);
l([
  _({ required: !0 })
], p.prototype, "project_public_name", 2);
p = l([
  b({ name: "BreadcrumbPrivacy" })
], p);
function q(t, e, r, n, o, a, s, i) {
  var c = typeof t == "function" ? t.options : t;
  return e && (c.render = e, c.staticRenderFns = r, c._compiled = !0), {
    exports: t,
    options: c
  };
}
var Z = function() {
  var e = this, r = e._self._c;
  return e._self._setupProxy, r("div", { staticClass: "breadcrumb-privacy-icon-container" }, [r("span", { ref: "popover_icon", class: { "breadcrumb-project-privacy-icon-with-flags": e.has_project_flags }, attrs: { "data-privacy-icon": e.project_privacy_icon } }, [r("i", { staticClass: "fa-solid breadcrumb-project-privacy-icon", class: e.project_privacy_icon }), e.has_project_flags ? r("span", { staticClass: "current-project-nav-flag-labels" }, e._l(e.project_flags, function(n) {
    return r("span", { key: n.label, staticClass: "current-project-nav-flag-label" }, [e._v(" " + e._s(n.label) + " ")]);
  }), 0) : e._e()]), r("section", { ref: "popover_content", staticClass: "tlp-popover", attrs: { id: "current-project-nav-title-popover" } }, [r("div", { staticClass: "tlp-popover-arrow" }), r("div", { staticClass: "tlp-popover-header" }, [r("h1", { staticClass: "tlp-popover-title" }, [e._v(e._s(e.project_public_name))])]), r("div", { staticClass: "tlp-popover-body" }, [e.has_project_flags ? [r("div", { staticClass: "current-project-nav-flag-popover-flag" }, [r("i", { staticClass: "fa", class: e.project_privacy_icon }), r("h2", { staticClass: "current-project-nav-flag-popover-content-title" }, [e._v(" " + e._s(e.privacy.privacy_title) + " ")]), r("p", { staticClass: "current-project-nav-title-popover-description" }, [e._v(" " + e._s(e.privacy.explanation_text) + " ")])]), r("hr", { staticClass: "current-project-nav-flag-popover-separator" }), e._l(e.project_flags, function(n) {
    return r("div", { key: n.label, staticClass: "current-project-nav-flag-popover-flag" }, [r("svg", { staticClass: "tuleap-svg tuleap-svg-project-shield", attrs: { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "18", viewBox: "0 0 16 18" } }, [r("path", { attrs: { fill: "#283E45", d: "M7.11616328,2.18186418 C7.68414571,1.93937861 8.32652235,1.93937861 8.89450477,2.18186418 L11.9271885,3.47659098 L15.0996093,4.83097494 C15.5816696,5.03677827 15.9110974,5.49147052 15.9564706,6.01365671 L15.9565022,6.01365395 C16.1818882,8.60755055 15.5313873,11.2346362 14.0049995,13.8949108 C12.4001774,16.6918852 10.5214925,18.6824965 8.36894465,19.8667446 C8.13889521,19.9933089 7.86050368,19.9952005 7.62875554,19.8717742 L7.62876743,19.8717519 C5.40633678,18.6881115 3.50784562,16.6958311 1.93329396,13.8949108 C0.436552873,11.2324052 -0.191114268,8.60314433 0.0502925379,6.00712815 C0.0985397101,5.48829257 0.427159743,5.03759169 0.90638766,4.83299758 L4.08347953,3.47659098 L7.11616328,2.18186418 Z M8.14534465,4.28634334 L8.14534465,17.3539843 C9.75854566,16.3823709 11.1078209,14.8842518 12.1931704,12.859627 C13.1416028,11.090409 13.7197177,9.3452093 13.9275149,7.62402786 L13.9275498,7.62403207 C13.9802257,7.18771829 13.7418721,6.76814784 13.3401208,6.5899895 L8.14534465,4.28634334 Z", transform: "translate(0 -2)" } })]), r("h2", { staticClass: "current-project-nav-flag-popover-content-title" }, [e._v(" " + e._s(n.label) + " ")]), n.description ? r("p", { staticClass: "current-project-nav-flag-popover-content-description" }, [e._v(" " + e._s(n.description) + " ")]) : e._e()]);
  })] : r("p", { staticClass: "current-project-nav-title-popover-description" }, [e._v(" " + e._s(e.privacy.explanation_text) + " ")])], 2)])]);
}, z = [], U = /* @__PURE__ */ q(
  p,
  Z,
  z
);
const X = U.exports;
export {
  X as BreadcrumbPrivacy
};
