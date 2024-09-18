<?php
/**
 * Copyright (c) Michael Wolf, 2024 - Present. All Rights Reserved.
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

 /**
 * Manage values in changeset for test step type field
 */
// phpcs:ignore PSR1.Classes.ClassDeclaration.MissingNamespace,Squiz.Classes.ValidClassName.NotCamelCaps
class Tracker_Artifact_ChangesetValue_StepType extends Tracker_Artifact_ChangesetValue
{
    /**
     * @const Step type is Action.
     */
    public const TYPE_ACTION = 'action';

    /**
     * @const Step type is Check.
     */
    public const TYPE_CHECK = 'check';

    /**
     * @const Step type is Input.
     */
    public const TYPE_INPUT = 'input';

    /**
     * @const Step type is Rationale.
     */
    public const TYPE_RATIONALE = 'rationale';

    /**
     * @const Step type is Info.
     */
    public const TYPE_INFO = 'info';

    /**
     * @const Step type is Requirement.
     */
    public const TYPE_REQUIREMENT = 'requirement';

    /**
     * @const Step type is Warning.
     */
    public const TYPE_WARNING = 'warning';

    /**
     * @const Step type is Alert.
     */
    public const TYPE_ALERT = 'alert';

    /** @var string */
    private $step_type;

    public function __construct($id, Tracker_Artifact_Changeset $changeset, $field, $has_changed, $step_type)
    {
        parent::__construct($id, $changeset, $field, $has_changed);
        $this->step_type = $step_type;
    }

    /**
     * @return mixed
     */
    public function accept(Tracker_Artifact_ChangesetValueVisitor $visitor)
    {
        return $visitor->visitStepType($this);
    }

    /**
     * Get the type value of this changeset value
     *
     * @return string the step type
     */
    public function getType()
    {
        if ($this->step_type == null) {
            return self::TYPE_ACTION;
        }

        return $this->step_type;
    }

    /**
     * Get the string value
     *
     * @return string|null
     */
    public function getValue()
    {
        return $this->step_type;
    }

    public function getRESTValue(PFUser $user)
    {
        return $this->getFullRESTValue($user);
    }

    public function getFullRESTValue(PFUser $user)
    {
        return $this->getFullRESTRepresentation($this->getType());
    }

    /**
     * Get the diff between this step type value and the one passed in param
     *
     * @return string|false The difference between another $changeset_value, false if no differences
     */
    public function diff($changeset_value, $format = 'html', ?PFUser $user = null, $ignore_perms = false)
    {
        $previous_step_type = $changeset_value->getValue();
        $next_step_type     = $this->getValue();
        if ($previous_step_type !== $next_step_type) {
            if ($previous_step_type === null) {
                return sprintf(dgettext('tuleap-tracker', 'set to %s'), $next_step_type);
            } elseif ($next_step_type === null) {
                return dgettext('tuleap-tracker', 'cleared');
            } else {
                return sprintf(
                    dgettext('tuleap-tracker', 'changed from %s to %s'),
                    $previous_step_type,
                    $next_step_type
                );
            }
        }
        return false;
    }

    /**
     * Returns the "set to" for field added later
     *
     * @return string The sentence to add in changeset
     */
    public function nodiff($format = 'html')
    {
        if ($this->getType() != null) {
            return dgettext('tuleap-tracker', 'set to') . ' ' . $this->getValue();
        }
        return '';
    }
}
