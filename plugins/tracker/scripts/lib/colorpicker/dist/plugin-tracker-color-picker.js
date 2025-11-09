import { defineComponent as p, createElementBlock as l, openBlock as c, Fragment as h, renderList as v, normalizeClass as g, computed as m, createElementVNode as u, unref as f, toDisplayString as C, createVNode as k, createBlock as $, ref as b, createApp as P } from "vue";
import { useGettext as B, createGettext as N } from "vue3-gettext";
const E = (e, r, o) => {
  const t = e[r];
  return t ? typeof t == "function" ? t() : Promise.resolve(t) : new Promise((n, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      i.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + r + (r.split("/").length !== o ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
}, U = [
  ["inca-silver", "chrome-silver", "firemist-silver"],
  ["red-wine", "fiesta-red", "coral-pink"],
  ["teddy-brown", "clockwork-orange", "graffiti-yellow"],
  ["army-green", "neon-green", "acid-green"],
  ["sherwood-green", "ocean-turquoise", "surf-green"],
  ["deep-blue", "lake-placid-blue", "daphne-blue"],
  ["plum-crazy", "ultra-violet", "lilac-purple"],
  ["panther-pink", "peggy-pink", "flamingo-pink"]
], x = { class: "colorpicker-row" }, z = ["title", "onClick"], q = /* @__PURE__ */ p({
  __name: "ColorPickerPaletteRow",
  props: {
    colors: {},
    selected_color: {}
  },
  emits: ["color-update"],
  setup(e, { emit: r }) {
    const o = e, t = r;
    function n(s) {
      t("color-update", s);
    }
    function i(s) {
      return o.selected_color === s;
    }
    return (s, _) => (c(), l("div", x, [
      (c(!0), l(h, null, v(s.colors, (a) => (c(), l("span", {
        class: g(["colorpicker-circular-color", [
          "colorpicker-circular-color-" + a,
          {
            "fa fa-check": i(a)
          }
        ]]),
        key: a,
        title: a,
        onClick: (ee) => n(a)
      }, null, 10, z))), 128))
    ]));
  }
}), A = ["title"], F = { class: "colorpicker-row-no-color-label" }, L = /* @__PURE__ */ p({
  __name: "ColorPickerNoColorOption",
  props: {
    selected_color: {}
  },
  emits: ["color-update"],
  setup(e, { emit: r }) {
    const o = e, { $gettext: t } = B(), n = m(() => o.selected_color === ""), i = r;
    function s() {
      i("color-update", "");
    }
    return (_, a) => (c(), l("div", {
      class: "colorpicker-row-no-color",
      onClick: s
    }, [
      u("span", {
        class: g(["colorpicker-circular-color colorpicker-circular-no-color", { "colorpicker-no-color-selected fa fa-check": n.value }]),
        title: f(t)("No color")
      }, null, 10, A),
      u("span", F, C(f(t)("No color")), 1)
    ]));
  }
}), M = { class: "colorpicker-palette" }, O = /* @__PURE__ */ p({
  __name: "ColorPickerPalette",
  props: {
    current_color: {}
  },
  emits: ["color-update"],
  setup(e, { emit: r }) {
    const o = r;
    function t(n) {
      o("color-update", n);
    }
    return (n, i) => (c(), l("div", M, [
      (c(!0), l(h, null, v(f(U), (s, _) => (c(), $(q, {
        colors: s,
        selected_color: n.current_color,
        key: _,
        onColorUpdate: t
      }, null, 8, ["colors", "selected_color"]))), 128)),
      k(L, {
        selected_color: n.current_color,
        onColorUpdate: t
      }, null, 8, ["selected_color"])
    ]));
  }
}), R = ["title"], j = ["title"], D = "/themes/FlamingParrot/images/ic/layer-transparent.png", G = /* @__PURE__ */ p({
  __name: "ColorPickerPreview",
  props: {
    color: {},
    is_unsupported_color: { type: Boolean }
  },
  setup(e) {
    const r = e, o = m(() => r.color.includes("#")), t = m(() => r.color.length === 0);
    return (n, i) => n.is_unsupported_color && o.value ? (c(), l("i", {
      key: 0,
      title: n.$gettext("This color is no longer supported, please select another one"),
      class: "fa-solid fa-triangle-exclamation text-error"
    }, null, 8, R)) : t.value ? (c(), l("img", {
      key: 1,
      class: "old-color-picker-preview",
      src: D
    })) : (c(), l("span", {
      key: 2,
      class: g(["color-picker-preview", "colorpicker-preview-" + n.color]),
      title: n.color
    }, null, 10, j));
  }
}), S = { class: "dropdown tracker-colorpicker" }, T = {
  class: "dropdown-toggle",
  "data-toggle": "dropdown"
}, V = {
  class: "dropdown-menu",
  role: "menu"
}, H = ["id", "name", "value"], I = /* @__PURE__ */ p({
  __name: "ColorPicker",
  props: {
    input_name: {},
    input_id: {},
    current_color: {},
    is_unsupported_color: { type: Boolean }
  },
  setup(e) {
    const o = b(e.current_color);
    function t(n = "") {
      o.value = n;
    }
    return (n, i) => (c(), l("div", S, [
      u("a", T, [
        k(G, {
          color: o.value,
          is_unsupported_color: n.is_unsupported_color
        }, null, 8, ["color", "is_unsupported_color"])
      ]),
      u("div", V, [
        k(O, {
          onColorUpdate: t,
          current_color: o.value
        }, null, 8, ["current_color"])
      ]),
      u("input", {
        class: "colorpicker-input",
        id: n.input_id,
        name: n.input_name,
        value: o.value,
        type: "hidden",
        size: "6",
        autocomplete: "off"
      }, null, 8, H)
    ]));
  }
}), Z = "en_US", w = Z, J = /[a-z]{2,3}_[A-Z]{2,3}/, y = (e) => J.test(e ?? ""), K = (e) => {
  const r = e.body.dataset.userLocale;
  return y(r) ? r : w;
};
function Q(e) {
  if (!y(e))
    throw Error(`${e} does not not seem to be a locale string`);
  return e;
}
const W = (e, r) => e === w ? Promise.resolve({}) : r(e).then(
  (o) => {
    const t = {};
    return t[e] = Y(o), t;
  },
  () => ({})
);
async function X(e, r) {
  const o = K(document);
  return e({
    defaultLanguage: o,
    translations: await W(o, r),
    silent: !0
  });
}
function Y(e) {
  const r = {};
  for (const [, o] of Object.entries(e.translations[""]))
    o.msgstr.every((t) => t.length !== 0) && (r[o.msgid] = o.msgstr);
  return r;
}
const d = (e, r) => {
  const o = e.getAttribute(r);
  if (o === null)
    throw Error(`Missing attribute ${r}`);
  return o;
};
async function te(e) {
  const r = await X(N, (t) => E(/* @__PURE__ */ Object.assign({ "../po/fr_FR.po": () => import("./fr_FR-2hvhjmzf.js") }), `../po/${Q(t)}.po`, 3)), o = P(I, {
    input_name: d(e, "data-input-name"),
    input_id: d(e, "data-input-id"),
    current_color: d(e, "data-current-color"),
    is_unsupported_color: !!d(e, "data-is-unsupported-color")
  });
  o.use(r), o.mount(e);
}
export {
  te as createColorPicker
};
