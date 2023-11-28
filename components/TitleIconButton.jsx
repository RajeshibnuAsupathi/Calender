import { Text, Pressable, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function TitleIconButton(props) {
    return (
        <Pressable
                onPress={props?.onPress}
                style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Text style={styles.title}>{props.children}</Text>
                <Ionicons name={'caret-down-sharp'} size={12} color={'black'} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection:'row',
      borderRadius: 24,
      padding: 6,
      marginHorizontal: 8,
      marginVertical: 2,
      alignItems:'baseline'
    },
    pressed: {
      opacity: 0.5,
    },
    title:{
      fontSize: 16,
      marginEnd: 5
    }
  });

export default TitleIconButton;