/*
 *  Copyright (c) Enalean, 2024 - Present. All Rights Reserved.
 *
 *  This file is a part of Tuleap.
 *
 *  Tuleap is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  Tuleap is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Tuleap. If not, see <http://www.gnu.org/licenses/>.
 */

import { Plugin } from "prosemirror-state";
import type { SerializeDOM } from "./DomSerializer";

export type PluginInput = Plugin;

export const initPluginInput = (
    serializer: SerializeDOM,
    update_callback: (content: HTMLElement) => void,
): PluginInput =>
    new Plugin({
        state: {
            init(): void {},
            apply(tr, plugin_state, old_editor_state, new_editor_state): void {
                if (tr.docChanged) {
                    update_callback(serializer.serializeDOM(new_editor_state.doc.content));
                }
            },
        },
    });
