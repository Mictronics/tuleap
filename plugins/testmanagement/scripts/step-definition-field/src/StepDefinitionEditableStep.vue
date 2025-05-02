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
    <div>
        <div class="ttm-definition-step-actions-format-and-helper-container">
            <input type="hidden" v-bind:name="'artifact[' + field_id + '][id][]'" v-bind:value="step.id" />
            <step-definition-type v-bind:value="step_type" v-bind:type_select_id="type_select_id"
                v-on:type_change="toggleStepType" />
            <input type="hidden" v-bind:name="'artifact[' + field_id + '][step_type][]'"
                v-bind:value="step_type" />
            <step-definition-actions v-bind:value="description_format" v-bind:format_select_id="format_select_id"
                v-bind:is_in_preview_mode="is_in_preview_mode" v-bind:is_preview_loading="is_preview_loading"
                v-on:input="toggleRTE" v-on:interpret-content-event="togglePreview">
                <step-deletion-action-button-mark-as-deleted v-bind:step="step" />
            </step-definition-actions>
            <input type="hidden" v-bind:name="'artifact[' + field_id + '][description_format][]'"
                v-bind:value="description_format" />
        </div>
        <textarea ref="description" class="ttm-definition-step-description-textarea" v-bind:id="description_id"
            v-bind:name="'artifact[' + field_id + '][description][]'" v-bind:data-help-id="description_help_id"
            v-bind:data-upload-url="upload_url" v-bind:data-upload-field-name="upload_field_name"
            v-bind:data-upload-max-size="upload_max_size" data-test="description-textarea" rows="3"
            v-model="raw_description" v-show="!is_in_preview_mode && !is_preview_in_error"
            v-bind:disabled="is_preview_loading"></textarea>
        <div v-if="is_in_preview_mode && !is_preview_in_error" v-dompurify-html="interpreted_description"
            data-test="description-preview"></div>
        <div v-if="is_preview_in_error" class="alert alert-error" data-test="description-error">
            {{ $gettext("There was an error in the Markdown preview:") }}
            {{ error_text }}
        </div>
        <div class="muted tracker-richtexteditor-help shown" v-bind:id="description_help_id"></div>

        <section class="ttm-definition-step-expected" v-show="!is_hide_expected">
            <step-definition-arrow-expected />
            <div class="ttm-definition-step-expected-edit">
                <div class="ttm-definition-step-expected-edit-title">
                    <translate>Expected results (optional)</translate>
                </div>

                <input type="hidden" v-bind:name="'artifact[' + field_id + '][expected_results_format][]'"
                    v-bind:value="step.description_format" />
                <textarea ref="expected_results" class="ttm-definition-step-expected-results-textarea"
                    v-bind:id="expected_results_id" v-bind:name="'artifact[' + field_id + '][expected_results][]'"
                    v-bind:data-help-id="expected_results_help_id" v-bind:data-upload-url="upload_url"
                    v-bind:data-upload-field-name="upload_field_name" v-bind:data-upload-max-size="upload_max_size"
                    rows="3" v-model="raw_expected_results" v-show="!is_in_preview_mode && !is_preview_in_error"
                    data-test="expected-results-textarea" v-bind:disabled="is_preview_loading"></textarea>
                <div v-if="is_in_preview_mode" v-dompurify-html="interpreted_expected_result"
                    data-test="expected-results-preview"></div>
                <div class="alert alert-error" v-if="is_preview_in_error" data-test="expected-results-error">
                    {{ $gettext("There was an error in the Markdown preview:") }}
                    {{ error_text }}
                </div>
                <div class="muted tracker-richtexteditor-help shown" v-bind:id="expected_results_help_id"></div>
            </div>
        </section>
    </div>
</template>

<script>
import StepDeletionActionButtonMarkAsDeleted from "./StepDeletionActionButtonMarkAsDeleted.vue";
import StepDefinitionArrowExpected from "./StepDefinitionArrowExpected.vue";
import StepDefinitionActions from "./StepDefinitionActions.vue";
import StepDefinitionType from "./StepDefinitionType.vue";
import { mapState } from "vuex";
import { RichTextEditorFactory } from "@tuleap/plugin-tracker-rich-text-editor";
import {
    getUploadImageOptions,
    UploadImageFormFactory,
} from "@tuleap/plugin-tracker-artifact-ckeditor-image-upload";
import { TEXT_FORMAT_HTML } from "@tuleap/plugin-tracker-constants";
import { postInterpretCommonMark } from "./api/tuleap-api.js";

