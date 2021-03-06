import { useEffect } from "react";
function useClickOutside(ref, handler) {
    useEffect(function () {
        //当当前div为空或者当前点击的区域在当前div中，那么不需要做任何事情，
        //否则给document绑定click事件
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target))
                return;
            handler(event);
        };
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
