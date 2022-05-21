import { Text, View, TextInput } from 'react-native';

function CustomizedInput() {
    return (
      <TextInput style={{
        height: 60,
        width: 285,
        backgroundColor: '#B4C9FF',
        padding: 12,
        margin: 32,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 64,
        borderBottomRightRadius: 64,
        borderBottomLeftRadius: 32,
      }}></TextInput>
    );
  }

export default CustomizedInput;