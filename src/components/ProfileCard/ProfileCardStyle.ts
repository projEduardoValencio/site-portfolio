import styled from 'styled-components';

interface IAttrProps {
  id: string;
}
export const Container = styled.div.attrs<IAttrProps>(({ ref }) => ({
  ref,
}))`
  display: grid;
  grid-template-columns: 65% 35%;
  width: 100%;
  gap: 10px;
  text-align: justify;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

export const MainTitle = styled.h1`
  font-size: 36px;
  line-height: 20px;
  font-weight: normal;

  @media (max-width: 470px) {
    font-size: 24px;
  }
`;

export const MainTitleName = styled.span`
  font-weight: bold;
  letter-spacing: 2px;

  @media (max-width: 470px) {
    font-size: 25px;
  }
`;

export const SubTitle = styled.h2`
  font-weight: normal;
  letter-spacing: -1px;
  font-size: 32px;
  line-height: 32px;
  min-height: 32px;

  @media (max-width: 470px) {
    font-size: 20px;
    letter-spacing: 1px;
    min-height: 20px;
  }

  & span {
    font-weight: normal;
    letter-spacing: -1px;
    font-size: 32px;
    line-height: 32px;

    @media (max-width: 470px) {
      font-size: 20px;
      letter-spacing: 1px;
    }
  }
`;

export const TitleContainer = styled.div`
  height: auto;
`;

export const ProfileImageContainer = styled.div`
  grid-row: span 2;
  justify-content: end;

  @media (max-width: 1040px) {
    grid-row: span 1;
    justify-content: center;
  }
`;

export const ProfileImage = styled.img`
  width: 280px;
  height: 300px;
  border-radius: 25px;
  filter: drop-shadow(5px 5px 10px #00000022);
  object-fit: cover;
`;

export const Biography = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  text-align: justify;

  @media (max-width: 470px) {
    font-size: 18px;
  }
`;
