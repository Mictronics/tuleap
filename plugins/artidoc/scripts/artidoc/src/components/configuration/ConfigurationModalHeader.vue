<!--
  - Copyright (c) Enalean, 2024 - present. All Rights Reserved.
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
  -
  -->

<template>
    <div class="tlp-modal-header">
        <h1 class="tlp-modal-title" id="artidoc-configuration-modal-title">
            {{ modal_title }}
        </h1>
        <button
            class="tlp-modal-close"
            type="button"
            v-on:click="closeModal(false)"
            data-dismiss="modal"
            v-bind:title="close_title"
        >
            <i class="fa-solid fa-xmark tlp-modal-close-icon" role="img"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useGettext } from "vue3-gettext";
import { strictInject } from "@tuleap/vue-strict-inject";
import { TITLE } from "@/title-injection-key";
import { CLOSE_CONFIGURATION_MODAL } from "@/components/configuration/configuration-modal";

const { $gettext, interpolate } = useGettext();

const closeModal = strictInject(CLOSE_CONFIGURATION_MODAL);
const title = strictInject(TITLE);

const modal_title = interpolate($gettext("Configuration of %{ title }"), { title });
const close_title = $gettext("Close");
</script>
