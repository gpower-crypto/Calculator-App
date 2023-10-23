import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import CalButton from './CalButton'

export default function CalDisplay({
  memoryStatement,
  calculationStatement,
  buttonPressed,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculationContainer}>
        <StatusBar style="light-content" />
        <Text style={styles.memoryStatement}>{memoryStatement}</Text>
        <Text style={styles.calculationStatement}>{calculationStatement}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <CalButton
            onPress={() => buttonPressed('C')}
            value={calculationStatement ? 'AC' : 'C'}
            isOperator
          />
          <CalButton
            onPress={() => buttonPressed('+/-')}
            value="+/-"
            isOperator
          />
          <CalButton
            onPress={() => buttonPressed('%')}
            value="%"
            isOperator
          />
          <CalButton
            onPress={() => buttonPressed('/')}
            value="/"
            isOperator
          />
        </View>
        <View style={styles.row}>
          <CalButton onPress={() => buttonPressed('7')} value="7" />
          <CalButton onPress={() => buttonPressed('8')} value="8" />
          <CalButton onPress={() => buttonPressed('9')} value="9" />
          <CalButton
            onPress={() => buttonPressed('x')}
            value="x"
            isOperator
          />
        </View>
        <View style={styles.row}>
          <CalButton onPress={() => buttonPressed('4')} value="4" />
          <CalButton onPress={() => buttonPressed('5')} value="5" />
          <CalButton onPress={() => buttonPressed('6')} value="6" />
          <CalButton
            onPress={() => buttonPressed('-')}
            value="-"
            isOperator
          />
        </View>
        <View style={styles.row}>
          <CalButton onPress={() => buttonPressed('1')} value="1" />
          <CalButton onPress={() => buttonPressed('2')} value="2" />
          <CalButton onPress={() => buttonPressed('3')} value="3" />
          <CalButton
            onPress={() => buttonPressed('+')}
            value="+"
            isOperator
          />
        </View>
        <View style={styles.row}>
          <CalButton
            onPress={() => buttonPressed('0')}
            value="0"
            flexSize
          />
          <CalButton onPress={() => buttonPressed('.')} value="." />
          <CalButton
            onPress={() => buttonPressed('=')}
            value="="
            isOperator
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212A3E',
  },
  calculationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  memoryStatement: {
    alignSelf: 'flex-end',
    fontSize: 28,
    color: 'grey',
    marginBottom: 10,
  },
  calculationStatement: {
    alignSelf: 'flex-end',
    fontSize: 32,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#2c364a',
    paddingTop: 20,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
