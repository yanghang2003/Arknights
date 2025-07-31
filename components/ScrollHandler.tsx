// components/ScrollHandler.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PAGE_SEQUENCE } from '../constants/routes';
import { useDispatch } from 'react-redux';
import { setDirection } from '@/store/reducer/directionReducer';
// 页面路由顺序映射
/* const PAGE_SEQUENCE = ['/index', '/information', '/operator']; */
/* 后续有需要可动态添加路由 根据用户的不同 如管理员或者是基础用户返回不同的页面*/
/* const nextPage = await fetchNextPage();
PAGE_SEQUENCE.push(nextPage.path); */
export default function ScrollHandler() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const currentIndex = PAGE_SEQUENCE.indexOf(router.pathname);
      if (currentIndex === -1) return;

      // 向右滚动：前进到下一页
      if (e.deltaY > 0 && currentIndex < PAGE_SEQUENCE.length - 1) {
        navigateTo(currentIndex + 1);
      }
      // 向左滚动：返回上一页
      else if (e.deltaY < 0 && currentIndex > 0) {
        navigateTo(currentIndex - 1);
      }

      function navigateTo(index: number) {
        router.push({ pathname: PAGE_SEQUENCE[index] });
        const direction = index > currentIndex ? 1 : -1;
        dispatch(setDirection(direction));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [router]);

  return null;
}
