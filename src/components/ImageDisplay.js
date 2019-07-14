
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

/**
 * Image display
 */
export default class ImageDisplay extends React.PureComponent {

    renderImages(){
        let images = [];
        for(let img of this.props.media){
            images.push(
                <FastImage
                    source={{
                        uri: img['preview_url'],
                        priority: FastImage.priority.normal,
                    }}
                    style={{ width: 300, height: 300 }}
                    resizeMode={FastImage.resizeMode.contain}
                    PlaceholderContent={<ActivityIndicator />}
                />
            );
        }
        return images;
    }

    render(){
        return (
            <View style={{ alignItems: 'center',  margin: 20 }}>
                {this.renderImages()}
            </View>
        );
    }
}