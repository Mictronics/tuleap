<?php
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

declare(strict_types=1);

namespace Tuleap\Taskboard\Column\FieldValuesToColumnMapping;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class MappedValuesTest extends \Tuleap\Test\PHPUnit\TestCase
{
    private MappedValues $mapped_values;

    #[\Override]
    protected function setUp(): void
    {
        $this->mapped_values = new MappedValues([123, 456]);
    }

    public function testGetFirstValue(): void
    {
        self::assertSame(123, $this->mapped_values->getFirstValue());
    }

    public function testGetValueIds(): void
    {
        self::assertSame([123, 456], $this->mapped_values->getValueIds());
    }

    public function testIsEmpty(): void
    {
        self::assertFalse($this->mapped_values->isEmpty());
    }

    public function testContainsReturnsTrue(): void
    {
        self::assertTrue($this->mapped_values->contains(123));
    }

    public function testContainsReturnsFalse(): void
    {
        self::assertFalse($this->mapped_values->contains(832));
    }
}
