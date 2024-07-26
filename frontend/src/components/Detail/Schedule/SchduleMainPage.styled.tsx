import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: end;
`;

export const HeaderContent = styled.div`
  width: 100vw;
  height: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 2rem 2rem;
  border-bottom: 0.2rem solid #f2f2f2;
`;

export const HeaderTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const HeaderIcon = styled.img<{ src: string }>`
  src: ${(props) => props.src};
`;

export const SchduleTypeContainer = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  border-bottom: 0.2rem solid #f2f2f2;
`;

export const SchduleTypeBox = styled.div`
  width: 65vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ScheduleType = styled.p<{ isSelected: boolean }>`
  font-size: 1.5rem;
  color: ${(props) => (props.isSelected ? "#000000" : "#d9d9d9")};
  font-weight: bold;
`;

export const ScheduleMainContainer = styled.div`
  width: 100vw;
  height: 84vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0 0 0;
`;