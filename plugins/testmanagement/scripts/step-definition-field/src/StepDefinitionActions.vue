<!--
  - Copyright (c) Enalean, 2019-Present. All Rights Reserved.
  -
  - This file is a part of Tuleap.
  -
  - Tuleap is free software; you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation; either version 2 of the License, or
  - (at your option) any later version.
  -
  - Tuleap is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with Tuleap. If not, see <http://www.gnu.org/licenses/>.
  -->

<!-- prettier-ignore -->
<template>
  <div class="ttm-definition-step-actions">
    <div class="ttm-definition-step-actions-format-and-helper-container">
      <translate>Typ:</translate>
      <select
        v-bind:id="type_select_id"
        ref="type"
        class="small ttm-definition-step-type"
        v-on:change="type_change($event)"
        v-bind:disabled="disabled_type_selectbox"
        data-test="ttm-definition-step-type"
      >
        <option
          value="action"
          v-bind:selected="is_action"
          data-test="ttm-definition-step-type-action"
        >
          Action
        </option>
        <option
          value="check"
          v-bind:selected="is_check"
          data-test="ttm-definition-step-type-check"
        >
          Check
        </option>
        <option
          value="input"
          v-bind:selected="is_input"
          data-test="ttm-definition-step-type-input"
        >
          Input
        </option>
        <option
          value="rationale"
          v-bind:selected="is_rationale"
          data-test="ttm-definition-step-type-rationale"
        >
          Rationale
        </option>
        <option
          value="info"
          v-bind:selected="is_info"
          data-test="ttm-definition-step-type-info"
        >
          Info
        </option>
        <option
          value="requirement"
          v-bind:selected="is_requirement"
          data-test="ttm-definition-step-type-requirement"
        >
          Requirement
        </option>
        <option
          value="warning"
          v-bind:selected="is_warning"
          data-test="ttm-definition-step-type-warning"
        >
          Warning
        </option>
        <option
          value="Alert"
          v-bind:selected="is_alert"
          data-test="ttm-definition-step-type-alert"
        >
          Alert
        </option>
      </select>
      <translate>Format:</translate>
      <select
        v-bind:id="format_select_id"
        ref="format"
        class="small ttm-definition-step-description-format"
        v-on:change="input($event)"
        v-bind:disabled="disabled_format_selectbox"
        data-test="ttm-definition-step-description-format"
      >
        <option
          value="text"
          v-bind:selected="is_text"
          data-test="ttm-definition-step-description-format-text"
        >
          Text
        </option>
        <option
          value="html"
          v-bind:selected="is_html"
          data-test="ttm-definition-step-description-format-html"
        >
          HTML
        </option>
        <option
          value="commonmark"
          v-bind:selected="is_commonmark"
          data-test="ttm-definition-step-description-format-commonmark"
        >
          Markdown
        </option>
      </select>
      <commonmark-preview-button
        v-on:commonmark-preview-event="$emit('interpret-content-event')"
        v-bind:is_in_preview_mode="is_in_preview_mode"
        v-bind:is_preview_loading="is_preview_loading"
        v-if="is_commonmark_button_displayed"
      />
      <commonmark-syntax-helper
        v-bind:is_in_preview_mode="is_in_preview_mode"
        v-if="is_commonmark_button_displayed"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import {
    TEXT_FORMAT_COMMONMARK,
    TEXT_FORMAT_HTML,
    TEXT_FORMAT_TEXT,
} from "@tuleap/plugin-tracker-constants";
import { mapState } from "vuex";
import CommonmarkSyntaxHelper from "./CommonMark/CommonmarkSyntaxHelper.vue";
import CommonmarkPreviewButton from "./CommonMark/CommonmarkPreviewButton.vue";

export default {
    name: "StepDefinitionActions",
    components: { CommonmarkPreviewButton, CommonmarkSyntaxHelper },
    props: {
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        format_select_id: {
            type: String,
            default: "",
        },
        type_select_id: {
            type: String,
            default: "",
        },
        is_in_preview_mode: Boolean,
        is_preview_loading: Boolean,
    },
    emits: ["input", "interpret-content-event"],
    computed: {
        ...mapState(["field_id"]),
        is_text() {
            return this.value === TEXT_FORMAT_TEXT;
        },
        is_html() {
            return this.value === TEXT_FORMAT_HTML;
        },
        is_commonmark() {
            return this.value === TEXT_FORMAT_COMMONMARK;
        },
        disabled_format_selectbox() {
            return this.disabled || this.is_in_preview_mode;
        },
        disabled_type_selectbox() {
            return this.disabled || this.is_in_preview_mode;
        },
        is_commonmark_button_displayed() {
            return !this.disabled && this.is_commonmark;
        },
        is_action() {
            return this.value === "action";
        },
        is_check() {
            return this.value === "check";
        },
        is_input() {
            return this.value === "input";
        },
        is_info() {
            return this.value === "info";
        },
        is_rationale() {
            return this.value === "rationale";
        },
        is_requirement() {
            return this.value === "requirement";
        },
        is_warning() {
            return this.value === "warning";
        },
        is_alert() {
            return this.value === "alert";
        },
    },
    methods: {
        input(event) {
            this.$emit("input", event, this.$refs.format.value);
        },
    },
};
</script>
