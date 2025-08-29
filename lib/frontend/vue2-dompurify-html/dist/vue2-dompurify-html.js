import l from "dompurify";
function a(e = {}) {
  const t = function(n, u) {
    const i = u.value;
    if (u.oldValue === i)
      return;
    const r = `${i}`, o = e.default ?? {};
    n.innerHTML = l.sanitize(r, o);
  };
  return {
    inserted: t,
    update: t,
    unbind: (n) => {
      n.innerHTML = "";
    }
  };
}
const f = {
  install(e, t = {}) {
    e.directive("dompurify-html", a(t));
  }
};
export {
  f as default
};
