/**
 * Copyright (c) Enalean, 2021 - Present. All Rights Reserved.
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

export const config: CKEDITOR.config = {
    toolbar: [
        ["Undo", "Redo"],
        ["Bold", "Italic", "-", "CopyFormatting", "RemoveFormat"],
        ["TextColor", "BGColor"],
        ["NumberedList", "BulletedList", "-", "Blockquote", "Styles", "Format"],
        ["Link", "Unlink", "Anchor", "Image"],
        ["Source"],
    ],
    plugins:
        "basicstyles,colorbutton,colordialog,copyformatting,format,iframe,wysiwygarea,image,link,list,liststyle,removeformat,stylescombo,undo,uploadwidget,uploadimage",
    stylesSet: [
        { name: "Bold", element: "strong", overrides: { b: true } },
        { name: "Italic", element: "em", overrides: { i: true } },
        { name: "Code", element: "code" },
        { name: "Subscript", element: "sub" },
        { name: "Superscript", element: "sup" },
        // Add additional styles for demo purpose
        {
            name: "Caution",
            element: "span",
            styles: { "background-color": "#FBBC04", color: "#000000" },
        },
        {
            name: "Warning",
            element: "span",
            styles: { "background-color": "#FF0000", color: "#FFFFFF" },
        },
        {
            name: "Advisory",
            element: "span",
            styles: { "background-color": "#FFFFFF", color: "#000000", border: "black solid thin" },
        },
        {
            name: "Sequence Amber",
            element: "span",
            styles: { "background-color": "#0B5394", color: "#FBBC04" },
        },
        {
            name: "Sequence Green",
            element: "span",
            styles: { "background-color": "#0B5394", color: "#00FF00" },
        },
        {
            name: "Sequence Cyan",
            element: "span",
            styles: { "background-color": "#0B5394", color: "#00FFFF" },
        },
        {
            name: "Sequence White",
            element: "span",
            styles: { "background-color": "#0B5394", color: "#FFFFFF" },
        },
    ],
    disableNativeSpellChecker: false,
};
