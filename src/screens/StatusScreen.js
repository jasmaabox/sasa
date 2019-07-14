
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import StatusDisplay from '../components/StatusDisplay.js'

/**
 * Screen to display single status
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

        const result = await M.getRepliesTo(status['id'])
        this.setState({
            replies: result,
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

                <StatusDisplay M={M} status={status} />

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
                            <StatusDisplay M={M} status={item} />
                        </TouchableOpacity>
                    )}
                />
            </GestureRecognizer>
        );
    }
}

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};