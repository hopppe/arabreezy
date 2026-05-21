# iPhone 16 Pro coords cheatsheet

All coordinates in points (the unit `mobile_click_on_screen_at_coordinates` expects). Screen is 402 × 874 pt.

Use when `mobile_list_elements_on_screen` doesn't return the button you want — which is frequently, because RN `<Button>` and `<TouchableOpacity>` without `accessibilityLabel` are systematically omitted from the elements dump.

## Universal

| Element | Coords |
|---|---|
| Modal close X (top-right) | (368, 111) |
| Back arrow (top-left) | (20, 115) |
| FloatingTabBar — Home | (50, 830) |
| FloatingTabBar — Activities | (150, 830) |
| FloatingTabBar — Progress | (250, 830) |
| FloatingTabBar — Settings | (350, 830) |
| Mic permission Allow | (274, 525) |
| Mic permission Don't Allow | (130, 525) |
| Expo dev menu close X | (350, 397) |

## SignIn screen

| Element | Coords | Notes |
|---|---|---|
| Email field | (201, 325) | |
| Password field | (201, 415) | NEVER re-tap to retype — typing appends |
| Sign in button | (201, 478) | |
| Continue with Apple | (201, 580) | Fails on bare sim (no Apple ID) |
| "No account yet? Create one" | (250, 667) | Tap on the bold "Create one" word, NOT on "No account yet?" |

## SignUp screen

| Element | Coords |
|---|---|
| Email field | (201, 325) |
| Password field | (201, 415) |
| Create account button | (201, 480) |
| Already have account? Sign in | (250, 660) |
| Dismiss keyboard | tap (200, 250) — anywhere on the title above |

## EmailVerificationScreen

| Element | Coords |
|---|---|
| Resend email | (200, 478) |
| Use a different email | (200, 567) |

## PlacementIntroScreen

| Element | Coords |
|---|---|
| Begin placement (orange) | (200, 480) |
| Skip — start at Phase 1 | (200, 560) |

## PlacementQuestionScreen

| Element | Coords | Notes |
|---|---|---|
| Choice 1 (top card) | (200, 240) | |
| Choice 2 | (200, 370) | approximate — varies with question prompt height |
| Choice 3 | (200, 500) | |
| Choice 4 (bottom card) | (200, 625) | |
| Next button | (200, 753) | Must have a choice selected first |

Choices are **shuffled** each render (see `shuffle(question.choices...)` in `PlacementQuestionScreen.js`), so position ≠ correctness. To speed-run: just tap any choice + Next; a wrong answer ends the test sooner.

## PlacementResultScreen

| Element | Coords |
|---|---|
| Take the 3-minute primer (orange) | (200, 540) |
| Start learning (white) | (200, 615) |

## HomeScreen

| Element | Coords |
|---|---|
| Phase badge | (60, 102) |
| Search icon (top-right) | (358, 102) |
| Start review / Continue lesson (orange) | (200, 370) |
| Flashcards card row | (200, 555) |
| Guided conversation card row | (200, 640) |
| Shadowing card row | (200, 725) |

## ActivitiesScreen (grid, 2 cols)

Scroll-to-top, top row at y≈340; row stride ~130. Right column at x=300, left at x=100.

| Row | Left card | Right card |
|---|---|---|
| 1 | How Arabic works (100, 340) | Lessons (300, 340) |
| 2 | Flashcards (100, 490) | Stories (300, 490) |
| 3 | Listening (100, 620) | Guided conversation (300, 620) |
| 4 | Shadowing (100, 750) | Pronunciation (300, 750) |
| 5 (after swipe up 300) | Grammar (100, 340) | Idioms (300, 340) |
| 6 (after swipe up 300) | Roots (100, 470) | Chat (300, 470) |
| 7 (after swipe up 300) | Voice tutor (100, 600) | — |

## LessonScreen

| Element | Coords |
|---|---|
| Continue button (black, bottom) | (200, 810) |
| Close X | (368, 111) |
| Quiz choice 1 | (200, 275) |
| Quiz choice 2 | (200, 370) |
| Quiz choice 3 | (200, 465) |
| Quiz choice 4 | (200, 560) |

## FlashcardScreen

| Element | Coords |
|---|---|
| Card (tap to flip) | (200, 450) |
| Again (red) | (60, 815) |
| Hard (yellow) | (155, 815) |
| Good (green) | (240, 815) |
| Easy (blue) | (340, 815) |
| Close X | (368, 111) |

## GuidedConversationPicker / GuidedConversation

The picker is a list; tap a row at its visible y. The screen itself uses the same Continue (200, 810) pattern.

## ChatScreen

| Element | Coords |
|---|---|
| Text input field | (160, 810) |
| Send button (orange) | (340, 810) |
| Finish (top-right) | (335, 100) |

## VoiceChatScreen (Voice Tutor)

| Element | Coords |
|---|---|
| Start conversation (orange) | (200, 810) |
| Mute | (110, 810) |
| End conversation (orange) | (290, 810) |
| Done (top-right) | (355, 90) |

## How to derive new coords

```bash
# 1. Take a screenshot
mobile_save_screenshot device="<UDID>" saveTo=/tmp/screen.png

# 2. Eyeball the y range of the button. Image is 1206x2622 (3× scale of 402x874).
# 3. Crop the relevant strip
sips --cropToHeightWidth 400 1206 --cropOffset <Y_PIXELS_TOP> 0 /tmp/screen.png --out /tmp/strip.png

# 4. Read the crop, find button center in the crop in pixels
# 5. Convert: point_y = (Y_PIXELS_TOP + crop_center_y) / 3
#            point_x = pixel_x / 3
```
