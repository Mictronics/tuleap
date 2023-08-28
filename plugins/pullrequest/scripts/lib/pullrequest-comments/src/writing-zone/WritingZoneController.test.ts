/*
 * Copyright (c) Enalean, 2023 - present. All Rights Reserved.
 *
 * This file is a part of Tuleap.
 *
 * Tuleap is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Tuleap is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tuleap. If not, see <http://www.gnu.org/licenses/>.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import type { HostElement } from "./WritingZone";
import type { WritingZoneConfig } from "./WritingZoneController";
import { PARENT_ELEMENT_ACTIVE_CLASS, WritingZoneController } from "./WritingZoneController";
import { WritingZonePresenter } from "./WritingZonePresenter";

describe("WritingZoneController", () => {
    let doc: Document, textarea: HTMLTextAreaElement, config: WritingZoneConfig;

    beforeEach(() => {
        doc = document.implementation.createHTMLDocument();
        textarea = doc.createElement("textarea");
        config = {
            document: doc,
            focus_writing_zone_when_connected: false,
            is_comments_markdown_mode_enabled: true,
        };
    });

    it("initWritingZone() should assign the WritingZone a default presenter", () => {
        const host = {
            presenter: undefined,
            is_comments_markdown_mode_enabled: true,
        } as unknown as HostElement;

        WritingZoneController(config).initWritingZone(host);

        expect(host.presenter).toStrictEqual({
            initial_content: "",
            is_focused: false,
            is_in_writing_mode: true,
            is_in_preview_mode: false,
            is_comments_markdown_mode_enabled: config.is_comments_markdown_mode_enabled,
        });
    });

    it(`onTextAreaInput() should dispatch a "writing-zone-input" containing the WritingZone's <textarea/> content`, () => {
        const host = Object.assign(doc.createElement("div"), {
            textarea,
        } as HostElement);

        textarea.value = "Please rebase!";

        const dispatchEvent = vi.spyOn(host, "dispatchEvent");

        WritingZoneController(config).onTextareaInput(host);

        expect(dispatchEvent).toHaveBeenCalledOnce();

        const event = dispatchEvent.mock.calls[0][0] as CustomEvent;

        expect(event.type).toBe("writing-zone-input");
        expect(event.detail).toStrictEqual({ content: textarea.value });
    });

    it("focusWritingZone() should focus the <textarea/>, put the component in focused state and add the active class on its parent element", () => {
        const parent_element = doc.createElement("div");
        const host = {
            textarea,
            presenter: WritingZonePresenter.buildBlurred(WritingZonePresenter.buildInitial()),
            parentElement: parent_element,
        } as unknown as HostElement;

        textarea.value = "Please rebase!";

        const focus = vi.spyOn(textarea, "focus");
        const setSelectionRange = vi.spyOn(textarea, "setSelectionRange");

        WritingZoneController(config).focusWritingZone(host);

        expect(focus).toHaveBeenCalledOnce();
        expect(setSelectionRange).toHaveBeenCalledOnce();
        expect(setSelectionRange).toHaveBeenCalledWith(
            textarea.value.length,
            textarea.value.length
        );

        expect(host.presenter.is_focused).toBe(true);
        expect(Array.from(parent_element.classList)).toContain(PARENT_ELEMENT_ACTIVE_CLASS);
    });

    it("blurWritingZone() should blur the <textarea/>, remove the component focused state and remove the active class on its parent element", () => {
        const parent_element = doc.createElement("div");
        const host = {
            textarea,
            presenter: WritingZonePresenter.buildFocused(WritingZonePresenter.buildInitial()),
            parentElement: parent_element,
        } as unknown as HostElement;

        const blur = vi.spyOn(textarea, "blur");

        WritingZoneController({
            document: {
                ...doc,
                activeElement: textarea,
            },
        }).blurWritingZone(host);

        expect(blur).toHaveBeenCalledOnce();
        expect(host.presenter.is_focused).toBe(false);
        expect(Array.from(parent_element.classList)).not.toContain(PARENT_ELEMENT_ACTIVE_CLASS);
    });

    it("switchToWritingMode() should focus the <textarea/> set the presenter to writing_mode", () => {
        vi.useFakeTimers();

        const host = {
            textarea,
            presenter: WritingZonePresenter.buildPreviewMode(
                WritingZonePresenter.buildInitial(true)
            ),
        } as HostElement;

        const focus = vi.spyOn(textarea, "focus");

        WritingZoneController(config).switchToWritingMode(host);

        vi.advanceTimersToNextTimer();

        expect(focus).toHaveBeenCalledOnce();
        expect(host.presenter.is_focused).toBe(true);
        expect(host.presenter.is_in_writing_mode).toBe(true);
    });

    it("switchToPreviewMode() should focus WritingZone and set the presenter to preview_mode", () => {
        vi.useFakeTimers();

        const host = {
            textarea,
            presenter: WritingZonePresenter.buildWritingMode(
                WritingZonePresenter.buildInitial(true)
            ),
        } as HostElement;

        WritingZoneController(config).switchToPreviewMode(host);

        vi.advanceTimersToNextTimer();

        expect(host.presenter.is_focused).toBe(true);
        expect(host.presenter.is_in_preview_mode).toBe(true);
    });

    it("resetWritingZone() should empty + blur the <textarea/> and display back the writing mode", () => {
        const parent_element = doc.createElement("div");
        const host = {
            textarea,
            presenter: WritingZonePresenter.buildPreviewMode(WritingZonePresenter.buildInitial()),
            parentElement: parent_element,
        } as unknown as HostElement;

        textarea.value = "Please rebase!";

        const blur = vi.spyOn(textarea, "blur");

        WritingZoneController({
            document: {
                ...doc,
                activeElement: textarea,
            },
        }).resetWritingZone(host);

        expect(textarea.value).toBe("");
        expect(blur).toHaveBeenCalledOnce();
        expect(host.presenter.is_focused).toBe(false);
        expect(host.presenter.is_in_writing_mode).toBe(true);
        expect(Array.from(parent_element.classList)).not.toContain(PARENT_ELEMENT_ACTIVE_CLASS);
    });

    it.each([
        [false, false],
        [true, true],
    ])(
        'When the config attribute "should_focus_when_writing_zone_once_rendered" is %s, then shouldFocusWritingZoneOnceRendered() should return %s',
        (should_focus_when_writing_zone_once_rendered, expected) => {
            expect(
                WritingZoneController({
                    document: doc,
                    focus_writing_zone_when_connected: should_focus_when_writing_zone_once_rendered,
                }).shouldFocusWritingZoneWhenConnected()
            ).toBe(expected);
        }
    );

    it("setWritingZoneContent() should set the WritingZone initial_content", () => {
        const host = {
            presenter: WritingZonePresenter.buildInitial(),
        } as unknown as HostElement;
        const new_content = "This is new content";

        WritingZoneController({
            document: doc,
            focus_writing_zone_when_connected: true,
        }).setWritingZoneContent(host, new_content);

        expect(host.presenter.initial_content).toBe(new_content);
    });
});