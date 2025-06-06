<?php
/**
 * Copyright (c) Enalean, 2020-Present. All Rights Reserved.
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

namespace Tuleap\APIExplorer;

use TemplateRendererFactory;
use Tuleap\Layout\BaseLayout;
use Tuleap\Layout\IncludeViteAssets;
use Tuleap\Templating\TemplateCache;

#[\PHPUnit\Framework\Attributes\DisableReturnValueGenerationForTestDoubles]
final class ExplorerControllerTest extends \Tuleap\Test\PHPUnit\TestCase
{
    public function testCanProcessARequest(): void
    {
        $include_assets = new IncludeViteAssets('/', '/');

        $template_cache = $this->createMock(TemplateCache::class);
        $template_cache->method('getPath')->willReturn(null);
        $template_renderer_factory = new TemplateRendererFactory($template_cache);

        $controller = new ExplorerController(
            $template_renderer_factory->getRenderer(__DIR__ . '/../../templates/'),
            $include_assets
        );

        $layout = $this->createMock(BaseLayout::class);
        $layout->expects($this->atLeast(1))->method('addJavascriptAsset');
        $layout->expects($this->once())->method('header');
        $layout->expects($this->once())->method('footer');

        $this->expectOutputRegex('/id="api-explorer"/');
        $controller->process(
            $this->createMock(\HTTPRequest::class),
            $layout,
            []
        );
    }
}
