<!--
  - Copyright (c) Enalean, 2021 - present. All Rights Reserved.
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
    <app-breadcrumb />
    <h1 class="planned-iterations-title-header" data-test="app-header-title">
        {{ program_increment.title }}
        <small class="planned-iterations-title-header-dates" v-if="are_dates_displayed">
            {{ program_increment.start_date }} – {{ program_increment.end_date }}
        </small>
    </h1>
    <div class="iterations-backlog">
        <iterations-to-be-planned-section />
        <planned-iterations-section />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNamespacedState } from "vuex-composition-helpers";
import AppBreadcrumb from "./AppBreadcrumb.vue";
import IterationsToBePlannedSection from "./Backlog/ToBePlanned/IterationsToBePlannedSection.vue";
import PlannedIterationsSection from "./Backlog/Iteration/PlannedIterationsSection.vue";
import type { ProgramIncrement } from "../store/configuration";

const { program_increment } = useNamespacedState<{
    program_increment: ProgramIncrement;
}>("configuration", ["program_increment"]);

const are_dates_displayed = computed(
    (): boolean =>
        program_increment.value.start_date !== "" && program_increment.value.end_date !== "",
);
</script>
