<?php
/**
 * Copyright (c) Enalean, 2021 - present. All Rights Reserved.
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
 *
 */

declare(strict_types=1);

namespace Tuleap\TestManagement\Step;

use Luracast\Restler\RestException;
use Tracker_Artifact_ChangesetValue_StepType;
use Tracker_Artifact_ChangesetValue_Text;

final class StepChecker
{
    /**
     * @throws RestException
     */
    public static function checkStepDataFromRESTPost(array $step): void
    {
        if (! isset($step['description']) || ! isset($step['expected_results'])) {
            throw new RestException(400, 'Description or Expected Result text field missing');
        }

        if (! isset($step['description_format']) || ! isset($step['expected_results_format'])) {
            throw new RestException(400, 'Description format or Expected Result format is missing');
        }

        if (
            ! self::isSubmittedFormatFromPostRESTValid($step['description_format']) ||
            ! self::isSubmittedFormatFromPostRESTValid($step['expected_results_format'])
        ) {
            throw new RestException(400, "Invalid format given, only 'html', 'text' or 'commonmark' are supported for step");
        }

        if (! isset($step['step_type'])) {
            throw new RestException(400, 'Step type definition is missing');
        }

        if (! self::isSubmittedStepTypeValid($step['step_type'])) {
            throw new RestException(400, 'Invalid step type given.');
        }
    }

    public static function isSubmittedFormatValid(string $format): bool
    {
        return in_array(
            $format,
            [
                Tracker_Artifact_ChangesetValue_Text::TEXT_CONTENT,
                Tracker_Artifact_ChangesetValue_Text::HTML_CONTENT,
                Tracker_Artifact_ChangesetValue_Text::COMMONMARK_CONTENT,
            ],
            true
        );
    }

    private static function isSubmittedFormatFromPostRESTValid(string $format): bool
    {
        return in_array(
            $format,
            [
                Tracker_Artifact_ChangesetValue_Text::HTML_CONTENT,
                Tracker_Artifact_ChangesetValue_Text::COMMONMARK_CONTENT,
                Tracker_Artifact_ChangesetValue_Text::TEXT_CONTENT,
            ],
            true
        );
    }

    public static function isSubmittedStepTypeValid(string $step_type): bool
    {
        return in_array(
            $step_type,
            [
                Tracker_Artifact_ChangesetValue_StepType::TYPE_ACTION,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_CHECK,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_INPUT,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_RATIONALE,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_INFO,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_REQUIREMENT,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_WARNING,
                Tracker_Artifact_ChangesetValue_StepType::TYPE_ALERT,
            ],
            true
        );
    }
}
