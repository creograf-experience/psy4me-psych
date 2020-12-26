import styled from 'styled-components';


export const StartScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

export const ConsultInfoScreenWrapper = styled(StartScreenWrapper)`
  justify-content: null;
  align-items: null;
`;

export const DepressionInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const AdditionalInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const SocialInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;

export const FreeHelpInfoScreenWrapper = styled(ConsultInfoScreenWrapper)``;
