
import { Linking } from 'react-native';
import CacheStore from 'react-native-cache-store';
const axios = require('axios');

/**
 * Mastodon API
 */
export class Mastodon {

    constructor(baseurl){
        this.baseurl = baseurl;
		this.client_id = null;
		this.client_secret = null;
        this.access_token = null;
    }

    /**
     * Initiate creds
     */
    async init(){

        // Get login info
        const login_info = await CacheStore.get("login_info");
        if(login_info != null){
            this.baseurl = login_info['baseurl'];
            this.access_token = login_info['access_token'];
        }

        // Retrieves client creds
        let client_id_dict = await CacheStore.get("client_id_dict");
        if(client_id_dict == null){
            CacheStore.set('client_id_dict', {});
        }
        else if(this.baseurl in client_id_dict){
            this.client_id = client_id_dict[this.baseurl];
        }

        let client_secret_dict = await CacheStore.get("client_secret_dict");
        if(client_secret_dict == null){
            CacheStore.set('client_secret_dict', {});
        }
        else if(this.baseurl in client_secret_dict){
            this.client_secret = client_secret_dict[this.baseurl];
        }
    }

    /**
     * Registers app with server
     */
    async register_app(){

        if(this.client_id != null && this.client_secret != null){
            return;
        }

        // Registers app if creds not cached
        let response = await axios.post(`https://${this.baseurl}/api/v1/apps`, {
            client_name: 'Tusk Mastodon Client',
            redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'read write follow',
        });
		this.client_id = response['data']['client_id'];
        this.client_secret = response['data']['client_secret'];
        
        // Cache client creds
        let client_id_dict = await CacheStore.get('client_id_dict');
        client_id_dict[this.baseurl] = this.client_id;
        CacheStore.set("client_id_dict", client_id_dict);

        let client_secret_dict = await CacheStore.get('client_secret_dict');
        client_secret_dict[this.baseurl] = this.client_secret;
        CacheStore.set("client_secret_dict", client_secret_dict);
    }
    
    /**
     * Prompt user to log in to get auth code
     */
    prompt_auth_code(){
        Linking.openURL(`https://${this.baseurl}/oauth/authorize?scope=read+write+follow&response_type=code&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_id=${this.client_id}`);
    }

    /**
     * Gets access token with credentials
     * @param {string} email 
     * @param {string} password 
     */
	async auth_account_creds(email, password){
		let response = await axios.post(`https://${this.baseurl}/oauth/token`, {
			client_id: this.client_id,
			client_secret: this.client_secret,
			grant_type: 'password',
            scope: "read write follow",
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
			username: email,
			password: password,
		});
        this.access_token = response['data']['access_token'];
        
        // Cache login info
        let login_info = {
            baseurl: this.baseurl,
            access_token: this.access_token,
        };
        CacheStore.set("login_info", login_info);
    }

    /**
     * Gets access token with auth code
     * @param {string} code 
     */
    async auth_account_code(code){
		let response = await axios.post(`https://${this.baseurl}/oauth/token`, {
			client_id: this.client_id,
			client_secret: this.client_secret,
			grant_type: 'authorization_code',
            scope: "read write follow",
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            code: code,
		});
        this.access_token = response['data']['access_token'];
        
        // Cache login info
        let login_info = {
            baseurl: this.baseurl,
            access_token: this.access_token,
        };
        CacheStore.set("login_info", login_info);
    }

    /**
     * Log user out
     */
    logout(){
        CacheStore.remove("login_info");
    }

    async getTimeline(timeline, options={}){
        let response = await axios.get(
            `https://${this.baseurl}/api/v1/timelines/${timeline}`,
            {
                headers: {'Authorization': `Bearer ${this.access_token}`},
                params: options,
            }
        );
        return response;
    }
}