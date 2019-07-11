
import React from 'react';

import { StyleSheet, FlatList, BackHandler, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

import { Mastodon } from '../networking/mastodon.js';
import { StatusCard } from '../components/StatusCard.js';

/**
 * Home screen timeline
 */
export class HomeScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            timeline: [],
            isRefreshing: true,
        };
    }

    componentDidMount() {
        // Disable back button
        BackHandler.addEventListener('hardwareBackPress', ()=>{return true});

        this.initTimeline('home');
	}
	
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=>{return true});
    }

    async initTimeline(timeline){
        const {navigation} = this.props;
        let M = navigation.getParam('M');
        
        let result = await M.getTimeline(timeline);
        this.setState({
            timeline: result['data'],
            isRefreshing: false,
        });
    }

    onRefresh(){
        this.setState({
            isRefreshing: true,
        });
        this.initTimeline('home');
    }

    render(){

        const {navigation} = this.props;
        let M = navigation.getParam('M');

        return (
            <FlatList
                style={styles.mainContainer}
                data={this.state.timeline}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefreshing}
                renderItem={({item}) => <StatusCard M={M} status={item} />}
                onEndReachedThreshold={0.1}
                onEndReached={() => {

                    // Extend timeline at end
                    // FIX ME BUGGY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    const {navigation} = this.props;
                    let M = navigation.getParam('M');

                    let maxId = this.state.timeline[this.state.timeline.length-1]['id'];

                    M.getTimeline('home', {max_id: maxId})
                        .then((res)=>{
                            const newTimeline = this.state.timeline.concat(res['data']);
                            this.setState({
                                timeline: newTimeline,
                            });
                        });
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});