import styled from '@emotion/styled';
import Card from 'components/Card';
import Icon from 'components/Icon';
import Odometer from 'components/Odometer';
import AirQuality from 'containers/AirQuality';
import React from 'react';
import sensorsState from 'state/sensors';
import { letterSpacing } from 'style/helpers';
import { centerContent } from 'style/modifiers';
import { colors, fontNumber } from 'style/theme';

const PropertiesContainer = styled.div`
  ${centerContent};
  width: 100%;
  height: 240px;
  padding: 0 24px;
`;

const Property = styled.div`
  width: 300px;
  flex-grow: 2;
  height: 100%;
`;

const PropertyHeader = styled.header`
  height: 24px;
  width: 100%;
  ${centerContent};

  span {
    font-size: 16px;
    ${letterSpacing(0.08)};
    text-transform: uppercase;
    margin-left: 12px;
  }
`;

const Divider = styled.div`
  height: 186px;
  width: 1px;
  background: ${colors.divider};
`;

const Percentage = styled.span`
  font-size: 50px;
  font-weight: 300;
  margin-top: -60px;
`;

const DegreeSign = styled.span`
  font-size: 138px;
  font-weight: 200;

  &::after {
    content: 'C';
    font-size: 50px;
    margin-left: -37px;
  }
`;

const PropertyNumberWrapper = styled.div`
  ${centerContent};
  font-family: ${fontNumber};
  margin-top: 20px;

  width: 100%;
`;

const AirProperties = () => {
  // const temperature = useTestRandomUpdate(18, 2000, 10, 10, 40);
  // const relativeHumidity = useAlternateValues(10, 9, 3000);
  const [temperature] = sensorsState.useStore('temperatura');
  const [relativeHumidity] = sensorsState.useStore('umidade');

  return (
    <Card title="Propriedades do Ar" titleSize={32} icon="air">
      <PropertiesContainer>
        <Property>
          <PropertyHeader><Icon name="temp" /><span>Temperatura</span></PropertyHeader>
          <PropertyNumberWrapper>
            <Odometer value={temperature} fontSize={147} minDigits={2} />
            <DegreeSign>°</DegreeSign>
          </PropertyNumberWrapper>
        </Property>

        <Divider />

        <Property>
          <PropertyHeader><Icon name="speedometer" /><span>Qualidade</span></PropertyHeader>
          <AirQuality />
        </Property>

        <Divider />

        <Property>
          <PropertyHeader><Icon name="humidity" /><span>Umidade Relativa</span></PropertyHeader>
          <PropertyNumberWrapper>
            <Odometer value={relativeHumidity} fontSize={147} minDigits={2} /><Percentage>%</Percentage>
          </PropertyNumberWrapper>
        </Property>
      </PropertiesContainer>
    </Card>
  );
};

export default AirProperties;
