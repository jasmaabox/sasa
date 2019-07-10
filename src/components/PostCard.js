
import React from 'react';
import { View, Dimensions, Linking } from 'react-native';
import { Avatar, Card, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';

export class PostCard extends React.Component {
    render(){
        return(
            <Card containerStyle={{margin: 0}}>
                <View style={{flexDirection: 'row'}}>

                    <Avatar
                        size="medium"
                        rounded
                        source={{
                            uri: this.props.avatarURI
                        }}
                    />

                    <View style={{marginLeft: 20, flex: 1}}>
                        <Text style={{fontSize: 18, flexWrap: 'wrap',}}>
                            {this.props.name} @{this.props.handle}
                        </Text>
                        <HTML
                            html={this.props.text}
                            imagesMaxWidth={Dimensions.get('window').width}
                            onLinkPress={(event, href)=>{
                                Linking.openURL(href);
                            }}
                        />
                    </View>
                </View>
            </Card>
        );
    }
}