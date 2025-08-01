<?php
/**
 * Copyright (c) Enalean, 2023-present. All Rights Reserved.
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
 *  along with Tuleap. If not, see <http://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace Tuleap\Tracker\Semantic;

use Tuleap\Test\Builders\UserTestBuilder;
use Tuleap\Test\PHPUnit\TestCase;
use Tuleap\Tracker\FormElement\Field\Text\TextField;
use Tuleap\Tracker\Semantic\Title\TrackerSemanticTitle;
use Tuleap\Tracker\Test\Builders\Fields\StringFieldBuilder;
use Tuleap\Tracker\Test\Builders\TrackerTestBuilder;
use Tuleap\Tracker\Test\Stub\RetrieveUsedFieldsStub;
use Tuleap\Tracker\Test\Stub\Semantic\Title\RetrieveSemanticTitleFieldStub;
use Tuleap\Tracker\Test\Stub\VerifySubmissionPermissionStub;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class ArtifactCannotBeCreatedReasonsGetterTest extends TestCase
{
    private VerifySubmissionPermissionStub $can_submit_artifact_verifier;
    private RetrieveUsedFieldsStub $used_fields_retriever;
    private TextField $semantic_title_field;
    private \Tuleap\Tracker\Tracker $tracker;
    private RetrieveSemanticTitleFieldStub $title_field_retriever;

    protected function setUp(): void
    {
        $this->tracker                      = TrackerTestBuilder::aTracker()->withId(3000)->build();
        $this->can_submit_artifact_verifier = VerifySubmissionPermissionStub::withSubmitPermission();
        $this->semantic_title_field         = StringFieldBuilder::aStringField(3)
            ->thatIsRequired()
            ->inTracker($this->tracker)
            ->build();
        $this->used_fields_retriever        = RetrieveUsedFieldsStub::withFields($this->semantic_title_field);
        $this->title_field_retriever        = RetrieveSemanticTitleFieldStub::build()->withTitleField($this->tracker, $this->semantic_title_field);
    }

    private function getReasons(CollectionOfCreationSemanticToCheck $semantics_to_check): CollectionOfCannotCreateArtifactReason
    {
        $user                                    = UserTestBuilder::buildSiteAdministrator();
        $artifact_creation_from_semantic_checker = new ArtifactCannotBeCreatedReasonsGetter(
            $this->can_submit_artifact_verifier,
            $this->used_fields_retriever,
            $this->title_field_retriever
        );

        return $artifact_creation_from_semantic_checker->getCannotCreateArtifactReasons(
            $semantics_to_check,
            $this->tracker,
            $user
        );
    }

    public function testItReturnsEmptyArrayOfReasonIfThereIsNoSemanticsGiven(): void
    {
        $semantics_to_check = CollectionOfCreationSemanticToCheck::fromREST([])->value;

        $cannot_create_reasons = $this->getReasons($semantics_to_check);

        self::assertEmpty($cannot_create_reasons->getReasons());
    }

    public function testItFillsTheReasonCollectionWhenTheUserCannotCreateArtifact(): void
    {
        $this->can_submit_artifact_verifier = VerifySubmissionPermissionStub::withoutSubmitPermission();

        $semantics_to_check = CollectionOfCreationSemanticToCheck::fromREST([TrackerSemanticTitle::NAME])->value;

        $cannot_create_reasons = $this->getReasons($semantics_to_check);

        self::assertNotEmpty($cannot_create_reasons->getReasons());
        self::assertCount(1, $cannot_create_reasons->getReasons());
        self::assertNotEmpty($cannot_create_reasons->getReasons()[0]->reason);
    }

    public function testItFillsTheReasonCollectionWhenTheSemanticTitleFieldIsNotSet(): void
    {
        $this->title_field_retriever = RetrieveSemanticTitleFieldStub::build();
        $semantics_to_check          = CollectionOfCreationSemanticToCheck::fromREST(['title'])->value;
        $cannot_create_reasons       = $this->getReasons($semantics_to_check);
        self::assertCount(1, $cannot_create_reasons->getReasons());
        self::assertNotEmpty($cannot_create_reasons->getReasons()[0]->reason);
    }

    public function testItFillsTheReasonCollectionWhenTheTrackerHasSeveralMandatoryFields(): void
    {
        $other_required_field        = StringFieldBuilder::aStringField(151)
            ->withLabel('Other label')
            ->thatIsRequired()
            ->inTracker($this->tracker)
            ->build();
        $this->used_fields_retriever = RetrieveUsedFieldsStub::withFields($this->semantic_title_field, $other_required_field);
        $semantics_to_check          = CollectionOfCreationSemanticToCheck::fromREST(['title'])->value;
        $cannot_create_reasons       = $this->getReasons($semantics_to_check);
        self::assertCount(1, $cannot_create_reasons->getReasons());
        self::assertNotEmpty($cannot_create_reasons->getReasons()[0]->reason);
    }

    public function testItFillsTheReasonCollectionWhenTheUserCannotSubmitTheTitleField(): void
    {
        $form_element = $this->createMock(TextField::class);
        $form_element->method('userCanSubmit')->willReturn(false);
        $form_element->method('getLabel')->willReturn('Title');
        $form_element->method('getId')->willReturn(15);
        $form_element->method('getTrackerId')->willReturn($this->tracker->getId());
        $form_element->method('isRequired')->willReturn(false);
        $this->title_field_retriever = RetrieveSemanticTitleFieldStub::build()->withTitleField($this->tracker, $form_element);
        $this->used_fields_retriever = RetrieveUsedFieldsStub::withFields($form_element);
        $semantics_to_check          = CollectionOfCreationSemanticToCheck::fromREST(['title'])->value;
        $cannot_create_reasons       = $this->getReasons($semantics_to_check);
        self::assertCount(1, $cannot_create_reasons->getReasons());
        self::assertNotEmpty($cannot_create_reasons->getReasons()[0]->reason);
    }

    public function testItFillsTheReasonCollectionWithSeveralReason(): void
    {
        $this->can_submit_artifact_verifier = VerifySubmissionPermissionStub::withoutSubmitPermission();
        $other_required_field               = StringFieldBuilder::aStringField(151)
            ->withLabel('Other label')
            ->thatIsRequired()
            ->inTracker($this->tracker)
            ->build();

        $this->used_fields_retriever = RetrieveUsedFieldsStub::withFields($this->semantic_title_field, $other_required_field);
        $semantics_to_check          = CollectionOfCreationSemanticToCheck::fromREST(['title'])->value;
        $cannot_create_reasons       = $this->getReasons($semantics_to_check);
        self::assertCount(2, $cannot_create_reasons->getReasons());
        self::assertNotEmpty($cannot_create_reasons->getReasons()[0]->reason);
        self::assertNotEmpty($cannot_create_reasons->getReasons()[1]->reason);
    }
}
