import React, { PureComponent } from 'react';
import FlashMessage from 'react-native-flash-message';
import {
  StatusBar,
  Platform,
} from 'react-native';

import AppStack from '../../routers';
import { ContainerWrapper } from '../../components';


export default class RootScreen extends PureComponent {
  state = {};

  render() {
    return (
      <ContainerWrapper>
        <StatusBar
          hidden={Platform.OS === 'android' && Platform.Version < 23}
        />

        <AppStack />

        <FlashMessage
          duration={3000}
        />
      </ContainerWrapper>
    );
  }
}
