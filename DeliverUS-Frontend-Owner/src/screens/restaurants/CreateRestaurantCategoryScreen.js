import * as yup from 'yup'
import { createRestaurantCategory} from '../../api/RestaurantEndpoints'
import { Formik } from 'formik'
import {Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'



export default function CreateRestaurantCategoryScreen ({ navigation }) {

const initialRestaurantCategoryValues = {name: null, updatedAt : Date.now()}
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .max(50, 'Name too long')
            .required('Name is required')
    })

    const newRestaurantCategory = async (values) => {
        //setBackendErrors([])
        try {
          const createdRestaurantCategory = await createRestaurantCategory(values)
          showMessage({
            message: `Restaurant Category ${createdRestaurantCategory.name} succesfully created`,
            type: 'success',
            style: GlobalStyles.flashStyle,
            titleStyle: GlobalStyles.flashTextStyle
          })
          navigation.navigate('CreateRestaurantScreen', { dirty: true })
        } catch (error) {
            showMessage({
                message: `Restaurant Category not created created`,
                type: 'error',
                style: GlobalStyles.flashStyle,
                titleStyle: GlobalStyles.flashTextStyle
              })
        }
      }

    return (
        <Formik
         validationSchema={validationSchema}
         initialValues={initialRestaurantCategoryValues}
         onSubmit={newRestaurantCategory}>
        {({ handleSubmit}) => (
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '60%' }}>
                    <InputItem
                    name='name'
                    label='Name:'
                     />
                    </View>
                </View>
                <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Save
                </TextRegular>
              </View>
              </Pressable>
            </ScrollView>
        )}
        </Formik>
    )

    
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      height: 40,
      padding: 10,
      width: '100%',
      marginTop: 20,
      marginBottom: 20
    },
    text: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginLeft: 5
    },
    imagePicker: {
      height: 40,
      paddingLeft: 10,
      marginTop: 20,
      marginBottom: 80
    },
    image: {
      width: 100,
      height: 100,
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: 5
    }
})