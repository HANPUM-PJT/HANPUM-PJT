import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import Button from '@/components/common/Button/Button';
import * as R from '@/components/Style/Route/RouteAddCompletePage.styled';

function RouteAddCompletePage() {
  return (
    <R.Container>
      <Header purpose="result" clickBack={() => {}} />
      <R.MainContainer>
        <Icon name="IconRouteAddComplete" size={260} />
        <R.TextBox>
          <R.Text>김동산님의 경로가</R.Text>
          <R.Text>생성되었어요!</R.Text>
        </R.TextBox>
      </R.MainContainer>
      <R.BtnContainer>
        <Button
          width={70}
          height={6}
          fontColor="ffffff"
          backgroundColor="#1A823B"
          radius={0.7}
          fontSize={1.6}
          children="시작하기"
          color="#ffffff"
          onClick={() => {}}
          fontWeight="bold"
        />
      </R.BtnContainer>
    </R.Container>
  );
}

export default RouteAddCompletePage;