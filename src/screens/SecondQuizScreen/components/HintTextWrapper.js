import styled from 'styled-components';

export const HintTextWrapper = styled.View`
  flex: 1;
  width: 90%;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 20;
  margin-bottom: 20;
`;

export const ButtonWrapper = styled(HintTextWrapper)`
  flex: 3;
  width: null;
`;

export const BottomButtonWrapper = styled(ButtonWrapper)`
  justify-content: flex-end;
`;

export const AdditionalHintTextWrapper = styled(HintTextWrapper)`
  flex: 3;
  margin-top: 5;
  margin-bottom: 10;
`;
