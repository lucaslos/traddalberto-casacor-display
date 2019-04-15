import React from 'react';
import styled from '@emotion/styled';
import {
  fillContainer,
  centerContent,
  centerContentCollum,
} from 'style/modifiers';
import { colors, fontPrimary, easeOut } from 'style/theme';
import Odometer from 'components/Odometer';
import { useTestRandomUpdate } from 'utils/hooks/testValues';
import sensorsState from 'state/sensors';
import { getQualityLevel, scaleLevels } from '../utils/getQualityLevel';

const Container = styled.div`
  ${fillContainer};
  ${centerContentCollum};
  padding-top: 36px;

  path {
    transition: 1.5s ${easeOut};
  }
`;

const scaleLevelsHeight = 70;

const ScaleLevels = styled.div`
  text-align: center;
  height: ${scaleLevelsHeight}px;
  margin-top: 56px;

  div {
    text-transform: uppercase;
    line-height: ${scaleLevelsHeight}px;

    transition: transform 0.6s ${easeOut}, opacity 0.3s;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 120px;
  background: ${colors.divider};
`;

const IQAWrapper = styled.div`
  margin-top: 8px;
  height: 30px;
  font-size: 24px;
  font-weight: 300;

  .odometer {
    font-weight: 400;
  }
`;

const strokeLenght = 470.7071533203125;

