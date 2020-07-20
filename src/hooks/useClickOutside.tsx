import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    //当当前div为空或者当前点击的区域在当前div中，那么不需要做任何事情，
    //否则给document绑定click事件
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement))
        return;
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
