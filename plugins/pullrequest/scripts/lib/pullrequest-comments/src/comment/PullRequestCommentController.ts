/*
 * Copyright (c) Enalean, 2022 - present. All Rights Reserved.
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

import type { Fault } from "@tuleap/fault";
import type { PullRequestComment } from "@tuleap/plugin-pullrequest-rest-api-types";
import type { PullRequestCommentComponentType } from "./PullRequestComment";
import type { FocusReplyToCommentTextArea } from "./PullRequestCommentReplyFormFocusHelper";
import type { StorePullRequestCommentReplies } from "./PullRequestCommentRepliesStore";
import type { SaveNewComment } from "./PullRequestCommentReplySaver";
import { ReplyCommentFormPresenter } from "./ReplyCommentFormPresenter";
import { PullRequestCommentPresenter } from "./PullRequestCommentPresenter";
import type { CurrentPullRequestUserPresenter } from "./PullRequestCurrentUserPresenter";
import type { PullRequestPresenter } from "./PullRequestPresenter";

export interface ControlPullRequestComment {
    showReplyForm: (host: PullRequestCommentComponentType) => void;
    hideReplyForm: (host: PullRequestCommentComponentType) => void;
    displayReplies: (host: PullRequestCommentComponentType) => void;
    updateCurrentReply: (host: PullRequestCommentComponentType, reply_content: string) => void;
    saveReply: (host: PullRequestCommentComponentType) => void;
}

export type PullRequestCommentErrorCallback = (fault: Fault) => void;

export const PullRequestCommentController = (
    focus_helper: FocusReplyToCommentTextArea,
    replies_store: StorePullRequestCommentReplies,
    new_comment_saver: SaveNewComment,
    current_user: CurrentPullRequestUserPresenter,
    current_pull_request: PullRequestPresenter,
    on_error_callback?: PullRequestCommentErrorCallback
): ControlPullRequestComment => ({
    showReplyForm: (host: PullRequestCommentComponentType): void => {
        host.reply_comment_presenter = ReplyCommentFormPresenter.buildEmpty(
            current_user,
            current_pull_request
        );

        focus_helper.focusFormReplyToCommentTextArea(host);
    },
    hideReplyForm: (host: PullRequestCommentComponentType): void => {
        host.reply_comment_presenter = null;
    },
    updateCurrentReply: (host: PullRequestCommentComponentType, reply_content: string): void => {
        const comment_reply = getExistingCommentReplyPresenter(host);
        host.reply_comment_presenter = ReplyCommentFormPresenter.updateContent(
            comment_reply,
            reply_content
        );
    },
    saveReply: (host: PullRequestCommentComponentType): void => {
        host.reply_comment_presenter = ReplyCommentFormPresenter.buildSubmitted(
            getExistingCommentReplyPresenter(host)
        );

        new_comment_saver.saveReply(host.comment, host.reply_comment_presenter).match(
            (comment_payload: PullRequestComment) => {
                host.reply_comment_presenter = null;

                replies_store.addReplyToComment(
                    host.comment,
                    PullRequestCommentPresenter.fromCommentReply(host.comment, comment_payload)
                );

                host.replies = replies_store.getCommentReplies(host.comment);
                host.comment.color = comment_payload.color;
            },
            (fault) => {
                if (on_error_callback) {
                    on_error_callback(fault);
                    return;
                }
                // eslint-disable-next-line no-console
                console.error(String(fault));
            }
        );
    },
    displayReplies: (host: PullRequestCommentComponentType): void => {
        host.replies = replies_store.getCommentReplies(host.comment);
    },
});

function getExistingCommentReplyPresenter(
    host: PullRequestCommentComponentType
): ReplyCommentFormPresenter {
    const comment_reply = host.reply_comment_presenter;
    if (comment_reply === null) {
        throw new Error(
            "Attempting to get the new comment being created while none has been created."
        );
    }
    return comment_reply;
}