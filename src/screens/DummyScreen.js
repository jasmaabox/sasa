
import React from 'react';
import { View, Text } from 'react-native';

export default class DummyScreen extends React.Component {

    render(){
        return (
            <View>
                <Text>{`dummy screen - ${Math.random()}`}</Text>
            </View>
        );
    }
}