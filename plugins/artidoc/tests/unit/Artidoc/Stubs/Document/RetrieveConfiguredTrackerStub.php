<?php
/**
 * Copyright (c) Enalean, 2025 - Present. All Rights Reserved.
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

namespace Tuleap\Artidoc\Stubs\Document;

use Tuleap\Artidoc\Document\RetrieveConfiguredTracker;
use Tuleap\Artidoc\Domain\Document\Artidoc;

final readonly class RetrieveConfiguredTrackerStub implements RetrieveConfiguredTracker
{
    private function __construct(private ?\Tuleap\Tracker\Tracker $tracker)
    {
    }

    public static function withTracker(\Tuleap\Tracker\Tracker $tracker): self
    {
        return new self($tracker);
    }

    public static function withoutTracker(): self
    {
        return new self(null);
    }

    #[\Override]
    public function getTracker(Artidoc $document): ?\Tuleap\Tracker\Tracker
    {
        return $this->tracker;
    }
}
