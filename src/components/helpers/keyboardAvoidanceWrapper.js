import react from 'react';

import {KeyboardAvoidingView , TouchableWithoutFeedback} from 'react-native';
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view";

const KeyboardAvoidanceWrapper = ({children}) => {

   return (
      <KeyboardAvoidingView style={{ width: '100%', alignItems: 'center', flexDirection: 'column', backgroundColor: 'black'}}
      // keyboardVerticalOffset = {'50%'}
      // behaviour= {'height'}
      >
         {/* <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
         //  contentContainerStyle={styles.container}
          scrollEnabled={false}
         > */}

            {/* <TouchableWithoutFeedback > */}

               {children}
               
            {/* </TouchableWithoutFeedback> */}
         {/* </KeyboardAwareScrollView> */}
      </KeyboardAvoidingView>
   )
}

export default KeyboardAvoidingView;