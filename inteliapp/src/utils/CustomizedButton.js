import { View, Button } from 'react-native';

function CustomizedButton(props) {
    return (
      <View style={{
        height: 60,
        width: 137,
        backgroundColor: `${props.color}`,
        padding: 12,
        marginLeft: 32,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 64,
        borderBottomRightRadius: 64,
        borderBottomLeftRadius: 32,
      }}>
        <Button title='Entrar' color={props.color}></Button>
      </View>
        
    );
  }

export default CustomizedButton;