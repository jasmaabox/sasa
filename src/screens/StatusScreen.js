
import React from 'react';
import { View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import StatusDisplay from '../components/StatusDisplay.js'

/**
 * Screen to display status and responses
 */
export default class StatusScreen extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            replies: [],
            isRefreshing: true,
        };
    }

    componentDidMount() {
        this.initReplies();
    }

    async initReplies() {
        const { navigation } = this.props;
        const M = navigation.getParam('M');
        const status = navigation.getParam('status');

        const result = await M.getContextTo(status['id'])
        this.setState({
            replies: result['descendants'],
            isRefreshing: false,
        });
    }

    onSwipeRight(gestureState) {
        this.props.navigation.goBack(null)
    }


    render() {

        const { navigation } = this.props;
        const M = navigation.getParam('M');
        const status = navigation.getParam('status');

        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <StatusDisplay M={M} status={status} isShowTopText={true} />
                    <Divider style={{ backgroundColor: 'lightgray', height: 5 }} />
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.replies}
                        refreshing={this.state.isRefreshing}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: 'StatusScreen',
                                    params: { M: M, status: item },
                                    key: item['id'],
                                });
                            }}>
                                <StatusDisplay M={M} status={item} color='gainsboro' />
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </GestureRecognizer>
        );
    }
}

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};