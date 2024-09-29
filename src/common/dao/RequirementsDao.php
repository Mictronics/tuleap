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

namespace Tuleap\Requirements;

class RequirementsDao extends \Tuleap\DB\DataAccessObject
{
    /**
     * Return the array that match given requirement title (ID).
     *
     * @return
     */
    public function searchByTitle($req_title)
    {
        $sql = "
                SELECT artifact.id as aid, tracker.item_name, tracker.id as tracker_id, cvt_title.value as title
                    FROM tracker_artifact AS artifact
                LEFT JOIN (
                    tracker_changeset_value                 AS cv_title
                    INNER JOIN tracker_changeset_value_text AS cvt_title ON (
                        cv_title.id = cvt_title.changeset_value_id
                    )
                ) ON (artifact.last_changeset_id = cv_title.changeset_id)
                INNER JOIN tracker ON (tracker.id = artifact.tracker_id)
                WHERE cvt_title.value = ?
                AND tracker.item_name = 'requirement'
                LIMIT 1;
        ";
        return $this->getDB()->row($sql, $req_title);
    }
}
