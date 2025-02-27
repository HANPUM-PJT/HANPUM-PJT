import Header from '@/components/common/Header/Header';
import { returnConfigTitle } from '@/utils/util';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from './Announcement';
import Policy from './Policy';
import { colors } from '@/styles/colorPalette';
import Withdraw from './Withdraw';
import ChangePw from './ChangePw';

type ConfigType = 'announcement' | 'policy' | 'withdraw' | 'pw';

function ConfigLayout() {
  const param = useParams().category?.split(':')[1] as ConfigType;
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        purpose="title"
        title={returnConfigTitle(param)}
        clickBack={() => {
          navigate(-1);
        }}
      />

      {param === 'announcement' && <Announcement param={param} />}
      {param === 'policy' && <Policy param={param} />}

      {param === 'pw' && <ChangePw />}
      {param === 'withdraw' && <Withdraw />}
    </Layout>
  );
}

export default ConfigLayout;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
`;
