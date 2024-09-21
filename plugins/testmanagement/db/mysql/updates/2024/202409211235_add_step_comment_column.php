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

// phpcs:ignore PSR1.Classes.ClassDeclaration.MissingNamespace,Squiz.Classes.ValidClassName.NotCamelCaps
class b202409211235_add_step_comment_to_stepexec extends \Tuleap\ForgeUpgrade\Bucket
{
    public function description(): string
    {
        return 'Add comment column to table plugin_testmanagement_changeset_value_stepexec.';
    }

    public function preUp(): void
    {
        $this->db = $this->getApi('ForgeUpgrade_Bucket_Db');
    }

    public function up(): void
    {
        $this->db->alterTable(
            'plugin_testmanagement_changeset_value_stepexec',
            'tuleap',
            'step_comment',
            'ALTER TABLE plugin_testmanagement_changeset_value_stepexec
                ADD
                comment VARCHAR(100)'
        );
    }
}
