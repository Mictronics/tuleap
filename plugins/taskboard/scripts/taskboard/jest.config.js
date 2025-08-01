/**
 * Copyright (c) Enalean, 2019-Present. All Rights Reserved.
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

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineJestConfiguration } from "@tuleap/build-system-configurator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jest_base_config = defineJestConfiguration();
export default {
    ...jest_base_config,
    displayName: "taskboard",
    transform: {
        ...jest_base_config.transform,
        "^.+\\.vue$": "@vue/vue3-jest",
    },
    moduleNameMapper: {
        ...jest_base_config.moduleNameMapper,
        "^jquery$": "<rootDir>/node_modules/jquery/dist/jquery.js",
        "^vue$": path.resolve(__dirname, "./node_modules/vue/"),
    },
};
