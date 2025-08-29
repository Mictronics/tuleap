function $l(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var G = { exports: {} };
/**
 * vue-gettext v2.1.12
 * (c) 2020 Polyconseil
 * @license MIT
 */
var Cl = G.exports, nl;
function Ml() {
  return nl || (nl = 1, function(l, g) {
    (function(m, r) {
      r(g);
    })(Cl, function(m) {
      typeof Object.assign != "function" && function() {
        Object.assign = function(n) {
          var a = arguments, t, o, i, h;
          if (n == null)
            throw new TypeError("Cannot convert undefined or null to object");
          for (t = Object(n), o = 1; o < arguments.length; o++)
            if (i = a[o], i != null)
              for (h in i)
                i.hasOwnProperty(h) && (t[h] = i[h]);
          return t;
        };
      }();
      var r = {
        getTranslationIndex: function(n, a) {
          switch (a = Number(a), a = typeof a == "number" && isNaN(a) ? 1 : a, n.length > 2 && n !== "pt_BR" && (n = n.split("_")[0]), n) {
            case "ay":
            // Aymará
            case "bo":
            // Tibetan
            case "cgg":
            // Chiga
            case "dz":
            // Dzongkha
            case "fa":
            // Persian
            case "id":
            // Indonesian
            case "ja":
            // Japanese
            case "jbo":
            // Lojban
            case "ka":
            // Georgian
            case "kk":
            // Kazakh
            case "km":
            // Khmer
            case "ko":
            // Korean
            case "ky":
            // Kyrgyz
            case "lo":
            // Lao
            case "ms":
            // Malay
            case "my":
            // Burmese
            case "sah":
            // Yakut
            case "su":
            // Sundanese
            case "th":
            // Thai
            case "tt":
            // Tatar
            case "ug":
            // Uyghur
            case "vi":
            // Vietnamese
            case "wo":
            // Wolof
            case "zh":
              return 0;
            case "is":
              return a % 10 !== 1 || a % 100 === 11 ? 1 : 0;
            case "jv":
              return a !== 0 ? 1 : 0;
            case "mk":
              return a === 1 || a % 10 === 1 ? 0 : 1;
            case "ach":
            // Acholi
            case "ak":
            // Akan
            case "am":
            // Amharic
            case "arn":
            // Mapudungun
            case "br":
            // Breton
            case "fil":
            // Filipino
            case "fr":
            // French
            case "gun":
            // Gun
            case "ln":
            // Lingala
            case "mfe":
            // Mauritian Creole
            case "mg":
            // Malagasy
            case "mi":
            // Maori
            case "oc":
            // Occitan
            case "pt_BR":
            // Brazilian Portuguese
            case "tg":
            // Tajik
            case "ti":
            // Tigrinya
            case "tr":
            // Turkish
            case "uz":
            // Uzbek
            case "wa":
            // Walloon
            /* eslint-disable */
            /* Disable "Duplicate case label" because there are 2 forms of Chinese plurals */
            case "zh":
              return a > 1 ? 1 : 0;
            case "lv":
              return a % 10 === 1 && a % 100 !== 11 ? 0 : a !== 0 ? 1 : 2;
            case "lt":
              return a % 10 === 1 && a % 100 !== 11 ? 0 : a % 10 >= 2 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
            case "be":
            // Belarusian
            case "bs":
            // Bosnian
            case "hr":
            // Croatian
            case "ru":
            // Russian
            case "sr":
            // Serbian
            case "uk":
              return a % 10 === 1 && a % 100 !== 11 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
            case "mnk":
              return a === 0 ? 0 : a === 1 ? 1 : 2;
            case "ro":
              return a === 1 ? 0 : a === 0 || a % 100 > 0 && a % 100 < 20 ? 1 : 2;
            case "pl":
              return a === 1 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
            case "cs":
            // Czech
            case "sk":
              return a === 1 ? 0 : a >= 2 && a <= 4 ? 1 : 2;
            case "csb":
              return a === 1 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2;
            case "sl":
              return a % 100 === 1 ? 0 : a % 100 === 2 ? 1 : a % 100 === 3 || a % 100 === 4 ? 2 : 3;
            case "mt":
              return a === 1 ? 0 : a === 0 || a % 100 > 1 && a % 100 < 11 ? 1 : a % 100 > 10 && a % 100 < 20 ? 2 : 3;
            case "gd":
              return a === 1 || a === 11 ? 0 : a === 2 || a === 12 ? 1 : a > 2 && a < 20 ? 2 : 3;
            case "cy":
              return a === 1 ? 0 : a === 2 ? 1 : a !== 8 && a !== 11 ? 2 : 3;
            case "kw":
              return a === 1 ? 0 : a === 2 ? 1 : a === 3 ? 2 : 3;
            case "ga":
              return a === 1 ? 0 : a === 2 ? 1 : a > 2 && a < 7 ? 2 : a > 6 && a < 11 ? 3 : 4;
            case "ar":
              return a === 0 ? 0 : a === 1 ? 1 : a === 2 ? 2 : a % 100 >= 3 && a % 100 <= 10 ? 3 : a % 100 >= 11 ? 4 : 5;
            default:
              return a !== 1 ? 1 : 0;
          }
        }
      }, p;
      function c(n) {
        p = n;
      }
      var d = /[[\].]{1,2}/g, j = /%\{((?:.|\n)+?)\}/g, L = /\{\{((?:.|\n)+?)\}\}/g, _ = function(n, a, t) {
        a === void 0 && (a = {}), t === void 0 && (t = !1), p && !p.config.getTextPluginSilent && L.test(n) && console.warn('Mustache syntax cannot be used with vue-gettext. Please use "%{}" instead of "{{}}" in: ' + n);
        var o = n.replace(j, function(i, h) {
          var y = h.trim(), v, f = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
          };
          function F(b, P) {
            for (var S = P.split(d).filter(function(X) {
              return X;
            }); S.length; )
              b = b[S.shift()];
            return b;
          }
          function O(b) {
            try {
              v = F(this, b);
            } catch {
            }
            if (v === void 0) {
              if (this.$parent)
                return O.call(this.$parent, b);
              console.warn("Cannot evaluate expression: " + b), v = b;
            }
            var P = v.toString();
            return t ? P : P.replace(/[&<>"']/g, function(S) {
              return f[S];
            });
          }
          return O.call(a, y);
        });
        return o;
      };
      _.INTERPOLATION_RE = j, _.INTERPOLATION_PREFIX = "%{";
      var w = /\s{2,}/g, k = {
        language: "",
        getTextPluginSilent: !1,
        getTextPluginMuteLanguages: []
      }, C = {}, T = {
        /*
         * Get the translated string from the translation.json file generated by easygettext.
         *
         * @param {String} msgid - The translation key
         * @param {Number} n - The number to switch between singular and plural
         * @param {String} context - The translation key context
         * @param {String} defaultPlural - The default plural value (optional)
         * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
         *
         * @return {String} The translated string
        */
        getTranslation: function(n, a, t, o, i) {
          if (a === void 0 && (a = 1), t === void 0 && (t = null), o === void 0 && (o = null), i === void 0 && (i = k.language), !n)
            return "";
          var h = k.getTextPluginSilent || k.getTextPluginMuteLanguages.indexOf(i) !== -1, y = o && r.getTranslationIndex(i, a) > 0 ? o : n, v = C[i] || C[i.split("_")[0]];
          if (!v)
            return h || console.warn("No translations found for " + i), y;
          n = n.trim();
          var f = v[n];
          if (!f && w.test(n) && Object.keys(v).some(function(b) {
            if (b.replace(w, " ") === n.replace(w, " "))
              return f = v[b], f;
          }), f && t && (f = f[t]), !f) {
            if (!h) {
              var F = "Untranslated " + i + " key found: " + n;
              t && (F += " (with context: " + t + ")"), console.warn(F);
            }
            return y;
          }
          !(f instanceof Array) && f.hasOwnProperty("") && (f = f[""]), typeof f == "string" && (f = [f]);
          var O = r.getTranslationIndex(i, a);
          return f.length === 1 && a === 1 && (O = 0), f[O];
        },
        /*
         * Returns a string of the translation of the message.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} msgid - The translation key
         * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
         *
         * @return {String} The translated string
        */
        gettext: function(n, a) {
          return a === void 0 && (a = k.language), T.getTranslation(n, 1, null, null, a);
        },
        /*
         * Returns a string of the translation for the given context.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} context - The context of the string to translate
         * @param {String} msgid - The translation key
         * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
         *
         * @return {String} The translated string
        */
        pgettext: function(n, a, t) {
          return t === void 0 && (t = k.language), T.getTranslation(a, 1, n, null, t);
        },
        /*
         * Returns a string of the translation of either the singular or plural,
         * based on the number.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} msgid - The translation key
         * @param {String} plural - The plural form of the translation key
         * @param {Number} n - The number to switch between singular and plural
         * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
         *
         * @return {String} The translated string
        */
        ngettext: function(n, a, t, o) {
          return o === void 0 && (o = k.language), T.getTranslation(n, t, null, a, o);
        },
        /*
         * Returns a string of the translation of either the singular or plural,
         * based on the number, for the given context.
         * Also makes the string discoverable by gettext-extract.
         *
         * @param {String} context - The context of the string to translate
         * @param {String} msgid - The translation key
         * @param {String} plural - The plural form of the translation key
         * @param {Number} n - The number to switch between singular and plural
         * @param {String} language - The language ID (e.g. 'fr_FR' or 'en_US')
         *
         * @return {String} The translated string
        */
        npgettext: function(n, a, t, o, i) {
          return i === void 0 && (i = k.language), T.getTranslation(a, o, n, t, i);
        },
        /*
         * Initialize local state for translations and configuration
         * so that it works without Vue.
         *
         * @param {Object} translations - translations.json
         * @param {Object} config - Vue.config
         *
        */
        initTranslations: function(n, a) {
          n && typeof n == "object" && (C = n), a && typeof a == "object" && (k = a);
        },
        /**
         * Allows to use interpolation outside the Vue
         *
         * @example
         *  import {translate} from 'vue-gettext';
         *
         *  const {gettext, gettextInterpolate} = translate;
         *
         *  let translated = gettext('%{ n } foos', n)
         *  let interpolated = gettextInterpolate(translated, {n: 5})
         */
        gettextInterpolate: _.bind(_)
      };
      function A() {
        var n = "", a, t;
        for (a = 0; a < 32; a++)
          t = Math.random() * 16 | 0, (a === 8 || a === 12 || a === 16 || a === 20) && (n += "-"), n += (a === 12 ? 4 : a === 16 ? t & 3 | 8 : t).toString(16);
        return n;
      }
      var H = {
        name: "translate",
        created: function() {
          if (this.msgid = "", this.$options._renderChildren && (this.$options._renderChildren[0].hasOwnProperty("text") ? this.msgid = this.$options._renderChildren[0].text : this.msgid = this.$options._renderChildren[0]), this.isPlural = this.translateN !== void 0 && this.translatePlural !== void 0, !this.isPlural && (this.translateN || this.translatePlural))
            throw new Error("`translate-n` and `translate-plural` attributes must be used together: " + this.msgid + ".");
        },
        props: {
          tag: {
            type: String,
            default: "span"
          },
          // Always use v-bind for dynamically binding the `translateN` prop to data on the parent,
          // i.e.: `:translateN`.
          translateN: {
            type: Number,
            required: !1
          },
          translatePlural: {
            type: String,
            required: !1
          },
          translateContext: {
            type: String,
            required: !1
          },
          translateParams: {
            type: Object,
            required: !1
          },
          // `translateComment` is used exclusively by `easygettext`'s `gettext-extract`.
          translateComment: {
            type: String,
            required: !1
          }
        },
        computed: {
          translation: function() {
            var n = T.getTranslation(
              this.msgid,
              this.translateN,
              this.translateContext,
              this.isPlural ? this.translatePlural : null,
              this.$language.current
            ), a = this.$parent;
            return this.translateParams && (a = Object.assign({}, this.$parent, this.translateParams)), this.$gettextInterpolate(n, a);
          }
        },
        render: function(n) {
          return p.config.autoAddKeyAttributes && !this.$vnode.key && (this.$vnode.key = A()), n(this.tag, [this.translation]);
        }
      };
      function M(n, a) {
        if (n === a)
          return !0;
        var t = n !== null && typeof n == "object", o = a !== null && typeof a == "object";
        if (t && o)
          try {
            var i = Array.isArray(n), h = Array.isArray(a);
            if (i && h)
              return n.length === a.length && n.every(function(f, F) {
                return M(f, a[F]);
              });
            if (n instanceof Date && a instanceof Date)
              return n.getTime() === a.getTime();
            if (!i && !h) {
              var y = Object.keys(n), v = Object.keys(a);
              return y.length === v.length && y.every(function(f) {
                return M(n[f], a[f]);
              });
            } else
              return !1;
          } catch {
            return !1;
          }
        else return !t && !o ? String(n) === String(a) : !1;
      }
      var D = function(n, a, t) {
        var o = t.data.attrs || {}, i = n.dataset.msgid, h = o["translate-context"], y = o["translate-n"], v = o["translate-plural"], f = y !== void 0 && v !== void 0, F = t.context, O = o["render-html"] === "true";
        if (!f && (y || v))
          throw new Error("`translate-n` and `translate-plural` attributes must be used together:" + i + ".");
        !p.config.getTextPluginSilent && o["translate-params"] && console.warn("`translate-params` is required as an expression for v-translate directive. Please change to `v-translate='params'`: " + i), a.value && typeof a.value == "object" && (F = Object.assign({}, t.context, a.value));
        var b = T.getTranslation(
          i,
          y,
          h,
          f ? v : null,
          n.dataset.currentLanguage
        ), P = _(b, F, O);
        n.innerHTML = P;
      }, W = {
        bind: function(a, t, o) {
          p.config.autoAddKeyAttributes && !o.key && (o.key = A());
          var i = a.innerHTML;
          if (a.dataset.msgid = i, a.dataset.currentLanguage = p.config.language, !p.config.getTextPluginSilent) {
            var h = i.indexOf(_.INTERPOLATION_PREFIX) !== -1;
            h && !t.expression && console.info(`No expression is provided for change detection. The translation for this key will be static:
` + i);
          }
          D(a, t, o);
        },
        update: function(a, t, o) {
          var i = !1;
          a.dataset.currentLanguage !== p.config.language && (a.dataset.currentLanguage = p.config.language, i = !0), !i && t.expression && !M(t.value, t.oldValue) && (i = !0), i && D(a, t, o);
        }
      };
      function K(n, a, t, o, i) {
        Object.defineProperty(n.config, "language", {
          enumerable: !0,
          configurable: !0,
          get: function() {
            return a.current;
          },
          set: function(h) {
            a.current = h;
          }
        }), Object.defineProperty(n.config, "getTextPluginSilent", {
          enumerable: !0,
          writable: !0,
          value: t
        }), Object.defineProperty(n.config, "autoAddKeyAttributes", {
          enumerable: !0,
          writable: !0,
          value: o
        }), Object.defineProperty(n.config, "getTextPluginMuteLanguages", {
          enumerable: !0,
          writable: !0,
          value: i
          // Stores an array of languages for which the warnings are disabled.
        });
      }
      function I(n, a) {
        var t = n.prototype._init;
        n.prototype._init = function(i) {
          i === void 0 && (i = {});
          var h = i._parent || i.parent || this;
          this.$language = h.$language || a, t.call(this, i);
        };
        var o = n.prototype._destroy;
        n.prototype._destroy = function() {
          this.$language = null, o.apply(this, arguments);
        };
      }
      var E, q = function(n, a) {
        a === void 0 && (a = {});
        var t = {
          autoAddKeyAttributes: !1,
          availableLanguages: { en_US: "English" },
          defaultLanguage: "en_US",
          languageVmMixin: {},
          muteLanguages: [],
          silent: n.config.silent,
          translations: null
        };
        if (Object.keys(a).forEach(function(o) {
          if (Object.keys(t).indexOf(o) === -1)
            throw new Error(o + " is an invalid option for the translate plugin.");
        }), !a.translations)
          throw new Error("No translations available.");
        a = Object.assign(t, a), E = new n({
          created: function() {
            this.available = a.availableLanguages;
          },
          data: {
            current: a.defaultLanguage
          },
          mixins: [a.languageVmMixin]
        }), c(n), I(n, E), K(n, E, a.silent, a.autoAddKeyAttributes, a.muteLanguages), T.initTranslations(a.translations, n.config), n.component("translate", H), n.directive("translate", W), n.$translations = a.translations, n.prototype.$gettext = T.gettext.bind(T), n.prototype.$pgettext = T.pgettext.bind(T), n.prototype.$ngettext = T.ngettext.bind(T), n.prototype.$npgettext = T.npgettext.bind(T), n.prototype.$gettextInterpolate = _.bind(_);
      };
      m.default = q, m.translate = T, Object.defineProperty(m, "__esModule", { value: !0 });
    });
  }(G, G.exports)), G.exports;
}
var Il = Ml();
const zl = /* @__PURE__ */ $l(Il);
function Rl(l) {
  const g = {};
  for (const r of l) {
    const p = r.msgctxt || "";
    r.msgstr[0] && r.msgstr[0].length > 0 && !r.flags.fuzzy && !r.obsolete && (g[r.msgid] || (g[r.msgid] = {}), g[r.msgid][p] = r.msgstr.length === 1 ? r.msgstr[0] : r.msgstr);
  }
  const m = {};
  for (const r in g)
    Object.keys(g[r]).length === 1 && g[r][""] ? m[r] = g[r][""] : m[r] = g[r];
  return m;
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Q, ul;
function Gl() {
  if (ul) return Q;
  ul = 1;
  var l = "Expected a function", g = "__lodash_hash_undefined__", m = "[object Function]", r = "[object GeneratorFunction]", p = "[object Symbol]", c = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, d = /^\w*$/, j = /^\./, L = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, _ = /[\\^$.*+?()[\]{}|]/g, w = /\\(\\)?/g, k = /^\[object .+?Constructor\]$/, C = typeof Y == "object" && Y && Y.Object === Object && Y, T = typeof self == "object" && self && self.Object === Object && self, A = C || T || Function("return this")();
  function H(e, u) {
    return e?.[u];
  }
  function M(e) {
    var u = !1;
    if (e != null && typeof e.toString != "function")
      try {
        u = !!(e + "");
      } catch {
      }
    return u;
  }
  var D = Array.prototype, W = Function.prototype, K = Object.prototype, I = A["__core-js_shared__"], E = function() {
    var e = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }(), q = W.toString, n = K.hasOwnProperty, a = K.toString, t = RegExp(
    "^" + q.call(n).replace(_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), o = A.Symbol, i = D.splice, h = ll(A, "Map"), y = ll(Object, "create"), v = o ? o.prototype : void 0, f = v ? v.toString : void 0;
  function F(e) {
    var u = -1, s = e ? e.length : 0;
    for (this.clear(); ++u < s; ) {
      var x = e[u];
      this.set(x[0], x[1]);
    }
  }
  function O() {
    this.__data__ = y ? y(null) : {};
  }
  function b(e) {
    return this.has(e) && delete this.__data__[e];
  }
  function P(e) {
    var u = this.__data__;
    if (y) {
      var s = u[e];
      return s === g ? void 0 : s;
    }
    return n.call(u, e) ? u[e] : void 0;
  }
  function S(e) {
    var u = this.__data__;
    return y ? u[e] !== void 0 : n.call(u, e);
  }
  function X(e, u) {
    var s = this.__data__;
    return s[e] = y && u === void 0 ? g : u, this;
  }
  F.prototype.clear = O, F.prototype.delete = b, F.prototype.get = P, F.prototype.has = S, F.prototype.set = X;
  function $(e) {
    var u = -1, s = e ? e.length : 0;
    for (this.clear(); ++u < s; ) {
      var x = e[u];
      this.set(x[0], x[1]);
    }
  }
  function il() {
    this.__data__ = [];
  }
  function ol(e) {
    var u = this.__data__, s = B(u, e);
    if (s < 0)
      return !1;
    var x = u.length - 1;
    return s == x ? u.pop() : i.call(u, s, 1), !0;
  }
  function ml(e) {
    var u = this.__data__, s = B(u, e);
    return s < 0 ? void 0 : u[s][1];
  }
  function cl(e) {
    return B(this.__data__, e) > -1;
  }
  function fl(e, u) {
    var s = this.__data__, x = B(s, e);
    return x < 0 ? s.push([e, u]) : s[x][1] = u, this;
  }
  $.prototype.clear = il, $.prototype.delete = ol, $.prototype.get = ml, $.prototype.has = cl, $.prototype.set = fl;
  function N(e) {
    var u = -1, s = e ? e.length : 0;
    for (this.clear(); ++u < s; ) {
      var x = e[u];
      this.set(x[0], x[1]);
    }
  }
  function xl() {
    this.__data__ = {
      hash: new F(),
      map: new (h || $)(),
      string: new F()
    };
  }
  function hl(e) {
    return U(this, e).delete(e);
  }
  function gl(e) {
    return U(this, e).get(e);
  }
  function dl(e) {
    return U(this, e).has(e);
  }
  function Tl(e, u) {
    return U(this, e).set(e, u), this;
  }
  N.prototype.clear = xl, N.prototype.delete = hl, N.prototype.get = gl, N.prototype.has = dl, N.prototype.set = Tl;
  function B(e, u) {
    for (var s = e.length; s--; )
      if (Ll(e[s][0], u))
        return s;
    return -1;
  }
  function vl(e, u) {
    u = _l(u, e) ? [u] : bl(u);
    for (var s = 0, x = u.length; e != null && s < x; )
      e = e[Ol(u[s++])];
    return s && s == x ? e : void 0;
  }
  function yl(e) {
    if (!el(e) || kl(e))
      return !1;
    var u = Sl(e) || M(e) ? t : k;
    return u.test(Pl(e));
  }
  function Fl(e) {
    if (typeof e == "string")
      return e;
    if (Z(e))
      return f ? f.call(e) : "";
    var u = e + "";
    return u == "0" && 1 / e == -1 / 0 ? "-0" : u;
  }
  function bl(e) {
    return al(e) ? e : jl(e);
  }
  function U(e, u) {
    var s = e.__data__;
    return wl(u) ? s[typeof u == "string" ? "string" : "hash"] : s.map;
  }
  function ll(e, u) {
    var s = H(e, u);
    return yl(s) ? s : void 0;
  }
  function _l(e, u) {
    if (al(e))
      return !1;
    var s = typeof e;
    return s == "number" || s == "symbol" || s == "boolean" || e == null || Z(e) ? !0 : d.test(e) || !c.test(e) || u != null && e in Object(u);
  }
  function wl(e) {
    var u = typeof e;
    return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? e !== "__proto__" : e === null;
  }
  function kl(e) {
    return !!E && E in e;
  }
  var jl = J(function(e) {
    e = Al(e);
    var u = [];
    return j.test(e) && u.push(""), e.replace(L, function(s, x, z, R) {
      u.push(z ? R.replace(w, "$1") : x || s);
    }), u;
  });
  function Ol(e) {
    if (typeof e == "string" || Z(e))
      return e;
    var u = e + "";
    return u == "0" && 1 / e == -1 / 0 ? "-0" : u;
  }
  function Pl(e) {
    if (e != null) {
      try {
        return q.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  function J(e, u) {
    if (typeof e != "function" || u && typeof u != "function")
      throw new TypeError(l);
    var s = function() {
      var x = arguments, z = u ? u.apply(this, x) : x[0], R = s.cache;
      if (R.has(z))
        return R.get(z);
      var rl = e.apply(this, x);
      return s.cache = R.set(z, rl), rl;
    };
    return s.cache = new (J.Cache || N)(), s;
  }
  J.Cache = N;
  function Ll(e, u) {
    return e === u || e !== e && u !== u;
  }
  var al = Array.isArray;
  function Sl(e) {
    var u = el(e) ? a.call(e) : "";
    return u == m || u == r;
  }
  function el(e) {
    var u = typeof e;
    return !!e && (u == "object" || u == "function");
  }
  function Nl(e) {
    return !!e && typeof e == "object";
  }
  function Z(e) {
    return typeof e == "symbol" || Nl(e) && a.call(e) == p;
  }
  function Al(e) {
    return e == null ? "" : Fl(e);
  }
  function El(e, u, s) {
    var x = e == null ? void 0 : vl(e, u);
    return x === void 0 ? s : x;
  }
  return Q = El, Q;
}
var tl, sl;
function Dl() {
  return sl || (sl = 1, tl = {
    ach: {
      name: "Acholi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    af: {
      name: "Afrikaans",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ak: {
      name: "Akan",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    am: {
      name: "Amharic",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    an: {
      name: "Aragonese",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ar: {
      name: "Arabic",
      examples: [{
        plural: 0,
        sample: 0
      }, {
        plural: 1,
        sample: 1
      }, {
        plural: 2,
        sample: 2
      }, {
        plural: 3,
        sample: 3
      }, {
        plural: 4,
        sample: 11
      }, {
        plural: 5,
        sample: 100
      }],
      nplurals: 6,
      pluralsText: "nplurals = 6; plural = (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5)",
      pluralsFunc: function(l) {
        return l === 0 ? 0 : l === 1 ? 1 : l === 2 ? 2 : l % 100 >= 3 && l % 100 <= 10 ? 3 : l % 100 >= 11 ? 4 : 5;
      }
    },
    arn: {
      name: "Mapudungun",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    ast: {
      name: "Asturian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ay: {
      name: "Aymará",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    az: {
      name: "Azerbaijani",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    be: {
      name: "Belarusian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    bg: {
      name: "Bulgarian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    bn: {
      name: "Bengali",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    bo: {
      name: "Tibetan",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    br: {
      name: "Breton",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    brx: {
      name: "Bodo",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    bs: {
      name: "Bosnian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    ca: {
      name: "Catalan",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    cgg: {
      name: "Chiga",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    cs: {
      name: "Czech",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l >= 2 && l <= 4 ? 1 : 2;
      }
    },
    csb: {
      name: "Kashubian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    cy: {
      name: "Welsh",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 3
      }, {
        plural: 3,
        sample: 8
      }],
      nplurals: 4,
      pluralsText: "nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l === 2 ? 1 : l !== 8 && l !== 11 ? 2 : 3;
      }
    },
    da: {
      name: "Danish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    de: {
      name: "German",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    doi: {
      name: "Dogri",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    dz: {
      name: "Dzongkha",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    el: {
      name: "Greek",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    en: {
      name: "English",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    eo: {
      name: "Esperanto",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    es: {
      name: "Spanish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    et: {
      name: "Estonian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    eu: {
      name: "Basque",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    fa: {
      name: "Persian",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    ff: {
      name: "Fulah",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    fi: {
      name: "Finnish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    fil: {
      name: "Filipino",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    fo: {
      name: "Faroese",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    fr: {
      name: "French",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    fur: {
      name: "Friulian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    fy: {
      name: "Frisian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ga: {
      name: "Irish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 3
      }, {
        plural: 3,
        sample: 7
      }, {
        plural: 4,
        sample: 11
      }],
      nplurals: 5,
      pluralsText: "nplurals = 5; plural = (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l === 2 ? 1 : l < 7 ? 2 : l < 11 ? 3 : 4;
      }
    },
    gd: {
      name: "Scottish Gaelic",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 3
      }, {
        plural: 3,
        sample: 20
      }],
      nplurals: 4,
      pluralsText: "nplurals = 4; plural = ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3)",
      pluralsFunc: function(l) {
        return l === 1 || l === 11 ? 0 : l === 2 || l === 12 ? 1 : l > 2 && l < 20 ? 2 : 3;
      }
    },
    gl: {
      name: "Galician",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    gu: {
      name: "Gujarati",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    gun: {
      name: "Gun",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    ha: {
      name: "Hausa",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    he: {
      name: "Hebrew",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    hi: {
      name: "Hindi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    hne: {
      name: "Chhattisgarhi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    hr: {
      name: "Croatian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    hu: {
      name: "Hungarian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    hy: {
      name: "Armenian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    id: {
      name: "Indonesian",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    is: {
      name: "Icelandic",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n % 10 !== 1 || n % 100 === 11)",
      pluralsFunc: function(l) {
        return l % 10 !== 1 || l % 100 === 11;
      }
    },
    it: {
      name: "Italian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ja: {
      name: "Japanese",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    jbo: {
      name: "Lojban",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    jv: {
      name: "Javanese",
      examples: [{
        plural: 0,
        sample: 0
      }, {
        plural: 1,
        sample: 1
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 0)",
      pluralsFunc: function(l) {
        return l !== 0;
      }
    },
    ka: {
      name: "Georgian",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    kk: {
      name: "Kazakh",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    km: {
      name: "Khmer",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    kn: {
      name: "Kannada",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ko: {
      name: "Korean",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    ku: {
      name: "Kurdish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    kw: {
      name: "Cornish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 3
      }, {
        plural: 3,
        sample: 4
      }],
      nplurals: 4,
      pluralsText: "nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l === 2 ? 1 : l === 3 ? 2 : 3;
      }
    },
    ky: {
      name: "Kyrgyz",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    lb: {
      name: "Letzeburgesch",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ln: {
      name: "Lingala",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    lo: {
      name: "Lao",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    lt: {
      name: "Lithuanian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 10
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    lv: {
      name: "Latvian",
      examples: [{
        plural: 2,
        sample: 0
      }, {
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l !== 0 ? 1 : 2;
      }
    },
    mai: {
      name: "Maithili",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    mfe: {
      name: "Mauritian Creole",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    mg: {
      name: "Malagasy",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    mi: {
      name: "Maori",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    mk: {
      name: "Macedonian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n === 1 || n % 10 === 1 ? 0 : 1)",
      pluralsFunc: function(l) {
        return l === 1 || l % 10 === 1 ? 0 : 1;
      }
    },
    ml: {
      name: "Malayalam",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    mn: {
      name: "Mongolian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    mni: {
      name: "Manipuri",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    mnk: {
      name: "Mandinka",
      examples: [{
        plural: 0,
        sample: 0
      }, {
        plural: 1,
        sample: 1
      }, {
        plural: 2,
        sample: 2
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 0 ? 0 : n === 1 ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 0 ? 0 : l === 1 ? 1 : 2;
      }
    },
    mr: {
      name: "Marathi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ms: {
      name: "Malay",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    mt: {
      name: "Maltese",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 11
      }, {
        plural: 3,
        sample: 20
      }],
      nplurals: 4,
      pluralsText: "nplurals = 4; plural = (n === 1 ? 0 : n === 0 || ( n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20 ) ? 2 : 3)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l === 0 || l % 100 > 1 && l % 100 < 11 ? 1 : l % 100 > 10 && l % 100 < 20 ? 2 : 3;
      }
    },
    my: {
      name: "Burmese",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    nah: {
      name: "Nahuatl",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    nap: {
      name: "Neapolitan",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    nb: {
      name: "Norwegian Bokmal",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ne: {
      name: "Nepali",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    nl: {
      name: "Dutch",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    nn: {
      name: "Norwegian Nynorsk",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    no: {
      name: "Norwegian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    nso: {
      name: "Northern Sotho",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    oc: {
      name: "Occitan",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    or: {
      name: "Oriya",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    pa: {
      name: "Punjabi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    pap: {
      name: "Papiamento",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    pl: {
      name: "Polish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    pms: {
      name: "Piemontese",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ps: {
      name: "Pashto",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    pt: {
      name: "Portuguese",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    rm: {
      name: "Romansh",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ro: {
      name: "Romanian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 20
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l === 0 || l % 100 > 0 && l % 100 < 20 ? 1 : 2;
      }
    },
    ru: {
      name: "Russian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    rw: {
      name: "Kinyarwanda",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sah: {
      name: "Yakut",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    sat: {
      name: "Santali",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sco: {
      name: "Scots",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sd: {
      name: "Sindhi",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    se: {
      name: "Northern Sami",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    si: {
      name: "Sinhala",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sk: {
      name: "Slovak",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l === 1 ? 0 : l >= 2 && l <= 4 ? 1 : 2;
      }
    },
    sl: {
      name: "Slovenian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 3
      }, {
        plural: 3,
        sample: 5
      }],
      nplurals: 4,
      pluralsText: "nplurals = 4; plural = (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3)",
      pluralsFunc: function(l) {
        return l % 100 === 1 ? 0 : l % 100 === 2 ? 1 : l % 100 === 3 || l % 100 === 4 ? 2 : 3;
      }
    },
    so: {
      name: "Somali",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    son: {
      name: "Songhay",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sq: {
      name: "Albanian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sr: {
      name: "Serbian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    su: {
      name: "Sundanese",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    sv: {
      name: "Swedish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    sw: {
      name: "Swahili",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    ta: {
      name: "Tamil",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    te: {
      name: "Telugu",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    tg: {
      name: "Tajik",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    th: {
      name: "Thai",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    ti: {
      name: "Tigrinya",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    tk: {
      name: "Turkmen",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    tr: {
      name: "Turkish",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    tt: {
      name: "Tatar",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    ug: {
      name: "Uyghur",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    uk: {
      name: "Ukrainian",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }, {
        plural: 2,
        sample: 5
      }],
      nplurals: 3,
      pluralsText: "nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)",
      pluralsFunc: function(l) {
        return l % 10 === 1 && l % 100 !== 11 ? 0 : l % 10 >= 2 && l % 10 <= 4 && (l % 100 < 10 || l % 100 >= 20) ? 1 : 2;
      }
    },
    ur: {
      name: "Urdu",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    uz: {
      name: "Uzbek",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    vi: {
      name: "Vietnamese",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    wa: {
      name: "Walloon",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n > 1)",
      pluralsFunc: function(l) {
        return l > 1;
      }
    },
    wo: {
      name: "Wolof",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    },
    yo: {
      name: "Yoruba",
      examples: [{
        plural: 0,
        sample: 1
      }, {
        plural: 1,
        sample: 2
      }],
      nplurals: 2,
      pluralsText: "nplurals = 2; plural = (n !== 1)",
      pluralsFunc: function(l) {
        return l !== 1;
      }
    },
    zh: {
      name: "Chinese",
      examples: [{
        plural: 0,
        sample: 1
      }],
      nplurals: 1,
      pluralsText: "nplurals = 1; plural = 0",
      pluralsFunc: function() {
        return 0;
      }
    }
  }), tl;
}
var V, pl;
function Kl() {
  if (pl) return V;
  pl = 1;
  var l = Gl(), g = Dl();
  V = m;
  function m(r) {
    r = r || {}, this.catalogs = {}, this.locale = "", this.domain = "messages", this.listeners = [], this.sourceLocale = "", r.sourceLocale && (typeof r.sourceLocale == "string" ? this.sourceLocale = r.sourceLocale : this.warn("The `sourceLocale` option should be a string")), this.debug = "debug" in r && r.debug === !0;
  }
  return m.prototype.on = function(r, p) {
    this.listeners.push({
      eventName: r,
      callback: p
    });
  }, m.prototype.off = function(r, p) {
    this.listeners = this.listeners.filter(function(c) {
      return !(c.eventName === r && c.callback === p);
    });
  }, m.prototype.emit = function(r, p) {
    for (var c = 0; c < this.listeners.length; c++) {
      var d = this.listeners[c];
      d.eventName === r && d.callback(p);
    }
  }, m.prototype.warn = function(r) {
    this.debug && console.warn(r), this.emit("error", new Error(r));
  }, m.prototype.addTranslations = function(r, p, c) {
    this.catalogs[r] || (this.catalogs[r] = {}), this.catalogs[r][p] = c;
  }, m.prototype.setLocale = function(r) {
    if (typeof r != "string") {
      this.warn(
        "You called setLocale() with an argument of type " + typeof r + ". The locale must be a string."
      );
      return;
    }
    r.trim() === "" && this.warn("You called setLocale() with an empty value, which makes little sense."), r !== this.sourceLocale && !this.catalogs[r] && this.warn('You called setLocale() with "' + r + '", but no translations for that locale has been added.'), this.locale = r;
  }, m.prototype.setTextDomain = function(r) {
    if (typeof r != "string") {
      this.warn(
        "You called setTextDomain() with an argument of type " + typeof r + ". The domain must be a string."
      );
      return;
    }
    r.trim() === "" && this.warn("You called setTextDomain() with an empty `domain` value."), this.domain = r;
  }, m.prototype.gettext = function(r) {
    return this.dnpgettext(this.domain, "", r);
  }, m.prototype.dgettext = function(r, p) {
    return this.dnpgettext(r, "", p);
  }, m.prototype.ngettext = function(r, p, c) {
    return this.dnpgettext(this.domain, "", r, p, c);
  }, m.prototype.dngettext = function(r, p, c, d) {
    return this.dnpgettext(r, "", p, c, d);
  }, m.prototype.pgettext = function(r, p) {
    return this.dnpgettext(this.domain, r, p);
  }, m.prototype.dpgettext = function(r, p, c) {
    return this.dnpgettext(r, p, c);
  }, m.prototype.npgettext = function(r, p, c, d) {
    return this.dnpgettext(this.domain, r, p, c, d);
  }, m.prototype.dnpgettext = function(r, p, c, d, j) {
    var L = c, _, w;
    if (p = p || "", !isNaN(j) && j !== 1 && (L = d || c), _ = this._getTranslation(r, p, c), _) {
      if (typeof j == "number") {
        var k = g[m.getLanguageCode(this.locale)].pluralsFunc;
        w = k(j), typeof w == "boolean" && (w = w ? 1 : 0);
      } else
        w = 0;
      return _.msgstr[w] || L;
    } else (!this.sourceLocale || this.locale !== this.sourceLocale) && this.warn('No translation was found for msgid "' + c + '" in msgctxt "' + p + '" and domain "' + r + '"');
    return L;
  }, m.prototype.getComment = function(r, p, c) {
    var d;
    return d = this._getTranslation(r, p, c), d ? d.comments || {} : {};
  }, m.prototype._getTranslation = function(r, p, c) {
    return p = p || "", l(this.catalogs, [this.locale, r, "translations", p, c]);
  }, m.getLanguageCode = function(r) {
    return r.split(/[\-_]/)[0].toLowerCase();
  }, m.prototype.textdomain = function(r) {
    this.debug && console.warn(`textdomain(domain) was used to set locales in node-gettext v1. Make sure you are using it for domains, and switch to setLocale(locale) if you are not.

 To read more about the migration from node-gettext v1 to v2, see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x

This warning will be removed in the final 2.0.0`), this.setTextDomain(r);
  }, m.prototype.setlocale = function(r) {
    this.setLocale(r);
  }, m.prototype.addTextdomain = function() {
    console.error(`addTextdomain() is deprecated.

* To add translations, use addTranslations()
* To set the default domain, use setTextDomain() (or its alias textdomain())

To read more about the migration from node-gettext v1 to v2, see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x`);
  }, V;
}
Kl();
function Ul(l) {
  return ql(l) + ".po";
}
function ql(l) {
  if (!l.match(/[a-z]{2,3}_[A-Z]{2,3}/))
    throw new Error(`${l} does not not seem to be a locale string`);
  return l;
}
const Bl = (l, g) => l ? g(l).then(
  (m) => {
    const r = {};
    return r[l] = m.messages, r;
  },
  () => ({})
) : Promise.resolve({});
async function Yl(l, g) {
  const m = document.body.dataset.userLocale, r = await Bl(
    m,
    (p) => g(p).then((c) => {
      const d = Object.values(c.translations[""]).map(
        (j) => ({
          ...j,
          msgid_plural: null,
          msgctxt: null,
          flags: {},
          obsolete: !1
        })
      );
      return { messages: Rl(d) };
    })
  );
  l.use(zl, { translations: r, silent: !0 }), m && (l.config.language = m);
}
export {
  Ul as getPOFileFromLocale,
  ql as getPOFileFromLocaleWithoutExtension,
  Yl as initVueGettext
};
