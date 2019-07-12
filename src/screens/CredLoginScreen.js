
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';

/**
 * Credential login screen
 */
export default class CredLoginScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            email: null,
            password: null,
        }
    }

    render() {
        const {navigation} = this.props;
        let M = navigation.getParam('M');

        return (
            <View style={styles.mainContainer}>

                <Text h2 containerStyle={styles.widget}>Login</Text>

                <View style={{margin: 40}}></View>

                <Input
                    placeholder='Email'
                    leftIcon={<Icon name='user' size={24} color='black'/>}
                    onChangeText={(value)=>{
                        this.setState({
                            email: value,
                        });
                    }}
                    containerStyle={styles.widget}
                />
                <Input
                    placeholder='Password'
                    leftIcon={<Icon name='lock' size={24} color='black'/>}
                    secureTextEntry={true}
                    onChangeText={(value)=>{
                        this.setState({
                            password: value,
                        });
                    }}
                    containerStyle={styles.widget}
                />

                <Button
                    title="Login"
                    type="outline"
                    containerStyle={styles.widget}
                    onPress={() => {
                        M.authAccountCreds(this.state.email, this.state.password)
                            .then(()=>{
                                this.props.navigation.navigate("LoginLanding", {M: M})
                            })

                            .catch((error)=>{
                                Alert.alert("Could not log in: " + error);
                            });
                    }}
                />
            </View>
        );
      }
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    widget: {
        margin: 10,
    }
});