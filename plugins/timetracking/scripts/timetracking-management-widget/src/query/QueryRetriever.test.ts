/*
 * Copyright (c) Enalean, 2024 - Present. All Rights Reserved.
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

import { describe, expect, it, vi } from "vitest";
import { okAsync } from "neverthrow";
import process from "node:process";
import { QueryRetriever } from "./QueryRetriever";
import { formatDatetimeToYearMonthDay } from "@tuleap/plugin-timetracking-time-formatters";
import type { User } from "@tuleap/core-rest-api-types";
import * as rest_querier from "../api/rest-querier";

describe("QueryRetriever", () => {
    describe("setQuery", () => {
        it("should sort users", () => {
            const start_date = formatDatetimeToYearMonthDay(new Date());
            const end_date = formatDatetimeToYearMonthDay(new Date());

            const users: User[] = [
                {
                    id: 1858,
                    user_url: "/users/alice.hernandez",
                    display_name: "Alice Hernandez (alice.hernandez)",
                    avatar_url: "/avatar-ea78.png",
                },
                {
                    id: 6871,
                    user_url: "/users/bobby.arnold",
                    display_name: "Bobby Arnold (bobby.arnold)",
                    avatar_url: "/avatar-2129.png",
                },
                {
                    id: 7964,
                    user_url: "/users/alyssa.buchanan",
                    display_name: "Alyssa Buchanan (alyssa.buchanan)",
                    avatar_url: "/avatar-77a6.png",
                },
            ];

            const query_retriever = QueryRetriever();
            query_retriever.setQuery(start_date, end_date, "", users);

            expect(
                query_retriever.getQuery().users_list.value.map((user) => user.display_name),
            ).toStrictEqual([
                "Alice Hernandez (alice.hernandez)",
                "Alyssa Buchanan (alyssa.buchanan)",
                "Bobby Arnold (bobby.arnold)",
            ]);
        });
    });

    describe("saveQuery", () => {
        it("should save the query", async () => {
            const start_date = formatDatetimeToYearMonthDay(new Date());
            const end_date = formatDatetimeToYearMonthDay(new Date());

            const alice: User = {
                id: 1858,
                user_url: "/users/alice.hernandez",
                display_name: "Alice Hernandez (alice.hernandez)",
                avatar_url: "/avatar-ea78.png",
            };
            const bobby: User = {
                id: 6871,
                user_url: "/users/bobby.arnold",
                display_name: "Bobby Arnold (bobby.arnold)",
                avatar_url: "/avatar-2129.png",
            };
            const alyssa: User = {
                id: 7964,
                user_url: "/users/alyssa.buchanan",
                display_name: "Alyssa Buchanan (alyssa.buchanan)",
                avatar_url: "/avatar-77a6.png",
            };
            const users: User[] = [alice, bobby, alyssa];

            const query_retriever = QueryRetriever();
            query_retriever.setQuery(start_date, end_date, "", users);

            vi.spyOn(rest_querier, "putQuery").mockReturnValue(
                okAsync({
                    viewable_users: [alice],
                    no_more_viewable_users: [bobby],
                }),
            );
            query_retriever.saveQuery(123);
            await new Promise(process.nextTick);

            expect(
                query_retriever.getQuery().users_list.value.map((user) => user.display_name),
            ).toStrictEqual([alice.display_name]);
            expect(
                query_retriever.no_more_viewable_users.value.map((user) => user.display_name),
            ).toStrictEqual([bobby.display_name]);
        });
    });
});
