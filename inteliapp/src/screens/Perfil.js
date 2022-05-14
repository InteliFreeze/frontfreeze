import { Text, View } from 'react-native';

function Perfil() {
    return (
        <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Perfil</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Gerencie a sua sessão.</Text>
      </View>
    );
  }

export default Perfil;