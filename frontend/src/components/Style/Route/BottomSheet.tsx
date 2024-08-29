import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteBottom.styled';
import { useState } from 'react';

interface BottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bsType: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

function BottomSheet(props: BottomSheetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      props.setIsOpen(false);
    }, 280);
  };

  const settingContent = ['공개 여부', '수정', '삭제'];
  const sortingType = ['최신순', '좋아요순', '등록순'];
  const BottomSheetMain = () => {
    switch (props.bsType) {
      case '설정':
        return (
          <R.BottomSheetMain>
            {settingContent.map((ele) => (
              <R.SettingBox>
                <R.SettingIconBox>
                  <Icon
                    name={
                      ele === '공개 여부'
                        ? 'IconLock'
                        : ele === '수정'
                          ? 'IconRetouch'
                          : 'IconDelete'
                    }
                    size={20}
                  />
                  <R.SettingTextBox isDelete={ele === '삭제'}>
                    {ele}
                  </R.SettingTextBox>
                </R.SettingIconBox>
                {ele === '공개 여부' && (
                  <R.SwitchLabel isOpen={isOpen}>
                    <R.SwitchInput
                      type="checkbox"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    />
                    <R.SwitchButton isOpen={isOpen} />
                  </R.SwitchLabel>
                )}
              </R.SettingBox>
            ))}
          </R.BottomSheetMain>
        );
      default:
        return (
          <R.BottomSheetMain>
            {sortingType.map((ele) => (
              <R.SortingTyepBox
                onClick={() => {
                  props.setSelected(ele);
                }}
              >
                <R.SortingTyep selected={props.selected === ele}>
                  {ele}
                </R.SortingTyep>
                {props.selected === ele && (
                  <Icon name="IconGreenChecked" size={15} />
                )}
              </R.SortingTyepBox>
            ))}
          </R.BottomSheetMain>
        );
    }
  };

  return (
    <R.Container
      onClick={(e) => {
        handleClose();
      }}
    >
      <R.BottomSheetContainer
        isClosing={isClosing}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <R.BottomSheetContentBox>
          <R.BottomSheetHeader>
            <R.HeaderIconBox
              onClick={() => {
                handleClose();
              }}
            >
              <Icon name="IconClose" size={15} />
            </R.HeaderIconBox>
            {props.bsType}
          </R.BottomSheetHeader>
          {BottomSheetMain()}
        </R.BottomSheetContentBox>
      </R.BottomSheetContainer>
    </R.Container>
  );
}

export default BottomSheet;
