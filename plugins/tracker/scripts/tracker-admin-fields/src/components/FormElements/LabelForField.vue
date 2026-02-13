<!--
  - Copyright (c) Enalean, 2025 - Present. All Rights Reserved.
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

<template>
    <div class="label">
        <span class="tlp-label">
            {{ field.label }}
            <i
                class="fa-solid fa-asterisk"
                aria-hidden="true"
                v-if="field.required"
                data-test="required"
            ></i>
        </span>
        <list-of-label-decorators v-bind:field="field" />
    </div>
</template>

<script setup lang="ts">
import type { StructureFields } from "@tuleap/plugin-tracker-rest-api-types";
import ListOfLabelDecorators from "./ListOfLabelDecorators.vue";

defineProps<{
    field: StructureFields;
}>();
</script>

<style lang="scss" scoped>
.label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 var(--tlp-small-spacing);
    gap: var(--tlp-small-spacing);
}

.tlp-label {
    margin: 0 var(--tlp-small-spacing) 0 0;
}
</style>
