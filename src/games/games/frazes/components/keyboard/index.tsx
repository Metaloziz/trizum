import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';
import BackspaceIcon from '@mui/icons-material/Backspace';

const keyboardBackground = require('../../assets/keyboard.png');

interface ButtonProps {
  label: string;
  last: boolean;
  onPress: (char: string) => void | null;
}

interface KeyboardProps {
  visibleWord: boolean;
  onKeyPress: (char: string) => void;
  backspaceHandler: () => void;
}

const keyboardButtons = [
  { row: ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х'] },
  { row: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'] },
  { row: ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ъ', 'Ё'] },
];

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  return keyPressed;
};

const VirtualKeyboardButton: FC<ButtonProps> = ({ label, last = false, onPress }) => {
  const keyPressed = useKeyPress(label.toLowerCase());

  useEffect(() => {
    if (keyPressed) {
      onPress(label);
    }
  }, [keyPressed]);

  return (
    <TouchableOpacity
      style={[styles.button, last && styles.buttonLast]}
      onPress={() => onPress(label)}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export const VirtualKeyboard: FC<KeyboardProps> = ({
  visibleWord,
  onKeyPress,
  backspaceHandler,
}) => {
  const keyPressed = useKeyPress('Backspace');

  useEffect(() => {
    if (keyPressed) {
      backspaceHandler();
    }
  }, [keyPressed]);

  return (
    <View style={styles.root}>
      <ImageBackground source={keyboardBackground} resizeMode="contain" style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.title}>Введите слово</Text>
          {/* <TouchableOpacity onPress={() => visibleWord ? null : backspaceHandler()}>
            <BackspaceIcon color="primary" />
          </TouchableOpacity> */}
        </View>

        <View style={styles.keyboard}>
          {keyboardButtons.map(({ row }, index) => {
            return (
              <View key={`row-${index}`} style={styles.row}>
                {row.map((item, index) => {
                  return (
                    <VirtualKeyboardButton
                      key={item}
                      label={item}
                      last={row.length === index + 1}
                      onPress={() => visibleWord ? undefined : onKeyPress(item)}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 300,
    justifyContent: 'center',
  },
  background: {
    minHeight: 300,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  keyboard: {
    width: '100%',
    paddingHorizontal: 50,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    marginRight: 15,
  },
  buttonLast: {
    marginRight: 0,
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: '600',
  },
});
