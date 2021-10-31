import react from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback} from 'react-native';

const KeyboardAvoidanceWrapper = ({children}) => {

   return (
      <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
         <ScrollView>

            <TouchableWithoutFeedback>

               {children}
               
            </TouchableWithoutFeedback>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}

export default KeyboardAvoidingView;