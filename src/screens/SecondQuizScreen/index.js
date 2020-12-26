import { connect } from 'react-redux';
import SecondQuizScreenComponent from './SecondQuizScreen';
import QuizDoneScreenComponent from './QuizDoneScreen';
import { submitQuiz } from './actions';


const mapStateToProps = state => ({
  fetching: state.firstQuiz.fetching,
  status: state.firstQuiz.status,
  errors: state.firstQuiz.errors,
});

const mapDispatchToProps = dispatch => ({
  submitQuiz: (quiz) => {
    dispatch(submitQuiz(quiz));
  },
});

export const SecondQuizScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondQuizScreenComponent);

export const QuizDoneScreen = QuizDoneScreenComponent;
