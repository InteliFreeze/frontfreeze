import { Text, View } from 'react-native';

function Itens() {
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Itens</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Estes são os seus alimentos.</Text>
      </View>
    );
  }

export default Itens;