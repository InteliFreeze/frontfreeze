import { Text, View, Button } from 'react-native';

function CustomizedButton() {
    return (
      <View style={{
        height: 60,
        width: 137,
        backgroundColor: '#00C113',
        padding: 12,
        marginLeft: 32,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 64,
        borderBottomRightRadius: 64,
        borderBottomLeftRadius: 32,
      }}>
        <Button title='Entrar' color='#00C113'></Button>
      </View>
        
    );
  }

export default CustomizedButton;