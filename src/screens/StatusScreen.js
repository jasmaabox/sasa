
import React from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
            status: null,
            replies: [],
            isRefreshing: true,
        };
    }

    componentDidMount() {
        this.initStatus();
        this.initReplies();
    }

    /**
     * Init status
     */
    async initStatus(){
        const { navigation } = this.props;
        const M = navigation.getParam('M');

        const status = await M.getStatus(navigation.getParam('id'));
        this.setState({
            status: status,
        });
    }

    /**
     * Init replies list
     */
    async initReplies() {
        const { navigation } = this.props;
        const M = navigation.getParam('M');

        const result = await M.getContextTo(navigation.getParam('id'))
        this.setState({
            replies: result['descendants'],
            isRefreshing: false,
        });
    }

    /**
     * Go back screen on swipe right
     * @param {*} gestureState 
     */
    onSwipeRight(gestureState) {
        this.props.navigation.goBack(null)
    }


    renderStatus() {

        const { navigation } = this.props;
        const M = navigation.getParam('M');

        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <StatusDisplay M={M} status={this.state.status} isShowTopText={true} />
                    <Divider style={{ backgroundColor: 'lightgray', height: 5 }} />
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.replies}
                        refreshing={this.state.isRefreshing}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate({
                                    routeName: 'StatusScreen',
                                    params: { M: M, id: item['id'] },
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

    render(){
        if(this.state.status){
            return this.renderStatus();
        }
        else{
            return (<ActivityIndicator />);
        }
    }
}

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};