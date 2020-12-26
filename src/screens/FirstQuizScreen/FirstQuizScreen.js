import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Platform,
  BackHandler,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { scale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';

import {
  ContainerWrapper,
  ContentWrapper,
  ScrollContentWrapper,
  AvoidingView,
  ErrorText,
} from '../../components';
import {
  ButtonWrapper,
} from './components';
import {
  Button,
  Header,
  AddButton,
  ExtraField,
} from '../../containers';
import {
  QuizField,
  BigField,
  ModalAgreements,
} from './containers';
import {
  SECOND_QUIZ_SCREEN,
  AUTHENTICATION_STACK,
  PROFILE_STACK,
  cities,
  countries,
  timezones,
  languages,
  emailRegex,
  colors,
} from '../../constants';

import { strings } from "../../../locale/i18n";

// type Props = {};

export default class FirstQuizScreen extends PureComponent/* <Props> */ {
  constructor(props) {
    super(props);

    const { quiz, userID } = this.props;

    this.state = {
      quiz: !quiz
        ? {
          activityStartDate: new Date(),
          sex: strings("firstQuiz.sex"),
          avatar: null,
          birthDay: new Date(),
        }
        : {
          firstName: quiz.firstName,
          lastName: quiz.lastName,
          patronymic: quiz.middleName,
          sex: quiz.gender,
          birthDay: quiz.birthDay,
          email: quiz.email,
          country: quiz.country,
          city: quiz.city,
          timezone: quiz.timezone,
          language: quiz.language,
          activityStartDate: quiz.activityStartDate,
          personalTherapyHours: quiz.personalTherapyHours.toString(),
          personalInfo: quiz.aboutMe,
          bankName: quiz.bankName,
          accountNumber: quiz.accountNumber.toString(),
          bankID: quiz.bankID.toString(),
          TIN: quiz.TIN.toString(),
        },
      userID,
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      errors: {},
      visible: false,
      disabled: false,
      editingMode: !!quiz,
    };
    this.keyboardHeight = new Animated.Value(0);
    this.androidEventDuration = 10;

    this.quizFields = [
      {
        type: 'text',
        name: 'lastName',
        placeholder: strings("firstQuiz.lastName"),
      },
      {
        type: 'text',
        name: 'firstName',
        placeholder: strings("firstQuiz.firstName"),
      },
      {
        type: 'text',
        name: 'patronymic',
        placeholder: strings("firstQuiz.middleName"),
      },
      {
        type: 'radio',
        name: 'sex',
        placeholder: strings("firstQuiz.gender"),
      },
      {
        type: 'datePicker',
        name: 'birthDay',
        placeholder: strings("firstQuiz.birthDay"),
      },
      {
        type: 'email',
        name: 'email',
        placeholder: strings("firstQuiz.email"),
      },
      {
        type: 'list',
        name: 'country',
        placeholder: strings("firstQuiz.country"),
        options: countries,
      },
      {
        type: 'empty',
        name: 'city',
        placeholder: strings("firstQuiz.city"),
      },
      {
        type: 'list',
        name: 'timezone',
        placeholder: strings("firstQuiz.timeZone"),
        options: timezones,
      },
      {
        type: 'list',
        name: 'language',
        placeholder: strings("firstQuiz.language"),
        options: languages,
      },
      {
        type: 'datePicker',
        name: 'activityStartDate',
        placeholder: strings("firstQuiz.activityStartDate"),
      },
      {
        type: 'number',
        name: 'personalTherapyHours',
        placeholder: strings("firstQuiz.personalTherapyHours"),
      },
    ];

    this.extraFields = [
      {
        name: 'bankName',
        placeholder: strings("firstQuiz.bankName"),
      },
      {
        name: 'accountNumber',
        placeholder: strings("firstQuiz.accountNumber"),
        keyboardType: 'number-pad',
        maxLength: 20,
      },
      {
        name: 'bankID',
        placeholder: strings("firstQuiz.bankID"),
        keyboardType: 'number-pad',
        maxLength: 9,
      },
      {
        name: 'TIN',
        placeholder: strings("firstQuiz.TIN"),
        keyboardType: 'number-pad',
        maxLength: 12,
      },
    ];
  }

  componentWillMount() {
    const keyboardWhat = Platform.OS === 'ios' ? 'keyboardWill' : 'keyboardDid';

    this.keyboardWillShowSub = Keyboard.addListener(
      keyboardWhat + 'Show',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      keyboardWhat + 'Hide',
      this.keyboardWillHide
    );
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { errors } = this.state;

    if (nextProps.fetching) {
      return;
    }

    if (nextProps.errors) {
      this.setState({
        errors: {
          ...errors,
          serverError: nextProps.errors,
        },
      }, () => showMessage({
        message: nextProps.errors,
        type: 'danger',
        backgroundColor: colors.errorColor,
      }));
    } else {
      this.setState({
        errors: {
          ...errors,
          serverError: null,
        },
      }, this.goToSecondQuiz);
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  onQuizFieldChange = (fieldName, newValue) => {
    const { quiz } = this.state;

    this.setState({
      quiz: {
        ...quiz,
        city: fieldName === 'country' ? '' : quiz.city,
        [fieldName]: newValue,
      },
    });
  };

  goToAgreements = async () => {
    const { quiz } = this.state;
    const {
      lastName,
      firstName,
      email,
      country,
      city,
      language,
      personalTherapyHours,
      bankName,
      accountNumber,
      bankID,
      TIN,
    } = quiz;

    const fields = [
      'lastName',
      'firstName',
      'email',
      'country',
      'city',
      'language',
      'personalTherapyHours',
      'bankName',
      'accountNumber',
      'bankID',
      'TIN',
    ];

    for (let i = 0; i < fields.length; i++) {
      if (!quiz[fields[i]]) {
        this.setState({ errors: { ...this.state.errors, [fields[i]]: strings("firstQuiz.required") } });
      } else if (this.state.errors[fields[i]]) {
        const { errors } = this.state;
        delete errors[fields[i]];
        this.setState(errors);
      }
    }

    if (email) {
      if (!emailRegex.test(email)) {
        await this.setState({ errors: { ...this.state.errors, email: strings("firstQuiz.wrongMail") } });
      } else {
        const { errors } = this.state;
        delete errors.email;
        await this.setState(errors);
      }
    }

    if (accountNumber) {
      if (accountNumber.length !== 20 || accountNumber[0] !== '4') {
        await this.setState({ errors: { ...this.state.errors, accountNumber: strings("registration.wrongNumber") } });
      } else {
        const { errors } = this.state;
        delete errors.accountNumber;
        await this.setState(errors);
      }
    }

    if (bankID) {
      if (bankID.length !== 9) {
        await this.setState({ errors: { ...this.state.errors, bankID: strings("firstQuiz.wrongBankID") } });
      } else {
        const { errors } = this.state;
        delete errors.bankID;
        await this.setState(errors);
      }
    }

    if (TIN) {
      if (TIN.length !== 12) {
        await this.setState({ errors: { ...this.state.errors, TIN: strings("firstQuiz.wrongTIN") } });
      } else {
        const { errors } = this.state;
        delete errors.TIN;
        await this.setState(errors);
      }
    }

    const { errors } = this.state;

    if (!Object.keys(errors).length) {
      this.setState({ visible: true });
    } else {
      showMessage({
        message: (() => {
          let errorMessage = '';
          if (errors) {
            if (
              errors.email === strings("firstQuiz.wrongMail")
              || errors.accountNumber === strings("registration.wrongNumber")
              || errors.bankID === strings("firstQuiz.wrongBankID")
              || errors.TIN === strings("firstQuiz.wrongTIN")
            ) {
              errorMessage += `${strings("firstQuiz.wrongData")}\n'`;
            }

            if (errors.serverError) {
              errorMessage += `${errors.serverError}`;
            } else {
              errorMessage += strings("firstQuiz.fillRequired");
            }
          }

          return errorMessage.trim();
        })(),
        type: 'danger',
        backgroundColor: colors.errorColor,
      });

      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  submitQuiz = async () => {
    const { submitQuiz } = this.props;
    const { quiz } = this.state;
    const { avatar } = quiz;

    const fullQuiz = new FormData();
    if (avatar) {
      fullQuiz.append('avatar', {
        uri: avatar,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });
    }
    fullQuiz.append('quiz', JSON.stringify(quiz));

    await submitQuiz(fullQuiz);
    this.setState({ visible: false, disabled: true });
  };

  goToSecondQuiz = () => {
    const { navigation } = this.props;
    const { editingMode } = this.state;
    if (editingMode) {
      navigation.navigate(AUTHENTICATION_STACK);
      navigation.navigate(PROFILE_STACK);
      navigation.closeDrawer();
    } else {
      navigation.navigate(SECOND_QUIZ_SCREEN);
    }
  };

  handleBackPress = () => true;

  keyboardWillShow = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: event.endCoordinates.height,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.keyboardHeight, {
      duration: Platform.OS === 'ios' ? event.duration : this.androidEventDuration,
      toValue: 0,
    }).start();
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _requestCameraRollPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraRollPermission: status === 'granted',
    });
  };

  pickPhoto = async () => {
    await this._requestCameraRollPermission();
    const { hasCameraRollPermission } = this.state;
    if (hasCameraRollPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        this.setState({ quiz: { ...this.state.quiz, avatar: result.uri } });
      }
    }
  };

  takePhoto = async () => {
    await this._requestCameraPermission();
    await this._requestCameraRollPermission();
    var { hasCameraPermission, hasCameraRollPermission } = this.state;
    if (hasCameraPermission && hasCameraRollPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [9, 16],
      });

      if (!result.cancelled) {
        this.setState({ quiz: { ...this.state.quiz, avatar: result.uri } });
      }
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {
      quiz, errors, disabled, userID,
    } = this.state;

    if (quiz.country) {
      this.quizFields[7].type = 'list';
      this.quizFields[7].options = cities[quiz.country];
    }

    /* if (quiz.city) {
      this.quizFields[8].type = 'list';
      this.quizFields[8].options = timezones[quiz.city];
    } */

    return (
      <ContainerWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <Header
              title={strings("firstQuiz.firstQuizTitle")}
            />

            <ScrollContentWrapper
              ref={(ref) => { this.scroll = ref; }}
              contentContainerStyle={{ alignItems: 'center' }}
            >
              <AddButton
                type="big"
                text={strings("firstQuiz.addPhoto")}
                icon="cameraIcon"
                onPress={this.showActionSheet}
                image={quiz.avatar}
                userID={userID}
              />
              <ActionSheet
                ref={(ref) => { this.ActionSheet = ref; }}
                title={strings("firstQuiz.addPhoto")}
                options={
                  [
                    strings("firstQuiz.makePhoto"),
                    strings("firstQuiz.choosePhoto"),
                    strings("firstQuiz.cancel"),
                  ]
                }
                cancelButtonIndex={2}
                onPress={(index) => {
                  switch (index) {
                  case 0:
                    return this.takePhoto();
                  case 1:
                    return this.pickPhoto();
                  default:
                    return;
                  }
                }}
              />

              <ErrorText>
                {strings("firstQuiz.required1")}
              </ErrorText>

              {
                this.quizFields.map(({
                  type,
                  name,
                  placeholder,
                  options,
                }, idx) => (
                  <QuizField
                    key={idx}
                    type={type}
                    options={options}
                    value={this.state.quiz[name]}
                    placeholder={placeholder}
                    onChange={newValue => this.onQuizFieldChange(name, newValue)}
                    error={errors[name]}
                  />
                ))
              }

              <BigField
                placeholder={strings("firstQuiz.about")}
                value={quiz.personalInfo}
                onChange={value => this.onQuizFieldChange('personalInfo', value)}
              />

              {
                this.extraFields.map(({
                  name,
                  placeholder,
                  keyboardType,
                  maxLength,
                }, idx) => (
                  <ExtraField
                    key={idx}
                    value={quiz[name]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onChange={newValue => this.onQuizFieldChange(name, newValue)}
                    error={errors[name]}
                  />
                ))
              }

              <ButtonWrapper>
                <Button
                  type="primary"
                  disabled={disabled}
                  text={strings("firstQuiz.next")}
                  onPress={this.goToAgreements}
                  style={{ width: scale(315) }}
                />
              </ButtonWrapper>

              <ModalAgreements
                visible={this.state.visible}
                onCancel={() => this.setState({ visible: false })}
                onButtonPress={this.submitQuiz}
              />

              <AvoidingView style={{ height: this.keyboardHeight }} />
            </ScrollContentWrapper>
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </ContainerWrapper>
    );
  }
}


FirstQuizScreen.defaultProps = {};

FirstQuizScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};
