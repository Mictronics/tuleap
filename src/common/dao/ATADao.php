<?php
/**
 * Copyright (c) Michael Wolf, 2024-Present. All Rights Reserved.
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

namespace Tuleap\ATA;

class ATADao extends \Tuleap\DB\DataAccessObject
{
    /**
     * Return the array that match given ATA system and subsystem in actual project.
     *
     * @return
     */
    public function searchByCodes($system, $subsystem, $group_id)
    {
        $sql = "
                SELECT _system.aid AS aid, _system.item_name AS item_name, title, _system.value AS _system, subsystem.value AS subsystem FROM
                (
                    SELECT artifact.id as aid, tracker.item_name AS item_name, cvt_title.value as title, cvt_system.value
                        FROM tracker_artifact AS artifact
                    LEFT JOIN (
                        tracker_changeset_value AS cv_title
                        INNER JOIN tracker_changeset_value_text AS cvt_title ON (
                            cv_title.id = cvt_title.changeset_value_id
                        )
                    ) ON (artifact.last_changeset_id = cv_title.changeset_id)
                    LEFT JOIN (
                        tracker_changeset_value AS cv_system
                        INNER JOIN tracker_changeset_value_int AS cvt_system ON (
                            cv_system.id = cvt_system.changeset_value_id
                        )
                    ) ON (artifact.last_changeset_id = cv_system.changeset_id)
                    INNER JOIN tracker ON (tracker.id = artifact.tracker_id)
                    INNER JOIN tracker_field ON (tracker_field.id = cv_system.field_id)
                    WHERE tracker.item_name = 'ata'
                    AND tracker.group_id = ?
                    AND tracker_field.name = 'system'
                ) as _system
                INNER JOIN (
                    SELECT artifact.id as aid, cvt_system.value
                        FROM tracker_artifact AS artifact
                    LEFT JOIN (
                        tracker_changeset_value AS cv_system
                        INNER JOIN tracker_changeset_value_int AS cvt_system ON (
                            cv_system.id = cvt_system.changeset_value_id
                        )
                    ) ON (artifact.last_changeset_id = cv_system.changeset_id)
                    INNER JOIN tracker ON (tracker.id = artifact.tracker_id)
                    INNER JOIN tracker_field ON (tracker_field.id = cv_system.field_id)
                    WHERE tracker.item_name = 'ata'
                    AND tracker_field.name = 'subsystem'
                    AND tracker.group_id = ?
                ) subsystem ON _system.aid = subsystem.aid
                WHERE _system.value = ? AND subsystem.value = ?;
        ";
        return $this->getDB()->row($sql, $group_id, $group_id, $system, $subsystem);
    }
}
