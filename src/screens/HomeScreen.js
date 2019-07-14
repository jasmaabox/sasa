
import React from 'react';
import { FlatList, BackHandler, TouchableOpacity, Text, View } from 'react-native';
import { Card, Overlay } from 'react-native-elements';

import StatusDisplay from '../components/StatusDisplay.js';

/**
 * Home screen timeline
 */
export default class HomeScreen extends React.Component {
    
    constructor(props){
        super(props);

        this.props.removeClippedSubviews = true;

        this.state = {
            timelineName: 'home',
            timeline: [],
            isRefreshing: true,
        };
    }

    componentDidMount() {
        // Disable back button
        BackHandler.addEventListener('hardwareBackPress', ()=>{return true});

        this.initTimeline(this.state.timelineName);
	}
	
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', ()=>{return true});
    }

    /**
     * Init timline
     * @param {string} timeline 
     */
    async initTimeline(timeline){
        const {navigation} = this.props;
        const M = navigation.getParam('M');
        
        const result = await M.getTimeline(timeline);
        this.setState({
            timeline: result['data'],
            isRefreshing: false,
        });
    }

    /**
     * Re-inits timeline on refresh
     */
    onRefresh(){
        this.setState({
            isRefreshing: true,
        });
        this.initTimeline(this.state.timelineName);
    }

    /**
     * Updates timeline with more statuses
     */
    fetchMore(){

        if(this.state.isRefreshing){
            return null;
        }

        this.setState(
            (prevState) => {
                return { isRefreshing: true };
            },
            () => {
                const {navigation} = this.props;
                let M = navigation.getParam('M');
                let maxId = this.state.timeline[this.state.timeline.length-1]['id'];

                M.getTimeline(this.state.timelineName, {max_id: maxId})
                    .then((res)=>{
                        const newTimeline = this.state.timeline.concat(res['data']);
                        this.setState({
                            timeline: newTimeline,
                            isRefreshing: false,
                        });
                    });
            }
        );
    }

    render(){

        const {navigation} = this.props;
        const M = navigation.getParam('M');

        return (

            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.timeline}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate({
                                routeName: 'StatusScreen',
                                params: {M: M, status: item},
                                key: item['id'],
                            });
                        }}>
                            <StatusDisplay M={M} status={item} isShowTopText={true} />
                        </TouchableOpacity>
                    )}
                    onEndReachedThreshold={0.1}
                    onEndReached={()=>this.fetchMore()}
                />
            </View>
        );
    }
}