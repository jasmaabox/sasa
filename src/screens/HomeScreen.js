
import React from 'react';

import { StyleSheet, FlatList, BackHandler, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

import { Mastodon } from '../networking/mastodon.js';
import { PostCard } from '../components/PostCard';

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

        this.getTimeline('home');
	}
	
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=>{return true});
    }

    async getTimeline(timeline){
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
        this.getTimeline('home');
    }

    render(){

        return (
            <FlatList
                style={styles.mainContainer}
                data={this.state.timeline}
                onRefresh={()=>this.onRefresh()}
                refreshing={this.state.isRefreshing}
                renderItem={({item})=>
                    <PostCard
                        name={item['account']['display_name']}
                        handle={item['account']['username']}
                        avatarURI={item['account']['avatar']}
                        text={item['content']}
                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});