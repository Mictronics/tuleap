<?php
/**
 * Copyright (c) Enalean, 2018 - Present. All Rights Reserved.
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

namespace Tuleap\TestManagement\Step\Execution;

use Tuleap\TestManagement\Step\Step;

class StepResult
{
    /** @var Step */
    private $step;
    /** @var string */
    private $status;
    /** @var string */
    private $comment;

    public function __construct(Step $step, mixed $status, mixed $comment)
    {
        $this->step = $step;
        if (empty($status) || is_null($status) || ! is_string($status)) {
            $this->status = 'notrun';
        } else {
            $this->status = $status;
        }

        if (empty($comment) || is_null($comment) || ! is_string($comment)) {
            $this->comment = '';
        } else {
            $this->comment = $comment;
        }
    }

    /**
     * @return Step
     */
    public function getStep()
    {
        return $this->step;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }
}
