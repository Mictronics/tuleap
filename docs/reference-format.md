# Reference Format

The reference format to link a tracker artifact, for example inside test steps, can match two main formats.

## General Reference

The general reference format accepts the following input pattern `[optional context_word ]key [#|§]project_name:value[after_reference]`.

Where:

* `context_word` → optional word ending optionally with `:`
* `key` → word
* `#` or `§`
* optional `project_name` ending with `:`
* `value`
    * numbers (with `-` allowed)
    * OR path-like segments (`abc/def/file`)
    * OR words with `_ - . &`
* optional trailing:
    * `&#`
    * `&§123`
    * `&§x1A3`
    * `&quot;`
    * OR boundary

### Simple Reference Match

```
REQ #123
task §456
bug #789
issue §100-200
```

### With Context Word

```
REQ #project:123
task §myproj:456
bug #alpha-1:789
```

### With Project Name

```
REQ #project:123
task §myproj:456
bug #alpha-1:789
```

### With Patch-like Values

```
REQ #abc/def/file
task §proj:folder/sub/file
item #system/core/module
```

### With Extended Characters (`_ - . &`)

```
REQ #file_name
REQ #file-name
REQ #file.name
REQ #R&D
REQ #proj:lib_v2.1
```

### With Numbers and Hyphens

```
REQ #123-456
task §2023-10
bug #1-2-3
```

### With HTML-style After Reference

```
REQ #123&
REQ #123&#
REQ #123&§45
REQ #123&§x1A3
REQ #123&quot;
```

### Complex Valid Examples

```
ref: ISSUE #project-x:module/sub_module/file_v1.2
context task §alpha-2:core/system-1/component
note BUG #lib/utils/helper_v2
```

### Requirement Reference

The requirement  reference is included in the general reference and accepts the following input pattern `Requirement §` followed by an requirement ID like `SSS_AC_123`. The keyword `requirement` makes the difference between any other general reference and this specific requirement reference.

Example:
```
Requirement §SSS_AC_123
requirement §SSS_AC_456
```

This reference will create a link to the corresponding requirement in the requirement tracker and shows a tooltip with the ID.

## ATA Chapter Reference

The ATA chapter reference accepts the following input pattern `[aAtT]{3} + space + 3–5 digits or hyphen digits`. The keyword `ATA`makes the difference between the general reference or this specific ATA reference.

Valid examples:
```
ATA 12-3
ata 12-3
Ata 12-3
ATA 12-45
ata 1245
aTa 12-34
```

The ATA chapter reference will create a link to the corresponding chapter and subchapter in the ATA tracker and shows a tooltip with the ATA description.