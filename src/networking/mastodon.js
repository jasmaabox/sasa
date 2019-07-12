
import { Linking } from 'react-native';
import CacheStore from 'react-native-cache-store';

const axios = require('axios');
const url = require('url');

/**
 * Mastodon API
 */
export default class Mastodon {

    constructor(baseurl){
        this.baseurl = baseurl;
		this.clientId = null;
		this.clientSecret = null;
        this.accessToken = null;
    }

    /**
     * Initiate creds
     */
    async init(){

        // Get login info
        const loginInfo = await CacheStore.get("loginInfo");
        if(loginInfo != null){
            this.baseurl = loginInfo['baseurl'];
            this.accessToken = loginInfo['accessToken'];
        }

        // Retrieves client creds
        let clientIdDict = await CacheStore.get("clientIdDict");
        if(clientIdDict == null){
            CacheStore.set('clientIdDict', {});
        }
        else if(this.baseurl in clientIdDict){
            this.clientId = clientIdDict[this.baseurl];
        }

        let clientSecretDict = await CacheStore.get("clientSecretDict");
        if(clientSecretDict == null){
            CacheStore.set('clientSecretDict', {});
        }
        else if(this.baseurl in clientSecretDict){
            this.clientSecret = clientSecretDict[this.baseurl];
        }
    }

    /**
     * Registers app with server
     */
    async registerApp(){

        if(this.clientId != null && this.clientSecret != null){
            return;
        }

        // Registers app if creds not cached
        let response = await axios.post(`https://${this.baseurl}/api/v1/apps`, {
            client_name: 'Sasa Mastodon Client',
            redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'read write follow',
        });
		this.clientId = response['data']['client_id'];
        this.clientSecret = response['data']['client_secret'];
        
        // Cache client creds
        let clientIdDict = await CacheStore.get('clientIdDict');
        clientIdDict[this.baseurl] = this.clientId;
        CacheStore.set("clientIdDict", clientIdDict);

        let clientSecretDict = await CacheStore.get('clientSecretDict');
        clientSecretDict[this.baseurl] = this.clientSecret;
        CacheStore.set("clientSecretDict", clientSecretDict);
    }
    
    /**
     * Prompt user to log in to get auth code
     */
    promptAuthCode(){
        Linking.openURL(`https://${this.baseurl}/oauth/authorize?scope=read+write+follow&response_type=code&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_id=${this.clientId}`);
    }

    /**
     * Gets access token with credentials
     * @param {string} email 
     * @param {string} password 
     */
	async authAccountCreds(email, password){
		let response = await axios.post(`https://${this.baseurl}/oauth/token`, {
			client_id: this.clientId,
			client_secret: this.clientSecret,
			grant_type: 'password',
            scope: "read write follow",
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
			username: email,
			password: password,
		});
        this.accessToken = response['data']['access_token'];
        
        // Cache login info
        let loginInfo = {
            baseurl: this.baseurl,
            accessToken: this.accessToken,
        };
        CacheStore.set("loginInfo", loginInfo);
    }

    /**
     * Gets access token with auth code
     * @param {string} code 
     */
    async authAccountCode(code){
		let response = await axios.post(`https://${this.baseurl}/oauth/token`, {
			client_id: this.clientId,
			client_secret: this.clientSecret,
			grant_type: 'authorization_code',
            scope: "read write follow",
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            code: code,
		});
        this.accessToken = response['data']['access_token'];
        
        // Cache login info
        let loginInfo = {
            baseurl: this.baseurl,
            accessToken: this.accessToken,
        };
        CacheStore.set("loginInfo", loginInfo);
    }

    /**
     * Log user out
     */
    logout(){
        CacheStore.remove("loginInfo");
    }


    async getTimeline(timeline, options={}){
        let response = await axios.get(
            `https://${this.baseurl}/api/v1/timelines/${timeline}`,
            {
                headers: {'Authorization': `Bearer ${this.accessToken}`},
                params: options,
            }
        );
        return response;
    }

    async openURL(href){

        // Parse url
        const parsed = url.parse(href);

        if(parsed.host == this.baseurl){
            console.log("Go to: " + parsed.pathname);
        }
        else{
            // Open outside url
            Linking.openURL(href);
        }
    }
}