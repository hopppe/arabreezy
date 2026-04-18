// Small helper to mirror flex direction & alignment when UI is in RTL.
// Pass the LTR-default style; function returns the flipped version if isRTL.
export function createRTLStyle(baseStyle, isRTL) {
  if (!isRTL) return baseStyle;
  const flipped = { ...baseStyle };
  if (baseStyle.flexDirection === 'row') flipped.flexDirection = 'row-reverse';
  if (baseStyle.flexDirection === 'row-reverse') flipped.flexDirection = 'row';
  if (baseStyle.textAlign === 'left') flipped.textAlign = 'right';
  if (baseStyle.textAlign === 'right') flipped.textAlign = 'left';
  if (baseStyle.marginLeft != null) {
    flipped.marginRight = baseStyle.marginLeft;
    delete flipped.marginLeft;
  }
  if (baseStyle.marginRight != null) {
    flipped.marginLeft = baseStyle.marginRight;
    delete flipped.marginRight;
  }
  if (baseStyle.paddingLeft != null) {
    flipped.paddingRight = baseStyle.paddingLeft;
    delete flipped.paddingLeft;
  }
  if (baseStyle.paddingRight != null) {
    flipped.paddingLeft = baseStyle.paddingRight;
    delete flipped.paddingRight;
  }
  return flipped;
}
