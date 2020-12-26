import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  ConsultInfoScreenWrapper,
  HintTextWrapper,
  UntouchableAnswerWrapper as AnswerWrapper,
  ButtonWrapper,
} from '../components';
import {
  RadioButton,
} from '.';
import {
  Button,
} from '../../../containers';
import {
  HintText,
} from '../../../components';
import { colors } from '../../../constants';
import { strings } from "../../../../locale/i18n";


type Props = {};

export class ConsultInfoScreen extends PureComponent<Props> {
  state = {
    disabled: false,
    consultingObject: this.props.consultingObject,
  };

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { consultingObject } = this.state;

    onReturn(consultingObject);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { consultingObject } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (consultingObject) {
      onChange(consultingObject);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, consultingObject } = this.state;

    return (
      <ConsultInfoScreenWrapper>
        <HintTextWrapper>
          <HintText>
            {strings("secondQuiz.consulting")}
          </HintText>
        </HintTextWrapper>

        <AnswerWrapper>
          <RadioButton
            title={strings("secondQuiz.single")}
            picked={consultingObject === strings("secondQuiz.single")}
            onPress={() => this.setState({ consultingObject: strings("secondQuiz.single") })}
          />
          <RadioButton
            title={strings("secondQuiz.family")}
            picked={consultingObject === strings("secondQuiz.family")}
            onPress={() => this.setState({ consultingObject: strings("secondQuiz.family") })}
          />
          <RadioButton
            title={strings("secondQuiz.children")}
            picked={consultingObject === strings("secondQuiz.children")}
            onPress={() => this.setState({ consultingObject: strings("secondQuiz.children") })}
          />
        </AnswerWrapper>

        <ButtonWrapper>
          <Button
            disabled={disabled}
            text={strings("firstQuiz.next")}
            type="primary"
            onPress={this.onPress}
          />
        </ButtonWrapper>
      </ConsultInfoScreenWrapper>
    );
  }
}

ConsultInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
