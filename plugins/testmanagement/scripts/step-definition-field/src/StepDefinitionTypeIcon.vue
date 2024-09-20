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
<template functional>
    <i class="ttm-definition-step-type-icon" v-bind:class="{
        'fas fa-hand-point-right': is_action,
        'fas fa-circle-exclamation': is_alert,
        'far fa-check-square': is_check,
        'fas fa-circle-info': is_info,
        'fas fa-pencil': is_input,
        'fas fa-section': is_rationale,
        'fas fa-gear': is_requirement,
        'fas fa-triangle-exclamation': is_warning
    }" />
</template>

<script>
export default {
    name: "StepDefinitionType",
    components: {},
    props: {},
    computed: {},
};
</script>
