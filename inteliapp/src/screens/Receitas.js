import { Text, View } from 'react-native';

function Receitas() {
    return (
      <View style={{ flex: 1, paddingTop: 65, paddingRight: 45, paddingLeft:45}}>
        <Text style={{fontSize: 20, color: "#ffffff", fontWeight:'bold' }}>Olá!</Text>
        <Text style={{fontSize: 16, color: "#BDBDBD", paddingTop: 7, paddingBottom:14 }}>Qual a receita perfeita para hoje?</Text>
      </View>
    );
  }

export default Receitas;