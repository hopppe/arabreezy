// UnitChatScreen — Step 4 (final) of a unit. Wraps ChatScreen with
// requiredWords = the 8 focal words. Finishing the chat calls
// finishCurrentUnit() which applies SRS, advances the cursor, and on
// phase exhaustion bumps the phase.

import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import ChatScreen from '../../activities/Chat/ChatScreen';
import { useUnit } from '../../context/UnitContext';
import { useDialect } from '../../context/DialectContext';

export default function UnitChatScreen(props) {
  const navigation = useNavigation();
  const { currentUnit, finishCurrentUnit } = useUnit();
  const { bundle } = useDialect();

  const requiredWords = useMemo(() => {
    if (!currentUnit?.words || !bundle?.words) return [];
    return currentUnit.words
      .map((id) => {
        const w = bundle.words[id];
        if (!w) return null;
        return { id: w.id, script: w.script, english: w.english, transliteration: w.transliteration };
      })
      .filter(Boolean);
  }, [currentUnit, bundle]);

  // When the underlying ChatScreen calls navigation.goBack (via its Finish
  // button) we intercept by listening for the beforeRemove event and
  // finalizing the unit. Guarded with a ref so React strict mode / repeated
  // mount-unmounts don't double-call.
  const finalizedRef = useRef(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (finalizedRef.current) return;
      finalizedRef.current = true;
      finishCurrentUnit?.();
    });
    return unsubscribe;
  }, [navigation, finishCurrentUnit]);

  // Inject requiredWords + phase into the ChatScreen via route.params shape.
  // ChatScreen reads route.params.requiredWords already.
  const route = {
    ...(props?.route || {}),
    params: {
      ...(props?.route?.params || {}),
      requiredWords,
      scenarioKey: 'unit',
    },
  };

  return <ChatScreen {...props} route={route} navigation={navigation} />;
}
