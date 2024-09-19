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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "StepDefinitionType",
    props: {
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type_select_id: {
            type: String,
            default: "",
        },
    },
    emits: ["type_change"],
    computed: {
        ...mapState(["field_id"]),
        disabled_type_selectbox() {
            return this.disabled || this.is_in_preview_mode;
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
        type_change(event) {
            this.$emit("type_change", event, this.$refs.type.value);
        },
    },
};
</script>
