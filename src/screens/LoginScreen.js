
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';

import { Mastodon } from '../networking/mastodon.js';

/**
 * Login screen landing
 */
export class LoginScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            baseurl: null,
        };
    }

    render(){
        return (
            <View style={styles.mainContainer}>

                <Text h1 containerStyle={styles.widget}>Sasa</Text>

                <Input
                    placeholder='Server'
                    onChangeText={(value)=>{
                        this.setState({
                            baseurl: value,
                        });
                    }}
                    containerStyle={styles.widget}
                />

                <View style={{ ...styles.widget, flexDirection: 'row' }}>
                    <Button
                        title="Use Code"
                        type="outline"
                        containerStyle={styles.widget}
                        onPress={() => {
                            let M = new Mastodon(this.state.baseurl);
                            M.init()
                                .then(()=>M.registerApp())
                                .then(()=>M.promptAuthCode())
                                .then(()=>{
                                    this.props.navigation.navigate('CodeLogin', {M: M});
                                })
                                .catch(()=>{
                                    Alert.alert("Not a valid server.");
                                });  
                        }}
                    />
                    <Button
                        title="Use Login"
                        type="outline"
                        containerStyle={styles.widget}
                        onPress={() => {
                            let M = new Mastodon(this.state.baseurl);
                            M.init()
                                .then(()=>M.registerApp())
                                .then(()=>{
                                    this.props.navigation.navigate('CredLogin', {M: M});
                                })
                                .catch(()=>{
                                    Alert.alert("Not a valid server.");
                                });
                        }}
                    />
                </View>


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