export default {
    name: "StepDefinitionEditableStep",
    components: {
        StepDefinitionArrowExpected,
        StepDefinitionActions,
        StepDefinitionType,
        StepDeletionActionButtonMarkAsDeleted,
    },
    props: {
        step: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ["update-description", "update-expected-results", "toggle-rte"],
    data() {
        return {
            interpreted_description: "",
            interpreted_expected_result: "",
            is_in_preview_mode: false,
            is_preview_loading: false,
            is_preview_in_error: false,
            error_text: "",
            editors: [],
            raw_description: this.step.raw_description,
            raw_expected_results: this.step.raw_expected_results,
            description_format: this.step.description_format,
            step_type: this.step.step_type,
        };
    },
    computed: {
        ...mapState([
            "field_id",
            "is_dragging",
            "upload_url",
            "upload_field_name",
            "upload_max_size",
        ]),
        description_id() {
            return "field_description_" + this.step.uuid + "_" + this.field_id;
        },
        expected_results_id() {
            return "field_expected_results_" + this.step.uuid + "_" + this.field_id;
        },
        description_help_id() {
            return this.description_id + "-help";
        },

        expected_results_help_id() {
            return this.expected_results_id + "-help";
        },
        is_current_step_in_html_format() {
            return this.step.description_format === TEXT_FORMAT_HTML;
        },
        format_select_id() {
            return "format_" + this.step.uuid + "_" + this.field_id;
        },
        type_select_id() {
            return "type_" + this.step.uuid + "_" + this.field_id;
        },
        is_in_edit_mode_without_error() {
            return !this.is_in_preview_mode && !this.is_preview_in_error;
        },
    },
    created() {
        switch (this.step_type) {
            case "action":
                this.is_hide_expected = false;
                break;
            case "check":
            case "info":
            case "input":
            case "warning":
            case "alert":
            case "requirement":
            case "rationale":
                this.is_hide_expected = true;
                break;
            default:
                this.is_hide_expected = false;
                break;
        }
    },
    watch: {
        is_dragging(new_value) {
            if (new_value === false) {
                this.loadEditor();
            } else {
                this.getEditorsContent();
            }
        },
    },
    onUnmounted() {
        if (this.editors) {
            this.editors[0].destroy();
            this.editors[1].destroy();
        }
    },
    mounted() {
        this.loadEditor();
    },
    methods: {
        getEditorsContent() {
            if (this.is_current_step_in_html_format && this.areRTEEditorsSet()) {
                this.raw_description = this.editors[1].getContent();
                this.raw_expected_results = this.editors[0].getContent();
            }
        },
        toggleRTE(event, value) {
            this.description_format = value;
        },
        toggleStepType(event, value) {
            this.step_type = value;
            switch (value) {
                case "action":
                    this.is_hide_expected = false;
                    break;
                case "check":
                case "info":
                case "input":
                case "warning":
                case "alert":
                case "requirement":
                case "rationale":
                    this.is_hide_expected = true;
                    break;
                default:
                    this.is_hide_expected = false;
                    break;
            }
        },
        areRTEEditorsSet() {
            return this.editors[0] && this.editors[1];
        },
        loadRTE(field) {
            const text_area = this.$refs[field];
            let locale = "en_US";
            if (document.body.dataset.userLocale) {
                locale = document.body.dataset.userLocale;
            }
            const image_upload_factory = UploadImageFormFactory(document, locale);
            const help_block = image_upload_factory.createHelpBlock(text_area);
            const editor = RichTextEditorFactory.forFlamingParrotWithExistingFormatSelector(
                document,
                locale,
            );

            const options = {
                format_selectbox_id: this.format_select_id,
                format_selectbox_value: this.step.description_format,
                getAdditionalOptions: (textarea) => getUploadImageOptions(textarea),
                onFormatChange: (new_format) => {
                    if (help_block) {
                        help_block.onFormatChange(new_format);
                    }
                    this.getEditorsContent();
                },
                onEditorInit: (ckeditor, textarea) =>
                    image_upload_factory.initiateImageUpload(ckeditor, textarea),
            };
            return editor.createRichTextEditor(text_area, options);
        },
        loadEditor() {
            this.editors = [this.loadRTE("expected_results"), this.loadRTE("description")];
        },
        updateDescription(event) {
            this.raw_description = event.target.value;
            this.$emit("update-description", event);
        },
        updateExpectedResults(event) {
            this.raw_expected_results = event.target.value;
            this.$emit("update-expected-results", event);
        },
        togglePreview() {
            this.is_preview_in_error = false;
            this.error_text = "";

            if (this.is_in_preview_mode) {
                this.is_in_preview_mode = false;
                return Promise.resolve();
            }

            this.is_preview_loading = true;
            return Promise.all([
                postInterpretCommonMark(this.step.raw_description),
                postInterpretCommonMark(this.step.raw_expected_results),
            ])
                .then((interpreted_fields) => {
                    this.interpreted_description = interpreted_fields[0];
                    this.interpreted_expected_result = interpreted_fields[1];
                })
                .catch((error) => {
                    this.is_preview_in_error = true;
                    this.error_text = error;
                })
                .finally(() => {
                    this.is_preview_loading = false;
                    this.is_in_preview_mode = !this.is_in_preview_mode;
                });
        },
    },
};
</script>
