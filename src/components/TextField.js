import styled from 'styled-components';
import { scale } from 'react-native-size-matters';


export const TextField = styled.TextInput`
  flex: 5;
  height: 100%;
  margin-left: 10;
  margin-right: 10;
  font-size: ${scale(15)};
`;

export const OneCharField = styled(TextField)`
  font-size: ${scale(40)};
  text-align: center;
  font-weight: 100;
`;

export const BigTextField = styled(TextField)`
  height: 90%;
  text-align-vertical: top;
`;
