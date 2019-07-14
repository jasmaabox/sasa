
import React from 'react';
import { View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import StatusDisplay from './StatusDisplay.js'

export default class StatusOverlayDisplay extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            replies: [],
            isRefreshing: true,
        };
    }

    componentDidMount(){
        this.initReplies();
    }

    async initReplies() {
        let result = await this.props.M.getRepliesTo(this.props.status['id'])
        this.setState({
            replies: result,
            isRefreshing: false,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusDisplay M={this.props.M} status={this.props.status} />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.replies}
                    refreshing={this.state.isRefreshing}
                    renderItem={({ item }) => (
                        <View>
                            <Divider style={{ backgroundColor: 'grey', marginTop: 20, marginBottom: 20 }} />
                            <StatusDisplay M={this.props.M} status={item} />
                        </View>
                    )}
                />
            </View>
        );
    }
}