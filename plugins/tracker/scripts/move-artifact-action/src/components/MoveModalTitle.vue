<!--
  - Copyright (c) Enalean, 2018 - Present. All Rights Reserved.
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
    <div class="move-modal-title">
        <h1 class="tlp-modal-title" id="modal-move-artifact-choose-trackers">
            {{ $gettext("Move") }}
        </h1>
        <span
            v-bind:class="`tlp-swatch-${tracker_color} cross-ref-badge`"
            data-test="artifact-xref"
        >
            {{ tracker_name }} #{{ artifact_id }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { useGettext } from "vue3-gettext";
import { strictInject } from "@tuleap/vue-strict-inject";
import { ARTIFACT_ID, TRACKER_COLOR, TRACKER_NAME } from "../injection-symbols";

const { $gettext } = useGettext();

const artifact_id: number = strictInject(ARTIFACT_ID);
const tracker_name: string = strictInject(TRACKER_NAME);
const tracker_color: string = strictInject(TRACKER_COLOR);
</script>

<style lang="scss" scoped>
.move-modal-title {
    display: flex;
    gap: var(--tlp-small-spacing);
    align-items: center;
}
</style>
