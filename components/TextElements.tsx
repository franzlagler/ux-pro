import styled from 'styled-components';

export const InvisibleHeading = styled.h1`
  display: none;
`;

export const PrimHeading = styled.h1`
  margin-bottom: 15px;
  font-size: 48px;
  font-weight: 900;
  color: #212529;
  text-align: inherit;
  text-align: ${(props: { center?: boolean }) =>
    props.center ? 'center' : 'auto'};
`;

export const SecHeading = styled.h2`
  margin: 25px 0;
  font-size: 30px;
  font-weight: 900;
  color: #212529;
`;

export const TerHeading = styled.h3`
  color: #212529;
`;

export const ParaText = styled.p`
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
`;

export const BoldText = styled.span`
  font-weight: 800;
`;

export const SuccessMessage = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #76f5c0;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #f85555;
`;
