import React, { PureComponent } from 'react';
import { showMessage } from 'react-native-flash-message';

import {
  FreeHelpInfoScreenWrapper,
  AdditionalHintTextWrapper,
  UntouchableAnswerWrapper as AnswerWrapper,
  ButtonWrapper,
} from '../components';
import { RadioButton } from '.';
import { Button } from '../../../containers';
import { HintText } from '../../../components';
import { colors } from '../../../constants';
import { strings } from "../../../../locale/i18n";

type Props = {};

export class FreeHelpInfoScreen extends PureComponent<Props> {
  state = {
    disabled: false,
    freeHelp: this.props.freeHelp,
  };

  componentWillUnmount() {
    const { onReturn } = this.props;
    const { freeHelp } = this.state;

    onReturn(freeHelp);
  }

  onPress = () => {
    const { onChange } = this.props;
    const { freeHelp } = this.state;
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 1000);

    if (freeHelp !== null) {
      onChange(freeHelp);
    } else {
      showMessage({
        message: strings("secondQuiz.chooseOne"),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });
    }
  };

  render() {
    const { disabled, freeHelp } = this.state;

    return (
      <FreeHelpInfoScreenWrapper>
        <AdditionalHintTextWrapper>
          <HintText>
            {strings("secondQuiz.freeHelp1")}
            {'\n'}
            {strings("secondQuiz.freeHelp2")}
            {'\n'}
            {strings("secondQuiz.freeHelp3")}
          </HintText>
        </AdditionalHintTextWrapper>

        <AnswerWrapper>
          <RadioButton
            title={strings("secondQuiz.yes")}
            picked={freeHelp}
            onPress={() => this.setState({ freeHelp: true })}
          />
          <RadioButton
            title={strings("secondQuiz.no")}
            picked={freeHelp === false}
            onPress={() => this.setState({ freeHelp: false })}
          />
        </AnswerWrapper>

        <ButtonWrapper>
          <Button disabled={disabled} text={strings("firstQuiz.next")} type="primary" onPress={this.onPress} />
        </ButtonWrapper>
      </FreeHelpInfoScreenWrapper>
    );
  }
}

FreeHelpInfoScreen.defaultProps = {
  onChange: () => {},
  onReturn: () => {},
};
