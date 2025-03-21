<!--
  - Copyright (c) Enalean, 2017-Present. All Rights Reserved.
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
    <feedback-message />
    <read-query
        v-if="widget_pane === 'query-active'"
        v-on:switch-to-create-query-pane="handleCreateNewQuery"
    />
    <create-new-query
        v-else-if="widget_pane === 'query-creation' && is_multiple_query_supported && is_user_admin"
        v-on:return-to-active-query-pane="displayActiveQuery"
    />
    <edit-query
        v-else-if="widget_pane === 'query-edition'"
        v-bind:query="query_to_edit"
        v-on:return-to-active-query-pane="displayActiveQuery"
    />
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { strictInject } from "@tuleap/vue-strict-inject";
import {
    DEFAULT_WIDGET_TITLE,
    EMITTER,
    IS_MULTIPLE_QUERY_SUPPORTED,
    IS_USER_ADMIN,
    UPDATE_WIDGET_TITLE,
} from "./injection-symbols";
import type { EditQueryEvent } from "./helpers/emitter-provider";
import {
    CLEAR_FEEDBACK_EVENT,
    CREATE_NEW_QUERY_EVENT,
    EDIT_QUERY_EVENT,
    UPDATE_WIDGET_TITLE_EVENT,
} from "./helpers/emitter-provider";
import CreateNewQuery from "./components/query/creation/CreateNewQuery.vue";
import {
    QUERY_ACTIVE_PANE,
    QUERY_CREATION_PANE,
    QUERY_EDITION_PANE,
} from "./domain/WidgetPaneDisplay";
import ReadQuery from "./components/ReadQuery.vue";
import FeedbackMessage from "./components/feedback/FeedbackMessage.vue";
import EditQuery from "./components/query/edition/EditQuery.vue";
import type { Query } from "./type";

const is_user_admin = strictInject(IS_USER_ADMIN);
const emitter = strictInject(EMITTER);
const is_multiple_query_supported = strictInject(IS_MULTIPLE_QUERY_SUPPORTED);
const widget_title_updater = strictInject(UPDATE_WIDGET_TITLE);
const default_widget_title = strictInject(DEFAULT_WIDGET_TITLE);

const widget_pane = ref(QUERY_ACTIVE_PANE);

const query_to_edit = ref<Query>({
    description: "",
    id: "",
    is_default: false,
    title: "",
    tql_query: "",
});

function displayActiveQuery(): void {
    widget_pane.value = QUERY_ACTIVE_PANE;
}

onMounted(() => {
    emitter.on(CREATE_NEW_QUERY_EVENT, handleCreateNewQuery);
    emitter.on(EDIT_QUERY_EVENT, handleEditQuery);
    if (is_multiple_query_supported) {
        widget_title_updater.listenToUpdateTitle();
    }
});

onBeforeUnmount(() => {
    emitter.off(CREATE_NEW_QUERY_EVENT);
    emitter.off(EDIT_QUERY_EVENT);
    if (is_multiple_query_supported) {
        widget_title_updater.removeListener();
    }
});

function handleCreateNewQuery(): void {
    emitter.emit(CLEAR_FEEDBACK_EVENT);
    emitter.emit(UPDATE_WIDGET_TITLE_EVENT, { new_title: default_widget_title });
    widget_pane.value = QUERY_CREATION_PANE;
}

function handleEditQuery(query_to_edit_event: EditQueryEvent): void {
    query_to_edit.value = query_to_edit_event.query_to_edit;
    widget_pane.value = QUERY_EDITION_PANE;
    emitter.emit(CLEAR_FEEDBACK_EVENT);
    emitter.emit(UPDATE_WIDGET_TITLE_EVENT, { new_title: query_to_edit_event.query_to_edit.title });
}
</script>