const AirQuality = () => {
  // const IQA = useTestRandomUpdate(200, 2000, 20, 0, 200);
  const [IQA] = sensorsState.useStore('iaq');
  const qualityLevel = getQualityLevel(IQA);
  const arcFill = 1 - (IQA / 200);

  return (
    <Container>
      <svg
        css={{ position: 'absolute' }}
        width="250"
        height="204"
        viewBox="0 0 250 204"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="arc-gradient"
            patternUnits="userSpaceOnUse"
            width="250"
            height="250"
          >
            <image
              href="static/images/arc-gradient.png"
              x="0"
              y="0"
              width="250"
              height="250"
            />
          </pattern>
        </defs>
        {/* <filter id="line-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter> */}
        <mask id="art-mask">
          <path
            d="M210.507 187C223.696 169.269 231.5 147.296 231.5 123.5C231.5 64.6817 183.818 17 125 17C66.1816 17 18.5 64.6817 18.5 123.5C18.5 147.296 26.3044 169.269 39.4932 187"
            stroke="#fff"
            strokeWidth="20"
            strokeMiterlimit="16"
            strokeDasharray={strokeLenght}
            strokeDashoffset={-strokeLenght * (1 - arcFill * 0.9 - 0.1)}
            strokeLinecap="square"
            // filter="url(#line-blur)"
          />
        </mask>
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M124.995 18.25C124.305 18.25 123.745 17.6904 123.745 17.0001C123.745 16.3097 124.304 15.75 124.995 15.75H125.005C125.696 15.75 126.255 16.3097 126.255 17.0001C126.255 17.6904 125.695 18.25 125.005 18.25H124.995ZM151.362 20.2802C151.54 19.6132 152.225 19.217 152.892 19.3953L152.902 19.398C153.569 19.5763 153.965 20.2615 153.787 20.9284C153.609 21.5954 152.923 21.9915 152.256 21.8132L152.247 21.8105C151.58 21.6323 151.183 20.9471 151.362 20.2802ZM98.6384 20.2802C98.8166 20.9471 98.4204 21.6323 97.7535 21.8105L97.7436 21.8132C97.0767 21.9915 96.3915 21.5954 96.2132 20.9284C96.0349 20.2615 96.431 19.5763 97.0979 19.398L97.108 19.3953C97.775 19.217 98.4601 19.6132 98.6384 20.2802ZM177.172 30.6242C177.518 30.0266 178.282 29.8225 178.88 30.1682L178.889 30.1734C179.487 30.5192 179.691 31.2838 179.345 31.8814C178.999 32.4789 178.234 32.683 177.637 32.3372L177.628 32.3321C177.031 31.9864 176.826 31.2218 177.172 30.6242ZM72.8279 30.6242C73.1736 31.2218 72.9695 31.9864 72.3719 32.3321L72.3631 32.3372C71.7656 32.683 71.0009 32.4789 70.6551 31.8814C70.3093 31.2839 70.5134 30.5192 71.111 30.1734L71.12 30.1682C71.7176 29.8225 72.4822 30.0266 72.8279 30.6242ZM199.419 47.3056C199.907 46.8175 200.699 46.8174 201.187 47.3056L201.194 47.3129C201.683 47.8011 201.683 48.5926 201.194 49.0807C200.706 49.5688 199.915 49.5688 199.427 49.0806L199.419 49.0734C198.931 48.5853 198.931 47.7938 199.419 47.3056ZM50.5807 47.3057C51.0688 47.7938 51.0688 48.5853 50.5806 49.0734L50.5734 49.0806C50.0853 49.5688 49.2938 49.5688 48.8056 49.0807C48.3175 48.5926 48.3174 47.8011 48.8055 47.313L48.8129 47.3056C49.3011 46.8174 50.0926 46.8175 50.5807 47.3057ZM216.619 69.1551C217.216 68.8094 217.981 69.0134 218.327 69.611L218.332 69.62C218.678 70.2176 218.473 70.9822 217.876 71.3279C217.278 71.6737 216.514 71.4695 216.168 70.8719L216.163 70.8631C215.817 70.2656 216.021 69.5009 216.619 69.1551ZM33.3814 69.1551C33.9789 69.5009 34.183 70.2656 33.8372 70.8631L33.8321 70.8719C33.4864 71.4695 32.7217 71.6737 32.1242 71.328C31.5266 70.9823 31.3225 70.2176 31.6682 69.62L31.6734 69.611C32.0192 69.0135 32.7838 68.8094 33.3814 69.1551ZM227.572 94.7132C228.239 94.5349 228.924 94.931 229.102 95.5979L229.105 95.608C229.283 96.275 228.887 96.9601 228.22 97.1384C227.553 97.3166 226.868 96.9204 226.69 96.2535L226.687 96.2436C226.509 95.5767 226.905 94.8915 227.572 94.7132ZM22.4284 94.7132C23.0954 94.8915 23.4915 95.5767 23.3132 96.2436L23.3105 96.2535C23.1323 96.9204 22.4471 97.3166 21.7802 97.1384C21.1132 96.9601 20.717 96.275 20.8953 95.608L20.898 95.5979C21.0763 94.931 21.7615 94.5349 22.4284 94.7132ZM231.5 122.245C232.19 122.245 232.75 122.804 232.75 123.495V123.504C232.75 124.195 232.19 124.754 231.5 124.754C230.81 124.754 230.25 124.195 230.25 123.504V123.495C230.25 122.805 230.81 122.245 231.5 122.245ZM18.5001 122.245C19.1904 122.245 19.75 122.805 19.75 123.495V123.504C19.75 124.195 19.1904 124.754 18.5 124.754C17.8097 124.754 17.25 124.195 17.25 123.504V123.495C17.25 122.804 17.8097 122.245 18.5001 122.245ZM229.38 144.786C230.055 144.932 230.484 145.596 230.339 146.271L230.337 146.28C230.192 146.955 229.527 147.384 228.852 147.239C228.177 147.093 227.748 146.428 227.893 145.754L227.895 145.745C228.04 145.071 228.705 144.641 229.38 144.786ZM20.6201 144.786C21.295 144.641 21.9598 145.071 22.105 145.745L22.1068 145.754C22.2521 146.428 21.8227 147.093 21.1478 147.239C20.4729 147.384 19.808 146.955 19.6628 146.28L19.661 146.271C19.5158 145.596 19.9452 144.932 20.6201 144.786ZM27.469 166.363C28.0976 166.077 28.8386 166.356 29.1241 166.984L29.1275 166.992C29.4131 167.62 29.1351 168.361 28.5066 168.647C27.8781 168.932 27.137 168.654 26.8515 168.026L26.8479 168.018C26.5624 167.39 26.8405 166.649 27.469 166.363ZM222.531 166.363C223.16 166.649 223.438 167.39 223.152 168.018L223.149 168.026C222.863 168.654 222.122 168.932 221.493 168.647C220.865 168.361 220.587 167.62 220.873 166.992L220.876 166.984C221.161 166.356 221.902 166.077 222.531 166.363ZM38.7447 185.994C39.2986 185.582 40.0817 185.697 40.4937 186.251L40.4962 186.254C40.9082 186.808 40.7932 187.591 40.2393 188.003C39.6853 188.415 38.9023 188.3 38.4903 187.746L38.4877 187.743C38.0757 187.189 38.1908 186.406 38.7447 185.994ZM211.255 185.994C211.809 186.406 211.924 187.189 211.512 187.743L211.51 187.746C211.098 188.3 210.315 188.415 209.761 188.003C209.207 187.591 209.092 186.808 209.504 186.254L209.506 186.251C209.918 185.697 210.701 185.582 211.255 185.994Z"
          fill="#000"
          stroke="#000"
          strokeWidth="0.2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M125.005 19.5C126.386 19.5001 127.505 18.3808 127.505 17.0001C127.505 15.6194 126.386 14.5001 125.005 14.5H124.995C123.614 14.5001 122.495 15.6194 122.495 17.0001C122.495 18.3808 123.614 19.5001 124.995 19.5H125.005ZM99.846 19.9574C99.4895 18.6235 98.1191 17.8312 96.7852 18.1877L96.775 18.1904C95.4412 18.547 94.6489 19.9174 95.0056 21.2513C95.3622 22.5852 96.7326 23.3774 98.0665 23.0207L98.0762 23.0181C99.4101 22.6617 100.202 21.2913 99.846 19.9574ZM150.154 19.9574C149.798 21.2913 150.59 22.6617 151.924 23.0181L151.934 23.0208C153.267 23.3774 154.638 22.5852 154.994 21.2513C155.351 19.9174 154.559 18.547 153.225 18.1904L153.215 18.1877C151.881 17.8312 150.511 18.6235 150.154 19.9574ZM73.9099 29.9982C73.2185 28.8031 71.6891 28.3948 70.494 29.0862L70.4849 29.0915C69.2898 29.783 68.8816 31.3124 69.5732 32.5074C70.2647 33.7025 71.7941 34.1107 72.9891 33.4191L72.9978 33.4141C74.193 32.7227 74.6013 31.1934 73.9099 29.9982ZM176.09 29.9982C175.399 31.1934 175.807 32.7227 177.002 33.4141L177.011 33.4192C178.206 34.1107 179.735 33.7025 180.427 32.5074C181.118 31.3124 180.71 29.783 179.515 29.0915L179.506 29.0862C178.311 28.3948 176.781 28.8031 176.09 29.9982ZM51.4646 46.4218C50.4883 45.4454 48.9054 45.4454 47.9291 46.4216L47.9216 46.4291C46.9453 47.4055 46.9454 48.9884 47.9218 49.9646C48.8981 50.9409 50.481 50.9408 51.4573 49.9645L51.4644 49.9573C52.4408 48.9811 52.4409 47.3982 51.4646 46.4218ZM198.535 46.4218C197.559 47.3982 197.559 48.9811 198.536 49.9573L198.543 49.9645C199.519 50.9408 201.102 50.9409 202.078 49.9646C203.055 48.9884 203.055 47.4055 202.078 46.4291L202.071 46.4216C201.095 45.4454 199.512 45.4455 198.535 46.4218ZM34.0074 68.0732C32.8123 67.3817 31.283 67.7899 30.5914 68.9849L30.5862 68.9941C29.8947 70.1892 30.3031 71.7185 31.4982 72.4099C32.6933 73.1013 34.2227 72.693 34.9141 71.4979L34.9191 71.4892C35.6106 70.2941 35.2025 68.7647 34.0074 68.0732ZM215.993 68.0732C214.798 68.7647 214.389 70.2941 215.081 71.4892L215.086 71.4979C215.777 72.693 217.307 73.1013 218.502 72.4099C219.697 71.7185 220.105 70.1892 219.414 68.9941L219.409 68.9849C218.717 67.7899 217.188 67.3817 215.993 68.0732ZM22.7513 93.5056C21.4174 93.149 20.047 93.9412 19.6904 95.275L19.6876 95.2853C19.3311 96.6192 20.1235 97.9895 21.4574 98.346C22.7913 98.7025 24.1616 97.9101 24.5181 96.5762L24.5207 96.5665C24.8773 95.2326 24.0851 93.8622 22.7513 93.5056ZM227.249 93.5056C225.915 93.8622 225.123 95.2326 225.479 96.5665L225.482 96.5762C225.838 97.9101 227.209 98.7025 228.543 98.346C229.876 97.9895 230.669 96.6192 230.312 95.2853L230.31 95.2751C229.953 93.9412 228.583 93.149 227.249 93.5056ZM18.5001 120.995C17.1194 120.995 16 122.114 16 123.495V123.504C16 124.885 17.1194 126.004 18.5001 126.004C19.8808 126.004 21 124.885 21 123.504V123.495C21 122.114 19.8808 120.995 18.5001 120.995ZM231.5 120.995C230.119 120.995 229 122.114 229 123.495V123.504C229 124.885 230.119 126.004 231.5 126.004C232.881 126.004 234 124.885 234 123.504L234 123.495C234 122.114 232.881 120.995 231.5 120.995ZM229.643 143.564C228.293 143.274 226.963 144.133 226.673 145.483L226.671 145.491C226.381 146.84 227.239 148.17 228.589 148.461C229.939 148.751 231.269 147.892 231.559 146.543L231.561 146.534C231.851 145.184 230.993 143.855 229.643 143.564ZM20.3571 143.564C19.0073 143.855 18.1485 145.184 18.4389 146.534L18.4407 146.543C18.7312 147.892 20.061 148.751 21.4108 148.461C22.7606 148.17 23.6193 146.84 23.3288 145.491L23.3271 145.483C23.0366 144.133 21.707 143.274 20.3571 143.564ZM223.048 165.225C221.791 164.654 220.309 165.21 219.738 166.467L219.734 166.475C219.163 167.732 219.719 169.214 220.976 169.785C222.233 170.356 223.715 169.8 224.287 168.543L224.29 168.535C224.861 167.278 224.305 165.796 223.048 165.225ZM26.952 165.225C25.6949 165.796 25.1388 167.278 25.7098 168.535L25.7134 168.543C26.2846 169.8 27.7666 170.356 29.0236 169.785C30.2807 169.214 30.8367 167.732 30.2655 166.475L30.2621 166.467C29.6911 165.21 28.2091 164.654 26.952 165.225ZM212.001 184.991C210.893 184.167 209.327 184.397 208.503 185.505L208.501 185.508C207.677 186.616 207.907 188.182 209.015 189.006C210.123 189.83 211.689 189.6 212.513 188.492L212.515 188.489C213.339 187.381 213.109 185.815 212.001 184.991ZM37.9987 184.991C36.8908 185.815 36.6607 187.381 37.4847 188.489L37.4873 188.492C38.3113 189.6 39.8775 189.83 40.9853 189.006C42.0931 188.182 42.3232 186.616 41.4991 185.508L41.4967 185.505C40.6726 184.397 39.1065 184.167 37.9987 184.991Z"
          fill="url(#arc-gradient)"
          mask="url(#art-mask)"
        />
      </svg>
      <ScaleLevels>
        <div
          style={{
            transform: `translate3d(0, ${(qualityLevel - 1)
              * -scaleLevelsHeight}px, 0)`,
          }}
        >
          {scaleLevels.map(({ size, color, label }, i) => (
            <div
              key={label}
              style={{
                fontSize: size,
                color,
                opacity: qualityLevel === i + 1 ? 1 : 0,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </ScaleLevels>
      <Divider />
      <IQAWrapper>
        IQA <Odometer value={IQA} fontSize={24} font={fontPrimary} minDigits={3} />
      </IQAWrapper>
    </Container>
  );
};

export default AirQuality;
