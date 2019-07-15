
import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Card, Text, Overlay, Button } from 'react-native-elements';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageView from 'react-native-image-view';

import { getTimePassedStr } from '../utils/utils.js';
import ImageDisplay from './ImageDisplay.js';

/**
 * Display card for individual status
 */
export default class StatusDisplay extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: false,
        };
    }

    renderTopText() {
        if (this.props.isShowTopText && this.props.status['reblog']) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }}>
                    <Icon name="reply" size={15} color='grey' />
                    <Text style={{ color: 'grey' }}>{` ${this.props.status['account']['display_name']} boosted`}</Text>
                </View>
            );
        }
        else if (this.props.isShowTopText && this.props.status['in_reply_to_account_id']) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }}>
                    <Icon name="reply" size={15} color='grey' />
                    <Text style={{ color: 'grey' }}>{` ${this.props.status['account']['display_name']} replied to ${this.props.status['in_reply_to_account_id']}`}</Text>
                </View>
            );
        }
        else {
            return (
                <View></View>
            );
        }
    }

    renderImageDisplay(status) {

        // FIX ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Generate data
        let imgs = [];
        for (item of status['media_attachments']) {
            imgs.push({
                source: { uri: item['preview_url'] },
                width: 300,
                height: 300,
            });
        }

        return (
            <ImageView
                images={imgs}
                imageIndex={0}
                isVisible={this.state.isOverlayVisible}
            />
        );
    }

    render() {

        const displayStatus = this.props.status['reblog'] ? this.props.status['reblog'] : this.props.status;

        return (
            <Card containerStyle={{ margin: 0, backgroundColor: this.props.color }}>

                {this.renderTopText()}

                <View style={{ flexDirection: 'row' }}>
                    <Avatar
                        size="medium"
                        rounded
                        source={{
                            uri: displayStatus['account']['avatar']
                        }}
                    />

                    <View style={{ marginLeft: 20, flex: 1 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={{ flex: 1 }}>
                                <Text>{displayStatus['account']['display_name'] ? displayStatus['account']['display_name'] + ' ' : ''}</Text>
                                <Text style={{ color: 'grey' }}>@{displayStatus['account']['username']}</Text>
                            </Text>
                            <Text style={{ color: 'grey' }}> {getTimePassedStr(new Date(this.props.status['created_at']))}</Text>
                        </View>

                        <HTML
                            html={`<div>${displayStatus['content']}</div>`}
                            imagesMaxWidth={Dimensions.get('window').width}
                            onLinkPress={(event, href) => {
                                this.props.M.openURL(href);
                            }}
                        />

                        {this.renderImageDisplay(displayStatus)}
                        <Button
                            title="Press me"
                            onPress={() => this.setState({ isOverlayVisible: true })}
                        />
                        

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
            </Card>
        );
    }
}