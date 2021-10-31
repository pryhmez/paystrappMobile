import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation} from '@react-navigation/native';


const ImageIcon = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('My Profile') }>

      <Image
        source={{ uri: 'https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g' }}
        style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15 }} />
    </TouchableOpacity>
  );
}

export default ImageIcon;