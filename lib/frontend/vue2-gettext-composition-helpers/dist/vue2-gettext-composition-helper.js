import { getCurrentInstance as e } from "vue";
function n() {
  const t = e();
  if (t === null)
    throw new Error(
      "You must use this function within the `setup()` method or a <script setup> tag"
    );
  return {
    $gettext: t.proxy.$gettext,
    $pgettext: t.proxy.$pgettext,
    $ngettext: t.proxy.$ngettext,
    $npgettext: t.proxy.$npgettext,
    interpolate: t.proxy.$gettextInterpolate
  };
}
export {
  n as useGettext
};
