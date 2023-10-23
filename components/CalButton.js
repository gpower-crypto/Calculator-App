import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default CalculatorButton = ({ onPress, value, isOperator, flexSize }) => {
    const buttonStyle = isOperator ? styles.operatorButton : styles.numberButton;
    const textStyle = isOperator ? styles.operatorText : styles.numberText;
  
    return (
      <TouchableOpacity style={[styles.button, buttonStyle, flexSize && { flex: 2 }]} onPress={onPress}>
        <Text style={textStyle}>{value}</Text>
      </TouchableOpacity>
    );
  };


  const styles = StyleSheet.create({
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#272f42',
      marginHorizontal: 5,
      marginVertical: 5,
      height: 80,
      borderRadius: 10,
    },
    numberButton: {
      backgroundColor: '#272f42',
    },
    operatorButton: {
      backgroundColor: '#212A3E',
      borderRadius: 100,
    },
    numberText: {
      color: '#ccc',
      fontSize: 30,
    },
    operatorText: {
      color: '#73debd',
      fontSize: 30,
    },
  })