
import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Card, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getTimePassedStr } from '../utils/utils.js';
import ImageDisplay from './ImageDisplay.js';

export default class StatusDisplay extends React.PureComponent {

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri: this.props.status['account']['avatar']
                    }}
                />

                <View style={{ marginLeft: 20, flex: 1 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text>{this.props.status['account']['display_name'] ? this.props.status['account']['display_name'] + ' ' : ''}</Text>
                            <Text style={{ color: 'grey' }}>@{this.props.status['account']['username']}</Text>
                        </Text>
                        <Text style={{ color: 'grey' }}> {getTimePassedStr(new Date(this.props.status['created_at']))}</Text>
                    </View>

                    <HTML
                        html={`<div>${this.props.status['content']}</div>`}
                        imagesMaxWidth={Dimensions.get('window').width}
                        onLinkPress={(event, href) => {
                            this.props.M.openURL(href);
                        }}
                    />

                    <ImageDisplay media={this.props.status['media_attachments']} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 50 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="reply" size={15} color='grey' />
                            <Text style={{ color: 'grey' }}> {this.props.status['replies_count']}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="retweet" size={15} color={this.props.status['reblogged'] ? 'lightgreen' : 'grey'} />
                            <Text style={{ color: this.props.status['reblogged'] ? 'lightgreen' : 'grey' }}> {this.props.status['reblogs_count']}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="star" size={15} color={this.props.status['favourited'] ? 'gold' : 'grey'} />
                            <Text style={{ color: this.props.status['favourited'] ? 'gold' : 'grey' }}> {this.props.status['favourites_count']}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="ellipsis-h" size={15} color='grey' />
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        );
    }
}