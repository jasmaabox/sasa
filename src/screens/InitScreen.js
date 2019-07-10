
import React from 'react';
import { View } from 'react-native';
import CacheStore from 'react-native-cache-store';

import { Mastodon } from '../networking/mastodon.js';

/**
 * Dummy screen to redirect to login
 */
export class InitScreen extends React.Component {

    /**
     * Check if logged in
     */
    async init(){
        let login_info = await CacheStore.get("login_info");

        if(login_info != null){
            let M = new Mastodon(login_info['baseurl']);
            await M.init();
            await M.register_app();
            M.access_token = login_info['access_token'];

            this.props.navigation.navigate('Home', {M: M});
        }
        else{
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount(){
        this.init();
    }

    render(){
        return (
            <View></View>
        );
    }
}