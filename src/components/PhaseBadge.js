import React from 'react';
import { View } from 'react-native';
import { theme } from '../theme';
import { Text } from './ui/Text';

export function PhaseBadge({ phase, label }) {
  const display = label ? label : `Phase ${phase}`;
  return (
    <View
      accessible
      accessibilityLabel={display}
      style={{
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.black,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: theme.radius.pill,
      }}
    >
      <Text
        variant="small"
        weight="bold"
        accessible={false}
        style={{ color: theme.colors.white }}
      >
        {display}
      </Text>
    </View>
  );
}

export default PhaseBadge;
