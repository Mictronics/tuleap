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
  <span class="ttm-definition-step-actions">
    <translate>Typ:</translate>
    <select v-bind:id="props.type_select_id" class="small ttm-definition-step-type"
      v-model="selectType" :disabled="props.disabled" data-test="ttm-definition-step-type">
      <option v-for="type in typeOptions" :value="type.value">{{ type.label }}</option>
    </select>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
    disabled: boolean;
    type_select_id: string;
    step_type: string;
}>(),{
  disabled: false,
  type_select_id: "",
});

const emit = defineEmits<{
    (e: "update:type", type: string): void;
}>();

const selectType = computed({
  get: () => props.step_type,
  set: (newValue) => {
    emit('update:type', newValue);
  },
});

const typeOptions: {label: string, value: string}[] = [
  {label: 'Action', value: 'action'},
  {label: 'Check', value: 'check'},
  {label: 'Input', value: 'input'},
  {label: 'Rationale', value: 'rationale'},
  {label: 'Info', value: 'info'},
  {label: 'Prerequisite', value: 'requirement'},
  {label: 'Warning', value: 'warning'},
  {label: 'Alert', value: 'alert'},
]
</script>
