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

namespace Tuleap\CrossTracker\Query\Advanced\From;

use EventManager;
use PFUser;
use PHPUnit\Framework\MockObject\MockObject;
use Project;
use ProjectUGroup;
use Tuleap\CrossTracker\Query\Advanced\CrossTrackerFieldTestCase;
use Tuleap\CrossTracker\Query\Advanced\ResultBuilder\Representations\TrackerRepresentation;
use Tuleap\CrossTracker\REST\v1\Representation\CrossTrackerQueryContentRepresentation;
use Tuleap\CrossTracker\Tests\CrossTrackerQueryTestBuilder;
use Tuleap\DB\DBFactory;
use Tuleap\DB\UUID;
use Tuleap\Project\Sidebar\CollectLinkedProjects;
use Tuleap\Project\Sidebar\LinkedProjectsCollection;
use Tuleap\Test\Builders\CoreDatabaseBuilder;
use Tuleap\Test\Stubs\CheckProjectAccessStub;
use Tuleap\Test\Stubs\SearchLinkedProjectsStub;
use Tuleap\Tracker\Test\Builders\TrackerDatabaseBuilder;
use Tuleap\Tracker\Tracker;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class FromProjectAggregatedTest extends CrossTrackerFieldTestCase
{
    private UUID $uuid;
    private PFUser $user;
    private EventManager&MockObject $event_manager;
    private Project $top_project;
    private Project $sub_project_1;
    private Project $sub_project_2;

    #[\Override]
    protected function setUp(): void
    {
        $db                  = DBFactory::getMainTuleapDBConnection()->getDB();
        $core_builder        = new CoreDatabaseBuilder($db);
        $tracker_builder     = new TrackerDatabaseBuilder($db);
        $this->event_manager = $this->createMock(EventManager::class);
        $this->event_manager->method('processEvent');
        EventManager::setInstance($this->event_manager);

        $this->top_project   = $core_builder->buildProject('top_project');
        $top_project_id      = (int) $this->top_project->getID();
        $this->sub_project_1 = $core_builder->buildProject('sub_project_1');
        $sub_project_1_id    = (int) $this->sub_project_1->getID();
        $this->sub_project_2 = $core_builder->buildProject('sub_project_2');
        $sub_project_2_id    = (int) $this->sub_project_2->getID();
        $this->user          = $core_builder->buildUser('bob', 'Bob', 'bob@example.com');
        $core_builder->addUserToProjectMembers((int) $this->user->getId(), $top_project_id);
        $core_builder->addUserToProjectMembers((int) $this->user->getId(), $sub_project_1_id);
        $core_builder->addUserToProjectMembers((int) $this->user->getId(), $sub_project_2_id);

        $tracker_1 = $tracker_builder->buildTracker($top_project_id, 'Tracker 1');
        $tracker_2 = $tracker_builder->buildTracker($sub_project_1_id, 'Tracker 2');
        $tracker_3 = $tracker_builder->buildTracker($sub_project_2_id, 'Tracker 3');
        $tracker_builder->setViewPermissionOnTracker($tracker_1->getId(), Tracker::PERMISSION_FULL, ProjectUGroup::PROJECT_MEMBERS);
        $tracker_builder->setViewPermissionOnTracker($tracker_2->getId(), Tracker::PERMISSION_FULL, ProjectUGroup::PROJECT_MEMBERS);
        $tracker_builder->setViewPermissionOnTracker($tracker_3->getId(), Tracker::PERMISSION_FULL, ProjectUGroup::PROJECT_MEMBERS);

        $tracker_builder->buildLastChangeset($tracker_builder->buildArtifact($tracker_1->getId()));
        $tracker_builder->buildLastChangeset($tracker_builder->buildArtifact($tracker_2->getId()));
        $tracker_builder->buildLastChangeset($tracker_builder->buildArtifact($tracker_3->getId()));

        $this->uuid = $this->addWidgetToProject(1, $top_project_id);
        $this->addWidgetToProject(2, $sub_project_1_id);
    }

    #[\Override]
    protected function tearDown(): void
    {
        EventManager::clearInstance();
    }

    /**
     * @param list<string> $expected
     */
    private function assertItContainsTrackers(array $expected, CrossTrackerQueryContentRepresentation $result): void
    {
        $found = [];
        foreach ($result->artifacts as $artifact) {
            self::assertArrayHasKey('@tracker.name', $artifact);
            $name = $artifact['@tracker.name'];
            self::assertInstanceOf(TrackerRepresentation::class, $name);
            if (! in_array($name->name, $found, true)) {
                $found[] = $name->name;
            }
        }
        self::assertEqualsCanonicalizing($expected, $found);
    }

    public function testItGetTeamsTrackersFromProgram(): void
    {
        $new_event  = new CollectLinkedProjects($this->top_project, $this->user);
        $collection = LinkedProjectsCollection::fromSourceProject(
            SearchLinkedProjectsStub::withValidProjects($this->sub_project_1, $this->sub_project_2),
            CheckProjectAccessStub::withValidAccess(),
            $this->top_project,
            $this->user,
        );
        $new_event->projectCanAggregateProjects();
        $new_event->addChildrenProjects($collection);
        $this->event_manager->method('dispatch')->willReturnCallback(
            static fn (object $event) => match (true) {
                $event instanceof CollectLinkedProjects => $new_event,
                default => $event,
            }
        );
        $result = $this->getQueryResults(
            CrossTrackerQueryTestBuilder::aQuery()
                 ->withUUID($this->uuid)->withTqlQuery('SELECT @tracker.name FROM @project = "aggregated" WHERE @id >= 1')->build(),
            $this->user,
        );
        $this->assertItContainsTrackers(['Tracker 2', 'Tracker 3'], $result);
    }

    public function testItGetTeamsAndProgramTrackersFromProgram(): void
    {
        $new_event  = new CollectLinkedProjects($this->top_project, $this->user);
        $collection = LinkedProjectsCollection::fromSourceProject(
            SearchLinkedProjectsStub::withValidProjects($this->sub_project_1, $this->sub_project_2),
            CheckProjectAccessStub::withValidAccess(),
            $this->top_project,
            $this->user,
        );
        $new_event->projectCanAggregateProjects();
        $new_event->addChildrenProjects($collection);
        $this->event_manager->method('dispatch')->willReturnCallback(
            static fn (object $event) => match (true) {
                $event instanceof CollectLinkedProjects => $new_event,
                default => $event,
            }
        );
        $result = $this->getQueryResults(
            CrossTrackerQueryTestBuilder::aQuery()
                 ->withUUID($this->uuid)->withTqlQuery('SELECT @tracker.name FROM @project IN("aggregated", "self") WHERE @id >= 1')->build(),
            $this->user,
        );
        $this->assertItContainsTrackers(['Tracker 1', 'Tracker 2', 'Tracker 3'], $result);
    }
}
