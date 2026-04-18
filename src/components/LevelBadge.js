import React from 'react';
import { View } from 'react-native';
import { theme } from '../theme';
import { Text } from './ui/Text';

export function LevelBadge({ level }) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.black,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: theme.radius.pill,
      }}
    >
      <Text variant="small" weight="bold" style={{ color: theme.colors.white }}>
        Level {level}
      </Text>
    </View>
  );
}

export default LevelBadge;
