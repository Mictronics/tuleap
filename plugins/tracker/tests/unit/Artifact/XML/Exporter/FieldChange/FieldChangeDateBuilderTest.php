<?php
/**
 * Copyright (c) Enalean, 2020 - present. All Rights Reserved.
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

namespace Tuleap\Tracker\Artifact\XML\Exporter\FieldChange;

use DateTimeImmutable;
use SimpleXMLElement;
use XML_SimpleXMLCDATAFactory;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class FieldChangeDateBuilderTest extends \Tuleap\Test\PHPUnit\TestCase
{
    private FieldChangeDateBuilder $builder;

    protected function setUp(): void
    {
        parent::setUp();

        $this->builder = new FieldChangeDateBuilder(
            new XML_SimpleXMLCDATAFactory()
        );
    }

    public function testItBuildsTheFieldChangeNode(): void
    {
        $changeset_node = new SimpleXMLElement('<changeset/>');
        $date_time      = new DateTimeImmutable('2020-05-04T16:46:53+02:00');

        $this->builder->build(
            $changeset_node,
            'field_date_01',
            $date_time
        );

        $this->assertTrue(isset($changeset_node->field_change));
        $field_change_node = $changeset_node->field_change;

        self::assertSame('date', (string) $field_change_node['type']);
        self::assertSame('field_date_01', (string) $field_change_node['field_name']);
        self::assertSame('2020-05-04T16:46:53+02:00', (string) $field_change_node->value);
        self::assertSame('ISO8601', (string) $field_change_node->value['format']);
    }
}
