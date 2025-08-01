<?php
/**
 * Copyright (c) Enalean, 2024-Present. All Rights Reserved.
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

declare(strict_types=1);

namespace Tuleap\CrossTracker\Query\Advanced;

use Tuleap\Option\Option;
use Tuleap\Tracker\Report\Query\Advanced\Grammar\FromTracker;
use Tuleap\Tracker\Report\Query\Advanced\Grammar\VisitorParameters;
use Tuleap\Tracker\Report\Query\Advanced\InvalidFromCollection;

final class InvalidFromTrackerCollectorParameters implements VisitorParameters
{
    /**
     * @param Option<int> $widget_id
     */
    public function __construct(
        public FromTracker $from_tracker,
        public InvalidFromCollection $collection,
        public bool $is_tracker_condition_alone,
        public Option $widget_id,
    ) {
    }
}
