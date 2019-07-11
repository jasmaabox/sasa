
import React from 'react';
import { View, Dimensions } from 'react-native';
import { Avatar, Card, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';

import { ImageDisplay } from './ImageDisplay';

export class StatusCard extends React.PureComponent {
    render(){
        return(
            <Card containerStyle={{margin: 0}}>
                <View style={{flexDirection: 'row'}}>

                    <Avatar
                        size="medium"
                        rounded
                        source={{
                            uri: this.props.status['account']['avatar']
                        }}
                    />

                    <View style={{marginLeft: 20, flex: 1}}>

                        <Text>{this.props.status['id']}</Text>

                        <Text style={{fontSize: 18, flexWrap: 'wrap',}}>
                            {this.props.status['account']['display_name']} @{this.props.status['account']['username']}
                        </Text>
                        <HTML
                            html={`<div>${this.props.status['content']}</div>`}
                            imagesMaxWidth={Dimensions.get('window').width}
                            onLinkPress={(event, href)=>{
                                this.props.M.openURL(href);
                            }}
                        />
                        <ImageDisplay media={this.props.status['media_attachments']}/>
                    </View>
                </View>
            </Card>
        );
    }
}