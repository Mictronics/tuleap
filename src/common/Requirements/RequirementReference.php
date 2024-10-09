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
 *
 */

declare(strict_types=1);

namespace Tuleap\Requirements;

use Tuleap\Request\NotFoundException;

class RequirementReference extends \Reference
{
    private $requirement_title;
    private $requirement_artifact_id;

    public function __construct(
        $myid,
        $mykeyword,
        $mydescription,
        $mylink,
        $myscope,
        $myservice_short_name,
        $nature,
        $myis_active,
        $mygroup_id,
        $value,
    ) {
        parent::__construct(
            $myid,
            $mykeyword,
            $mydescription,
            $mylink,
            $myscope,
            $myservice_short_name,
            $nature,
            $myis_active,
            $mygroup_id,
        );
        $this->requirement_title       = $value;
        $this->requirement_artifact_id = '';
    }

    /**
     * Query requirement artifact from database with given title.
     *
     * @param requirement_title The title of the requirement we are looking for.
     * @param group_id The actual project id.
     */
    private function _getRequirementFromDao($requirement_title, $group_id): mixed // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
    {
        if (! $requirement_title) {
            throw new NotFoundException(self::class . ': no reference value found for ' . $requirement_title);
        }
        $dao = new \Tuleap\Requirements\RequirementsDao();
        return $dao->searchByTitle($requirement_title, $group_id);
    }

    /**
     * Get link for requirement.
     *
     * @return Link
     */
    public function getLink(): string
    {
        if ($this->requirement_title) {
            $row = $this->_getRequirementFromDao($this->requirement_title, $this->group_id);
            if (! empty($row) && $row['item_name'] == 'requirement') {
                $this->link                    = '/plugins/tracker/?aid=' . $row['aid'] . '&group_id=' . $this->group_id;
                $this->requirement_artifact_id = $row['aid'];
            } else {
                return '/plugins/tracker/?group_id=' . $this->group_id;
            }
        }
        return $this->link;
    }

    /**
     * Get artifact id for requirement.
     *
     * @return Artifact ID
     */
    public function getId(): string
    {
        if (empty($this->requirement_artifact_id) && ! $this->requirement_title) {
            return (string) $this->id;
        } elseif (empty($this->requirement_artifact_id) && $this->requirement_title) {
            $row = $this->_getRequirementFromDao($this->requirement_title, $this->group_id);
            if (! empty($row) && $row['item_name'] == 'requirement') {
                $this->requirement_artifact_id = $row['aid'];
            }
        }
        return (string) $this->requirement_artifact_id;
    }

    /**
     * Replace original link with arguments
     *
     * Replacement rules
     * $projname -> project short name
     * $group_id -> project id
     * $0        -> keyword used in text
     * $1        -> first param
     * $2        -> second param, and so on until 9th param
     *
     * @param array $args array of arguments (optional)
     * @param string $projname contains the project name (optional)
     */
    public function replaceLink($args = null, $projname = null)
    {
        $this->link = str_replace('$0', $this->keyword, $this->link);
        if ($projname) {
            $this->link = str_replace('$projname', $projname, $this->link);
        }
        $this->link = str_replace('$group_id', (string) $this->group_id, $this->link);
        if (is_array($args)) {
            $count = count($args);
            if ($count > 9) {
                $count = 9;
            }
            for ($i = 1; $i <= $count; $i++) {
                $row = $this->_getRequirementFromDao($args[$i - 1], $this->group_id);
                if (! empty($row) && $row['item_name'] == 'requirement') {
                    $this->link = str_replace('$' . $i, (string) $row['aid'], $this->link);
                }
            }
        }
    }
}
