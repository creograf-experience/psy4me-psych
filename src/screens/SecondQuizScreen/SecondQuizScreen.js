import React, { PureComponent } from 'react';
import {
  Animated, TouchableWithoutFeedback, Keyboard, BackHandler,
} from 'react-native';
import { createTransition, SlideLeft, SlideRight } from 'react-native-transition';
import uuid from 'react-native-uuid';
import { showMessage } from 'react-native-flash-message';

import { ContainerWrapper, ContentWrapper, Line } from '../../components';
import { Header } from '../../containers';
import { TransitionWrapper } from './components';
import {
  DotsContainer,
  StartScreen,
  TroubleScreen,
  ConsultInfoScreen,
  DepressionInfoScreen,
  SocialInfoScreen,
  EducationInfoScreen,
  AdditionalInfoScreen,
  FreeHelpInfoScreen,
  ScheduleScreen,
} from './containers';
import { colors, QUIZ_DONE_SCREEN } from '../../constants';
import { strings } from "../../../locale/i18n";

const Transition = createTransition(SlideLeft);

type Props = {};

export default class SecondQuizScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentScreenIndex: 0,
      errors: {},
      quiz: {
        pickedTroubles: [false, false, false, false, false, false, false, false, false, false],
        consultingObject: null,
        depression: null,
        socialNetworks: {
          vk: null,
          facebook: null,
          instagram: null,
        },
        educations: [
          {
            university: '',
            specialty: '',
            documents: [false, false],
            docIDs: [uuid.v4(), uuid.v4()],
          },
        ],
        freeHelp: null,
        schedule: [
          {
            weekDay: null,
            startTime: 0,
            endTime: 23,
          },
        ],
      },
    };

    this.keyboardHeight = new Animated.Value(0);

    this.screenList = [
      () => <StartScreen key={0} onChange={this.addToState} />,
      pickedTroubles => (
        <TroubleScreen
          key={1}
          onChange={value => this.addToState('pickedTroubles', value)}
          onReturn={value => this.onReturnBack('pickedTroubles', value)}
          pickedTroubles={pickedTroubles}
        />
      ),
      consultingObject => (
        <ConsultInfoScreen
          key={2}
          onChange={value => this.addToState('consultingObject', value)}
          onReturn={value => this.onReturnBack('consultingObject', value)}
          consultingObject={consultingObject}
        />
      ),
      depression => (
        <DepressionInfoScreen
          key={3}
          onChange={value => this.addToState('depression', value)}
          onReturn={value => this.onReturnBack('depression', value)}
          depression={depression}
        />
      ),
      socialNetworks => (
        <SocialInfoScreen
          key={4}
          onChange={value => this.addToState('socialNetworks', value)}
          onReturn={value => this.onReturnBack('socialNetworks', value)}
          socialNetworks={socialNetworks}
        />
      ),
      educations => (
        <EducationInfoScreen
          key={5}
          onChange={value => this.addToState('educations', value)}
          onAdd={value => this.onReturnBack('educations', value)}
          onReturn={value => this.onReturnBack('educations', value)}
          educations={educations}
        />
      ),
      infoObject => (
        <AdditionalInfoScreen
          key={6}
          onChange={value => this.addToState('infoObject', value)}
          onReturn={value => this.onReturnBack('infoObject', value)}
          infoObject={infoObject}
        />
      ),
      freeHelp => (
        <FreeHelpInfoScreen
          key={7}
          onChange={value => this.addToState('freeHelp', value)}
          onReturn={value => this.onReturnBack('freeHelp', value)}
          freeHelp={freeHelp}
        />
      ),
      schedule => (
        <ScheduleScreen
          key={8}
          onChange={value => this.onSubmitQuiz('schedule', value)}
          onAdd={value => this.onReturnBack('schedule', value)}
          onReturn={value => this.onReturnBack('schedule', value)}
          schedule={schedule}
        />
      ),
    ];

    this.nameList = [
      'start',
      'pickedTroubles',
      'consultingObject',
      'depression',
      'socialNetworks',
      'educations',
      'infoObject',
      'freeHelp',
      'schedule',
    ];
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
      this.setState(
        {
          errors: {
            ...errors,
            serverError: nextProps.errors,
          },
        },
        () => showMessage({
          message: nextProps.errors,
          type: 'danger',
          backgroundColor: colors.errorColor,
        })
      );
    } else {
      this.setState(
        {
          errors: {
            ...errors,
            serverError: null,
          },
        },
        this.goToQuizDoneScreen
      );
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => true;

  addToState = (fieldName, value) => {
    const { currentScreenIndex, quiz } = this.state;

    Transition.show(
      this.screenList[currentScreenIndex + 1](quiz[this.nameList[currentScreenIndex + 1]])
    );

    if (value !== null) {
      this.setState({
        quiz: {
          ...quiz,
          [fieldName]: value,
        },
      });
    }

    this.setState({
      currentScreenIndex: currentScreenIndex + 1,
    });
  };

  onReturnBack = (fieldName, value) => {
    const { quiz } = this.state;

    if (value) {
      this.setState({
        quiz: {
          ...quiz,
          [fieldName]: value,
        },
      });
    }
  };

  onSubmitQuiz = (fieldName, value) => {
    const { quiz } = this.state;
    const { pickedTroubles, educations, schedule } = quiz;

    if (value) {
      this.setState(
        {
          quiz: {
            ...quiz,
            [fieldName]: value,
            pickedTroubles: pickedTroubles.filter(elem => elem),
            educations: educations.splice(0, educations.length - 1).map((education) => {
              const { university, specialty, documents } = education;

              let newDocuments = documents;
              const documentsAmount = documents.length;

              if (!documents[documentsAmount - 1]) {
                newDocuments = documents.splice(0, documentsAmount - 1);
              }

              return { university, specialty, documents: newDocuments };
            }),
            schedule: schedule.filter(day => day.weekDay),
          },
        },
        async () => {
          const { quiz } = this.state;
          const { submitQuiz } = this.props;
          const { educations } = quiz;

          const fullQuiz = new FormData();

          educations.forEach(({ documents }, index) => {
            const docName = `docs${index}`;
            documents.forEach((document) => {
              fullQuiz.append(docName, {
                uri: document,
                type: 'image/jpeg',
                name: `${docName}.jpg`,
              });
            });
          });

          fullQuiz.append('quiz', JSON.stringify(quiz));

          await submitQuiz(fullQuiz);
        }
      );
    }
  };

  goToQuizDoneScreen = () => {
    const { navigation } = this.props;
    navigation.navigate(QUIZ_DONE_SCREEN);
  };

  render() {
    const { currentScreenIndex, quiz } = this.state;

    return (
      <ContainerWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ContentWrapper>
            <Header
              title={strings("secondQuiz.secondQuizTitle")}
              leftText={currentScreenIndex > 0 ? strings("consultation.back") : null}
              rightText={currentScreenIndex > 0 && currentScreenIndex !== 8 ? strings("firstQuiz.next") : null}
              onLeftPress={
                currentScreenIndex > 0
                  ? () => {
                    Transition.show(
                      this.screenList[currentScreenIndex - 1](
                        quiz[this.nameList[currentScreenIndex - 1]]
                      ),
                      SlideRight
                    );
                    this.setState({ currentScreenIndex: currentScreenIndex - 1 });
                  }
                  : () => {}
              }
              onRightPress={
                currentScreenIndex > 0
                  ? () => {
                    Transition.show(
                      this.screenList[currentScreenIndex + 1](
                        quiz[this.nameList[currentScreenIndex + 1]]
                      ),
                      SlideLeft
                    );
                    this.setState({ currentScreenIndex: currentScreenIndex + 1 });
                  }
                  : () => {}
              }
            />

            <TransitionWrapper>
              <Transition>{this.screenList[0]()}</Transition>
            </TransitionWrapper>

            <Line
              style={{
                width: '90%',
                alignSelf: 'center',
              }}
            />

            <DotsContainer selectedDotIndex={currentScreenIndex} />
          </ContentWrapper>
        </TouchableWithoutFeedback>
      </ContainerWrapper>
    );
  }
}

SecondQuizScreen.defaultProps = {
  submitQuiz: () => {},
};

SecondQuizScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};
