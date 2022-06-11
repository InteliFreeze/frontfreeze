import { Text, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddItensButton ({ navigation: { navigate } }) {
    function navigateToAddItens () {
        navigate('AddItens');
    }
    return (
      <View style={{}}>
        <Ionicons onPress={navigateToAddItens} name='add' color={"#494B7A"} size={24} />
      </View>
        
    );
  }

export default AddItensButton;