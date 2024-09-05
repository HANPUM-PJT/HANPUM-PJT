import { useEffect, useRef, useCallback, useState } from 'react';
import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import * as R from '../../components/Style/Route/RouteList.styled';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import { useInfiniteQuery, useQuery } from 'react-query';
import { GetGroupList, GetMyMeet } from '@/api/meet/GET';
import { sortList, STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import MeetSmallCard from '@/components/Meet/MeetSmallCard';
import { MeetInfo, MeetRequestDto } from '@/models/meet';
import SortBox from '@/components/Meet/SortBox';
import { meetFilterInfoAtom } from '@/atoms/meetFilterAtom';
import { useRecoilValue } from 'recoil';

function MeetList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [openSort, setOpenSort] = useState(false);
  const meetFilterInfo = useRecoilValue(meetFilterInfoAtom);

  const [requestDto, setRequestDto] = useState<MeetRequestDto>({
    ...meetFilterInfo,
    pageable: {
      page: 0,
      size: 4,
      sort: 'latest,desc',
    },
  });

  const navigator = useNavigate();

  // 내 모임
  const { data: myMeet } = useQuery('getmyMeet', GetMyMeet, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        // console.log(res);
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // 모임 리스트 (무한 스크롤)
  const {
    data: groupListData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['getGroupList', requestDto.pageable.sort],
    ({ pageParam = 0 }) => {
      const updatedRequestDto = {
        ...requestDto,
        pageable: {
          ...requestDto.pageable,
          page: pageParam,
        },
      };
      return GetGroupList(updatedRequestDto);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const morePagesExist = lastPage.data.groupResDtoList.length > 0;
        const isLastPage =
          lastPage.data.groupResDtoList.length < requestDto.pageable.size;
        if (!morePagesExist || isLastPage) return undefined;
        return pages.length;
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  // 옵저버 handler(스크롤이다 보니 useCallback 사용)
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, loadMoreRef]);

  // 정렬 토글함수
  const handleToggleOpen = () => {
    // console.log('눌림');
    setOpenSort(!openSort);
  };

  const clickSort = (stateValue: string) => {
    if (stateValue === 'nothing') {
      setOpenSort(false);
    }
    setRequestDto((prev) => ({
      ...prev,
      pageable: {
        ...prev.pageable,
        sort: stateValue,
        page: 0,
      },
    }));
  };

  return (
    <R.RouteListContainer>
      <Header
        purpose="meet"
        $isborder={true}
        back={false}
        clickBack={() => {}}
      />

      <R.MainContainer>
        <Flex direction="column">
          {myMeet && myMeet.data && (
            <>
              <Text
                $typography="t20"
                $bold={true}
                style={{ paddingLeft: '8px' }}
              >
                내 모임
              </Text>
              <MeetLongCard data={myMeet.data} />
            </>
          )}
          <Flex
            $align="center"
            $gap={3}
            style={{ paddingLeft: '8px', marginBottom: '16px' }}
          >
            <Text $typography="t10" color="grey2" onClick={handleToggleOpen}>
              {sortList.filter(
                (val) => val.value === requestDto.pageable.sort,
              )[0]?.label || '최신순'}
            </Text>
            <Icon name="IconDownArrow" />
          </Flex>
          <div className="small-list">
            {groupListData?.pages[0]?.data.groupResDtoList.length === 0 ? (
              <Text
                $typography="t14"
                $bold={true}
                style={{
                  paddingLeft: '8px',
                  minHeight: '220px',
                  height: '100%',
                }}
              >
                필터링 된 데이터가 없습니다.
              </Text>
            ) : (
              groupListData?.pages.map((page) =>
                page.data.groupResDtoList.map((groupData: MeetInfo) => (
                  <MeetSmallCard key={groupData.groupId} data={groupData} />
                )),
              )
            )}
            {isFetching && <div>불러오는 중..</div>}
            <div ref={loadMoreRef} style={{ height: '1px' }} />
          </div>
        </Flex>
      </R.MainContainer>

      {openSort ? (
        <SortBox
          onClick={handleToggleOpen}
          sortState={requestDto}
          clickSort={clickSort}
        />
      ) : (
        <BottomTab />
      )}
    </R.RouteListContainer>
  );
}

export default MeetList;
