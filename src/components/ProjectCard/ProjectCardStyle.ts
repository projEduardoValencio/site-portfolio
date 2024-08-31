import styled from 'styled-components';
import { Card } from '../styled-components/CardStyle';

export const ProjectContainerCard = styled(Card)`
  padding: 30px 40px;
  flex-direction: column;
  align-items: center;

  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01) translateY(-5px);
  }

  @media (max-width: 925px) {
    padding: 10px 10px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1rem;

  grid-template-rows: 40px;

  h2 {
    font-family: 'IBM Plex Sans Thai Looped';
    margin-top: -10px;
  }

  img {
    object-fit: cover;
    grid-row: span 2;
    object-position: top;
    height: 300px;
    width: 100%;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;

    @media (max-width: 1400px) {
      height: 250px;
    }
  }

  & > .padding-horizontal {
    padding: 0 1rem;
  }

  @media (max-width: 925px) {
    grid-template-columns: 1fr;
    grid-row-gap: 5px;
  }
`;

export const TitleMobile = styled.h2`
  margin-top: -0.1rem;

  @media (min-width: 925px) {
    display: none;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  box-sizing: border-box;

  grid-row: span 2;

  p {
    box-sizing: border-box;
    margin: 0 0 20px;
    max-height: 20000;
    text-indent: 3rem;
    text-align: justify;
    overflow: auto;

    font-weight: 400;
    font-size: 16px;

    @media (max-width: 925px) {
      font-size: 1rem;
    }
  }
`;

export const Title = styled.h2`
  width: 100%;
  font-size: 28px !important;
  font-size: 1px;
  height: 0px !important;
  display: none;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: -1rem;

  @media (min-width: 925px) {
    display: block;
  }
`;

export const TagsDiv = styled.div`
  padding: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

export const Tag = styled.div`
  padding: 0.1rem 0.7rem;
  border-radius: 20px;
  background: var(--secondary-color);
  color: var(--primary-color);
  font-size: 0.8rem;
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 450px) {
    justify-content: center;
  }
`;

interface IButtonProps {
  $fillButton?: boolean;
}
interface IButtonAttrProps {
  href: string;
}
export const Button = styled.a.attrs<IButtonAttrProps>(({ href }) => ({
  href: href,
  target: '_blank',
}))<IButtonProps>`
  text-decoration: none;
  width: 145px;
  height: 43px;
  border-radius: 5px;
  border: 1px solid var(--secondary-color);
  background: ${(props) =>
    props.$fillButton ? 'var(--secondary-color)' : 'var(--primary-color)'};
  color: ${(props) =>
    props.$fillButton ? 'var(--primary-color)' : 'var(--secondary-color)'};

  transition: all 0.1s ease-in-out;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono';
  font-size: 14px;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    filter: drop-shadow(5px 5px 10px #00000030);
  }
`;
