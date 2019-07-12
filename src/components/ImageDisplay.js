
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

/**
 * Status image display
 */
export default class ImageDisplay extends React.PureComponent {

    renderImages(){
        let images = [];
        for(let img of this.props.media){
            images.push(
                <Image
                    source={{ uri: img['preview_url'] }}
                    style={{ width: 200, height: 200, margin: 2 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            );
        }
        return images;
    }

    render(){
        return this.renderImages();
    }
}