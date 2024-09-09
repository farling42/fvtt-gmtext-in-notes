# CHANGELOG

## 2.2.2

- Remove deprecation warning about getProperty and setProperty on Founvdry V12.
- Update verified to 12.331.

## 2.2.1

- Remove deprecation warning about isNewerVersion.

## 2.2.0

- Initial compatibility with how Notes are rendered in Foundry V12 (prototype 1).

## 2.1.2

- Fix issue with a change of GM note not immediately being displayed.

## 2.1.1

- Mark compatible with Foundry 11 (299)
- Known Issue: notes need to be toggled off and on again for new GM note to be displayed.

## 2.1

- Override only the Note#text getter function instead of the entire Note#_drawTooltip function.
- Remove maximum compatibility flag (in preparation for Foundry V11).

## 2.0

Make compatible with Foundry 10 to avoid errors in console log.

## 1.0

Separation of this module from the *realm-works-import* module.
