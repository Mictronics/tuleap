<?php
/*
 * Copyright (c) Enalean, 2022-Present. All Rights Reserved.
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

namespace Tuleap\REST;

use Tuleap\REST\Tests\PlatformAccessControl;

trait ForgeAccessSandbox
{
    private PlatformAccessControl $site_access;

    #[\PHPUnit\Framework\Attributes\Before]
    public function backupSiteAccess(): void
    {
        $this->site_access = new PlatformAccessControl();
    }

    #[\PHPUnit\Framework\Attributes\After]
    public function restoreSiteAccess(): void
    {
        $this->site_access->dispose();
    }

    public function setForgeToAnonymous(): void
    {
        $this->site_access->setForgeToAnonymous();
    }

    public function setForgeToRestricted(): void
    {
        $this->site_access->setForgeToRestricted();
    }

    public function setForgeToRegular(): void
    {
        $this->site_access->setForgeToRegular();
    }
}
