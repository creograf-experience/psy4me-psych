import React, { Component } from 'react';
import {  StyleSheet, Animated, Keyboard, Platform, Dimensions, UIManager, findNodeHandle } from 'react-native';
import { ContainerWrapper, Spinner } from '../../components';
import { Header, SwitchButtons } from '../../containers';
import { colors, CLIENT_CONSULTATION_SCREEN, CLIENT_SCREEN } from '../../constants';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { strings } from "../../../locale/i18n";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      clientProfile:props.navigation.state.params.clientProfile,
      scrollViewRef: null,
      textInputRef: null,
      shouldScroll: true,
    };
  }
  padding = new Animated.Value(0);
  platform = { ios: 'Will', android: 'Did' };

  componentDidMount() {
    this.keyboardShow = Keyboard.addListener(
      `keyboard${this.platform[Platform.OS]}Show`,
      this.handleKeyboardShow
    );
    this.keyboardHide = Keyboard.addListener(
      `keyboard${this.platform[Platform.OS]}Hide`,
      this.handleKeyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardShow.remove();
    this.keyboardHide.remove();

    const {
      activeChat,
      clearMessages,
      clearSkips,
    } = this.props;

    if (!activeChat._id) return;

    clearSkips();
    clearMessages();
  }

  render() {
    const { activeChat }=this.props;
    const { clientProfile, shouldScroll }=this.state;
    return  (
      <ActionSheetProvider>
        <ContainerWrapper>
          <Header 
            title={strings("chat.chatTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          <SwitchButtons
            onPressProfileClient={()=>this.props.navigation.navigate(CLIENT_SCREEN)}
            onPressConsultation={()=>{this.props.navigation.navigate(CLIENT_CONSULTATION_SCREEN,{client:this.state.clientProfile})}}
          />
          <Animated.View style={styles.container(this.padding)}>
            <MessageList
              chat={activeChat}
              setScrollViewRef={this.setScrollViewRef}
              shouldScroll={shouldScroll}
              setShouldScroll={this.setShouldScroll}
            />
            <MessageInput 
              chat={activeChat}
              clientProfile={clientProfile}
              setShouldScroll={this.setShouldScroll}
              setTextInputRef={this.setTextInputRef}
            />
          </Animated.View>
          
        </ContainerWrapper>
      </ActionSheetProvider>
    );
  }


  handleKeyboardShow = event => {
    const { scrollViewRef, textInputRef } = this.state;
    const keyboardHeight = event.endCoordinates.height;
    const windowHeight = Dimensions.get('window').height;
    const currentlyFocusedField = findNodeHandle(textInputRef);

    UIManager.measure(currentlyFocusedField, (x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);

      if (!gap || gap >= 0) return;

      Animated.timing(
        this.padding,
        {
          toValue: gap * -1,
          duration: event.duration,
        }
      ).start(() => scrollViewRef.scrollToEnd({ animated: true }));
    });
  }

  handleKeyboardHide = event => {
    Animated.timing(
      this.padding,
      {
        toValue: 0,
        duration: event ? event.duration : 100,
      }
    ).start();
  }

  setScrollViewRef = ref => this.setState({ scrollViewRef: ref });
  setTextInputRef = ref => this.setState({ textInputRef: ref });
  setShouldScroll = bool => this.setState({ shouldScroll: bool });

}

const styles = StyleSheet.create({
  containerName: {
    marginTop:15,
    marginBottom:10, 
    paddingBottom:15,
    width:'90%',
    alignItems:'center'
  },
  container: padding => ({
    flex: 9,
    backgroundColor: colors.background,
    paddingBottom: padding,
  }),
})