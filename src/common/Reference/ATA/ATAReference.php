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

namespace Tuleap\ATA;

use Tuleap\Request\NotFoundException;

class ATAReference extends \Reference
{
    private $ata_title;
    private $ata_artifact_id;
    private $ata_system;
    private $ata_subsystem;

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
        $codes = $this->_getSystemSubsystemFromChapter($value);
        if (count($codes) === 2) {
            $this->ata_system    = $codes[0];
            $this->ata_subsystem = $codes[1];
        }
        $this->ata_title       = '';
        $this->ata_artifact_id = '';
    }

    /**
     * Split input ATA chapters into system and subsystem codes.
     * @param chapter ATA chapter string.
     */
    private function _getSystemSubsystemFromChapter($chapter): array // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
    {
        if ($chapter) {
            return explode('-', $chapter);
        }
        return [];
    }

    /**
     * Query ATA artifact from database with given system and subsystem.
     *
     * @param system The ATA system code.
     * @param subsystem The ATA subsystem code.
     * @param group_id The actual project id.
     */
    private function _getATAFromDao($system, $subsystem, $group_id): mixed // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
    {
        if (! $system || ! $subsystem) {
            throw new NotFoundException(self::class . ': no reference value found for ATA ' . $system . '-' . $subsystem);
        }
        $dao = new \Tuleap\ATA\ATADao();
        return $dao->searchByCodes($system, $subsystem, $group_id);
    }

    /**
     * Get link for requirement.
     *
     * @return Link
     */
    public function getLink(): string
    {
        if ($this->ata_system && $this->ata_subsystem) {
            $row = $this->_getATAFromDao($this->ata_system, $this->ata_subsystem, $this->group_id);
            if (! empty($row) && $row['item_name'] == 'ata') {
                $this->link            = '/plugins/tracker/?aid=' . $row['aid'] . '&group_id=' . $this->group_id;
                $this->ata_artifact_id = $row['aid'];
            } else {
                return '/plugins/tracker/?group_id=' . $this->group_id;
            }
        }
        return $this->link;
    }

    /**
     * Get artifact id for ATA codes.
     *
     * @return Artifact ID
     */
    public function getId(): string
    {
        if (empty($this->ata_artifact_id) && ! empty($this->ata_title)) {
            return (string) $this->id;
        } elseif (empty($this->ata_artifact_id) && empty($this->ata_title)) {
            $row = $this->_getATAFromDao($this->ata_system, $this->ata_subsystem, $this->group_id);
            if (! empty($row) && $row['item_name'] == 'ata') {
                $this->ata_artifact_id = $row['aid'];
            }
        }
        return (string) $this->ata_artifact_id;
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
                $codes = $this->_getSystemSubsystemFromChapter($args[$i - 1]);
                if (count($codes) === 2) {
                    $row = $this->_getATAFromDao($codes[0], $codes[1], $this->group_id);
                    if (! empty($row) && $row['item_name'] == 'ata') {
                        $this->ata_artifact_id = $row['aid'];
                        $this->ata_title       = $row['title'];
                        $this->link            = str_replace('$' . $i, (string) $row['aid'], $this->link);
                    }
                }
            }
        }
    }
}
