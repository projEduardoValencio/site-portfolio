import styled from 'styled-components';

interface IStyleProps {
  $isFooter?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// ------------------------------------------------------------------------------------------------------------------------------------------------------

export const Line = styled.hr<IStyleProps>`
  width: 300px;
  border: 0;
  height: 2px;
  background-color: ${(props) =>
    props.$isFooter ? 'var(--primary-color)' : 'var(--secondary-color)'};

  margin: 20px 0;

  @media (max-width: 1500px) {
    width: 250px;
  }

  @media (max-width: 1060px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    width: 50px;
  }
`;

// ------------------------------------------------------------------------------------------------------------------------------------------------------

export const Title = styled.h3<IStyleProps>`
  color: ${(props) =>
    props.$isFooter ? 'var(--primary-color)' : 'var(--secondary-color)'};

  font-size: 32px;
  font-family: 'IBM Plex Mono';
  margin: 0;

  @media (max-width: 1500px) {
    font-size: 28px;
  }

  @media (max-width: 1060px) {
    font-size: 20px;
  }
`;
