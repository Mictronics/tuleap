<?php
/**
 * Copyright (c) Enalean, 2023 - Present. All Rights Reserved.
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

namespace Tuleap\InviteBuddy;


class PendingInvitationsForProjectRetrieverStub implements PendingInvitationsForProjectRetriever
{
    /**
     * @param Invitation[] $invitations
     */
    private function __construct(private array $invitations)
    {
    }

    public static function with(Invitation $invitation, Invitation ...$additional_invitations): self
    {
        return new self([$invitation, ...$additional_invitations]);
    }

    public static function withoutInvitation(): self
    {
        return new self([]);
    }

    /**
     * @return Invitation[]
     */
    #[\Override]
    public function searchPendingInvitationsForProject(int $project_id): array
    {
        return $this->invitations;
    }
}
