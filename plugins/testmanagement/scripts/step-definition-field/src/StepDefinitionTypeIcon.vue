<!--
  - Copyright (c) Michael Wolf, 2024-Present. All Rights Reserved.
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
    <i class="ttm-definition-step-type-icon" v-bind:class="{
        'ttm-definition-step-icon-action': is_action,
        'ttm-definition-step-icon-alert': is_alert,
        'ttm-definition-step-icon-check': is_check,
        'ttm-definition-step-icon-info': is_info,
        'ttm-definition-step-icon-input': is_input,
        'ttm-definition-step-icon-rationale': is_rationale,
        'ttm-definition-step-icon-requirement': is_requirement,
        'ttm-definition-step-icon-warning': is_warning
    }" />
</template>

<script>
export default {
    name: "StepDefinitionTypeIcon",
    components: {},
    props: {
        step: Object,
    },
    computed: {
        is_action() {
            return this.step.step_type === "action";
        },
        is_check() {
            return this.step.step_type === "check";
        },
        is_input() {
            return this.step.step_type === "input";
        },
        is_info() {
            return this.step.step_type === "info";
        },
        is_rationale() {
            return this.step.step_type === "rationale";
        },
        is_requirement() {
            return this.step.step_type === "requirement";
        },
        is_warning() {
            return this.step.step_type === "warning";
        },
        is_alert() {
            return this.step.step_type === "alert";
        },
    },
};
</script>
