<?php
/**
 * Copyright (c) Enalean, 2012 - present. All Rights Reserved.
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

use PHPUnit\Framework\MockObject\MockObject;
use Tuleap\Tracker\FormElement\Field\Integer\IntegerField;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class Transition_PostAction_Field_IntTest extends \Tuleap\Test\PHPUnit\TestCase //phpcs:ignore PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ValidClassName.NotCamelCaps
{
    use \Tuleap\GlobalResponseMock;

    private IntegerField&MockObject $field;

    private Transition_PostAction_Field_Int&MockObject $post_action;

    protected function setUp(): void
    {
        $value          = 0;
        $post_action_id = 9348;
        $transition     = $this->createMock(\Transition::class);
        $this->field    = $this->createMock(\Tuleap\Tracker\FormElement\Field\Integer\IntegerField::class);
        $this->field->method('getId')->willReturn(1131);

        $this->post_action = $this->getMockBuilder(\Transition_PostAction_Field_Int::class)
            ->setConstructorArgs([$transition, $post_action_id, $this->field, $value])
            ->onlyMethods(['getDao', 'isDefined'])
            ->getMock();
        $dao               = $this->createMock(\Transition_PostAction_Field_IntDao::class);

        $this->post_action->method('getDao')->willReturn($dao);
        $this->post_action->method('isDefined')->willReturn($this->field);
    }

    public function testBeforeShouldSetTheIntegerField(): void
    {
        $user = $this->createMock(\PFUser::class);

        $this->field->method('getLabel')->willReturn('Remaining Effort');
        $this->field->method('userCanRead')->with($user)->willReturn(true);
        $this->field->method('userCanUpdate')->with($user)->willReturn(true);

        $expected    = 0;
        $fields_data = [
            'field_id' => 'value',
        ];

        $this->post_action->before($fields_data, $user);
        $this->assertEquals($expected, $fields_data[$this->field->getId()]);
    }

    public function testBeforeShouldBypassAndSetTheIntegerField(): void
    {
        $user = $this->createMock(\PFUser::class);

        $this->field->method('getLabel')->willReturn('Remaining Effort');
        $this->field->method('userCanRead')->with($user)->willReturn(true);
        $this->field->method('userCanUpdate')->with($user)->willReturn(false);

        $expected    = 0;
        $fields_data = [
            'field_id' => 'value',
        ];

        $this->post_action->before($fields_data, $user);
        $this->assertEquals($expected, $fields_data[$this->field->getId()]);
    }

    public function testBeforeShouldNOTDisplayFeedback(): void
    {
        $user = $this->createMock(\PFUser::class);

        $this->field->method('getLabel')->willReturn('Remaining Effort');
        $this->field->method('userCanRead')->with($user)->willReturn(false);

        $expected    = 0;
        $fields_data = [
            'field_id' => 'value',
        ];

        $this->post_action->before($fields_data, $user);
        $this->assertEquals($expected, $fields_data[$this->field->getId()]);
    }

    public function testItAcceptsValue0(): void
    {
        $transition = $this->createMock(Transition::class);
        $transition->method('getId')->willReturn(123);

        $field_integer = $this->createMock(IntegerField::class);
        $field_integer->method('getId')->willReturn(456);

        $post_action = new Transition_PostAction_Field_Int(
            $transition,
            0,
            $field_integer,
            0
        );

        $this->assertTrue($post_action->isDefined());
    }
}
